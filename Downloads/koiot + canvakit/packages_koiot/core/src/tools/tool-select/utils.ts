import { IPoint } from '../../utils/common';
import { IGraphics } from '../../graphics/types';
import { SceneManager } from '../../managers/scene-manager';

/**
 * 🎯 Get top hit element at point (como no Suika)
 * Encontra o elemento gráfico no topo em um ponto específico
 */
export function getTopHitElement(
  sceneManager: SceneManager,
  point: IPoint
): IGraphics | null {
  // 🚀 SceneManager já tem este método implementado!
  return sceneManager.findGraphicsAt(point);
}

/**
 * 🎯 Check if point is inside selected box
 */
export function isPointInsideSelectedBox(
  point: IPoint,
  selectedItems: IGraphics[]
): boolean {
  if (selectedItems.length === 0) return false;
  
  // Para simplificar, vamos verificar se está dentro do bounding box de qualquer item selecionado
  return selectedItems.some(item => {
    if (item.hitTest) {
      return item.hitTest(point);
    }
    return false;
  });
}