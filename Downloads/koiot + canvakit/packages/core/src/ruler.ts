import { getClosestTimesVal, nearestPixelVal } from '@suika/common';

import { HALF_PI } from './constant';
import { type SuikaEditor } from './editor';
import { mergeIntervals, rotateInCanvas } from './utils';

const getStepByZoom = (zoom: number) => {
  /**
   * 步长研究，参考 figma
   * 1
   * 2
   * 5
   * 10（对应 500% 往上） 找到规律了： 50 / zoom = 步长
   * 25（对应 200% 往上）
   * 50（对应 100% 往上）
   * 100（对应 50% 往上）
   * 250
   * 500
   * 1000
   * 2500
   * 5000
   */
  const steps = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000];
  const step = 50 / zoom;
  for (let i = 0, len = steps.length; i < len; i++) {
    if (steps[i] >= step) return steps[i];
  }
  return steps[0];
};

/**
 * Ruler
 *
 * reference: https://mp.weixin.qq.com/s/RlNTitV3XTEKHfwpOKAQ0g
 */
class Ruler {
  visible = false;

  constructor(private editor: SuikaEditor) {}

  open() {
    this.visible = true;
  }
  close() {
    this.visible = false;
  }
  draw() {
    const setting = this.editor.setting;
    const rulerWidth = setting.get('rulerWidth');

    // 🚀 MIGRAÇÃO CANVASKIT: Usar renderer unificado quando disponível
    const renderer = this.editor.renderer;
    const ctx = renderer || this.editor.ctx;
    const viewport = this.editor.viewportManager.getViewport();
    const { width: viewportWidth, height: viewportHeight } = viewport;
    
    ctx.save();
    
    const bgColor = setting.get('rulerBgColor');
    
    // ✅ OTIMIZAÇÃO CANVASKIT: Usar drawRulerBackground quando disponível
    if (renderer && typeof renderer.drawRulerBackground === 'function') {
      console.log('🚀 Ruler: Usando CanvasKit otimizado para background');
      renderer.drawRulerBackground(bgColor, rulerWidth, viewportWidth, viewportHeight);
    } else {
      // ⚠️ FALLBACK CANVAS2D: Método original
      console.log('⚠️ Ruler: Fallback Canvas2D para background');
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, viewportWidth, rulerWidth);
      ctx.fillRect(0, 0, rulerWidth, viewportHeight);
    }

    this.drawSelectArea();

    this.drawXRuler();
    this.drawYRuler();

    // 把左上角的小矩形上的刻度盖掉
    ctx.fillStyle = setting.get('rulerBgColor');
    ctx.fillRect(0, 0, rulerWidth, rulerWidth);

    // 绘制 border
    ctx.strokeStyle = setting.get('rulerStroke');
    ctx.beginPath();
    // 水平 border
    ctx.moveTo(0, rulerWidth + 0.5);
    ctx.lineTo(viewportWidth, rulerWidth + 0.5);
    ctx.stroke();
    ctx.closePath();
    // 垂直 border
    ctx.beginPath();
    ctx.moveTo(rulerWidth + 0.5, 0);
    ctx.lineTo(rulerWidth + 0.5, viewportHeight);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
  private drawSelectArea() {
    const setting = this.editor.setting;
    const rulerWidth = setting.get('rulerWidth');

    const renderer = this.editor.renderer;
    if (!renderer) return;
    const zoom = this.editor.zoomManager.getZoom();
    const viewport = this.editor.viewportManager.getViewport();

    const bboxes = this.editor.selectedElements
      .getItems()
      .map((item) => item.getBbox());

    ctx.fillStyle = setting.get('rulerSelectedBgColor');
    for (const [minX, maxX] of mergeIntervals(
      bboxes.map(({ minX, maxX }) => [minX, maxX]),
    )) {
      ctx.fillRect(
        (minX - viewport.x) * zoom,
        0,
        (maxX - minX) * zoom,
        rulerWidth,
      );
    }
    for (const [minY, maxY] of mergeIntervals(
      bboxes.map(({ minY, maxY }) => [minY, maxY]),
    )) {
      ctx.fillRect(
        0,
        (minY - viewport.y) * zoom,
        rulerWidth,
        (maxY - minY) * zoom,
      );
    }
  }
  private drawXRuler() {
    const setting = this.editor.setting;
    const rulerWidth = setting.get('rulerWidth');

    // 🚀 MIGRAÇÃO CANVASKIT: Usar renderer unificado quando disponível
    const renderer = this.editor.renderer;
    const ctx = renderer || this.editor.ctx;
    const zoom = this.editor.zoomManager.getZoom();
    const viewport = this.editor.viewportManager.getViewport();
    const stepInScene = getStepByZoom(zoom);
    const markSize = setting.get('rulerMarkSize');
    const color = setting.get('rulerMarkStroke');

    const startX = rulerWidth;
    let startXInScene = viewport.x + startX / zoom;
    startXInScene = getClosestTimesVal(startXInScene, stepInScene);

    const endX = viewport.width;
    let { x: endXInScene } = this.editor.toScenePt(endX, 0);
    endXInScene = getClosestTimesVal(endXInScene, stepInScene);

    // ✅ OTIMIZAÇÃO CANVASKIT: Usar drawRulerMarks quando disponível
    if (renderer && typeof renderer.drawRulerMarks === 'function') {
      console.log('🚀 Ruler: Usando CanvasKit otimizado para marks X');
      
      const marks: Array<{pos: number, label: string}> = [];
      let currentX = startXInScene;
      while (currentX <= endXInScene) {
        const x = nearestPixelVal((currentX - viewport.x) * zoom);
        marks.push({ pos: x, label: String(currentX) });
        currentX += stepInScene;
      }
      
      renderer.drawRulerMarks(true, marks, color, rulerWidth, markSize);
    } else {
      // ⚠️ FALLBACK CANVAS2D: Método original
      console.log('⚠️ Ruler: Fallback Canvas2D para marks X');
      
      ctx.textAlign = 'center';
      const y = rulerWidth - markSize;
      let currentX = startXInScene;
      while (currentX <= endXInScene) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        const x = nearestPixelVal((currentX - viewport.x) * zoom);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + markSize);
        ctx.stroke();
        ctx.closePath();
        ctx.fillText(String(currentX), x, y - 4);
        currentX += stepInScene;
      }
    }
  }
  private drawYRuler() {
    const setting = this.editor.setting;
    const rulerWidth = setting.get('rulerWidth');

    // 🚀 MIGRAÇÃO CANVASKIT: Usar renderer unificado quando disponível
    const renderer = this.editor.renderer;
    const ctx = renderer || this.editor.ctx;
    const zoom = this.editor.zoomManager.getZoom();
    const viewport = this.editor.viewportManager.getViewport();
    const stepInScene = getStepByZoom(zoom);
    const markSize = setting.get('rulerMarkSize');
    const color = setting.get('rulerMarkStroke');

    const startY = rulerWidth;
    let startYInScene = viewport.y + startY / zoom;
    startYInScene = getClosestTimesVal(startYInScene, stepInScene);

    const endY = viewport.height;
    let endYInScene = viewport.y + endY / zoom;
    endYInScene = getClosestTimesVal(endYInScene, stepInScene);

    // ✅ OTIMIZAÇÃO CANVASKIT: Usar drawRulerMarks quando disponível
    if (renderer && typeof renderer.drawRulerMarks === 'function') {
      console.log('🚀 Ruler: Usando CanvasKit otimizado para marks Y');
      
      const marks: Array<{pos: number, label: string}> = [];
      let currentY = startYInScene;
      while (currentY <= endYInScene) {
        const y = nearestPixelVal((currentY - viewport.y) * zoom);
        marks.push({ pos: y, label: String(currentY) });
        currentY += stepInScene;
      }
      
      renderer.drawRulerMarks(false, marks, color, rulerWidth, markSize);
    } else {
      // ⚠️ FALLBACK CANVAS2D: Método original
      console.log('⚠️ Ruler: Fallback Canvas2D para marks Y');
      
      const x = rulerWidth - markSize;
      ctx.textAlign = 'center';
      ctx.fillStyle = color;
      let currentY = startYInScene;
      while (currentY <= endYInScene) {
        const y = nearestPixelVal((currentY - viewport.y) * zoom);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + markSize, y);
        ctx.stroke();
        ctx.closePath();
        rotateInCanvas(ctx, -HALF_PI, x, y);
        ctx.fillText(String(currentY), x, y - 3);
        rotateInCanvas(ctx, HALF_PI, x, y);
        currentY += stepInScene;
      }
    }
  }
}

export default Ruler;
