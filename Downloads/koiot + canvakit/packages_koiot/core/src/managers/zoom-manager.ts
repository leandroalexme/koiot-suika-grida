import { EventEmitter, clamp, viewportToScene } from '../utils/common';


interface ZoomEvents {
  change: (zoom: number, prevZoom: number) => void;
}

export class ZoomManager {
  private eventEmitter = new EventEmitter<ZoomEvents>();
  private zoom = 1;
  private minZoom = 0.1;
  private maxZoom = 10;

  constructor(private viewportManager: any) {}

  getZoom(): number {
    return this.zoom;
  }

  setZoom(newZoom: number, center?: { x: number; y: number }): void {
    const prevZoom = this.zoom;
    const clampedZoom = clamp(newZoom, this.minZoom, this.maxZoom);
    
    if (clampedZoom === this.zoom) {
      return;
    }

    this.zoom = clampedZoom;

    // Adjust viewport to zoom around center point
    if (center) {
      this.adjustViewportForZoom(prevZoom, center);
    }

    this.eventEmitter.emit('change', this.zoom, prevZoom);
  }

  zoomIn(center?: { x: number; y: number }): void {
    this.setZoom(this.zoom * 1.2, center);
  }

  zoomOut(center?: { x: number; y: number }): void {
    this.setZoom(this.zoom / 1.2, center);
  }

  resetZoom(): void {
    this.setZoom(1);
    const viewport = this.viewportManager.getViewport();
    this.viewportManager.setViewport({
      x: -viewport.width / 2,
      y: -viewport.height / 2
    });
  }

  handleWheel(event: WheelEvent): void {
    event.preventDefault();
    
    const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
    const center = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    if (event.deltaY < 0) {
      this.zoomIn(center);
    } else {
      this.zoomOut(center);
    }
  }

  private adjustViewportForZoom(prevZoom: number, center: { x: number; y: number }): void {
    const viewport = this.viewportManager.getViewport();
    
    // Convert center to scene coordinates
    const scenePoint = viewportToScene(
      center.x,
      center.y,
      prevZoom,
      viewport.x,
      viewport.y
    );

    // Calculate new viewport position to keep the same scene point under the cursor
    const newX = scenePoint.x - center.x / this.zoom;
    const newY = scenePoint.y - center.y / this.zoom;

    this.viewportManager.setViewport({
      x: newX,
      y: newY
    });
  }

  on<K extends keyof ZoomEvents>(event: K, handler: ZoomEvents[K]): void {
    this.eventEmitter.on(event, handler);
  }

  off<K extends keyof ZoomEvents>(event: K, handler: ZoomEvents[K]): void {
    this.eventEmitter.off(event, handler);
  }
}