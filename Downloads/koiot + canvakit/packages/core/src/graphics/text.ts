import { escapeHtml, parseRGBAStr } from '@suika/common';
import {
  applyInverseMatrix,
  calcGlyphInfos,
  calcTextSize,
  type IGlyph,
  type IPoint,
  type ITextMetrics,
} from '@suika/geo';

import { PaintType } from '../paint';
import { GraphicsType, type Optional } from '../type';
import {
  type GraphicsAttrs,
  type IAdvancedAttrs,
  type IGraphicsOpts,
  SuikaGraphics,
} from './graphics';
import { type IDrawInfo } from './type';
import { 
  type IRichTextDocument, 
  type IRichTextStyle,
  createSimpleRichText,
  parseMarkdownToRichText 
} from './rich-text-attrs';
import { RichTextRenderer } from './rich-text-renderer';

export interface TextAttrs extends GraphicsAttrs {
  content: string;
  fontSize: number;
  fontFamily: string;
  autoFit?: boolean;
  
  // Novos atributos para Rich Text (opcionais para compatibilidade)
  richText?: IRichTextDocument;
  enableRichText?: boolean;
  enableMarkdown?: boolean; // Se true, parseia markdown no content
}

const DEFAULT_TEXT_WIDTH = 80;
const DEFAULT_TEXT_WEIGHT = 30;

const tmpCtx = document.createElement('canvas').getContext('2d')!;

export class SuikaText extends SuikaGraphics<TextAttrs> {
  override type = GraphicsType.Text;

  private _glyphs: IGlyph[] | null = null;
  private contentMetrics: ITextMetrics | null = null;
  private richTextRenderer: RichTextRenderer | null = null;

  constructor(
    attrs: Optional<Omit<TextAttrs, 'id'>, 'width' | 'height' | 'transform'>,
    opts: IGraphicsOpts,
  ) {
    super(
      {
        ...attrs,
        type: GraphicsType.Text,
        width: attrs.width ?? DEFAULT_TEXT_WIDTH,
        height: attrs.height ?? DEFAULT_TEXT_WEIGHT,
      },
      opts,
    );

    if (attrs.autoFit) {
      tmpCtx.font = `${attrs.fontSize}px ${attrs.fontFamily}`;
      const { width } = tmpCtx.measureText(attrs.content);
      this.attrs.width = width;
      this.attrs.height = attrs.fontSize;
    }
  }

  override updateAttrs(partialAttrs: Partial<TextAttrs> & IAdvancedAttrs) {
    const isContentChanged =
      'content' in partialAttrs && partialAttrs.content !== this.attrs.content;
    const isFontChanged =
      'fontSize' in partialAttrs || 'fontFamily' in partialAttrs;
    const isFontFamilyChanged =
      'fontFamily' in partialAttrs &&
      partialAttrs.fontFamily !== this.attrs.fontFamily;

    if (isContentChanged || isFontChanged || isFontFamilyChanged) {
      this._glyphs = null;
    }
    super.updateAttrs(partialAttrs);
  }

  override draw(drawInfo: IDrawInfo) {
    if (this.shouldSkipDraw(drawInfo)) return;

    const opacity = this.getOpacity() * (drawInfo.opacity ?? 1);
    const { transform, fill, fontSize, content, fontFamily, enableRichText, enableMarkdown } = this.attrs;
    const { ctx } = drawInfo;
    
    ctx.save();
    ctx.transform(...transform);
    if (opacity < 1) {
      ctx.globalAlpha = opacity;
    }

    // Tentar usar Rich Text se disponível e habilitado
    if ((enableRichText || enableMarkdown) && this.canUseRichText(ctx)) {
      this.drawRichText(ctx, fill);
    } else {
      // Fallback para texto simples tradicional
      this.drawSimpleText(ctx, fill, content, fontSize, fontFamily);
    }

    ctx.restore();
  }

  /**
   * Verifica se pode usar Rich Text (requer CanvasKit)
   */
  private canUseRichText(ctx: any): boolean {
    // Verificar se é CanvasKit renderer
    return ctx && typeof ctx.getOriginalContext === 'function' && ctx.getOriginalContext() === null;
  }

  /**
   * Desenha texto usando CanvasKit Rich Text nativo
   */
  private drawRichText(ctx: any, fill: any) {
    try {
      // Verificar se ctx é válido e tem canvasKit
      if (!ctx || !ctx.canvasKit) {
        throw new Error('CanvasKit não disponível no contexto');
      }

      // Inicializar RichTextRenderer se necessário
      if (!this.richTextRenderer) {
        this.richTextRenderer = new RichTextRenderer(ctx.canvasKit);
      }

      // Obter documento rich text
      const document = this.getRichTextDocument();
      
      // Renderizar
      this.richTextRenderer.renderRichText(
        ctx, // passa o renderer CanvasKit
        document,
        0, // x
        0, // y (já fizemos transform)
        this.attrs.width // maxWidth
      );

      console.log('✅ Rich text renderizado com CanvasKit nativo');
    } catch (error) {
      console.warn('⚠️ Rich text falhou, usando fallback:', error);
      // Fallback para texto simples
      this.drawSimpleText(ctx, fill, this.attrs.content, this.attrs.fontSize, this.attrs.fontFamily);
    }
  }

  /**
   * Desenha texto simples (compatibilidade)
   */
  private drawSimpleText(ctx: any, fill: any, content: string, fontSize: number, fontFamily: string) {
    ctx.beginPath();
    ctx.font = `${fontSize}px ${fontFamily ?? 'sans-serif'}`;

    for (const paint of fill ?? []) {
      switch (paint.type) {
        case PaintType.Solid: {
          ctx.fillStyle = parseRGBAStr(paint.attrs);
          break;
        }
        case PaintType.Image: {
          // TODO:
        }
      }
    }

    ctx.fontKerning = 'none'; // no kerning
    ctx.translate(0, this.getContentMetrics().fontBoundingBoxAscent);
    ctx.fillText(content, 0, 0);
  }

  /**
   * Obtém ou cria o documento Rich Text
   */
  private getRichTextDocument(): IRichTextDocument {
    // Se já tem richText definido, usar
    if (this.attrs.richText) {
      return this.attrs.richText;
    }

    // Obter cor do primeiro paint
    const primaryColor = this.attrs.fill?.[0]?.type === PaintType.Solid 
      ? parseRGBAStr(this.attrs.fill[0].attrs) 
      : '#000000';

    const defaultStyle: IRichTextStyle = {
      fontSize: this.attrs.fontSize,
      fontFamily: this.attrs.fontFamily,
      color: primaryColor,
      fontWeight: 'normal',
      fontStyle: 'normal'
    };

    // Se markdown habilitado, parsear markdown
    if (this.attrs.enableMarkdown) {
      return parseMarkdownToRichText(this.attrs.content, defaultStyle);
    }

    // Senão, criar texto simples
    return createSimpleRichText(this.attrs.content, defaultStyle);
  }

  protected override getSVGTagHead(offset?: IPoint) {
    const tf = [...this.attrs.transform];
    tf[5] += this.attrs.fontSize;
    if (offset) {
      tf[4] += offset.x;
      tf[5] += offset.y;
    }
    return `<text x="0" y="0" transform="matrix(${tf.join(' ')})"`;
  }

  protected override getSVGTagTail(): string {
    const content = escapeHtml(this.attrs.content);
    return `>${content}</text>`;
  }

  override getLayerIconPath() {
    return 'M0 0H11V3H10V1H6V9H7.5V10H3.5V9H5V1H1V3H0V0Z';
  }

  getGlyphs() {
    if (this._glyphs) return this._glyphs;
    this._glyphs = calcGlyphInfos(this.attrs.content, {
      fontSize: this.attrs.fontSize,
      fontFamily: this.attrs.fontFamily,
    });
    return this._glyphs;
  }

  getContentMetrics() {
    if (this.contentMetrics) return this.contentMetrics;
    this.contentMetrics = calcTextSize(this.attrs.content, {
      fontSize: this.attrs.fontSize,
      fontFamily: this.attrs.fontFamily,
    });
    return this.contentMetrics;
  }

  getContentLength() {
    return this.getGlyphs().length - 1;
  }

  protected override isFillShouldRender() {
    // TODO: optimize
    return true;
  }

  getCursorIndex(point: IPoint) {
    point = applyInverseMatrix(this.getWorldTransform(), point);
    const glyphs = this.getGlyphs();

    // binary search, find the nearest but not greater than point.x glyph index
    let left = 0;
    let right = glyphs.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const glyph = glyphs[mid];
      if (point.x < glyph.position.x) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    if (left === 0) return 0;
    if (left >= glyphs.length) return glyphs.length - 1;

    if (
      glyphs[left].position.x - point.x >
      point.x - glyphs[right].position.x
    ) {
      return right;
    }
    return left;
  }
}
