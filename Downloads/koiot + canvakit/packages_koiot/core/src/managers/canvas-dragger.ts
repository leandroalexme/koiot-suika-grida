import { EventEmitter } from '../utils';
import { ViewportManager } from './viewport-manager';
import { ZoomManager } from './zoom-manager';
import { HostEventManager } from './host-event-manager';

interface CanvasDraggerEvents {
  activeChange: (active: boolean) => void;
}

/**
 * 🎯 Canvas Dragger - Baseado exatamente no Suika CanvasDragger
 * Sistema independente de drag do canvas (não é um tool)
 */
export class CanvasDragger {
  private eventEmitter = new EventEmitter<CanvasDraggerEvents>();
  
  private _active = false;
  private _isPressing = false;
  private isEnableDragCanvasBySpace = true;
  
  // Posições para cálculo do drag
  private startVwPos = { x: 0, y: 0 };
  private startViewportPos = { x: 0, y: 0 };

  constructor(
    private canvas: HTMLCanvasElement,
    private viewportManager: ViewportManager,
    private zoomManager: ZoomManager,
    private hostEventManager: HostEventManager
  ) {
    this.bindHostEvents();
    this.bindMouseEvents();
  }

  private bindHostEvents(): void {
    // 🎯 Spacebar toggle (exatamente como Suika)
    this.hostEventManager.on('spaceToggle', (isSpacePressing: boolean) => {
      if (!this.isEnableDragCanvasBySpace) return;
      
      if (isSpacePressing) {
        this.active();
      } else {
        this.inactive();
      }
    });

    // 🎯 Middle button toggle (exatamente como Suika)
    this.hostEventManager.on('wheelBtnToggle', (isPressing: boolean, event: PointerEvent) => {
      if (!this.isEnableDragCanvasBySpace) return;
      
      if (isPressing) {
        this.active(event);
      } else {
        this.inactive();
      }
    });
  }

  private bindMouseEvents(): void {
    // 🎯 Mouse events para drag (como no Suika MouseEventManager)
    const onStart = (event: PointerEvent) => {
      if (!this._active || event.target !== this.canvas) return;
      if (event.button !== 0 && event.button !== 1) return; // Apenas left e middle
      
      this._isPressing = true;
      
      // 🚀 Salvar posições iniciais (viewport coordinates)
      const rect = this.canvas.getBoundingClientRect();
      this.startVwPos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      this.startViewportPos = this.viewportManager.getViewport();
      
      // 🎯 Cursor feedback
      this.canvas.style.cursor = 'grabbing';
      event.preventDefault();
    };

    const onDrag = (event: PointerEvent) => {
      if (!this._isPressing) return;
      
      // 🚀 Calcular delta (exatamente como Suika)
      const rect = this.canvas.getBoundingClientRect();
      const currentVwPos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      
      const dx = currentVwPos.x - this.startVwPos.x;
      const dy = currentVwPos.y - this.startVwPos.y;
      
      const zoom = this.zoomManager.getZoom();
      
      // 🎯 Update viewport (lógica idêntica ao Suika)
      const viewportX = this.startViewportPos.x - dx / zoom;
      const viewportY = this.startViewportPos.y - dy / zoom;
      
      this.viewportManager.setViewport({ 
        x: viewportX, 
        y: viewportY 
      });
      
      event.preventDefault();
    };

    const onEnd = () => {
      if (this._isPressing) {
        this._isPressing = false;
        this.canvas.style.cursor = this._active ? 'grab' : 'default';
      }
    };

    // 🎯 Bind mouse events
    this.canvas.addEventListener('pointerdown', onStart);
    window.addEventListener('pointermove', onDrag);
    window.addEventListener('pointerup', onEnd);
  }

  // 🎯 Public API (igual ao Suika)
  isActive(): boolean {
    return this._active;
  }

  isPressing(): boolean {
    return this._isPressing;
  }

  active(event?: PointerEvent): void {
    if (this._active) return;
    
    this._active = true;
    this.canvas.style.cursor = 'grab';
    this.eventEmitter.emit('activeChange', true);
  }

  inactive(): void {
    if (!this._active) return;
    
    this._active = false;
    this._isPressing = false;
    this.canvas.style.cursor = 'default';
    this.eventEmitter.emit('activeChange', false);
  }

  enableDragBySpace(): void {
    this.isEnableDragCanvasBySpace = true;
  }

  disableDragBySpace(): void {
    this.isEnableDragCanvasBySpace = false;
  }

  on<K extends keyof CanvasDraggerEvents>(event: K, handler: CanvasDraggerEvents[K]): void {
    this.eventEmitter.on(event, handler);
  }

  off<K extends keyof CanvasDraggerEvents>(event: K, handler: CanvasDraggerEvents[K]): void {
    this.eventEmitter.off(event, handler);
  }
}