import { BaseGraphics } from './base-graphics';
import { IDrawInfo, ISkiaDrawInfo, GraphicsType, IGraphicsAttrs } from './types';

export class Rectangle extends BaseGraphics {
  public type = GraphicsType.Rectangle;

  constructor(attrs: Partial<IGraphicsAttrs> & { x: number; y: number; width: number; height: number }) {
    super(attrs);
  }

  // 🚨 MÉTODO ANTIGO - Mantido para compatibilidade, mas deprecated
  draw(drawInfo: IDrawInfo): void {
    console.warn('⚠️ Método draw() antigo sendo usado. Use drawSkia() para melhor performance.');
    
    if (!this.attrs.visible) {
      return;
    }

    const { renderer } = drawInfo;
    const { x, y, width, height, fill, stroke, strokeWidth } = this.attrs;

    renderer.save();

    // Draw fill
    if (fill) {
      renderer.fillStyle = fill;
      renderer.fillRect(x, y, width, height);
    }

    // Draw stroke
    if (stroke && strokeWidth && strokeWidth > 0) {
      renderer.strokeStyle = stroke;
      renderer.lineWidth = strokeWidth;
      renderer.strokeRect(x, y, width, height);
    }

    renderer.restore();
  }

  // 🆕 MÉTODO NATIVO SKIA - O jeito correto!
  drawSkia(skiaDrawInfo: ISkiaDrawInfo): void {
    if (!this.attrs.visible) {
      return;
    }

    const { canvas, canvasKit } = skiaDrawInfo;
    const { x, y, width, height, fill, stroke, strokeWidth } = this.attrs;

    // 1. Salva o estado do canvas
    canvas.save();

    try {
      // 2. Cria a geometria do retângulo
      const rect = canvasKit.XYWHRect(x, y, width, height);

      // 3. Desenha o preenchimento se existir
      if (fill) {
        const fillPaint = new canvasKit.SkPaint();
        
        try {
          // Converte cor string para Skia color
          const color = this.parseColor(fill, canvasKit);
          fillPaint.setColor(color);
          fillPaint.setStyle(canvasKit.PaintStyle.Fill);
          fillPaint.setAntiAlias(true);
          
          // Desenha o retângulo preenchido
          canvas.drawRect(rect, fillPaint);
        } finally {
          // 🎯 CRÍTICO: Sempre destruir o paint para evitar vazamento de memória
          fillPaint.delete();
        }
      }

      // 4. Desenha o contorno se existir
      if (stroke && strokeWidth && strokeWidth > 0) {
        const strokePaint = new canvasKit.SkPaint();
        
        try {
          // Converte cor string para Skia color
          const color = this.parseColor(stroke, canvasKit);
          strokePaint.setColor(color);
          strokePaint.setStyle(canvasKit.PaintStyle.Stroke);
          strokePaint.setStrokeWidth(strokeWidth);
          strokePaint.setAntiAlias(true);
          
          // Desenha o contorno do retângulo
          canvas.drawRect(rect, strokePaint);
        } finally {
          // 🎯 CRÍTICO: Sempre destruir o paint para evitar vazamento de memória
          strokePaint.delete();
        }
      }
      
    } finally {
      // 5. Restaura o estado do canvas
      canvas.restore();
    }
  }

  /**
   * Converte uma cor string (hex, rgb, etc.) para formato Skia
   * Suporta: #ff0000, rgb(255,0,0), rgba(255,0,0,0.5)
   */
  private parseColor(colorStr: string, canvasKit: any): number {
    // Remove espaços e converte para lowercase
    const color = colorStr.trim().toLowerCase();
    
    // Cor hexadecimal #rrggbb ou #rgb
    if (color.startsWith('#')) {
      let hex = color.slice(1);
      
      // Converte #rgb para #rrggbb
      if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
      }
      
      if (hex.length === 6) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return canvasKit.Color(r, g, b, 1.0);
      }
    }
    
    // rgb(r, g, b) ou rgba(r, g, b, a)
    const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);
      const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1.0;
      return canvasKit.Color(r, g, b, a);
    }
    
    // Cores nomeadas básicas
    const namedColors: Record<string, number[]> = {
      'black': [0, 0, 0, 1],
      'white': [255, 255, 255, 1],
      'red': [255, 0, 0, 1],
      'green': [0, 255, 0, 1],
      'blue': [0, 0, 255, 1],
      'yellow': [255, 255, 0, 1],
      'cyan': [0, 255, 255, 1],
      'magenta': [255, 0, 255, 1],
    };
    
    if (namedColors[color]) {
      const [r, g, b, a] = namedColors[color];
      return canvasKit.Color(r, g, b, a);
    }
    
    // Fallback: preto
    console.warn(`⚠️ Cor não reconhecida: ${colorStr}. Usando preto como fallback.`);
    return canvasKit.Color(0, 0, 0, 1.0);
  }
}