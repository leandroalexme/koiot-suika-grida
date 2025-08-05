import type { IRenderer } from '../renderer';

/**
 * Utilitários para Graphics - CanvasKit puro
 * Removido: suporte Canvas2D legacy
 */

/**
 * Verifica se o renderer está disponível e é válido
 */
export const isRendererValid = (renderer: IRenderer | null): renderer is IRenderer => {
  return renderer !== null && typeof renderer.save === 'function';
};

/**
 * Execução de desenho com layer usando CanvasKit nativo
 * Substitui drawLayer legacy que usava Canvas2D
 */
export const drawCanvasKitLayer = (params: {
  renderer: IRenderer;
  viewSize: { width: number; height: number };
  draw: (renderer: IRenderer) => void;
}) => {
  const { renderer, draw } = params;
  
  if (!isRendererValid(renderer)) {
    console.warn('drawCanvasKitLayer: renderer inválido');
    return;
  }
  
  renderer.save();
  
  try {
    // Executar draw diretamente com CanvasKit - muito mais eficiente
    draw(renderer);
  } finally {
    renderer.restore();
  }
};

/**
 * Helper para operações batch em CanvasKit
 */
export const withCanvasKitBatch = (renderer: IRenderer, operation: () => void) => {
  if (!isRendererValid(renderer)) {
    console.warn('withCanvasKitBatch: renderer inválido');
    return;
  }
  
  renderer.save();
  try {
    operation();
  } finally {
    renderer.restore();
    // Flush para garantir que mudanças sejam aplicadas
    renderer.flush();
  }
};

/**
 * Aplicar transformação otimizada no CanvasKit
 */
export const applyCanvasKitTransform = (
  renderer: IRenderer, 
  transform: number[]
) => {
  if (transform.length === 6) {
    renderer.setTransform(
      transform[0], transform[1], 
      transform[2], transform[3], 
      transform[4], transform[5]
    );
  }
};