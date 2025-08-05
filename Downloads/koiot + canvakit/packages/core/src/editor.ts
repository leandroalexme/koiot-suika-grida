import {
  EventEmitter,
  genUuid,
  sceneCoordsToViewportUtil,
  viewportCoordsToSceneUtil,
} from '@suika/common';
import { mergeBoxes } from '@suika/geo';

import { CanvasDragger } from './canvas_dragger';
import { ClipboardManager } from './clipboard';
import { CommandManager } from './commands/command_manager';
import { ControlHandleManager } from './control_handle_manager';
import { CursorManger, type ICursor } from './cursor_manager';
import { type GraphicsAttrs } from './graphics';
import { SuikaCanvas } from './graphics/canvas';
import { SuikaDocument } from './graphics/document';
import { HostEventManager, MouseEventManager } from './host_event_manager';
import { ImgManager } from './Img_manager';
import { KeyBindingManager } from './key_binding_manager';
import { PathEditor } from './path_editor';
import { PerfMonitor } from './perf_monitor';
import { RefLine } from './ref_line';
import Ruler from './ruler';
import { SceneGraph } from './scene/scene_graph';
import { SelectedBox } from './selected_box';
import { SelectedElements } from './selected_elements';
import { Setting, type SettingValue } from './setting';
import { TextEditor } from './text/text_editor';

import { ToolManager } from './tools';
import { type IChanges, type IEditorPaperData } from './type';
import { ViewportManager } from './viewport_manager';
import { ZoomManager } from './zoom_manager';
import { CanvasKitFactory, type IRenderer, type ICanvasKitConfig } from './renderer';

interface IEditorOptions {
  containerElement: HTMLDivElement;
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
  showPerfMonitor?: boolean;
  userPreference?: Partial<SettingValue>;
  canvasKit?: ICanvasKitConfig;
}

interface Events {
  destroy(): void;
}

export class SuikaEditor {
  containerElement: HTMLDivElement;
  canvasElement: HTMLCanvasElement; 
  renderer!: IRenderer; // Novo sistema de renderização (inicializado de forma assíncrona)

  appVersion = 'suika-editor_0.0.2';
  paperId: string;

  private emitter = new EventEmitter<Events>();

  doc: SuikaDocument;
  sceneGraph: SceneGraph;
  controlHandleManager: ControlHandleManager;

  setting: Setting;

  viewportManager: ViewportManager;

  canvasDragger: CanvasDragger;
  toolManager: ToolManager;
  commandManager: CommandManager;
  zoomManager: ZoomManager;
  imgManager: ImgManager;

  cursorManager: CursorManger;
  mouseEventManager: MouseEventManager;
  keybindingManager: KeyBindingManager;
  hostEventManager: HostEventManager;
  clipboard: ClipboardManager;

  selectedElements: SelectedElements;
  selectedBox: SelectedBox;
  ruler: Ruler;
  refLine: RefLine;
  textEditor: TextEditor;

  pathEditor: PathEditor;

  perfMonitor: PerfMonitor;

  constructor(options: IEditorOptions) {
    this.containerElement = options.containerElement;
    this.canvasElement = document.createElement('canvas');
    this.containerElement.appendChild(this.canvasElement);
    
    // 🚀 CANVASKIT PURO: Inicializar renderer CanvasKit apenas
    console.log('🚀 SuikaEditor: Inicializando com CanvasKit puro');
    console.log('🎯 Config CanvasKit:', options.canvasKit);
    
    // Inicializar renderer CanvasKit de forma assíncrona
    this.initializeCanvasKitRenderer(options.canvasKit);

    this.setting = new Setting(options.userPreference);
    if (options.offsetX) {
      this.setting.set('offsetX', options.offsetX);
    }
    if (options.offsetY) {
      this.setting.set('offsetY', options.offsetY);
    }

    this.mouseEventManager = new MouseEventManager(this);
    this.keybindingManager = new KeyBindingManager(this);
    this.keybindingManager.bindEvent();

    this.doc = new SuikaDocument({
      id: '0-0',
      objectName: 'Document',
      width: 0,
      height: 0,
    });
    this.doc.setEditor(this);

    this.sceneGraph = new SceneGraph(this);

    this.cursorManager = new CursorManger(this);
    this.viewportManager = new ViewportManager(this);

    this.commandManager = new CommandManager(this);
    this.zoomManager = new ZoomManager(this);
    this.imgManager = new ImgManager();

    this.selectedElements = new SelectedElements(this);
    this.selectedBox = new SelectedBox(this);
    this.ruler = new Ruler(this);
    this.refLine = new RefLine(this);

    this.controlHandleManager = new ControlHandleManager(this);
    this.controlHandleManager.bindEvents();

    this.textEditor = new TextEditor(this);

    this.pathEditor = new PathEditor(this);

    this.hostEventManager = new HostEventManager(this);
    this.hostEventManager.bindHotkeys();

    this.canvasDragger = new CanvasDragger(this);
    this.toolManager = new ToolManager(this);

    this.clipboard = new ClipboardManager(this);
    this.clipboard.bindEvents();

    this.imgManager.on('added', () => {
      this.render();
    });

    this.paperId = genUuid();

    const canvas = new SuikaCanvas(
      {
        objectName: 'Canvas',
        width: 0,
        height: 0,
      },
      {
        doc: this.doc,
      },
    );
    this.sceneGraph.addItems([canvas]);

    this.viewportManager.setViewport({
      x: -options.width / 2,
      y: -options.height / 2,
      width: options.width,
      height: options.height,
    });

    this.perfMonitor = new PerfMonitor();
    if (options.showPerfMonitor) {
      this.perfMonitor.start(this.containerElement);
    }

    /**
     * setViewport 其实会修改 canvas 的宽高，浏览器的 DOM 更新是异步的，
     * 所以下面的 render 要异步执行
     */
    Promise.resolve().then(() => {
      this.render();
    });
  }

  setContents(data: IEditorPaperData) {
    this.sceneGraph.load(data.data);
    this.commandManager.clearRecords();
    this.paperId = data.paperId ?? genUuid();

    if (!this.doc.getCurrCanvas()) {
      const canvas = new SuikaCanvas(
        {
          objectName: 'Canvas',
          width: 0,
          height: 0,
        },
        {
          doc: this.doc,
        },
      );
      this.sceneGraph.addItems([canvas]);
    }

    this.zoomManager.zoomToFit(1);
  }

  destroy() {
    this.containerElement.removeChild(this.canvasElement);
    this.textEditor.destroy();
    this.keybindingManager.destroy();
    this.hostEventManager.destroy();
    this.clipboard.destroy();
    this.canvasDragger.destroy();
    this.toolManager.unbindEvent();
    this.toolManager.destroy();
    this.perfMonitor.destroy();
    this.controlHandleManager.unbindEvents();
    this.emitter.emit('destroy');
  }
  setCursor(cursor: ICursor) {
    this.cursorManager.setCursor(cursor);
  }
  getCursor() {
    return this.cursorManager.getCursor();
  }
  /**
   * viewport coords to scene coords
   *
   * reference: https://mp.weixin.qq.com/s/uvVXZKIMn1bjVZvUSyYZXA
   */
  toScenePt(x: number, y: number, round = false) {
    const zoom = this.zoomManager.getZoom();
    const { x: scrollX, y: scrollY } = this.viewportManager.getViewport();
    return viewportCoordsToSceneUtil(x, y, zoom, scrollX, scrollY, round);
  }
  toViewportPt(x: number, y: number) {
    const zoom = this.zoomManager.getZoom();
    const { x: scrollX, y: scrollY } = this.viewportManager.getViewport();
    return sceneCoordsToViewportUtil(x, y, zoom, scrollX, scrollY);
  }
  toSceneSize(size: number) {
    const zoom = this.zoomManager.getZoom();
    return size / zoom;
  }
  toViewportSize(size: number) {
    const zoom = this.zoomManager.getZoom();
    return size * zoom;
  }
  /** get cursor viewport xy */
  getCursorXY(event: { clientX: number; clientY: number }) {
    return {
      x: event.clientX - this.setting.get('offsetX'),
      y: event.clientY - this.setting.get('offsetY'),
    };
  }
  /** get cursor scene xy */
  getSceneCursorXY(event: { clientX: number; clientY: number }, round = false) {
    const { x, y } = this.getCursorXY(event);
    return this.toScenePt(x, y, round);
  }
  render() {
    this.sceneGraph.render();
  }

  getCanvasBbox() {
    const canvasGraphics = this.doc.getCurrCanvas();
    const children = canvasGraphics
      .getChildren()
      .filter((item) => item.isVisible());
    if (children.length === 0) return null;
    return mergeBoxes(children.map((item) => item.getBbox()));
  }

  applyChanges(changes: IChanges) {
    const addedGraphicsArr: GraphicsAttrs[] = [];
    for (const [, attrs] of changes.added) {
      addedGraphicsArr.push(attrs);
    }
    this.sceneGraph.load(addedGraphicsArr, true);

    for (const [id, partialAttrs] of changes.update) {
      const graphics = this.doc.getGraphicsById(id);
      if (!graphics) {
        console.warn(`graphics ${id} is not exist`);
        continue;
      }
      graphics.updateAttrs(partialAttrs);
    }

    for (const id of changes.deleted) {
      const graphics = this.doc.getGraphicsById(id);
      if (!graphics) {
        console.warn(`graphics ${id} is not exist`);
        continue;
      }
      graphics.setDeleted(true);
      graphics.removeFromParent();
    }
  }

  /**
   * Inicializa o renderer CanvasKit nativo
   * Sem fallbacks - apenas CanvasKit para máxima performance
   */
  private async initializeCanvasKitRenderer(config?: ICanvasKitConfig): Promise<void> {
    console.log('🚀 initializeCanvasKitRenderer: Iniciando...');
    console.log('🎯 Config:', config);
    
    try {
      // Criar renderer CanvasKit nativo
      this.renderer = await CanvasKitFactory.createCanvasKitRenderer(this.canvasElement, config);
      
      console.log('🎉 CanvasKit renderer ativo:', this.renderer.constructor.name);
      
      // Testar operações básicas
      this.testCanvasKitRenderer();
      
      // Inicializar otimizações específicas
      this.setupCanvasKitOptimizations();
      
    } catch (error) {
      console.error('❌ ERRO CRÍTICO: CanvasKit falhou:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Suika Editor requer CanvasKit: ${errorMessage}`);
    }
  }

  /**
   * Teste específico do CanvasKit renderer
   */
  private testCanvasKitRenderer(): void {
    if (!this.renderer) return;
    
    try {
      console.log('🧪 Testando CanvasKit renderer...');
      
      // Teste de background clear
      this.renderer.clearBackground('#f0f0f0', this.canvasElement.width, this.canvasElement.height);
      
      // Teste de desenho básico
      this.renderer.fillStyle = 'rgba(0, 128, 255, 0.2)';
      this.renderer.fillRect(10, 10, 30, 20);
      
      // Teste de stroke
      this.renderer.strokeStyle = '#007acc';
      this.renderer.lineWidth = 2;
      this.renderer.strokeRect(10, 10, 30, 20);
      
      // Flush CanvasKit
      this.renderer.flush();
      
      console.log('✅ CanvasKit renderer funcionando perfeitamente');
    } catch (error) {
      console.error('❌ Teste CanvasKit renderer falhou:', error);
    }
  }

  /**
   * Configura otimizações específicas do CanvasKit
   */
  private setupCanvasKitOptimizations(): void {
    console.log('⚡ Configurando otimizações CanvasKit...');
    
    // Configurar viewport transform otimizado
    if (this.renderer.setViewportTransform) {
      const dpr = window.devicePixelRatio || 1;
      this.renderer.setViewportTransform(dpr, 1, 0, 0);
    }
    
    console.log('✅ Otimizações CanvasKit configuradas');
  }

  // Removido: testRendererBasics - use testCanvasKitRenderer() em vez disso

  on<T extends keyof Events>(eventName: T, listener: Events[T]) {
    this.emitter.on(eventName, listener);
  }
  off<T extends keyof Events>(eventName: T, listener: Events[T]) {
    this.emitter.off(eventName, listener);
  }
}
