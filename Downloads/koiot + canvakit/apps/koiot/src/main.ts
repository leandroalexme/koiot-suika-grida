import { KoiotEditor } from '@koiot/core';

class App {
  private editor: KoiotEditor | null = null;
  private statusElement: HTMLElement;
  private loadingElement: HTMLElement;
  private editorContainer: HTMLElement;

  constructor() {
    this.statusElement = document.getElementById('status')!;
    this.loadingElement = document.getElementById('loading')!;
    this.editorContainer = document.getElementById('editor-container')!;
    
    this.init();
  }

  private async init(): Promise<void> {
    try {
      this.updateStatus('Loading CanvasKit...');
      
      // Create the editor
      this.editor = new KoiotEditor({
        container: this.editorContainer,
        canvasKitConfig: {
          locateFile: (file: string) => {
            // Use unpkg CDN for CanvasKit files
            return `https://unpkg.com/canvaskit-wasm@0.39.1/bin/${file}`;
          }
        }
      });

      // Wait for editor to be ready
      this.editor.on('ready', () => {
        this.hideLoading();
        this.updateStatus('Ready - Click and drag to move the square, use mouse wheel to zoom');
        this.setupInstructions();
      });

    } catch (error) {
      console.error('Failed to initialize editor:', error);
      this.updateStatus('Failed to initialize editor');
    }
  }

  private updateStatus(message: string): void {
    this.statusElement.textContent = message;
  }

  private hideLoading(): void {
    this.loadingElement.style.display = 'none';
  }

  private setupInstructions(): void {
    // Add keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      if (!this.editor) return;

      switch (event.key) {
        case 'Escape':
          this.editor.selectionManager.clearSelection();
          break;
        case '1':
          this.editor.zoomManager.resetZoom();
          break;
      }
    });

    // Update status with instructions
    setTimeout(() => {
      this.updateStatus('🎯 BOX SELECTION: Click individual squares OR drag to select multiple! • Mouse wheel = zoom • Middle mouse = pan • ESC = deselect • "1" = reset zoom');
    }, 1000);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});