import { EventEmitter } from '../utils';

interface HostEvents {
  spaceToggle: (isSpacePressing: boolean) => void;
  wheelBtnToggle: (isPressing: boolean, event: PointerEvent) => void;
}

/**
 * 🎯 Host Event Manager - Baseado no Suika
 * Monitora teclas e eventos de mouse de forma independente
 */
export class HostEventManager {
  private eventEmitter = new EventEmitter<HostEvents>();
  
  // Estados das teclas/botões
  isSpacePressing = false;
  isWheelBtnPressing = false;
  
  private unbindHandlers: Array<() => void> = [];

  constructor(private canvas: HTMLCanvasElement) {
    this.bindEvents();
  }

  private bindEvents(): void {
    // 🎯 Monitor spacebar (como no Suika)
    const handleKeyEvent = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        const prevSpace = this.isSpacePressing;
        this.isSpacePressing = event.type === 'keydown';
        
        // 🚀 Emit spaceToggle apenas quando estado muda
        if (prevSpace !== this.isSpacePressing) {
          this.eventEmitter.emit('spaceToggle', this.isSpacePressing);
          event.preventDefault();
        }
      }
    };

    // 🎯 Monitor botão do meio (como no Suika)
    const handlePointerEvent = (event: PointerEvent) => {
      if (event.target !== this.canvas) return;
      
      if (event.button === 1) { // Middle button
        const prevWheel = this.isWheelBtnPressing;
        this.isWheelBtnPressing = event.type === 'pointerdown';
        
        // 🚀 Emit wheelBtnToggle apenas quando estado muda
        if (prevWheel !== this.isWheelBtnPressing) {
          this.eventEmitter.emit('wheelBtnToggle', this.isWheelBtnPressing, event);
          event.preventDefault();
        }
      }
    };

    // 🎯 Bind eventos
    document.addEventListener('keydown', handleKeyEvent);
    document.addEventListener('keyup', handleKeyEvent);
    this.canvas.addEventListener('pointerdown', handlePointerEvent);
    this.canvas.addEventListener('pointerup', handlePointerEvent);

    // 🎯 Cleanup handlers
    this.unbindHandlers.push(() => {
      document.removeEventListener('keydown', handleKeyEvent);
      document.removeEventListener('keyup', handleKeyEvent);
      this.canvas.removeEventListener('pointerdown', handlePointerEvent);
      this.canvas.removeEventListener('pointerup', handlePointerEvent);
    });
  }

  on<K extends keyof HostEvents>(event: K, handler: HostEvents[K]): void {
    this.eventEmitter.on(event, handler);
  }

  off<K extends keyof HostEvents>(event: K, handler: HostEvents[K]): void {
    this.eventEmitter.off(event, handler);
  }

  destroy(): void {
    this.unbindHandlers.forEach(unbind => unbind());
    this.unbindHandlers = [];
  }
}