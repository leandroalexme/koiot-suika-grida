import { EventEmitter, IRect, IMatrixArr } from '../utils/common';
import { IGraphics } from '../graphics/types';
import { IRenderer } from '../renderer/types';
import { ITransformRect } from './control-handle-manager/types';
import { SelectionManager } from './selection-manager';

interface SelectedBoxEvents {
  hoverChange: (isHover: boolean) => void;
  boundsChange: (bounds: ITransformRect | null) => void;
}

export class SelectedBoxManager {
  private eventEmitter = new EventEmitter<SelectedBoxEvents>();
  private box: ITransformRect | null = null;
  private isHovered = false;
  
  public enableDrawSizeIndicator = true;
  public strokeColor = '#1890ff';
  public strokeWidth = 1;
  public selectionBoxStrokeColor = '#1890ff';
  public selectionBoxStrokeWidth = 1;

  constructor(private selectionManager: SelectionManager) {
    this.bindEvents();
  }

  private bindEvents(): void {
    this.selectionManager.on('change', this.updateBounds.bind(this));
    this.selectionManager.on('elementsChanged', this.updateBounds.bind(this)); // 🎯 CRÍTICO: Recalcular bounds quando elementos se movem
  }

  isHover(): boolean {
    return this.isHovered;
  }

  setHover(hover: boolean): void {
    if (this.isHovered !== hover) {
      this.isHovered = hover;
      this.eventEmitter.emit('hoverChange', hover);
    }
  }

  getBox(): ITransformRect | null {
    return this.box ? { ...this.box } : null;
  }

  private updateBounds(): void {
    const selectedItems = this.selectionManager.getSelectedItems();
    
    if (selectedItems.length === 0) {
      this.setBox(null);
      return;
    }

    if (selectedItems.length === 1) {
      // 🎯 CORREÇÃO CRÍTICA: Sistema simplificado usando transform unificado
      const item = selectedItems[0];
      
      console.log('🔧 SelectedBoxManager.updateBounds (single item):', {
        itemId: item.id,
        worldTransform: item.getWorldTransform(),
        width: item.attrs.width,
        height: item.attrs.height
      });
      
      // 🎯 SOLUÇÃO SIMPLES: Usar getWorldTransform() que agora é confiável
      const worldTransform = item.getWorldTransform();
      
      this.setBox({
        width: item.attrs.width,   // Manter dimensões reais (incluindo negativas para flip)
        height: item.attrs.height, // Não usar Math.abs() para preservar informação de flip
        transform: worldTransform, // Transform consistente e confiável
      });
    } else {
      // Multiple selection - calculate combined bounds
      const combinedBounds = this.calculateCombinedBounds(selectedItems);
      this.setBox({
        width: combinedBounds.width,
        height: combinedBounds.height,
        transform: [1, 0, 0, 1, combinedBounds.x, combinedBounds.y],
      });
    }
  }

  private calculateCombinedBounds(items: IGraphics[]): IRect {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    items.forEach(item => {
      const bounds = item.getBounds();
      minX = Math.min(minX, bounds.x);
      minY = Math.min(minY, bounds.y);
      maxX = Math.max(maxX, bounds.x + bounds.width);
      maxY = Math.max(maxY, bounds.y + bounds.height);
    });

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  private setBox(box: ITransformRect | null): void {
    this.box = box;
    this.eventEmitter.emit('boundsChange', box);
  }

  /**
   * Draw selection box
   */
  draw(renderer: IRenderer): void {
    if (!this.box) return;

    renderer.save();
    
    // Apply transform
    const t = this.box.transform;
    renderer.setTransform(t[0], t[1], t[2], t[3], t[4], t[5]);
    
    // Draw selection box outline
    renderer.strokeStyle = this.selectionBoxStrokeColor;
    renderer.lineWidth = this.selectionBoxStrokeWidth;
    renderer.strokeRect(0, 0, this.box.width, this.box.height);
    
    // Draw size indicator if enabled and hovered
    if (this.enableDrawSizeIndicator && this.isHovered) {
      this.drawSizeIndicator(renderer);
    }
    
    renderer.restore();
  }

  private drawSizeIndicator(renderer: IRenderer): void {
    if (!this.box) return;
    
    const width = Math.round(this.box.width);
    const height = Math.round(this.box.height);
    const text = `${width} × ${height}`;
    
    // Position indicator at center-top of selection box
    const centerX = this.box.width / 2;
    const topY = 0;
    
    // Estimate text dimensions (approximate)
    const charWidth = 7; // Approximate character width
    const textWidth = text.length * charWidth;
    const textHeight = 16;
    
    // Draw background
    const padding = 4;
    const bgWidth = textWidth + padding * 2;
    const bgHeight = textHeight + padding * 2;
    const bgX = centerX - bgWidth / 2;
    const bgY = topY - bgHeight - 8; // 8px offset above selection
    
    renderer.fillStyle = 'rgba(0, 0, 0, 0.8)';
    renderer.fillRect(bgX, bgY, bgWidth, bgHeight);
    
    // Note: Text rendering would need to be implemented in the renderer
    // For now, we'll just draw the background. Text rendering can be added later
    // when we have proper text support in the CanvasKit renderer
    
    // TODO: Implement text rendering
    // renderer.fillStyle = '#ffffff';
    // renderer.font = '12px sans-serif';
    // renderer.textAlign = 'center';
    // renderer.fillText(text, centerX, bgY + bgHeight / 2 + 4);
  }

  /**
   * Check if point is inside selection box
   */
  containsPoint(point: { x: number; y: number }): boolean {
    if (!this.box) return false;
    
    // Transform point to local coordinates
    const transform = this.box.transform;
    const det = transform[0] * transform[3] - transform[1] * transform[2];
    if (Math.abs(det) < 1e-10) return false; // Degenerate transform
    
    const invDet = 1 / det;
    const localX = invDet * (transform[3] * (point.x - transform[4]) - transform[2] * (point.y - transform[5]));
    const localY = invDet * (-transform[1] * (point.x - transform[4]) + transform[0] * (point.y - transform[5]));
    
    return localX >= 0 && localX <= this.box.width &&
           localY >= 0 && localY <= this.box.height;
  }

  /**
   * Get selection bounds in world coordinates
   */
  getWorldBounds(): IRect | null {
    if (!this.box) return null;
    
    const transform = this.box.transform;
    return {
      x: transform[4],
      y: transform[5],
      width: this.box.width,
      height: this.box.height
    };
  }

  /**
   * Event handling
   */
  on<K extends keyof SelectedBoxEvents>(event: K, handler: SelectedBoxEvents[K]): void {
    this.eventEmitter.on(event, handler);
  }

  off<K extends keyof SelectedBoxEvents>(event: K, handler: SelectedBoxEvents[K]): void {
    this.eventEmitter.off(event, handler);
  }

  /**
   * Cleanup
   */
  destroy(): void {
    this.eventEmitter.removeAllListeners();
  }
}