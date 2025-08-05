/**
 * Rich Text attributes para CanvasKit ParagraphBuilder nativo
 * Baseado na documentação oficial: https://skia.org/docs/user/modules/quickstart/#text-shaping
 */

export interface IRichTextSpan {
  text: string;
  style: IRichTextStyle;
}

export interface IRichTextStyle {
  fontSize?: number;
  fontFamily?: string;
  color?: string; // hex color like "#ff0000"
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | number;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through';
  letterSpacing?: number;
  wordSpacing?: number;
}

export interface IRichTextParagraph {
  spans: IRichTextSpan[];
  alignment?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
  maxLines?: number;
  ellipsis?: string;
}

/**
 * Rich Text Document - pode ter múltiplos parágrafos
 */
export interface IRichTextDocument {
  paragraphs: IRichTextParagraph[];
  defaultStyle: IRichTextStyle;
}

/**
 * Helper para converter texto simples em RichTextDocument
 */
export function createSimpleRichText(
  text: string, 
  style: IRichTextStyle = {}
): IRichTextDocument {
  return {
    paragraphs: [{
      spans: [{ text, style }],
      alignment: 'left'
    }],
    defaultStyle: {
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#000000',
      fontWeight: 'normal',
      fontStyle: 'normal',
      ...style
    }
  };
}

/**
 * Helper para parsing de markdown simples para RichText
 * Suporta: **bold**, *italic*, __underline__
 */
export function parseMarkdownToRichText(
  markdown: string,
  defaultStyle: IRichTextStyle = {}
): IRichTextDocument {
  const spans: IRichTextSpan[] = [];
  
  // Regex simples para bold (**text**), italic (*text*), underline (__text__)
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|__(.+?)__)|([^*_]+)/g;
  let match;
  
  while ((match = regex.exec(markdown)) !== null) {
    if (match[2]) {
      // Bold text
      spans.push({
        text: match[2],
        style: { ...defaultStyle, fontWeight: 'bold' }
      });
    } else if (match[3]) {
      // Italic text
      spans.push({
        text: match[3],
        style: { ...defaultStyle, fontStyle: 'italic' }
      });
    } else if (match[4]) {
      // Underline text
      spans.push({
        text: match[4],
        style: { ...defaultStyle, textDecoration: 'underline' }
      });
    } else if (match[5]) {
      // Normal text
      spans.push({
        text: match[5],
        style: defaultStyle
      });
    }
  }
  
  return {
    paragraphs: [{
      spans: spans.filter(span => span.text.length > 0),
      alignment: 'left'
    }],
    defaultStyle: {
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#000000',
      fontWeight: 'normal',
      fontStyle: 'normal',
      ...defaultStyle
    }
  };
}