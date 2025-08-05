/**
 * Rich Text Renderer usando CanvasKit ParagraphBuilder nativo
 * Sem fallbacks - requer CanvasKit para funcionar
 */

import type { IRenderer } from '../renderer';
import type { 
  IRichTextDocument, 
  IRichTextParagraph, 
  IRichTextStyle 
} from './rich-text-attrs';

// Tipos CanvasKit específicos para rich text
export interface CanvasKitTextAPI {
  ParagraphStyle: new (props: any) => any;
  TextStyle: new (props: any) => any;
  ParagraphBuilder: {
    Make(style: any, fontMgr?: any): ParagraphBuilder;
  };
  TextAlign: {
    Left: number;
    Center: number;
    Right: number;
    Justify: number;
  };
  FontWeight: {
    Normal: number;
    Bold: number;
    ExtraBold: number;
    Light: number;
  };
  FontSlant: {
    Upright: number;
    Italic: number;
    Oblique: number;
  };
  TextDecoration: {
    NoDecoration: number;
    Underline: number;
    Overline: number;
    LineThrough: number;
  };
}

interface ParagraphBuilder {
  pushStyle(textStyle: any): void;
  addText(text: string): void;
  pop(): void;
  build(): Paragraph;
  delete(): void;
}

interface Paragraph {
  layout(width: number): void;
  paint(canvas: any, x: number, y: number): void;
  getHeight(): number;
  getMaxIntrinsicWidth(): number;
  getMinIntrinsicWidth(): number;
  delete(): void;
}

export class RichTextRenderer {
  private canvasKit: CanvasKitTextAPI;

  constructor(canvasKit: any) {
    this.canvasKit = canvasKit;
  }

  /**
   * Renderiza um RichTextDocument usando CanvasKit nativo
   */
  renderRichText(
    renderer: IRenderer, 
    document: IRichTextDocument, 
    x: number, 
    y: number, 
    maxWidth?: number
  ): { width: number; height: number } {
    // Verificar se é CanvasKit renderer
    if (renderer.getOriginalContext?.()) {
      throw new Error('RichTextRenderer requer CanvasKit - Canvas2D não suportado');
    }

    const canvasKitRenderer = renderer as any;
    if (!canvasKitRenderer.canvas || !canvasKitRenderer.canvasKit) {
      throw new Error('Renderer não é CanvasKit válido');
    }

    let totalHeight = 0;
    let maxWidthUsed = 0;

    for (const paragraph of document.paragraphs) {
      const result = this.renderParagraph(
        canvasKitRenderer.canvas,
        paragraph,
        document.defaultStyle,
        x,
        y + totalHeight,
        maxWidth
      );
      
      totalHeight += result.height;
      maxWidthUsed = Math.max(maxWidthUsed, result.width);
    }

    return { width: maxWidthUsed, height: totalHeight };
  }

  /**
   * Renderiza um parágrafo individual
   */
  private renderParagraph(
    canvas: any,
    paragraph: IRichTextParagraph,
    defaultStyle: IRichTextStyle,
    x: number,
    y: number,
    maxWidth?: number
  ): { width: number; height: number } {
    
    // Criar ParagraphStyle
    const paraStyle = new this.canvasKit.ParagraphStyle({
      textAlign: this.getTextAlign(paragraph.alignment || 'left'),
      maxLines: paragraph.maxLines,
      ellipsis: paragraph.ellipsis,
      heightMultiplier: paragraph.lineHeight || 1.0,
    });

    // Criar ParagraphBuilder
    const builder = this.canvasKit.ParagraphBuilder.Make(paraStyle);

    // Adicionar spans com estilos
    for (const span of paragraph.spans) {
      const textStyle = this.createTextStyle(span.style, defaultStyle);
      builder.pushStyle(textStyle);
      builder.addText(span.text);
      builder.pop();
    }

    // Build paragraph
    const builtParagraph = builder.build();
    
    // Layout
    const layoutWidth = maxWidth || 1000;
    builtParagraph.layout(layoutWidth);
    
    // Paint no canvas
    builtParagraph.paint(canvas, x, y);
    
    // Get dimensions
    const height = builtParagraph.getHeight();
    const width = Math.min(builtParagraph.getMaxIntrinsicWidth(), layoutWidth);
    
    // Cleanup
    builtParagraph.delete();
    builder.delete();
    
    return { width, height };
  }

  /**
   * Converte IRichTextStyle para CanvasKit TextStyle
   */
  private createTextStyle(style: IRichTextStyle, defaultStyle: IRichTextStyle): any {
    const mergedStyle = { ...defaultStyle, ...style };
    
    return new this.canvasKit.TextStyle({
      color: this.parseColor(mergedStyle.color || '#000000'),
      fontSize: mergedStyle.fontSize || 16,
      fontFamilies: [mergedStyle.fontFamily || 'Arial'],
      fontWeight: this.getFontWeight(mergedStyle.fontWeight || 'normal'),
      fontStyle: this.getFontSlant(mergedStyle.fontStyle || 'normal'),
      decoration: this.getTextDecoration(mergedStyle.textDecoration || 'none'),
      letterSpacing: mergedStyle.letterSpacing || 0,
      wordSpacing: mergedStyle.wordSpacing || 0,
    });
  }

  /**
   * Converte string color para CanvasKit color
   */
  private parseColor(color: string): Float32Array {
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16) / 255;
      const g = parseInt(hex.slice(2, 4), 16) / 255;
      const b = parseInt(hex.slice(4, 6), 16) / 255;
      return Float32Array.from([r, g, b, 1.0]);
    }
    // Fallback para preto
    return Float32Array.from([0, 0, 0, 1.0]);
  }

  /**
   * Converte alignment string para CanvasKit TextAlign
   */
  private getTextAlign(alignment: string): number {
    switch (alignment) {
      case 'center': return this.canvasKit.TextAlign.Center;
      case 'right': return this.canvasKit.TextAlign.Right;
      case 'justify': return this.canvasKit.TextAlign.Justify;
      default: return this.canvasKit.TextAlign.Left;
    }
  }

  /**
   * Converte font weight para CanvasKit FontWeight
   */
  private getFontWeight(weight: string | number): number {
    if (typeof weight === 'number') return weight;
    
    switch (weight) {
      case 'bold': return this.canvasKit.FontWeight.Bold;
      case 'bolder': return this.canvasKit.FontWeight.ExtraBold;
      case 'lighter': return this.canvasKit.FontWeight.Light;
      default: return this.canvasKit.FontWeight.Normal;
    }
  }

  /**
   * Converte font style para CanvasKit FontSlant
   */
  private getFontSlant(style: string): number {
    switch (style) {
      case 'italic': return this.canvasKit.FontSlant.Italic;
      case 'oblique': return this.canvasKit.FontSlant.Oblique;
      default: return this.canvasKit.FontSlant.Upright;
    }
  }

  /**
   * Converte text decoration para CanvasKit TextDecoration
   */
  private getTextDecoration(decoration: string): number {
    switch (decoration) {
      case 'underline': return this.canvasKit.TextDecoration.Underline;
      case 'overline': return this.canvasKit.TextDecoration.Overline;
      case 'line-through': return this.canvasKit.TextDecoration.LineThrough;
      default: return this.canvasKit.TextDecoration.NoDecoration;
    }
  }

  /**
   * Mede as dimensões de um RichTextDocument sem renderizar
   */
  measureRichText(
    document: IRichTextDocument, 
    maxWidth?: number
  ): { width: number; height: number } {
    let totalHeight = 0;
    let maxWidthUsed = 0;

    for (const paragraph of document.paragraphs) {
      const result = this.measureParagraph(paragraph, document.defaultStyle, maxWidth);
      totalHeight += result.height;
      maxWidthUsed = Math.max(maxWidthUsed, result.width);
    }

    return { width: maxWidthUsed, height: totalHeight };
  }

  /**
   * Mede um parágrafo individual
   */
  private measureParagraph(
    paragraph: IRichTextParagraph,
    defaultStyle: IRichTextStyle,
    maxWidth?: number
  ): { width: number; height: number } {
    const paraStyle = new this.canvasKit.ParagraphStyle({
      textAlign: this.getTextAlign(paragraph.alignment || 'left'),
      maxLines: paragraph.maxLines,
      ellipsis: paragraph.ellipsis,
      heightMultiplier: paragraph.lineHeight || 1.0,
    });

    const builder = this.canvasKit.ParagraphBuilder.Make(paraStyle);

    for (const span of paragraph.spans) {
      const textStyle = this.createTextStyle(span.style, defaultStyle);
      builder.pushStyle(textStyle);
      builder.addText(span.text);
      builder.pop();
    }

    const builtParagraph = builder.build();
    const layoutWidth = maxWidth || 1000;
    builtParagraph.layout(layoutWidth);
    
    const height = builtParagraph.getHeight();
    const width = Math.min(builtParagraph.getMaxIntrinsicWidth(), layoutWidth);
    
    builtParagraph.delete();
    builder.delete();
    
    return { width, height };
  }
}