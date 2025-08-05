import { noop } from '../../common/src/utils';
import { type KoiotEditor } from './editor';
import { copyElementsAndRecord, pasteElementsAndRecord } from './service/clipboard-service';

/**
 * Clipboard Manager - Refatorado para usar Services (baseado no Suika)
 * Coordena clipboard operations através do sistema de Services e Commands
 */
export class ClipboardManager {
  private unbindEvents = noop;
  private hasBindEvents = false;
  
  constructor(private editor: KoiotEditor) {}

  bindEvents() {
    if (this.hasBindEvents) {
      console.log('ClipboardManager already bound, please destroy first');
      return;
    }
    this.hasBindEvents = true;

    // Copy handler using service
    const copyHandler = () => {
      copyElementsAndRecord(this.editor);
    };

    // Paste handler using service
    const pasteHandler = (e: Event) => {
      const event = e as ClipboardEvent;
      const clipboardData = event.clipboardData;
      
      // Skip if target is input/textarea
      if (
        !clipboardData ||
        ((e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement))
      ) {
        return;
      }

      // Handle image files
      if (clipboardData.files.length > 0) {
        for (const file of Array.from(clipboardData.files)) {
          if (file.type.includes('image')) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64 = e.target?.result as string;
              this.createGraphicsWithImg(base64);
            };
            reader.readAsDataURL(file);
          }
        }
        return;
      }

      // Handle text paste - let service handle it
      pasteElementsAndRecord(this.editor);
    };

    // Register copy shortcut
    this.editor.keybindingManager.register({
      key: { metaKey: true, keyCode: 'KeyC' },
      winKey: { ctrlKey: true, keyCode: 'KeyC' },
      actionName: 'Copy',
      action: copyHandler,
    });

    // Register paste shortcut
    this.editor.keybindingManager.register({
      key: { metaKey: true, keyCode: 'KeyV' },
      winKey: { ctrlKey: true, keyCode: 'KeyV' },
      actionName: 'Paste',
      action: () => pasteElementsAndRecord(this.editor),
    });

    // Listen for paste events
    window.addEventListener('paste', pasteHandler);

    this.unbindEvents = () => {
      window.removeEventListener('paste', pasteHandler);
    };
  }

  private async createGraphicsWithImg(imgUrl: string) {
    // TODO: Implement image creation with CanvasKit
    console.log('Creating graphics with image:', imgUrl);
    // For now, just log - we'll implement this when we have image support
  }

  /**
   * Copy selected elements (delegated to service)
   */
  copy(): boolean {
    return copyElementsAndRecord(this.editor);
  }

  /**
   * Paste at specific coordinates (delegated to service)
   */
  async pasteAt(point: { x: number; y: number }): Promise<boolean> {
    return pasteElementsAndRecord(this.editor, point);
  }

  destroy() {
    this.hasBindEvents = false;
    this.unbindEvents();
  }
}