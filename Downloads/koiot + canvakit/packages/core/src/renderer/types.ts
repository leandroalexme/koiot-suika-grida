/**
 * Interface para CanvasKit Renderer - 100% nativo SkiaJS
 * Todas as operações são otimizadas para máxima performance
 */
export interface IRenderer {
  // Core CanvasKit properties
  fillStyle: string;
  strokeStyle: string;
  globalAlpha: number;
  lineWidth: number;
  font: string;

  // Transform methods
  save(): void;
  restore(): void;
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  translate(x: number, y: number): void;
  scale(x: number, y: number): void;
  rotate(angle: number): void;
  resetTransform?(): void; // CanvasKit específico para reset otimizado

  // 🚀 CanvasKit optimization methods
  clearBackground(color: string, width: number, height: number): void;
  setViewportTransform(dpr: number, zoom: number, dx: number, dy: number): void;
  flush(): void;

  // Drawing methods
  clearRect(x: number, y: number, w: number, h: number): void;
  fillRect(x: number, y: number, w: number, h: number): void;
  strokeRect(x: number, y: number, w: number, h: number): void;
  
  // Path methods
  beginPath(): void;
  closePath(): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  rect(x: number, y: number, w: number, h: number): void;
  roundRect(x: number, y: number, w: number, h: number, radii: number | number[]): void;
  ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number): void;
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
  
  // Fill and stroke
  fill(): void;
  stroke(): void;
  clip(): void;

  // Text methods - CanvasKit optimized
  fillText(text: string, x: number, y: number): void;
  measureText(text: string): TextMetrics;

  // Image methods - CanvasKit native
  drawImage(image: CanvasImageSource, dx: number, dy: number): void;
  drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void;
  drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;

  // UI Elements - CanvasKit native implementations
  drawGridLines(
    startX: number, endX: number, stepX: number, 
    startY: number, endY: number, stepY: number,
    color: string, viewportWidth: number, viewportHeight: number
  ): void;
  drawRulerBackground(color: string, rulerWidth: number, viewportWidth: number, viewportHeight: number): void;
  drawRulerMarks(
    isHorizontal: boolean, marks: Array<{pos: number, label: string}>, 
    color: string, rulerWidth: number, markSize: number
  ): void;
  drawSelectionBox(x: number, y: number, width: number, height: number, strokeStyle: string, fillStyle: string): void;

  // CanvasKit specific methods
  dispose(): void;
}

/**
 * Configuração para o CanvasKit
 */
export interface ICanvasKitConfig {
  enableGPU?: boolean;
  fontDataUrls?: string[];
  wasmUrl?: string;
}

/**
 * Interface para factory de CanvasKit - apenas um tipo de renderer
 */
export interface ICanvasKitFactory {
  createCanvasKitRenderer(canvas: HTMLCanvasElement, config?: ICanvasKitConfig): Promise<IRenderer>;
} 