import { getClosestTimesVal, nearestPixelVal } from '@suika/common';

import { type SuikaEditor } from './editor';

/**
 * draw grid
 */
class Grid {
  constructor(private editor: SuikaEditor) {}
  draw() {
    // 🚀 CANVASKIT PURO: Usar apenas renderer CanvasKit
    const renderer = this.editor.renderer;
    if (!renderer) {
      console.error('❌ Grid: Renderer não disponível');
      return;
    }
    
    renderer.save();

    const {
      x: offsetX,
      y: offsetY,
      width,
      height,
    } = this.editor.viewportManager.getViewport();
    const zoom = this.editor.zoomManager.getZoom();
    const setting = this.editor.setting;
    const stepX = this.editor.setting.get('gridViewX');
    const stepY = this.editor.setting.get('gridViewY');
    const color = setting.get('pixelGridLineColor');

    console.log('🚀 Grid: Usando CanvasKit nativo');
    
    const startXInScene = getClosestTimesVal(offsetX, stepX);
    const endXInScene = getClosestTimesVal(offsetX + width / zoom, stepX);
    const startYInScene = getClosestTimesVal(offsetY, stepY);
    const endYInScene = getClosestTimesVal(offsetY + height / zoom, stepY);

    // Converter coordenadas de scene para viewport
    const startXViewport = nearestPixelVal((startXInScene - offsetX) * zoom);
    const endXViewport = nearestPixelVal((endXInScene - offsetX) * zoom);
    const startYViewport = nearestPixelVal((startYInScene - offsetY) * zoom);
    const endYViewport = nearestPixelVal((endYInScene - offsetY) * zoom);
    
    const stepXViewport = stepX * zoom;
    const stepYViewport = stepY * zoom;

    // ✅ USAR MÉTODO OTIMIZADO CANVASKIT
    renderer.drawGridLines(
      startXViewport, endXViewport, stepXViewport,
      startYViewport, endYViewport, stepYViewport,
      color, width, height
    );

    renderer.restore();
  }
}

export default Grid;
