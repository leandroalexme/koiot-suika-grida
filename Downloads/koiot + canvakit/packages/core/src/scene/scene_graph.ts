import { EventEmitter, getDevicePixelRatio } from '@suika/common';
import { type IRect } from '@suika/geo';

import { type SuikaEditor } from '../editor';
import {
  type GraphicsAttrs,
  isFrameGraphics,
  SuikaEllipse,
  SuikaFrame,
  SuikaGraphics,
  SuikaLine,
  SuikaPath,
  SuikaRect,
  SuikaRegularPolygon,
  SuikaStar,
  SuikaText,
} from '../graphics';
import { SuikaCanvas } from '../graphics/canvas';
import { SuikaDocument } from '../graphics/document';
import Grid from '../grid';
import { GraphicsType, type IEditorPaperData } from '../type';
import { rafThrottle } from '../utils';

const graphCtorMap = {
  [GraphicsType.Graph]: SuikaGraphics,
  [GraphicsType.Rect]: SuikaRect,
  [GraphicsType.Ellipse]: SuikaEllipse,
  [GraphicsType.Line]: SuikaLine,
  [GraphicsType.Text]: SuikaText,
  [GraphicsType.Path]: SuikaPath,
  [GraphicsType.RegularPolygon]: SuikaRegularPolygon,
  [GraphicsType.Star]: SuikaStar,
  [GraphicsType.Frame]: SuikaFrame,
  [GraphicsType.Canvas]: SuikaCanvas,
  [GraphicsType.Document]: SuikaDocument,
};

interface Events {
  render(): void;
}

export class SceneGraph {
  selection: IRect | null = null;
  private eventEmitter = new EventEmitter<Events>();
  private grid: Grid;
  showBoxAndHandleWhenSelected = true;
  showSelectedGraphsOutline = true;
  highlightLayersOnHover = true;

  constructor(private editor: SuikaEditor) {
    this.grid = new Grid(editor);
  }

  addItems(graphicsArr: SuikaGraphics[]) {
    for (const graphics of graphicsArr) {
      this.editor.doc.addGraphics(graphics);
    }
  }

  // 全局重渲染
  render = rafThrottle(() => {
    // 获取视口区域
    const {
      viewportManager,
      canvasElement: canvas,
      setting,
      renderer,
    } = this.editor;
    const viewport = viewportManager.getViewport();
    const zoom = this.editor.zoomManager.getZoom();
    const selectedElements = this.editor.selectedElements;

    // 🚀 CANVASKIT PURO: Apenas renderer CanvasKit
    if (!renderer) {
      console.error('❌ SceneGraph: Renderer CanvasKit não disponível');
      return;
    }

    console.log('🚀 SceneGraph: Pipeline CanvasKit nativa');
    
    const imgManager = this.editor.imgManager;
    const dpr = getDevicePixelRatio();
    const dx = -viewport.x;
    const dy = -viewport.y;
    const bgColor = setting.get('canvasBgColor');

    // ✅ PIPELINE CANVASKIT OTIMIZADA
    renderer.clearBackground(bgColor, canvas.width, canvas.height);
    renderer.setViewportTransform(dpr, zoom, dx, dy);

    // Render main canvas content com CanvasKit
    const canvasGraphics = this.editor.doc.getCanvas();
    const smooth = zoom <= 1;
    if (canvasGraphics) {
      const viewportArea = this.editor.viewportManager.getBbox();
      
      renderer.save();
      canvasGraphics.draw({ 
        ctx: renderer, 
        imgManager, 
        smooth, 
        viewportArea 
      });
      renderer.restore();
    }

    /********** draw guide line *********/
    renderer.save();
    // Reset transformação para overlay UI usando método CanvasKit otimizado
    if (typeof (renderer as any).resetTransform === 'function') {
      (renderer as any).resetTransform();
    } else {
      renderer.setTransform(1, 0, 0, 1, 0, 0);
    }
    renderer.scale(dpr, dpr);

    /** draw pixel grid */
    if (
      setting.get('enablePixelGrid') &&
      zoom >= this.editor.setting.get('minPixelGridZoom')
    ) {
      this.grid.draw();
    }

    /** draw hover graphics outline and its control handle */
    if (this.highlightLayersOnHover && setting.get('highlightLayersOnHover')) {
      const hlItem = selectedElements.getHighlightedItem();
      if (hlItem && !selectedElements.hasItem(hlItem)) {
        this.drawGraphsOutline(
          [hlItem],
          setting.get('hoverOutlineStrokeWidth'),
          this.editor.setting.get('hoverOutlineStroke'),
        );
      }
    }

    const selectedTransformBox = this.editor.selectedBox.updateBbox();

    /** draw selected elements outline */
    if (this.showSelectedGraphsOutline) {
      this.drawGraphsOutline(
        this.editor.selectedElements
          .getItems()
          .filter((item) => item.isVisible()),
        setting.get('selectedOutlineStrokeWidth'),
        this.editor.setting.get('hoverOutlineStroke'),
      );
      this.editor.selectedBox.draw();
    }

    // draw path editor path outline
    if (this.editor.pathEditor.isActive()) {
      const path = this.editor.pathEditor.getPath();
      if (path) {
        this.drawGraphsOutline(
          [path],
          setting.get('selectedOutlineStrokeWidth'),
          this.editor.setting.get('pathLineStroke'),
        );
      }
    }

    // draw frame text
    const padding = 4;
    const frames = this.editor.doc.graphicsStoreManager.getFrames();
    for (const frame of frames) {
      if ((isFrameGraphics(frame) && frame.isGroup()) || frame.isDeleted()) {
        continue;
      }
      const pos = frame.getWorldPosition();
      const viewportPos = this.editor.toViewportPt(pos.x, pos.y);
      frame.drawText(renderer as any, viewportPos.x, viewportPos.y - padding);
    }

    /** draw transform handle */
    if (this.showBoxAndHandleWhenSelected) {
      this.editor.controlHandleManager.draw(selectedTransformBox);
    }

    this.editor.textEditor.drawRange();

    /** draw selection */
    if (this.selection) {
      const strokeStyle = setting.get('selectionStroke');
      const fillStyle = setting.get('selectionFill');
      const { x, y, width, height } = this.selection;

      const { x: xInViewport, y: yInViewport } = this.editor.toViewportPt(x, y);
      const widthInViewport = width * zoom;
      const heightInViewport = height * zoom;

      // 🚀 CANVASKIT NATIVO: drawSelectionBox otimizado
      console.log('🚀 Selection: CanvasKit nativo');
      renderer.drawSelectionBox(
        xInViewport, yInViewport, 
        widthInViewport, heightInViewport,
        strokeStyle, fillStyle
      );
    }

    this.editor.refLine.drawRefLine(renderer as any);

    /** drawing rulers */
    if (setting.get('enableRuler')) {
      this.editor.ruler.draw();
    }

    renderer.restore();

    // 🚀 FLUSH CANVASKIT: Frame completo renderizado
    renderer.flush();
    console.log('✅ CanvasKit frame renderizado e flushed');

    this.eventEmitter.emit('render');
  });

  private drawGraphsOutline(
    graphicsArr: SuikaGraphics[],
    strokeWidth: number,
    stroke: string,
  ) {
    const renderer = this.editor.renderer;
    if (!renderer) return;
    
    const dpr = getDevicePixelRatio();
    const viewport = this.editor.viewportManager.getViewport();
    const zoom = this.editor.zoomManager.getZoom();
    const dx = -viewport.x;
    const dy = -viewport.y;

    renderer.save();
    // Reset transformação para outline usando método CanvasKit otimizado
    if (typeof (renderer as any).resetTransform === 'function') {
      (renderer as any).resetTransform();
    } else {
      renderer.setTransform(1, 0, 0, 1, 0, 0);
    }
    renderer.scale(dpr * zoom, dpr * zoom);
    renderer.translate(dx, dy);

    strokeWidth /= zoom;
    for (const graphics of graphicsArr) {
      renderer.save();
      graphics.drawOutline(renderer as any, stroke, strokeWidth);
      renderer.restore();
    }
    renderer.restore();
  }

  setSelection(partialRect: Partial<IRect>) {
    this.selection = Object.assign({}, this.selection, partialRect);
  }

  /**
   * get tree data with simple info (for layer panel)
   */
  toObjects() {
    const canvasGraphics = this.editor.doc.getCanvas();
    if (!canvasGraphics) {
      return [];
    }
    return canvasGraphics.toObject().children ?? [];
  }

  toJSON() {
    const data = this.editor.doc
      .getAllGraphicsArr()
      .filter((graphics) => !graphics.isDeleted())
      .map((item) => item.toJSON());
    const paperData: IEditorPaperData = {
      appVersion: this.editor.appVersion,
      paperId: this.editor.paperId,
      data: data,
    };
    return JSON.stringify(paperData);
  }

  createGraphicsArr(data: GraphicsAttrs[]) {
    const children: SuikaGraphics[] = [];
    for (const attrs of data) {
      const type = attrs.type;
      const Ctor = graphCtorMap[type!];
      if (!Ctor) {
        console.error(`Unsupported graphics type "${attrs.type}", ignore it`);
        continue;
      }
      children.push(new Ctor(attrs as any, { doc: this.editor.doc }));
    }
    return children;
  }

  initGraphicsTree(graphicsArr: SuikaGraphics[]) {
    const canvasGraphics = this.editor.doc.getCanvas();
    for (const graphics of graphicsArr) {
      if (graphics instanceof SuikaCanvas) {
        continue;
      }
      const parent = graphics.getParent() ?? canvasGraphics;
      if (parent && parent !== graphics) {
        parent.insertChild(graphics, graphics.attrs.parentIndex?.position);
      }
    }
  }

  load(info: GraphicsAttrs[], isApplyChanges?: boolean) {
    const graphicsArr = this.createGraphicsArr(info);
    if (!isApplyChanges) {
      this.editor.doc.clear();
    }
    this.addItems(graphicsArr);
    this.initGraphicsTree(graphicsArr);
  }

  on<K extends keyof Events>(eventName: K, handler: Events[K]) {
    this.eventEmitter.on(eventName, handler);
  }

  off<K extends keyof Events>(eventName: K, handler: Events[K]) {
    this.eventEmitter.off(eventName, handler);
  }
}
