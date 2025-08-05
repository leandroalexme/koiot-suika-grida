import { IPoint, getRectByTwoPoint, isRectIntersect } from '../utils';
import { ITool, IToolEvent } from './types';
import { IGraphics } from '../graphics/types';

export interface BoxSelectToolDependencies {
  sceneManager: any;
  selectionManager: any;
  viewportManager: any;
  zoomManager: any;
  requestRender: () => void;
  toScenePt: (x: number, y: number) => IPoint;
  setSelectionBox: (rect: any) => void;
  clearSelectionBox: () => void;
}

/**
 * Box Selection Tool - implements area selection like Suika
 */
export class BoxSelectTool implements ITool {
  name = 'boxSelect';
  cursor = 'crosshair';

  private startPoint: IPoint | null = null;
  private currentPoint: IPoint | null = null;
  private isShiftPressing = false;
  private initialSelection: IGraphics[] = [];

  constructor(private deps: BoxSelectToolDependencies) {}

  onStart(event: IToolEvent): void {
    this.startPoint = this.deps.toScenePt(event.clientX, event.clientY);
    this.currentPoint = { ...this.startPoint };
    this.isShiftPressing = event.shiftKey || false;
    
    // Store initial selection for shift+drag behavior
    this.initialSelection = this.deps.selectionManager.getSelectedItems();

    // Start with a point selection box
    this.deps.setSelectionBox(this.startPoint);
    this.deps.requestRender();
  }

  onMove(event: IToolEvent): void {
    if (!this.startPoint) return;

    this.currentPoint = this.deps.toScenePt(event.clientX, event.clientY);
    
    // Create selection rectangle
    const selectionRect = getRectByTwoPoint(this.startPoint, this.currentPoint);
    this.deps.setSelectionBox(selectionRect);

    // Find graphics within selection area
    const graphicsInSelection = this.getElementsInSelection(selectionRect);
    
    if (this.isShiftPressing) {
      // Shift+drag: add to existing selection
      const newSelection = [...this.initialSelection];
      for (const graphic of graphicsInSelection) {
        if (!newSelection.includes(graphic)) {
          newSelection.push(graphic);
        }
      }
      this.deps.selectionManager.selectItems(newSelection);
    } else {
      // Normal drag: replace selection
      this.deps.selectionManager.selectItems(graphicsInSelection);
    }

    this.deps.requestRender();
  }

  onEnd(event: IToolEvent): void {
    // Clear the selection box visual
    this.deps.clearSelectionBox();
    
    // Reset state
    this.startPoint = null;
    this.currentPoint = null;
    this.isShiftPressing = false;
    this.initialSelection = [];

    this.deps.requestRender();
  }

  onCancel(): void {
    this.deps.clearSelectionBox();
    this.startPoint = null;
    this.currentPoint = null;
    this.isShiftPressing = false;
    this.initialSelection = [];
    this.deps.requestRender();
  }

  onKeyDown(event: KeyboardEvent): void {
    // Handle keyboard events if needed
  }

  onKeyUp(event: KeyboardEvent): void {
    // Handle keyboard events if needed
  }

  /**
   * Find all graphics that intersect with the selection rectangle
   */
  private getElementsInSelection(selectionRect: any): IGraphics[] {
    const allGraphics = this.deps.sceneManager.getAllGraphics();
    const selectedGraphics: IGraphics[] = [];

    for (const graphic of allGraphics) {
      if (!graphic.isVisible()) continue;

      const graphicBounds = graphic.getBounds();
      
      // Check if graphic intersects with selection rectangle
      if (isRectIntersect(selectionRect, graphicBounds)) {
        selectedGraphics.push(graphic);
      }
    }

    return selectedGraphics;
  }
}