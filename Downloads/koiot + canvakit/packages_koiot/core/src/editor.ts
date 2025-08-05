import { EventEmitter, getDevicePixelRatio, rafThrottle, viewportToScene, sceneToViewport, IRect } from './utils';
import { CanvasKitFactory, CanvasKitRenderer, CanvasKitConfig, Canvas2DRenderer, IRenderer } from './renderer';
import { ViewportManager, ZoomManager, SelectionManager, SceneManager, HostEventManager, CanvasDragger, SelectedBoxManager, ControlHandleManager } from './managers';
import { ToolManager, SelectTool } from './tools';
import { Rectangle } from './graphics';
import { KeyBindingManager } from './key_binding_manager';
import { ClipboardManager } from './clipboard';
import { CommandManager } from './commands/command-manager';
import { CommandKeyBinding } from './host-event-manager/command_key_binding';
import { EditorSettingsManager } from './settings/editor-settings'; // 🎯 NOVO: Editor settings

export interface KoiotEditorOptions {
  container: HTMLElement;
  canvasKitConfig?: CanvasKitConfig;
}

interface EditorEvents {
  ready: () => void;
  destroy: () => void;
}

export class KoiotEditor {
  private eventEmitter = new EventEmitter<EditorEvents>();
  private isInitialized = false;
  
  // Core elements
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private renderer: IRenderer | null = null;
  
  // Managers
  private viewportManager: ViewportManager;
  private zoomManager: ZoomManager;
  private selectionManager: SelectionManager;
  private sceneManager: SceneManager;
  private hostEventManager: HostEventManager;
  private canvasDragger: CanvasDragger;
  private selectedBoxManager: SelectedBoxManager;
  private controlHandleManager: ControlHandleManager;
  toolManager: ToolManager;
  private selectTool: SelectTool;
  
  // Key binding manager
  keybindingManager: KeyBindingManager;
  
  // Clipboard manager
  clipboard: ClipboardManager;
  
  // Command manager
  commandManager: CommandManager;
  
  // Command key binding
  private commandKeyBinding: CommandKeyBinding;
  
  // 🎯 NOVO: Editor settings manager
  public settingsManager: EditorSettingsManager;
  
  // Selection box for area selection
  private selectionBox: IRect | null = null;

  constructor(options: KoiotEditorOptions) {
    this.container = options.container;
    this.canvas = this.createCanvas();
    
    // 🎯 NOVO: Initialize settings manager first
    this.settingsManager = new EditorSettingsManager();
    
    // Initialize managers (seguindo arquitetura Suika)
    this.viewportManager = new ViewportManager(this.canvas);
    this.zoomManager = new ZoomManager(this.viewportManager);
    this.selectionManager = new SelectionManager();
    this.sceneManager = new SceneManager();
    this.hostEventManager = new HostEventManager(this.canvas);
    this.keybindingManager = new KeyBindingManager(this);
    this.keybindingManager.bindEvent();
    this.clipboard = new ClipboardManager(this);
    this.clipboard.bindEvents();
    this.commandManager = new CommandManager(this);
    this.commandKeyBinding = new CommandKeyBinding(this);
    this.commandKeyBinding.bindKey();
    this.canvasDragger = new CanvasDragger(this.canvas, this.viewportManager, this.zoomManager, this.hostEventManager);
    
    // Initialize canvas-based control handle system following Suika architecture
    this.selectedBoxManager = new SelectedBoxManager(this.selectionManager);
    this.controlHandleManager = new ControlHandleManager(
      this.selectionManager,
      this.viewportManager, 
      this.zoomManager,
      this.selectedBoxManager  // 🎯 Pass SelectedBoxManager for consistent bounds
    );
    
    this.toolManager = new ToolManager(this.canvas, this.hostEventManager);
    
    // Initialize tools
    this.selectTool = new SelectTool({
      sceneManager: this.sceneManager,
      selectionManager: this.selectionManager,
      viewportManager: this.viewportManager,
      zoomManager: this.zoomManager,
      requestRender: () => this.render(),
      toScenePt: (x: number, y: number) => this.toScenePt(x, y),
      getCursorXY: (event) => this.getCursorXY(event),
      getSceneCursorXY: (event) => this.getSceneCursorXY(event),
      setSelectionBox: (rect: IRect | null) => this.setSelectionBox(rect),
      clearSelectionBox: () => this.clearSelectionBox(),
      selectedBoxManager: () => this.selectedBoxManager,
      controlHandleManager: () => this.controlHandleManager
    });
    
    // 🎯 Sem PanTool - CanvasDragger é independente!
    
    this.setupTools();
    this.bindEvents();
    this.initializeRenderer(options.canvasKitConfig);
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.id = 'koiot-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    this.container.appendChild(canvas);
    return canvas;
  }

  private setupTools(): void {
    this.toolManager.registerTool(this.selectTool);
    this.toolManager.setActiveTool('select');
  }

  private bindEvents(): void {
    // Handle viewport resize
    const resizeObserver = new ResizeObserver(() => {
      this.viewportManager.updateSize();
      this.render();
    });
    resizeObserver.observe(this.container);

    // Handle zoom with mouse wheel
    this.canvas.addEventListener('wheel', (event) => {
      this.zoomManager.handleWheel(event);
    });

    // 🚀 PAN SYSTEM: CanvasDragger já está configurado e funcionando!

    // DOM handles manage their own cursors automatically!

    // Re-render when managers change
    this.viewportManager.on('change', () => this.render());
    this.zoomManager.on('change', () => this.render());
    this.selectionManager.on('change', () => this.render());
    this.sceneManager.on('change', () => this.render());
    this.selectedBoxManager.on('boundsChange', () => this.render());
    this.selectedBoxManager.on('hoverChange', () => this.render());
    
    // DOM handles update automatically - no render events needed!
  }

  // 🎯 Pan system removido - agora usa CanvasDragger independente como no Suika!

  /**
   * Update cursor based on control handles
   */


  private async initializeRenderer(config?: CanvasKitConfig): Promise<void> {
    try {
      this.renderer = await CanvasKitFactory.createRenderer(this.canvas, config);
    } catch (error) {
      console.warn('CanvasKit failed, falling back to Canvas2D:', error);
      this.renderer = new Canvas2DRenderer(this.canvas);
    }

    if (this.renderer) {
      this.sceneManager.setRenderer(this.renderer);
      
      // Create initial content - a red square
      this.createInitialContent();
      
      this.isInitialized = true;
      this.eventEmitter.emit('ready');
      this.render();
    }
  }

  private createInitialContent(): void {
    // Create multiple squares for testing box selection
    const square1 = new Rectangle({
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: '#ff0000',
      stroke: '#000000',
      strokeWidth: 2,
      zIndex: 0
    });
    
    const square2 = new Rectangle({
      x: 200,
      y: 100,
      width: 80,
      height: 80,
      fill: '#00ff00',
      stroke: '#000000',
      strokeWidth: 2,
      zIndex: 1
    });
    
    const square3 = new Rectangle({
      x: 100,
      y: 200,
      width: 120,
      height: 60,
      fill: '#0000ff',
      stroke: '#000000',
      strokeWidth: 2,
      zIndex: 2
    });
    
    this.sceneManager.addGraphics(square1);
    this.sceneManager.addGraphics(square2);
    this.sceneManager.addGraphics(square3);
  }

  // Throttled render method to prevent infinite loops
  render = rafThrottle(() => {
    if (!this.renderer) {
      return;
    }

    const viewport = this.viewportManager.getViewport();
    const zoom = this.zoomManager.getZoom();
    const dpr = getDevicePixelRatio();

    // Clear canvas
    this.renderer.clearBackground('#ffffff', viewport.width, viewport.height);

    // Apply viewport transform
    this.renderer.save();
    this.renderer.scale(dpr, dpr);
    this.renderer.scale(zoom, zoom);
    this.renderer.translate(-viewport.x, -viewport.y);

    // Draw all graphics in scene coordinates (skip deleted elements)
    const graphics = this.sceneManager.getAllGraphics();
    for (const graphic of graphics) {
      if (graphic.isVisible() && !graphic.isDeleted()) {
        graphic.draw({ renderer: this.renderer });
      }
    }

    this.renderer.restore();

    // Draw UI elements in screen coordinates
    this.renderer.save();
    this.renderer.scale(dpr, dpr);
    
    // Draw selection box (UI coordinate)
    this.drawSelectionBox();
    
    // Draw selection indicators (scene coordinates)
    this.drawSelectionIndicators();
    
    this.renderer.restore();
    
    // DOM handles draw themselves automatically!

    this.renderer.flush();
  });

  private drawSelectionIndicators(): void {
    if (!this.renderer) return;
    
    const selectedItems = this.selectionManager.getSelectedItems();
    if (selectedItems.length === 0) return;

    // Save current state to draw in scene coordinates
    this.renderer.save();
    
    // Apply zoom and viewport transform for drawing in scene coordinates
    const zoom = this.zoomManager.getZoom();
    const viewport = this.viewportManager.getViewport();
    this.renderer.scale(zoom, zoom);
    this.renderer.translate(-viewport.x, -viewport.y);
    
    // Draw selected box (selection bounds) in scene coordinates
    this.selectedBoxManager.draw(this.renderer);
    
    // Draw control handles in SAME coordinate system (scene coordinates) 
    // This ensures handles are aligned with selection box
    this.controlHandleManager.draw({ renderer: this.renderer });
    
    this.renderer.restore();
  }



  // Removed old drawCornerHandles method - now handled by ControlHandleManager

  /**
   * Convert viewport coordinates to scene coordinates
   */
  toScenePt(x: number, y: number): { x: number; y: number } {
    const zoom = this.zoomManager.getZoom();
    const viewport = this.viewportManager.getViewport();
    return viewportToScene(x, y, zoom, viewport.x, viewport.y);
  }

  /**
   * Get cursor viewport coordinates (like Suika's getCursorXY)
   */
  getCursorXY(event: { clientX: number; clientY: number }): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  /**
   * Get cursor scene coordinates (like Suika's getSceneCursorXY)
   */
  getSceneCursorXY(event: { clientX: number; clientY: number }): { x: number; y: number } {
    const { x, y } = this.getCursorXY(event);
    return this.toScenePt(x, y);
  }

  /**
   * Convert scene coordinates to viewport coordinates  
   */
  toViewportPt(x: number, y: number): { x: number; y: number } {
    const zoom = this.zoomManager.getZoom();
    const viewport = this.viewportManager.getViewport();
    return sceneToViewport(x, y, zoom, viewport.x, viewport.y);
  }

  /**
   * Set the selection box for area selection
   */
  setSelectionBox(rect: IRect | null): void {
    this.selectionBox = rect;
  }

  /**
   * Clear the selection box
   */
  clearSelectionBox(): void {
    this.selectionBox = null;
  }

  /**
   * Draw the selection box (like Suika's selection rendering)
   */
  private drawSelectionBox(): void {
    if (!this.renderer || !this.selectionBox) return;

    const { x, y, width, height } = this.selectionBox;

    // Convert scene coordinates to viewport coordinates
    const topLeft = this.toViewportPt(x, y);
    const bottomRight = this.toViewportPt(x + width, y + height);
    
    const screenRect = {
      x: topLeft.x,
      y: topLeft.y,
      width: bottomRight.x - topLeft.x,
      height: bottomRight.y - topLeft.y
    };

    // Draw selection box with stroke and fill (like Suika)
    this.renderer.save();
    
    // Fill with transparent blue
    this.renderer.fillStyle = 'rgba(0, 123, 255, 0.1)';
    this.renderer.fillRect(screenRect.x, screenRect.y, screenRect.width, screenRect.height);
    
    // Stroke with blue
    this.renderer.strokeStyle = '#007fff';
    this.renderer.lineWidth = 1;
    this.renderer.strokeRect(screenRect.x, screenRect.y, screenRect.width, screenRect.height);
    
    this.renderer.restore();
  }

  // Public API
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Get managers for tools to use
   */
  getSelectionManager(): SelectionManager {
    return this.selectionManager;
  }

  getSelectedBoxManager(): SelectedBoxManager {
    return this.selectedBoxManager;
  }

  getControlHandleManager(): ControlHandleManager {
    return this.controlHandleManager;
  }

  getViewportManager(): ViewportManager {
    return this.viewportManager;
  }

  getZoomManager(): ZoomManager {
    return this.zoomManager;
  }

  getSceneManager(): SceneManager {
    return this.sceneManager;
  }

  /**
   * 🎯 DEBUG: Toggle flip setting for testing
   * Pode ser chamado via console: editor.toggleFlip()
   */
  toggleFlip(): void {
    this.settingsManager.toggleFlip();
    console.log('🎯 Flip toggle:', this.settingsManager.isFlipEnabled() ? 'ENABLED' : 'DISABLED');
    console.log('🎯 Para testar:');
    console.log('  - Flip ENABLED: Elemento deve inverter quando redimensionado pelos cantos');
    console.log('  - Flip DISABLED: Elemento NÃO deve inverter, apenas redimensionar');
  }

  /**
   * 🎯 DEBUG: Check flip status
   */
  isFlipEnabled(): boolean {
    return this.settingsManager.isFlipEnabled();
  }

  /**
   * 🎯 DEBUG: Test flip behavior
   * Chame editor.testFlip() para testar diferentes configurações
   */
  testFlip(): void {
    console.log('🎯 TESTE DE FLIP - Estado atual:', {
      flipEnabled: this.settingsManager.isFlipEnabled(),
      selectedElements: this.selectionManager?.getSelectedItems()?.length || 0
    });
    console.log('🎯 INSTRUÇÕES:');
    console.log('1. Selecione um elemento');
    console.log('2. Redimensione pelos cantos (nw, ne, se, sw)');
    console.log('3. Se flip=true: elemento deve INVERTER');
    console.log('4. Se flip=false: elemento NÃO deve inverter');
    console.log('5. Use editor.toggleFlip() para alternar');
  }

  /**
   * 🎯 DEBUG: Test com configuração hardcoded
   */
  debugFlip(enableFlip: boolean = true): void {
    console.log(`🎯 DEBUG FLIP: Setting flip to ${enableFlip}`);
    this.settingsManager.set('flipObjectsWhileResizing', enableFlip);
    
    console.log('🎯 Current configuration:', {
      flipEnabled: this.settingsManager.isFlipEnabled(),
      settingValue: this.settingsManager.get('flipObjectsWhileResizing')
    });
    
    console.log('🎯 ATENÇÃO: Os tools estão usando flip=true HARDCODED para teste!');
    console.log('🎯 Para testar flip=false, seria necessário alterar o código temporariamente.');
  }

  destroy(): void {
    this.toolManager.destroy();
    this.selectedBoxManager.destroy();
    this.controlHandleManager.destroy();
    this.keybindingManager.destroy();
    this.clipboard.destroy();
    this.commandKeyBinding.destroy();
    if (this.renderer && this.renderer.destroy) {
      this.renderer.destroy();
    }
    this.canvas.remove();
    this.eventEmitter.emit('destroy');
  }

  on<K extends keyof EditorEvents>(event: K, handler: EditorEvents[K]): void {
    this.eventEmitter.on(event, handler);
  }

  off<K extends keyof EditorEvents>(event: K, handler: EditorEvents[K]): void {
    this.eventEmitter.off(event, handler);
  }
}