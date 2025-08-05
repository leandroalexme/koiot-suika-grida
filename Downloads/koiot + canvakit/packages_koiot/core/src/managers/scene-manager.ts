import { EventEmitter, IPoint, rafThrottle } from '../utils/common';
import { IGraphics, IDrawInfo } from '../graphics/types';
import { IRenderer } from '../renderer/types';

interface SceneEvents {
  change: () => void;
}

export class SceneManager {
  private eventEmitter = new EventEmitter<SceneEvents>();
  private graphics: IGraphics[] = [];
  
  // Throttled render method
  private render = rafThrottle(() => this.performRender());
  private renderer: IRenderer | null = null;

  setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  addGraphics(graphics: IGraphics): void {
    this.graphics.push(graphics);
    
    // Configurar referência do scene manager para parent-child lookups
    if (graphics.setSceneManager) {
      graphics.setSceneManager(this);
    }
    
    this.eventEmitter.emit('change');
    this.requestRender();
  }

  removeGraphics(graphics: IGraphics): void {
    const index = this.graphics.indexOf(graphics);
    if (index !== -1) {
      this.graphics.splice(index, 1);
      this.eventEmitter.emit('change');
      this.requestRender();
    }
  }

  getAllGraphics(): IGraphics[] {
    return [...this.graphics];
  }

  getGraphicsById(id: string): IGraphics | null {
    return this.graphics.find(graphics => graphics.id === id) || null;
  }

  /**
   * Sort graphics by zIndex for proper rendering order
   */
  sortGraphicsByZIndex(): void {
    this.graphics.sort((a, b) => {
      const aIndex = a.attrs.zIndex || 0;
      const bIndex = b.attrs.zIndex || 0;
      return aIndex - bIndex;
    });
    this.eventEmitter.emit('change');
  }

  findGraphicsAt(point: IPoint): IGraphics | null {
    // Create sorted copy by zIndex (highest first for hit testing)
    const sortedGraphics = [...this.graphics].sort((a, b) => {
      const aIndex = a.attrs.zIndex || 0;
      const bIndex = b.attrs.zIndex || 0;
      return bIndex - aIndex; // Reverse order (highest zIndex first)
    });
    
    // Search from top to bottom (highest zIndex first)
    for (const graphics of sortedGraphics) {
      if (graphics.isVisible() && !graphics.isDeleted() && graphics.hitTest(point)) {
        return graphics;
      }
    }
    return null;
  }

  clear(): void {
    this.graphics = [];
    this.eventEmitter.emit('change');
    this.requestRender();
  }

  requestRender(): void {
    this.render();
  }

  private performRender(): void {
    if (!this.renderer) {
      console.warn('SceneManager: No renderer available');
      return;
    }

    // Note: This method is now bypassed by the editor's direct rendering
    // but keeping it for potential future use
  }

  on<K extends keyof SceneEvents>(event: K, handler: SceneEvents[K]): void {
    this.eventEmitter.on(event, handler);
  }

  off<K extends keyof SceneEvents>(event: K, handler: SceneEvents[K]): void {
    this.eventEmitter.off(event, handler);
  }
}