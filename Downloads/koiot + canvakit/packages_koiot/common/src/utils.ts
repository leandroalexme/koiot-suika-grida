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
 * Check if point is inside rectangle
 */
export function isPointInRect(x: number, y: number, rect: { x: number; y: number; width: number; height: number }): boolean {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
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

/**
 * No operation function
 */
export function noop(): void {
  // Do nothing
}

/**
 * Create an ID generator that increases incrementally
 */
export function increaseIdGenerator() {
  let id = 0;
  return () => (++id).toString();
}