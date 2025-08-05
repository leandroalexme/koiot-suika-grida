import { EventEmitter } from '../utils/common';
import { ITool, IToolEvent } from './types';
import { HostEventManager } from '../managers/host-event-manager';

interface ToolManagerEvents {
  toolChange: (tool: ITool | null) => void;
}

export class ToolManager {
  private eventEmitter = new EventEmitter<ToolManagerEvents>();
  private tools = new Map<string, ITool>();
  private activeTool: ITool | null = null;
  private _isDragging = false;

  constructor(private canvas: HTMLCanvasElement, private hostEventManager: HostEventManager) {
    this.bindEvents();
  }

  registerTool(tool: ITool): void {
    this.tools.set(tool.name, tool);
  }

  setActiveTool(toolName: string): void {
    const tool = this.tools.get(toolName);
    
    if (tool && tool !== this.activeTool) {
      // Cancel current tool if active
      if (this.activeTool) {
        this.activeTool.onCancel?.();
      }
      
      this.activeTool = tool;
      this.canvas.style.cursor = tool.cursor;
      this.eventEmitter.emit('toolChange', tool);
    }
  }

  getActiveTool(): ITool | null {
    return this.activeTool;
  }

  private bindEvents(): void {
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    this.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.canvas.addEventListener('pointerup', this.handlePointerUp);
    this.canvas.addEventListener('pointercancel', this.handlePointerCancel);
  }

  private handlePointerDown = (event: PointerEvent): void => {
    if (!this.activeTool) return;
    
    // 🚨 CRÍTICO: Bloquear tools quando spacebar está pressionado (como Suika)
    if (event.button !== 0 || this.hostEventManager.isSpacePressing) {
      return;
    }
    
    event.preventDefault();
    this.canvas.setPointerCapture(event.pointerId);
    this._isDragging = true;

    const toolEvent = this.convertEvent(event);
    this.activeTool.onStart?.(toolEvent);
  };

  private handlePointerMove = (event: PointerEvent): void => {
    if (!this.activeTool) return;

    event.preventDefault();
    const toolEvent = this.convertEvent(event);
    
    if (this._isDragging) {
      this.activeTool.onMove?.(toolEvent);
    }
  };

  private handlePointerUp = (event: PointerEvent): void => {
    if (!this.activeTool) return;
    
    event.preventDefault();
    this.canvas.releasePointerCapture(event.pointerId);
    this._isDragging = false;

    const toolEvent = this.convertEvent(event);
    this.activeTool.onEnd?.(toolEvent);
  };

  private handlePointerCancel = (event: PointerEvent): void => {
    if (!this.activeTool) return;

    this.canvas.releasePointerCapture(event.pointerId);
    this._isDragging = false;
    this.activeTool.onCancel?.();
  };

  private convertEvent(event: PointerEvent): IToolEvent {
    const rect = this.canvas.getBoundingClientRect();
    return {
      clientX: event.clientX - rect.left,
      clientY: event.clientY - rect.top,
      button: event.button,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      altKey: event.altKey
    };
  }

  isDragging(): boolean {
    return this._isDragging;
  }

  destroy(): void {
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerup', this.handlePointerUp);
    this.canvas.removeEventListener('pointercancel', this.handlePointerCancel);
  }

  on<K extends keyof ToolManagerEvents>(event: K, handler: ToolManagerEvents[K]): void {
    this.eventEmitter.on(event, handler);
  }

  off<K extends keyof ToolManagerEvents>(event: K, handler: ToolManagerEvents[K]): void {
    this.eventEmitter.off(event, handler);
  }
}