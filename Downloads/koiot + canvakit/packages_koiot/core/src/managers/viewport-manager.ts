import { EventEmitter, getDevicePixelRatio, IRect } from '../utils/common';

interface ViewportEvents {
  change: (viewport: IRect) => void;
}

export class ViewportManager {
  private eventEmitter = new EventEmitter<ViewportEvents>();
  private viewport: IRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };

  constructor(private canvasElement: HTMLCanvasElement) {
    this.updateSize();
  }

  getViewport(): IRect {
    return { ...this.viewport };
  }

  setViewport(updates: Partial<IRect>): void {
    const prevViewport = { ...this.viewport };
    
    if (updates.x !== undefined) this.viewport.x = updates.x;
    if (updates.y !== undefined) this.viewport.y = updates.y;
    if (updates.width !== undefined) {
      this.viewport.width = updates.width;
      this.updateCanvasSize();
    }
    if (updates.height !== undefined) {
      this.viewport.height = updates.height;
      this.updateCanvasSize();
    }

    this.eventEmitter.emit('change', this.viewport);
  }

  translate(dx: number, dy: number): void {
    this.setViewport({
      x: this.viewport.x + dx,
      y: this.viewport.y + dy
    });
  }

  updateSize(): void {
    const rect = this.canvasElement.getBoundingClientRect();
    this.setViewport({
      width: rect.width,
      height: rect.height
    });
  }

  private updateCanvasSize(): void {
    const dpr = getDevicePixelRatio();
    this.canvasElement.width = this.viewport.width * dpr;
    this.canvasElement.height = this.viewport.height * dpr;
    this.canvasElement.style.width = this.viewport.width + 'px';
    this.canvasElement.style.height = this.viewport.height + 'px';
  }

  getCenter(): { x: number; y: number } {
    return {
      x: this.viewport.x + this.viewport.width / 2,
      y: this.viewport.y + this.viewport.height / 2
    };
  }

  /**
   * Convert scene coordinates to viewport coordinates
   */
  sceneToViewport(scenePoint: { x: number; y: number }): { x: number; y: number } {
    return {
      x: scenePoint.x - this.viewport.x,
      y: scenePoint.y - this.viewport.y
    };
  }

  /**
   * Convert viewport coordinates to scene coordinates
   */
  viewportToScene(viewportPoint: { x: number; y: number }): { x: number; y: number } {
    return {
      x: viewportPoint.x + this.viewport.x,
      y: viewportPoint.y + this.viewport.y
    };
  }

  on<K extends keyof ViewportEvents>(event: K, handler: ViewportEvents[K]): void {
    this.eventEmitter.on(event, handler);
  }

  off<K extends keyof ViewportEvents>(event: K, handler: ViewportEvents[K]): void {
    this.eventEmitter.off(event, handler);
  }
}