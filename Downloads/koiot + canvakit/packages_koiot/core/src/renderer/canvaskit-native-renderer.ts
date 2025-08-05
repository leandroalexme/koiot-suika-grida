/**
 * CanvasKit Native Renderer - TRUE CanvasKit implementation
 * 
 * Esta implementação usa APENAS APIs nativas do CanvasKit/Skia
 * sem emular Canvas 2D, garantindo máxima performance e funcionalidade.
 */

// Note: CanvasKit types are not fully defined, using any for flexibility
export type CanvasKitAPI = any;
export type Surface = any;
export type Canvas = any;
export type Paint = any;
export type Path = any;
export type Matrix = any;

export interface ICanvasKitNativeRenderer {
  // ✅ Native CanvasKit access
  getCanvasKit(): CanvasKitAPI;
  getCanvas(): Canvas;
  getSurface(): Surface;
  
  // ✅ Native Paint management
  createPaint(): Paint;
  createFillPaint(color: Float32Array): Paint;
  createStrokePaint(color: Float32Array, width: number): Paint;
  
  // ✅ Native Matrix operations
  createMatrix(): Matrix;
  setMatrix(matrix: Matrix): void;
  transformCanvas(matrix: Matrix): void;
  
  // ✅ Native drawing
  drawRect(rect: Float32Array, paint: Paint): void;
  drawPath(path: Path, paint: Paint): void;
  
  // ✅ State management
  save(): void;
  restore(): void;
  
  // ✅ Optimization
  flush(): void;
  clear(color: Float32Array): void;
}

export class CanvasKitNativeRenderer implements ICanvasKitNativeRenderer {
  private canvasKit: CanvasKitAPI;
  private surface: Surface;
  private canvas: Canvas;
  
  // Paint caching for performance
  private paintCache = new Map<string, Paint>();
  private matrixPool: Matrix[] = [];
  
  constructor(canvasKit: CanvasKitAPI, surface: Surface) {
    this.canvasKit = canvasKit;
    this.surface = surface;
    this.canvas = surface.getCanvas();
  }

  // ✅ Native CanvasKit access
  getCanvasKit(): CanvasKitAPI {
    return this.canvasKit;
  }

  getCanvas(): Canvas {
    return this.canvas;
  }

  getSurface(): Surface {
    return this.surface;
  }

  // ✅ Native Paint management
  createPaint(): Paint {
    const paint = new this.canvasKit.Paint();
    paint.setAntiAlias(true);
    return paint;
  }

  createFillPaint(color: Float32Array): Paint {
    const cacheKey = `fill_${color.join('_')}`;
    
    let paint = this.paintCache.get(cacheKey);
    if (!paint) {
      paint = new this.canvasKit.Paint();
      paint.setStyle(this.canvasKit.PaintStyle.Fill);
      paint.setAntiAlias(true);
      paint.setColor(color);
      this.paintCache.set(cacheKey, paint);
      return paint;
    }
    
    return paint;
  }

  createStrokePaint(color: Float32Array, width: number): Paint {
    const cacheKey = `stroke_${color.join('_')}_${width}`;
    
    let paint = this.paintCache.get(cacheKey);
    if (!paint) {
      paint = new this.canvasKit.Paint();
      paint.setStyle(this.canvasKit.PaintStyle.Stroke);
      paint.setAntiAlias(true);
      paint.setColor(color);
      paint.setStrokeWidth(width);
      this.paintCache.set(cacheKey, paint);
      return paint;
    }
    
    return paint;
  }

  // ✅ Native Matrix operations
  createMatrix(): Matrix {
    // Reuse from pool for performance
    if (this.matrixPool.length > 0) {
      const matrix = this.matrixPool.pop()!;
      matrix.identity(); // Reset to identity
      return matrix;
    }
    
    return this.canvasKit.Matrix.identity();
  }

  setMatrix(matrix: Matrix): void {
    this.canvas.concat(matrix);
  }

  transformCanvas(matrix: Matrix): void {
    this.canvas.concat(matrix);
  }

  // ✅ Native drawing
  drawRect(rect: Float32Array, paint: Paint): void {
    this.canvas.drawRect(rect, paint);
  }

  drawPath(path: Path, paint: Paint): void {
    this.canvas.drawPath(path, paint);
  }

  // ✅ State management
  save(): void {
    this.canvas.save();
  }

  restore(): void {
    this.canvas.restore();
  }

  // ✅ Optimization
  flush(): void {
    this.surface.flush();
  }

  clear(color: Float32Array): void {
    this.canvas.clear(color);
  }

  // ✅ Memory management
  destroy(): void {
    // Clean up paint cache
    this.paintCache.forEach(paint => paint.delete());
    this.paintCache.clear();
    
    // Clean up matrix pool
    this.matrixPool.forEach(matrix => matrix.delete());
    this.matrixPool.length = 0;
  }

  // ✅ Return matrix to pool for reuse
  returnMatrix(matrix: Matrix): void {
    if (this.matrixPool.length < 10) { // Limit pool size
      this.matrixPool.push(matrix);
    } else {
      matrix.delete();
    }
  }
}

/**
 * Factory for creating native CanvasKit renderer
 */
export class CanvasKitNativeFactory {
  private static canvasKit: CanvasKitAPI | null = null;

  static async initCanvasKit(): Promise<CanvasKitAPI> {
    if (this.canvasKit) {
      return this.canvasKit;
    }

    const CanvasKitInit = (await import('canvaskit-wasm')).default;
    this.canvasKit = await CanvasKitInit({
      locateFile: (file: string) => {
        return `https://unpkg.com/canvaskit-wasm@0.39.1/bin/${file}`;
      }
    });

    return this.canvasKit;
  }

  static async createNativeRenderer(
    canvas: HTMLCanvasElement
  ): Promise<CanvasKitNativeRenderer> {
    const canvasKit = await this.initCanvasKit();
    
    if (!canvas.id) {
      canvas.id = 'koiot-native-canvas';
    }
    
    const surface = canvasKit.MakeCanvasSurface(canvas.id);
    
    if (!surface) {
      throw new Error('Failed to create CanvasKit native surface');
    }

    return new CanvasKitNativeRenderer(canvasKit, surface);
  }
}