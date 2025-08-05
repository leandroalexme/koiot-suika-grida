import { type IPoint } from '@suika/geo';

import { type SuikaEditor } from '../editor';
import { SuikaText, type TextAttrs } from '../graphics';
import { type IMousemoveEvent } from '../host_event_manager';
import { removeGraphicsAndRecord } from '../service/remove_service';
import { Transaction } from '../transaction';
import { type IRange, RangeManager } from './range_manager';

const defaultInputStyle = {
  position: 'fixed',
  width: '1px',
  zIndex: '-1',
  margin: 0,
  padding: 0,
  border: 0,
  outline: 0,
  opacity: 0,
} as const;

export class TextEditor {
  private inputDom: HTMLInputElement;
  private textGraphics: SuikaText | null = null;
  private rangeManager: RangeManager;
  private _active = false;
  private transaction!: Transaction;

  constructor(private editor: SuikaEditor) {
    this.rangeManager = new RangeManager(editor);
    this.inputDom = this.createInputDom();
    this.inactive();
    this.bindEvent();
    editor.containerElement.appendChild(this.inputDom);
  }

  private createInputDom() {
    const inputDom = document.createElement('input');
    inputDom.tabIndex = -1;
    Object.assign(inputDom.style, defaultInputStyle);
    return inputDom;
  }

  isActive() {
    return this._active;
  }

  active(params: { textGraphics?: SuikaText; pos: IPoint; range?: IRange }) {
    this._active = true;
    this.editor.controlHandleManager.enableTransformControl = false;
    this.editor.selectedBox.enableDrawSizeIndicator = false;
    this.transaction = new Transaction(this.editor);

    let textGraphics = params.textGraphics as SuikaText;

    if (!params.textGraphics) {
      const fontSize = this.editor.setting.get('defaultFontSize');
      const defaultFontFamily = this.editor.setting.get('defaultFontFamily');
      textGraphics = new SuikaText(
        {
          objectName: '',
          content: '',
          fontSize,
          fontFamily: defaultFontFamily,
          width: 0,
          height: fontSize,
          // 🚀 Rich Text temporariamente desabilitado para debug
          enableRichText: false,
          // 🎨 Markdown temporariamente desabilitado para debug  
          enableMarkdown: false,
        },
        {
          advancedAttrs: params.pos,
          doc: this.editor.doc,
        },
      );
      this.textGraphics = textGraphics;

      this.editor.sceneGraph.addItems([textGraphics]);
      this.editor.doc.getCurrCanvas().insertChild(textGraphics);
    }
    this.textGraphics = textGraphics!;
    this.editor.selectedElements.setItems([textGraphics!]);

    this.transaction.recordOld<TextAttrs>(textGraphics!.attrs.id, {
      content: textGraphics!.attrs.content,
      width: textGraphics!.attrs.width,
    });

    if (params.range) {
      this.rangeManager.setRange(params.range);
    } else {
      this.rangeManager.setRange({
        start: 0,
        end: this.textGraphics.getContentLength(),
      });
    }

    this.inputDom.value = this.textGraphics.attrs.content || '';
    this.inputDom.focus();
    this.inputDom.select();

    this.editor.render();
  }

  inactive() {
    if (!this._active) {
      return;
    }

    this._active = false;
    this.editor.controlHandleManager.enableTransformControl = true;
    this.editor.selectedBox.enableDrawSizeIndicator = true;

    if (this.textGraphics) {
      this.transaction.update<TextAttrs>(this.textGraphics.attrs.id, {
        content: this.textGraphics.attrs.content,
      });
      this.transaction.commit('Update Text');

      if (this.textGraphics.attrs.content === '') {
        removeGraphicsAndRecord(this.editor, [this.textGraphics]);
      }
    }

    this.textGraphics = null;
    this.inputDom.blur();
    this.editor.render();
  }

  drawRange() {
    // Simplified - deixar para depois implementar cursor visual
    return;
  }

  private bindEvent() {
    const inputDom = this.inputDom;
    let composingText = '';
    let leftContentWhenComposing = '';
    let rightContentWhenComposing = '';

    inputDom.addEventListener('input', (e) => {
      if (!this.isActive() || !this.textGraphics) {
        return;
      }

      const target = e.target as HTMLInputElement;
      const inputValue = target.value;
      const isComposing = (e as any).isComposing;

      if (isComposing) {
        composingText = inputValue;
        return;
      }

      if (composingText) {
        const { start, end } = this.rangeManager.getRange();
        leftContentWhenComposing = this.textGraphics.attrs.content.slice(0, start);
        rightContentWhenComposing = this.textGraphics.attrs.content.slice(end);
        this.textGraphics.updateAttrs({
          content: leftContentWhenComposing + composingText + rightContentWhenComposing,
        });
        this.rangeManager.setRange({
          start: leftContentWhenComposing.length + composingText.length,
          end: leftContentWhenComposing.length + composingText.length,
        });
        composingText = '';
        leftContentWhenComposing = '';
        rightContentWhenComposing = '';
        this.editor.render();
        return;
      }

      this.textGraphics.updateAttrs({ content: inputValue });
      this.rangeManager.setRange({ start: inputValue.length, end: inputValue.length });
      this.editor.render();
    });

    inputDom.addEventListener('keydown', (e) => {
      if (!this.isActive()) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        if (e.shiftKey) {
          this.rangeManager.moveRangeEnd(-1);
        } else {
          this.rangeManager.moveLeft();
        }
        this.editor.render();
      } else if (e.key === 'ArrowRight') {
        if (e.shiftKey) {
          this.rangeManager.moveRangeEnd(1);
        } else {
          this.rangeManager.moveRight();
        }
        this.editor.render();
      } else if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
        // Select all
        if (this.textGraphics) {
          this.rangeManager.setRange({
            start: 0,
            end: this.textGraphics.getContentLength(),
          });
          this.editor.render();
        }
      } else if (e.key === 'Escape') {
        this.inactive();
      }
    });

    inputDom.addEventListener('blur', () => {
      this.inactive();
    });

    inputDom.addEventListener('compositionend', () => {
      composingText = '';
      leftContentWhenComposing = '';
      rightContentWhenComposing = '';
    });

    // Mouse events
    const onStart = (event: IMousemoveEvent) => {
      if (
        !this.isActive() ||
        this.editor.canvasDragger.isActive() ||
        !this.textGraphics
      )
        return;

      const mousePt = event.pos;

      if (!this.textGraphics.hitTest(mousePt)) return;
      event.nativeEvent.preventDefault();

      const cursorIndex = this.textGraphics.getCursorIndex(mousePt);
      this.rangeManager.setRange({
        start: cursorIndex,
        end: cursorIndex,
      });
      this.editor.render();
    };

    const onDrag = (event: IMousemoveEvent) => {
      if (
        !this.isActive() ||
        this.editor.canvasDragger.isActive() ||
        !this.textGraphics
      ) {
        return;
      }

      const mousePt = event.pos;
      const cursorIndex = this.textGraphics.getCursorIndex(mousePt);
      this.rangeManager.setRangeEnd(cursorIndex);
      this.editor.render();
    };

    const onUpdateCursor = (event: IMousemoveEvent) => {
      this.updateCursor(event.pos);
    };

    this.editor.mouseEventManager.on('start', onStart);
    this.editor.mouseEventManager.on('drag', onDrag);
    this.editor.mouseEventManager.on('move', onUpdateCursor);
    this.editor.mouseEventManager.on('end', onUpdateCursor);
  }

  updateCursor(point: IPoint) {
    if (!this.textGraphics || !this.textGraphics.hitTest(point)) {
      this.editor.cursorManager.setCursor('default');
    } else {
      this.editor.cursorManager.setCursor('text');
    }
  }

  getTextGraphics() {
    return this.textGraphics;
  }

  isEditorInputDom(dom: HTMLElement) {
    return dom === this.inputDom;
  }

  destroy() {
    this.inputDom.remove();
  }
}
