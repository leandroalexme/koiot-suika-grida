import { EventEmitter } from '../utils/common';
import { IGraphics } from '../graphics/types';

interface SelectionEvents {
  change: (selected: IGraphics[]) => void;
  elementsChanged: (selected: IGraphics[]) => void; // Triggered when selected elements are modified (moved, resized, etc.)
}

export class SelectionManager {
  private selectedItems: IGraphics[] = [];
  private eventEmitter = new EventEmitter<SelectionEvents>();

  getSelectedItems(): IGraphics[] {
    return [...this.selectedItems];
  }

  selectItem(item: IGraphics): void {
    if (!this.selectedItems.includes(item) && !item.isDeleted()) {
      this.selectedItems = [item];
      this.eventEmitter.emit('change', this.selectedItems);
    }
  }

  selectItems(items: IGraphics[]): void {
    this.selectedItems = items.filter(item => !item.isDeleted());
    this.eventEmitter.emit('change', this.selectedItems);
  }

  addToSelection(item: IGraphics): void {
    if (!this.selectedItems.includes(item) && !item.isDeleted()) {
      this.selectedItems.push(item);
      this.eventEmitter.emit('change', this.selectedItems);
    }
  }

  removeFromSelection(item: IGraphics): void {
    const index = this.selectedItems.indexOf(item);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.eventEmitter.emit('change', this.selectedItems);
    }
  }

  clearSelection(): void {
    if (this.selectedItems.length > 0) {
      this.selectedItems = [];
      this.eventEmitter.emit('change', this.selectedItems);
    }
  }

  /**
   * Remove deleted elements from selection automatically
   */
  cleanupDeletedElements(): void {
    const oldLength = this.selectedItems.length;
    this.selectedItems = this.selectedItems.filter(item => !item.isDeleted());
    if (this.selectedItems.length !== oldLength) {
      this.eventEmitter.emit('change', this.selectedItems);
    }
  }

  isSelected(item: IGraphics): boolean {
    return this.selectedItems.includes(item);
  }

  getSelectionBounds(): any {
    if (this.selectedItems.length === 0) {
      return null;
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const item of this.selectedItems) {
      const bounds = item.getBounds();
      minX = Math.min(minX, bounds.x);
      minY = Math.min(minY, bounds.y);
      maxX = Math.max(maxX, bounds.x + bounds.width);
      maxY = Math.max(maxY, bounds.y + bounds.height);
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }

  /**
   * Notify that selected elements have been modified (moved, resized, etc.)
   * This keeps handles and selection box in sync
   */
  notifyElementsChanged(): void {
    if (this.selectedItems.length > 0) {
      this.eventEmitter.emit('elementsChanged', this.selectedItems);
    }
  }

  on<K extends keyof SelectionEvents>(event: K, handler: SelectionEvents[K]): void {
    this.eventEmitter.on(event, handler);
  }

  off<K extends keyof SelectionEvents>(event: K, handler: SelectionEvents[K]): void {
    this.eventEmitter.off(event, handler);
  }
}