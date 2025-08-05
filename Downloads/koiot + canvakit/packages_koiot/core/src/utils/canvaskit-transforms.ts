/**
 * CanvasKit-specific transformation utilities
 * 
 * Diferente do Canvas 2D HTML5, o CanvasKit/Skia requer uma abordagem
 * mais explícita para transformações, especialmente flip operations.
 */

import { Matrix } from './matrix';

export interface CanvasKitFlipOptions {
  flipX: boolean;
  flipY: boolean;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

/**
 * Cria uma matriz de flip específica para CanvasKit
 * 
 * No CanvasKit, flip operations devem ser aplicadas explicitamente
 * através de transformações de matriz, diferente do Canvas 2D onde
 * scale negativo automaticamente inverte o drawing.
 */
export function createCanvasKitFlipMatrix(options: CanvasKitFlipOptions): Matrix {
  const { flipX, flipY, centerX, centerY, width, height } = options;
  
  const matrix = new Matrix();
  
  if (!flipX && !flipY) {
    return matrix; // Matriz identidade
  }
  
  console.log('🎯 Creating CanvasKit flip matrix:', options);
  
  // Para CanvasKit, aplicamos flip em torno do centro do objeto
  // 1. Transladar para origem (centro)
  matrix.translate(-centerX, -centerY);
  
  // 2. Aplicar scale negativo para flip
  matrix.scale(flipX ? -1 : 1, flipY ? -1 : 1);
  
  // 3. Transladar de volta
  matrix.translate(centerX, centerY);
  
  console.log('🎯 CanvasKit flip matrix created:', matrix.getArray());
  
  return matrix;
}

/**
 * Detecta flip a partir dos componentes da matriz de transformação
 * 
 * No CanvasKit, flip é detectado pelos sinais dos componentes
 * 'a' (escala X) e 'd' (escala Y) da matriz.
 */
export function detectCanvasKitFlip(transform: number[]): { flipX: boolean; flipY: boolean } {
  const [a, b, c, d] = transform;
  
  return {
    flipX: a < 0,
    flipY: d < 0
  };
}

/**
 * Normaliza uma matriz para CanvasKit, garantindo que
 * transformações sejam aplicadas corretamente
 */
export function normalizeCanvasKitMatrix(
  transform: number[],
  width: number,
  height: number
): number[] {
  const [a, b, c, d, tx, ty] = transform;
  
  // Se não há flip, retornar matriz original
  if (a >= 0 && d >= 0) {
    return transform;
  }
  
  console.log('🎯 Normalizing CanvasKit matrix with flip:', { a, d, width, height });
  
  // Para CanvasKit, ajustamos a translação para compensar flip
  let newTx = tx;
  let newTy = ty;
  
  if (a < 0) {
    // Flip horizontal - ajustar translação X
    newTx = tx + width;
  }
  
  if (d < 0) {
    // Flip vertical - ajustar translação Y
    newTy = ty + height;
  }
  
  const normalized = [a, b, c, d, newTx, newTy];
  console.log('🎯 CanvasKit matrix normalized:', normalized);
  
  return normalized;
}

/**
 * Aplicar flip específico para CanvasKit em multi-seleção
 * 
 * Calcula as novas posições dos elementos considerando o flip
 * aplicado ao conjunto como um todo.
 */
export function applyCanvasKitMultiFlip(
  elementPosition: { x: number; y: number },
  elementDimensions: { width: number; height: number },
  selectionCenter: { x: number; y: number },
  newSelectionCenter: { x: number; y: number },
  flipInfo: { flipX: boolean; flipY: boolean },
  scale: { x: number; y: number }
): {
  newPosition: { x: number; y: number };
  flipMatrix: [number, number, number, number, number, number];
} {
  const { x: elemX, y: elemY } = elementPosition;
  const { width, height } = elementDimensions;
  const { x: oldCenterX, y: oldCenterY } = selectionCenter;
  const { x: newCenterX, y: newCenterY } = newSelectionCenter;
  const { flipX, flipY } = flipInfo;
  const { x: scaleX, y: scaleY } = scale;
  
  console.log('🎯 CanvasKit multi-flip calculation:', {
    elementPosition,
    elementDimensions,
    selectionCenter,
    newSelectionCenter,
    flipInfo,
    scale
  });
  
  // Calcular posição relativa ao centro da seleção
  const relativeX = elemX - oldCenterX;
  const relativeY = elemY - oldCenterY;
  
  // Aplicar flip na posição relativa
  const flippedRelativeX = flipX ? -relativeX : relativeX;
  const flippedRelativeY = flipY ? -relativeY : relativeY;
  
  // Calcular nova posição absoluta
  const newX = newCenterX + (flippedRelativeX * scaleX);
  const newY = newCenterY + (flippedRelativeY * scaleY);
  
  // Criar matriz de flip local para o elemento
  const flipMatrix: [number, number, number, number, number, number] = [
    flipX ? -1 : 1,           // a: escala horizontal
    0,                        // b: sem rotação
    0,                        // c: sem rotação  
    flipY ? -1 : 1,           // d: escala vertical
    flipX ? width : 0,        // tx: offset para flip horizontal
    flipY ? height : 0        // ty: offset para flip vertical
  ];
  
  console.log('🎯 CanvasKit multi-flip result:', {
    oldPosition: { x: elemX, y: elemY },
    newPosition: { x: newX, y: newY },
    relativePositions: { 
      original: { x: relativeX, y: relativeY },
      flipped: { x: flippedRelativeX, y: flippedRelativeY }
    },
    flipMatrix
  });
  
  return {
    newPosition: { x: newX, y: newY },
    flipMatrix
  };
}

/**
 * Verifica se uma transformação precisa de normalização para CanvasKit
 */
export function needsCanvasKitNormalization(transform: number[]): boolean {
  const [a, , , d] = transform;
  return a < 0 || d < 0;
}