// Copy of common utilities to avoid import issues during development

type EventListener = (...args: any[]) => void;

export class EventEmitter<Events = Record<string, any>> {
  private listeners: Map<keyof Events, Set<EventListener>> = new Map();

  on<K extends keyof Events>(event: K, listener: Events[K]): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener as EventListener);
  }

  off<K extends keyof Events>(event: K, listener: Events[K]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(listener as EventListener);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  emit<K extends keyof Events>(event: K, ...args: any[]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => {
        try {
          listener(...args);
        } catch (error) {
          console.error(`Error in event listener for "${String(event)}":`, error);
        }
      });
    }
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ISize {
  width: number;
  height: number;
}

export type IMatrixArr = [number, number, number, number, number, number];

/**
 * Generate unique identifier
 */
export function genUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get device pixel ratio for high DPI displays
 */
export function getDevicePixelRatio(): number {
  return window.devicePixelRatio || 1;
}

/**
 * Throttle function using requestAnimationFrame
 */
export function rafThrottle<T extends (...args: any[]) => any>(fn: T): T {
  let rafId: number | null = null;
  let lastArgs: Parameters<T>;

  return ((...args: Parameters<T>) => {
    lastArgs = args;
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        fn(...lastArgs);
        rafId = null;
      });
    }
  }) as T;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Convert scene coordinates to viewport coordinates
 */
export function sceneToViewport(
  sceneX: number,
  sceneY: number,
  zoom: number,
  viewportX: number,
  viewportY: number
): { x: number; y: number } {
  return {
    x: (sceneX - viewportX) * zoom,
    y: (sceneY - viewportY) * zoom
  };
}

/**
 * Convert viewport coordinates to scene coordinates
 */
export function viewportToScene(
  viewportX: number,
  viewportY: number,
  zoom: number,
  sceneOffsetX: number,
  sceneOffsetY: number
): { x: number; y: number } {
  return {
    x: viewportX / zoom + sceneOffsetX,
    y: viewportY / zoom + sceneOffsetY
  };
}