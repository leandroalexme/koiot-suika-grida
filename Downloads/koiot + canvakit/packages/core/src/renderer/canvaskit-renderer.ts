import { type IRenderer } from './types';

// Tipos para CanvasKit (simplificados baseados na documentação oficial)
declare const CanvasKitInit: any;

interface CanvasKitAPI {
  MakeCanvasSurface(canvas: HTMLCanvasElement | string): Surface | null;
  MakeSWCanvasSurface?(canvas: HTMLCanvasElement | string): Surface | null;
  Paint: new () => Paint;
  Path: new () => Path;
  Color4f(r: number, g: number, b: number, a: number): Float32Array;
  Color(r: number, g: number, b: number, a?: number): number;
  WHITE: Float32Array;
  BLACK: Float32Array;
  PaintStyle: {
    Fill: number;
    Stroke: number;
  };
  LTRBRect(left: number, top: number, right: number, bottom: number): Float32Array;
  RRectXY(rect: Float32Array, rx: number, ry: number): any;
  FontMgr: {
    FromData(fonts: ArrayBuffer[]): FontMgr;
  };
  TextStyle: any;
  ParagraphBuilder: {
    Make(style: any, fontMgr: FontMgr | null): ParagraphBuilder;
  };
  ParagraphStyle: any;
  TextAlign: {
    Left: number;
    Center: number;
    Right: number;
  };
}

interface Surface {
  getCanvas(): Canvas;
  flush(): void;
  drawOnce?(fn: (canvas: Canvas) => void): void;
  requestAnimationFrame?(fn: (canvas: Canvas) => void): void;
  delete(): void;
}

interface Canvas {
  clear(color: Float32Array): void;
  save(): void;
  restore(): void;
  translate(dx: number, dy: number): void;
  scale(sx: number, sy: number): void;
  concat(matrix: Float32Array): void;
  resetMatrix(): void;
  drawRect(rect: Float32Array, paint: Paint): void;
  drawRRect(rrect: any, paint: Paint): void;
  drawCircle(cx: number, cy: number, radius: number, paint: Paint): void;
  drawOval(rect: Float32Array, paint: Paint): void;
  drawPath(path: Path, paint: Paint): void;
  drawParagraph(paragraph: Paragraph, x: number, y: number): void;
  clipRect(rect: Float32Array): void;
}

interface Paint {
  setColor(color: Float32Array | number): void;
  setStyle(style: number): void;
  setStrokeWidth(width: number): void;
  setAntiAlias(aa: boolean): void;
  delete(): void;
}

interface Path {
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
  close(): void;
  delete(): void;
}

interface FontMgr {
  delete(): void;
}

interface ParagraphBuilder {
  addText(text: string): void;
  build(): Paragraph;
  delete(): void;
}

interface Paragraph {
  layout(width: number): void;
  getMaxIntrinsicWidth(): number;
  getHeight(): number;
  delete(): void;
}

/**
 * Wrapper do CanvasKit que implementa IRenderer
 * Oferece performance superior com aceleração por hardware
 */
export class CanvasKitRenderer implements IRenderer {
  private surface: Surface;
  private canvas: Canvas;
  private paint: Paint;
  private strokePaint: Paint;
  private canvasKit: CanvasKitAPI;
  
  // Estado interno para simular propriedades do Canvas2D
  private _fillStyle: string = '#000000';
  private _strokeStyle: string = '#000000';
  private _globalAlpha: number = 1.0;
  private _lineWidth: number = 1.0;
  private _font: string = '10px sans-serif';
  
  // Sistema de Path para simular Canvas2D "current path"
  private currentPath: Path | null = null;
  
  // Stack para save/restore
  private stateStack: Array<{
    fillStyle: string;
    strokeStyle: string;
    globalAlpha: number;
    lineWidth: number;
    font: string;
  }> = [];

  constructor(canvasKit: CanvasKitAPI, surface: Surface) {
    this.canvasKit = canvasKit;
    this.surface = surface;
    this.canvas = surface.getCanvas();
    
    // Criar paints padrão usando 'new' (correção BindingError)
    this.paint = new canvasKit.Paint();
    this.paint.setStyle(canvasKit.PaintStyle.Fill);
    this.paint.setAntiAlias(true);
    
    this.strokePaint = new canvasKit.Paint();
    this.strokePaint.setStyle(canvasKit.PaintStyle.Stroke);
    this.strokePaint.setAntiAlias(true);
    
    // Aplicar configurações iniciais
    this.updateFillColor();
    this.updateStrokeColor();
  }

  // Helper methods
  private parseColor(color: string): Float32Array {
    // Converter string CSS para RGBA
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      return this.canvasKit.Color4f(r, g, b, this._globalAlpha);
    }
    
    // Fallback para cores nomeadas
    if (color === 'black') return this.canvasKit.BLACK;
    if (color === 'white') return this.canvasKit.WHITE;
    
    // Por enquanto, fallback para preto
    return this.canvasKit.Color4f(0, 0, 0, this._globalAlpha);
  }

  private updateFillColor(): void {
    const color = this.parseColor(this._fillStyle);
    this.paint.setColor(color);
  }

  private updateStrokeColor(): void {
    const color = this.parseColor(this._strokeStyle);
    this.strokePaint.setColor(color);
    this.strokePaint.setStrokeWidth(this._lineWidth);
  }

  // Properties implementation - CanvasKit puro usa apenas strings
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

  get globalAlpha(): number {
    return this._globalAlpha;
  }
  set globalAlpha(value: number) {
    this._globalAlpha = value;
    this.updateFillColor();
    this.updateStrokeColor();
  }

  get lineWidth(): number {
    return this._lineWidth;
  }
  set lineWidth(value: number) {
    this._lineWidth = value;
    this.updateStrokeColor();
  }

  get font(): string {
    return this._font;
  }
  set font(value: string) {
    this._font = value;
  }

  get fontKerning(): string | undefined {
    return 'auto'; // CanvasKit tem kerning por padrão
  }
  set fontKerning(_value: string | undefined) {
    // CanvasKit gerencia kerning automaticamente
  }

  get imageSmoothingEnabled(): boolean | undefined {
    return true; // CanvasKit tem anti-aliasing por padrão
  }
  set imageSmoothingEnabled(_value: boolean | undefined) {
    // CanvasKit gerencia smoothing automaticamente
  }

  // Transform methods
  save(): void {
    this.canvas.save();
    this.stateStack.push({
      fillStyle: this._fillStyle,
      strokeStyle: this._strokeStyle,
      globalAlpha: this._globalAlpha,
      lineWidth: this._lineWidth,
      font: this._font,
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
      this._font = state.font;
      this.updateFillColor();
      this.updateStrokeColor();
    }
  }

  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void {
    // CanvasKit: Resetar matriz e aplicar nova transformação
    // Importante: setTransform substitui, não concatena!
    this.resetTransform();
    
    // Aplicar nova matriz se não for identity
    if (a !== 1 || b !== 0 || c !== 0 || d !== 1 || e !== 0 || f !== 0) {
      const matrix = new Float32Array([a, c, e, b, d, f, 0, 0, 1]);
      this.canvas.concat(matrix);
    }
  }

  transform(a: number, b: number, c: number, d: number, e: number, f: number): void {
    // Similar ao setTransform mas concatena
    const matrix = new Float32Array([a, c, e, b, d, f, 0, 0, 1]);
    this.canvas.concat(matrix);
  }

  /**
   * 🚀 CanvasKit: Reset completo da matriz de transformação
   * Baseado na documentação do Skia para operações de matriz
   */
  resetTransform(): void {
    (this.canvas as any).resetMatrix?.() || this.setTransform(1, 0, 0, 1, 0, 0);
  }

  translate(x: number, y: number): void {
    this.canvas.translate(x, y);
  }

  scale(x: number, y: number): void {
    this.canvas.scale(x, y);
  }

  rotate(angle: number): void {
    // Type assertion para métodos CanvasKit que podem não estar na definição de tipos
    (this.canvas as any).rotate(angle * 180 / Math.PI, 0, 0);
  }

  getTransform(): DOMMatrix {
    // CanvasKit não expõe matrix atual, retornar identity
    return new DOMMatrix();
  }

  // Drawing methods
  clearRect(x: number, y: number, w: number, h: number): void {
    if (x === 0 && y === 0) {
      // Clear completo
      this.canvas.clear(this.canvasKit.WHITE);
    } else {
      // Clear parcial - desenhar retângulo branco
      const rect = this.canvasKit.LTRBRect(x, y, x + w, y + h);
      const clearPaint = new this.canvasKit.Paint();
      clearPaint.setColor(this.canvasKit.WHITE);
      clearPaint.setStyle(this.canvasKit.PaintStyle.Fill);
      this.canvas.drawRect(rect, clearPaint);
      clearPaint.delete();
    }
    // Note: Não fazer flush aqui para melhor performance - será feito no final do render
  }

  /**
   * 🚀 Otimização: Clear com cor customizada para background
   */
  clearBackground(color: string, _width: number, _height: number): void {
    // Parse color
    const fillColor = this.parseColor(color);
    
    // Clear completo com cor específica
    this.canvas.clear(fillColor);
    
    // Note: Não fazer flush para melhor performance
  }

  /**
   * 🚀 CanvasKit Nativo: Configurar transformações de viewport otimizadas
   * Baseado na documentação oficial do Skia: https://skia.org/
   */
  setViewportTransform(dpr: number, zoom: number, dx: number, dy: number): void {
    // Reset transform matrix usando método otimizado
    this.resetTransform();
    
    // Aplicar transformações usando matriz combinada para performance
    // Seguindo a ordem correta do Skia: scale → translate
    this.canvas.scale(dpr * zoom, dpr * zoom);
    this.canvas.translate(dx, dy);
    
    console.log(`🎯 CanvasKit Transform Applied: dpr=${dpr}, zoom=${zoom}, dx=${dx}, dy=${dy}`);
    console.log(`📐 Total Scale: ${dpr * zoom}, Translate: [${dx}, ${dy}]`);
  }

  /**
   * 🚀 Performance: Flush apenas no final do frame
   */
  flush(): void {
    this.surface.flush();
  }

  fillRect(x: number, y: number, w: number, h: number): void {
    const rect = this.canvasKit.LTRBRect(x, y, x + w, y + h);
    this.canvas.drawRect(rect, this.paint);
    this.surface.flush();
  }

  strokeRect(x: number, y: number, w: number, h: number): void {
    const rect = this.canvasKit.LTRBRect(x, y, x + w, y + h);
    this.canvas.drawRect(rect, this.strokePaint);
    this.surface.flush();
  }

  // Path methods - implementação completa baseada na documentação Skia
  beginPath(): void {
    // Limpar path atual e criar novo
    if (this.currentPath) {
      this.currentPath.delete();
    }
    this.currentPath = new this.canvasKit.Path();
  }

  closePath(): void {
    if (this.currentPath) {
      this.currentPath.close();
    }
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

  rect(x: number, y: number, w: number, h: number): void {
    // Para agora, desenhar diretamente
    const rect = this.canvasKit.LTRBRect(x, y, x + w, y + h);
    this.canvas.drawRect(rect, this.paint);
  }

  roundRect(x: number, y: number, w: number, h: number, radii: number | number[]): void {
    const rect = this.canvasKit.LTRBRect(x, y, x + w, y + h);
    const radius = Array.isArray(radii) ? radii[0] : radii;
    const rrect = this.canvasKit.RRectXY(rect, radius, radius);
    this.canvas.drawRRect(rrect, this.paint);
  }

  ellipse(x: number, y: number, radiusX: number, radiusY: number, _rotation: number, _startAngle: number, _endAngle: number): void {
    const rect = this.canvasKit.LTRBRect(x - radiusX, y - radiusY, x + radiusX, y + radiusY);
    this.canvas.drawOval(rect, this.paint);
  }

  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
    if (!this.currentPath) {
      this.beginPath();
    }
    this.currentPath!.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }

  fill(): void {
    if (this.currentPath) {
      this.canvas.drawPath(this.currentPath, this.paint);
    }
    this.surface.flush();
  }

  stroke(): void {
    if (this.currentPath) {
      this.canvas.drawPath(this.currentPath, this.strokePaint);
    }
    this.surface.flush();
  }

  clip(): void {
    if (this.currentPath) {
      // CanvasKit usa clipPath para clipping com paths
      const clipRect = this.canvasKit.LTRBRect(-10000, -10000, 10000, 10000);
      this.canvas.clipRect(clipRect);
      // TODO: implementar clipPath quando disponível na interface
    }
  }

  // Text methods - implementação com CanvasKit ParagraphBuilder
  fillText(text: string, x: number, y: number): void {
    try {
      // Criar style de parágrafo básico
      const paraStyle = new this.canvasKit.ParagraphStyle({
        textStyle: {
          color: this.parseColor(this._fillStyle),
          fontSize: this.parseFontSize(this._font),
          fontFamilies: [this.parseFontFamily(this._font)],
        },
        textAlign: this.canvasKit.TextAlign.Left,
      });

      // Criar paragraph builder (sem FontMgr por enquanto - usa fontes do sistema)
      const builder = this.canvasKit.ParagraphBuilder.Make(paraStyle, null);
      builder.addText(text);
      const paragraph = builder.build();
      
      // Layout com largura mínima necessária
      const estimatedWidth = Math.max(200, text.length * 10);
      paragraph.layout(estimatedWidth);
      
      // Desenhar no canvas
      this.canvas.drawParagraph(paragraph, x, y);
      
      // Cleanup
      paragraph.delete();
      builder.delete();
    } catch (error) {
      console.warn('CanvasKit fillText error:', error, '- usando fallback');
      // Fallback básico - não desenha nada por enquanto
    }
    
    this.surface.flush();
  }

  measureText(text: string): TextMetrics {
    try {
      // Usar mesmo estilo do fillText para medir
      const paraStyle = new this.canvasKit.ParagraphStyle({
        textStyle: {
          color: this.canvasKit.BLACK,
          fontSize: this.parseFontSize(this._font),
          fontFamilies: [this.parseFontFamily(this._font)],
        },
        textAlign: this.canvasKit.TextAlign.Left,
      });

      const builder = this.canvasKit.ParagraphBuilder.Make(paraStyle, null);
      builder.addText(text);
      const paragraph = builder.build();
      
      // Layout com largura mínima para obter medições
      paragraph.layout(10000);
      
      const width = paragraph.getMaxIntrinsicWidth();
      const height = paragraph.getHeight();
      
      // Cleanup
      paragraph.delete();
      builder.delete();
      
      return {
        width,
        actualBoundingBoxLeft: 0,
        actualBoundingBoxRight: width,
        actualBoundingBoxAscent: height * 0.8,
        actualBoundingBoxDescent: height * 0.2,
        fontBoundingBoxAscent: height * 0.8,
        fontBoundingBoxDescent: height * 0.2,
        alphabeticBaseline: 0,
        emHeightAscent: height * 0.8,
        emHeightDescent: height * 0.2,
        hangingBaseline: height * 0.8,
        ideographicBaseline: -height * 0.2,
      } as TextMetrics;
    } catch (error) {
      console.warn('CanvasKit measureText error:', error);
      // Fallback aproximado
      return {
        width: text.length * 8,
        actualBoundingBoxLeft: 0,
        actualBoundingBoxRight: text.length * 8,
        actualBoundingBoxAscent: 12,
        actualBoundingBoxDescent: 3,
        fontBoundingBoxAscent: 12,
        fontBoundingBoxDescent: 3,
        alphabeticBaseline: 0,
        emHeightAscent: 12,
        emHeightDescent: 3,
        hangingBaseline: 12,
        ideographicBaseline: -3,
      } as TextMetrics;
    }
  }

  // Helper methods para parsing de font
  private parseFontSize(font: string): number {
    const match = font.match(/(\d+)px/);
    return match ? parseInt(match[1]) : 12;
  }

  private parseFontFamily(font: string): string {
    const parts = font.split(' ');
    return parts[parts.length - 1] || 'sans-serif';
  }

  // Image methods - implementação nativa CanvasKit
  drawImage(image: CanvasImageSource, dx: number, dy: number): void;
  drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void;
  drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
  drawImage(image: CanvasImageSource, ...args: number[]): void {
    try {
      // Converter CanvasImageSource para SkImage
      const skImage = this.makeSkImage(image);
      if (!skImage) {
        console.warn('CanvasKit drawImage: Falha ao criar SkImage');
        return;
      }

      // Usar anti-aliasing baseado na configuração atual
      const paint = new this.canvasKit.Paint();
      paint.setAntiAlias(this.imageSmoothingEnabled !== false);
      // Type assertion para métodos CanvasKit
      (paint as any).setAlphaf?.(this._globalAlpha);

      if (args.length === 2) {
        // drawImage(image, dx, dy)
        const [dx, dy] = args;
        const srcRect = this.canvasKit.LTRBRect(0, 0, skImage.width(), skImage.height());
        const dstRect = this.canvasKit.LTRBRect(dx, dy, dx + skImage.width(), dy + skImage.height());
        (this.canvas as any).drawImageRect(skImage, srcRect, dstRect, paint);
      } else if (args.length === 4) {
        // drawImage(image, dx, dy, dw, dh)
        const [dx, dy, dw, dh] = args;
        const srcRect = this.canvasKit.LTRBRect(0, 0, skImage.width(), skImage.height());
        const dstRect = this.canvasKit.LTRBRect(dx, dy, dx + dw, dy + dh);
        (this.canvas as any).drawImageRect(skImage, srcRect, dstRect, paint);
      } else if (args.length === 8) {
        // drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        const [sx, sy, sw, sh, dx, dy, dw, dh] = args;
        const srcRect = this.canvasKit.LTRBRect(sx, sy, sx + sw, sy + sh);
        const dstRect = this.canvasKit.LTRBRect(dx, dy, dx + dw, dy + dh);
        (this.canvas as any).drawImageRect(skImage, srcRect, dstRect, paint);
      } else {
        throw new Error(`drawImage: argumentos inválidos (${args.length})`);
      }

      // Cleanup
      paint.delete();
      skImage.delete();
    } catch (error) {
      console.warn('CanvasKit drawImage error:', error);
    }
    
    this.surface.flush();
  }

  /**
   * Converte CanvasImageSource para SkImage do CanvasKit
   */
  private makeSkImage(source: CanvasImageSource): any | null {
    try {
      // HTMLImageElement, HTMLCanvasElement, HTMLVideoElement, ImageBitmap
      if (source instanceof HTMLImageElement || 
          source instanceof HTMLCanvasElement || 
          source instanceof HTMLVideoElement ||
          (typeof ImageBitmap !== 'undefined' && source instanceof ImageBitmap)) {
        // Usar método genérico com type assertion
        return (this.canvasKit as any).MakeImageFromCanvasImageSource?.(source);
      }

      // ImageData - converter para SkImage
      if (source instanceof ImageData) {
        // Usar métodos com type assertion para contornar definições de tipo
        const ColorType = (this.canvasKit as any).ColorType;
        const AlphaType = (this.canvasKit as any).AlphaType;
        const MakeImage = (this.canvasKit as any).MakeImage;
        
        if (MakeImage && ColorType && AlphaType) {
          return MakeImage({
            width: source.width,
            height: source.height,
            colorType: ColorType.RGBA_8888,
            alphaType: AlphaType.Unpremul,
          }, source.data.buffer, 4 * source.width);
        }
      }

      console.warn('CanvasKit drawImage: Tipo de imagem não suportado', source);
      return null;
    } catch (error) {
      console.warn('CanvasKit makeSkImage error:', error);
      return null;
    }
  }

  // 🚀 UI ELEMENTS - Otimizações específicas para elementos de interface
  drawGridLines(
    startX: number, endX: number, stepX: number, 
    startY: number, endY: number, stepY: number,
    color: string, viewportWidth: number, viewportHeight: number
  ): void {
    // Fallback para métodos básicos por ora - melhoraremos na próxima iteração
    this.strokeStyle = color;
    this.lineWidth = 1;
    
    this.beginPath();
    
    // Vertical lines
    for (let x = startX; x <= endX; x += stepX) {
      this.moveTo(x, 0);
      this.lineTo(x, viewportHeight);
    }

    // Horizontal lines
    for (let y = startY; y <= endY; y += stepY) {
      this.moveTo(0, y);
      this.lineTo(viewportWidth, y);
    }
    
    this.stroke();
  }

  drawRulerBackground(color: string, rulerWidth: number, viewportWidth: number, viewportHeight: number): void {
    // Fallback para métodos básicos por ora - melhoraremos na próxima iteração
    this.fillStyle = color;
    
    // Horizontal ruler background
    this.fillRect(0, 0, viewportWidth, rulerWidth);
    
    // Vertical ruler background
    this.fillRect(0, 0, rulerWidth, viewportHeight);
  }

  drawRulerMarks(
    isHorizontal: boolean, 
    marks: Array<{pos: number, label: string}>, 
    color: string, 
    rulerWidth: number, 
    markSize: number
  ): void {
    // Fallback para métodos básicos por ora - melhoraremos na próxima iteração
    this.strokeStyle = color;
    this.fillStyle = color;
    this.lineWidth = 1;

    this.beginPath();

    for (const mark of marks) {
      if (isHorizontal) {
        // Horizontal ruler marks
        const y = rulerWidth - markSize;
        this.moveTo(mark.pos, y);
        this.lineTo(mark.pos, y + markSize);
        
        // Text for horizontal marks
        this.save();
        this.fillText(mark.label, mark.pos, y - 4);
        this.restore();
      } else {
        // Vertical ruler marks
        const x = rulerWidth - markSize;
        this.moveTo(x, mark.pos);
        this.lineTo(x + markSize, mark.pos);
        
        // Text for vertical marks (rotated)
        this.save();
        this.translate(x, mark.pos);
        // TODO: Implementar rotação correta no CanvasKit
        this.fillText(mark.label, 0, -3);
        this.restore();
      }
    }

    this.stroke();
  }

  drawSelectionBox(x: number, y: number, width: number, height: number, strokeStyle: string, fillStyle: string): void {
    // Fallback para métodos básicos por ora - melhoraremos na próxima iteração
    
    // Fill
    if (fillStyle && fillStyle !== 'transparent') {
      this.fillStyle = fillStyle;
      this.fillRect(x, y, width, height);
    }

    // Stroke
    if (strokeStyle && strokeStyle !== 'transparent') {
      this.strokeStyle = strokeStyle;
      this.lineWidth = 1;
      this.strokeRect(x, y, width, height);
    }
  }

  /**
   * Retorna null pois CanvasKit não tem contexto Canvas2D original
   */
  getOriginalContext(): CanvasRenderingContext2D | null {
    return null;
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    if (this.currentPath) {
      this.currentPath.delete();
    }
    this.paint.delete();
    this.strokePaint.delete();
    this.surface.delete();
  }
} 