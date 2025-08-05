import type { CanvasKit as CanvasKitAPI, Canvas, Surface, Paint, Path } from 'canvaskit-wasm';
import { IRenderer } from './types';

export interface CanvasKitConfig {
  locateFile?: (file: string) => string;
}

/**
 * CanvasKit renderer implementation
 * Provides hardware-accelerated rendering using Skia
 */
export class CanvasKitRenderer implements IRenderer {
  private surface: Surface;
  private canvas: Canvas;
  private fillPaint: Paint;
  private strokePaint: Paint;
  private canvasKit: CanvasKitAPI;
  
  // State properties
  private _fillStyle: string = '#000000';
  private _strokeStyle: string = '#000000';
  private _globalAlpha: number = 1.0;
  private _lineWidth: number = 1.0;
  
  // Current path for path operations
  private currentPath: Path | null = null;
  
  // State stack for save/restore
  private stateStack: Array<{
    fillStyle: string;
    strokeStyle: string;
    globalAlpha: number;
    lineWidth: number;
  }> = [];

  // 🎯 OTIMIZAÇÃO: Cache de cores para evitar recomputação
  private colorCache = new Map<string, Float32Array>();
  
  // 🎯 OTIMIZAÇÃO: Pool de objetos reutilizáveis
  private rectPool: Float32Array[] = [];
  private rectPoolIndex = 0;

  constructor(canvasKit: CanvasKitAPI, surface: Surface) {
    this.canvasKit = canvasKit;
    this.surface = surface;
    this.canvas = surface.getCanvas();
    
    // Create paints
    this.fillPaint = new canvasKit.Paint();
    this.fillPaint.setStyle(canvasKit.PaintStyle.Fill);
    this.fillPaint.setAntiAlias(true);
    
    this.strokePaint = new canvasKit.Paint();
    this.strokePaint.setStyle(canvasKit.PaintStyle.Stroke);
    this.strokePaint.setAntiAlias(true);
    
    // Apply initial settings
    this.updateFillColor();
    this.updateStrokeColor();
    this.updateStrokeWidth();
  }

  // Helper methods
  private parseColor(color: string): Float32Array {
    // 🎯 OTIMIZAÇÃO: Verificar cache primeiro
    const cacheKey = `${color}_${this._globalAlpha}`;
    const cached = this.colorCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    let result: Float32Array;

    // Handle hex colors (#rrggbb)
    if (color.startsWith('#') && color.length === 7) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      const a = this._globalAlpha;
      return this.canvasKit.Color4f(r, g, b, a);
    }
    
    // Handle rgba colors (rgba(r, g, b, a))
    if (color.startsWith('rgba(')) {
      const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1], 10) / 255;
        const g = parseInt(rgbaMatch[2], 10) / 255;
        const b = parseInt(rgbaMatch[3], 10) / 255;
        const a = parseFloat(rgbaMatch[4]); // Alpha já está em formato 0.0-1.0
        return this.canvasKit.Color4f(r, g, b, a);
      }
    }
    
    // Handle rgb colors (rgb(r, g, b))
    if (color.startsWith('rgb(')) {
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1], 10) / 255;
        const g = parseInt(rgbMatch[2], 10) / 255;
        const b = parseInt(rgbMatch[3], 10) / 255;
        const a = this._globalAlpha;
        return this.canvasKit.Color4f(r, g, b, a);
      }
    }
    
    // Handle short hex colors (#rgb)
    if (color.startsWith('#') && color.length === 4) {
      const hex = color.slice(1);
      const r = parseInt(hex[0] + hex[0], 16) / 255;
      const g = parseInt(hex[1] + hex[1], 16) / 255;
      const b = parseInt(hex[2] + hex[2], 16) / 255;
      const a = this._globalAlpha;
      return this.canvasKit.Color4f(r, g, b, a);
    }
    
    // Handle named colors (basic set)
    const namedColors: { [key: string]: [number, number, number] } = {
      black: [0, 0, 0],
      white: [1, 1, 1],
      red: [1, 0, 0],
      green: [0, 0.5, 0],
      blue: [0, 0, 1],
      yellow: [1, 1, 0],
      cyan: [0, 1, 1],
      magenta: [1, 0, 1],
      transparent: [0, 0, 0] // Will be handled with alpha = 0
    };
    
    if (namedColors[color.toLowerCase()]) {
      const [r, g, b] = namedColors[color.toLowerCase()];
      const a = color.toLowerCase() === 'transparent' ? 0 : this._globalAlpha;
      return this.canvasKit.Color4f(r, g, b, a);
    }
    
    // Default to black
    return this.canvasKit.Color4f(0, 0, 0, this._globalAlpha);
  }

  private updateFillColor(): void {
    const color = this.parseColor(this._fillStyle);
    this.fillPaint.setColor(color);
  }

  private updateStrokeColor(): void {
    const color = this.parseColor(this._strokeStyle);
    this.strokePaint.setColor(color);
  }

  private updateStrokeWidth(): void {
    this.strokePaint.setStrokeWidth(this._lineWidth);
  }

  // IRenderer implementation
  save(): void {
    this.canvas.save();
    this.stateStack.push({
      fillStyle: this._fillStyle,
      strokeStyle: this._strokeStyle,
      globalAlpha: this._globalAlpha,
      lineWidth: this._lineWidth
    });
  }

  restore(): void {
    this.canvas.restore();
    const state = this.stateStack.pop();
    if (state) {
      this._fillStyle = state.fillStyle;
      this._strokeStyle = state.strokeStyle;
      this._globalAlpha = state.globalAlpha;
      this._lineWidth = state.lineWidth;
      this.updateFillColor();
      this.updateStrokeColor();
      this.updateStrokeWidth();
    }
  }

  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void {
    const matrix = [a, c, e, b, d, f, 0, 0, 1];
    this.canvas.concat(matrix);
  }

  translate(x: number, y: number): void {
    this.canvas.translate(x, y);
  }

  scale(x: number, y: number): void {
    this.canvas.scale(x, y);
  }

  rotate(angle: number): void {
    this.canvas.rotate(angle * 180 / Math.PI, 0, 0); // Convert to degrees
  }

  fillRect(x: number, y: number, width: number, height: number): void {
    const rect = this.canvasKit.XYWHRect(x, y, width, height);
    this.canvas.drawRect(rect, this.fillPaint);
  }

  strokeRect(x: number, y: number, width: number, height: number): void {
    const rect = this.canvasKit.XYWHRect(x, y, width, height);
    this.canvas.drawRect(rect, this.strokePaint);
  }

  clearRect(x: number, y: number, width: number, height: number): void {
    this.save();
    const clearPaint = new this.canvasKit.Paint();
    clearPaint.setBlendMode(this.canvasKit.BlendMode.Clear);
    const rect = this.canvasKit.XYWHRect(x, y, width, height);
    this.canvas.drawRect(rect, clearPaint);
    clearPaint.delete();
    this.restore();
  }

  beginPath(): void {
    if (this.currentPath) {
      this.currentPath.delete();
    }
    this.currentPath = new this.canvasKit.Path();
  }

  moveTo(x: number, y: number): void {
    if (!this.currentPath) {
      this.beginPath();
    }
    this.currentPath!.moveTo(x, y);
  }

  lineTo(x: number, y: number): void {
    if (!this.currentPath) {
      this.beginPath();
    }
    this.currentPath!.lineTo(x, y);
  }

  rect(x: number, y: number, width: number, height: number): void {
    if (!this.currentPath) {
      this.beginPath();
    }
    const rect = this.canvasKit.XYWHRect(x, y, width, height);
    this.currentPath!.addRect(rect);
  }

  fill(): void {
    if (this.currentPath) {
      this.canvas.drawPath(this.currentPath, this.fillPaint);
    }
  }

  stroke(): void {
    if (this.currentPath) {
      this.canvas.drawPath(this.currentPath, this.strokePaint);
    }
  }

  clearBackground(color: string, width: number, height: number): void {
    // Clear with white background
    this.canvas.clear(this.canvasKit.WHITE);
  }

  flush(): void {
    this.surface.flush();
  }

  // Properties
  get fillStyle(): string {
    return this._fillStyle;
  }

  set fillStyle(value: string) {
    this._fillStyle = value;
    this.updateFillColor();
  }

  get strokeStyle(): string {
    return this._strokeStyle;
  }

  set strokeStyle(value: string) {
    this._strokeStyle = value;
    this.updateStrokeColor();
  }

  get lineWidth(): number {
    return this._lineWidth;
  }

  set lineWidth(value: number) {
    this._lineWidth = value;
    this.updateStrokeWidth();
  }

  get globalAlpha(): number {
    return this._globalAlpha;
  }

  set globalAlpha(value: number) {
    this._globalAlpha = value;
    this.updateFillColor();
    this.updateStrokeColor();
  }

  // Cleanup
  destroy(): void {
    if (this.currentPath) {
      this.currentPath.delete();
      this.currentPath = null;
    }
    this.fillPaint.delete();
    this.strokePaint.delete();
  }
}

/**
 * Factory to create CanvasKit renderer
 */
export class CanvasKitFactory {
  private static canvasKit: CanvasKitAPI | null = null;

  static async initCanvasKit(config?: CanvasKitConfig): Promise<CanvasKitAPI> {
    if (this.canvasKit) {
      return this.canvasKit;
    }

    const CanvasKitInit = (await import('canvaskit-wasm')).default;
    this.canvasKit = await CanvasKitInit({
      locateFile: config?.locateFile || ((file: string) => {
        return `https://unpkg.com/canvaskit-wasm@0.39.1/bin/${file}`;
      })
    });

    return this.canvasKit;
  }

  static async createRenderer(
    canvas: HTMLCanvasElement, 
    config?: CanvasKitConfig
  ): Promise<CanvasKitRenderer> {
    const canvasKit = await this.initCanvasKit(config);
    
    // Set canvas ID if not set
    if (!canvas.id) {
      canvas.id = 'koiot-canvas';
    }
    
    const surface = canvasKit.MakeCanvasSurface(canvas.id);
    
    if (!surface) {
      throw new Error('Failed to create CanvasKit surface');
    }

    return new CanvasKitRenderer(canvasKit, surface);
  }
}