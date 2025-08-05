import { ViewportManager } from '../viewport-manager';
import { ZoomManager } from '../zoom-manager';
import { SelectionManager } from '../selection-manager';
import { SelectedBoxManager } from '../selected-box-manager';
import { IDrawInfo } from '../../graphics/types';
import { IPoint, IRect, IMatrixArr } from '../../utils/common';
import { IRenderer } from '../../renderer/types';
import { Matrix } from '../../utils/matrix';
import { ControlHandle } from './control-handle';
import { 
  ITransformHandleType, 
  ITransformRect, 
  ICursor 
} from './types';
import { 
  createTransformHandles, 
  updateHandlePositions, 
  shouldShowHandles,
  shouldShowRotationHandles,
  getHandleAtPoint 
} from './handle-utils';
import { cursorToCSSCursor } from './cursor-utils';
import { 
  rectToVertices, 
  rectToMidPoints, 
  getTransformAngle,
  offsetRect,
  distance
} from '../../utils/geo';
import { HandleSettingsManager, DEFAULT_HANDLE_SETTINGS } from '../../settings/handle-settings';

const HANDLE_TYPES = [
  'n', 'e', 's', 'w',
  'nwRotation', 'neRotation', 'seRotation', 'swRotation',
  'nw', 'ne', 'se', 'sw',
] as const;

/**
 * Control Handle Manager following Suika architecture but adapted for CanvasKit
 * Manages transform handles for selected graphics elements
 */
export class ControlHandleManager {
  private transformHandles: Map<ITransformHandleType, ControlHandle> = new Map();
  private customHandles: ControlHandle[] = [];
  private customHandlesVisible = false;
  private selectedBoxRect: ITransformRect | null = null;
  private enableTransformControl = true;
  private settings: HandleSettingsManager; // 🎯 Settings system like Suika

  constructor(
    private selectionManager: SelectionManager,
    private viewportManager: ViewportManager,
    private zoomManager: ZoomManager,
    private selectedBoxManager?: SelectedBoxManager
  ) {
    // Initialize settings system with Suika defaults
    this.settings = new HandleSettingsManager();
    this.createTransformHandles();
    this.bindEvents();
  }

  private bindEvents(): void {
    this.selectionManager.on('change', this.onSelectionChanged.bind(this));
    this.selectionManager.on('elementsChanged', this.onSelectionChanged.bind(this)); // 🎯 CRÍTICO: Ouvir mudanças nos elementos
    this.zoomManager.on('change', this.onSelectionChanged.bind(this));
  }

  private onSelectionChanged(): void {
    const selectedElements = this.selectionManager.getSelectedItems();
    
    if (selectedElements.length === 0) {
      this.selectedBoxRect = null;
      return;
    }

    // 🎯 CRITICAL FIX: Use SelectedBoxManager bounds instead of calculating our own
    // This ensures handles are positioned based on the SAME bounds used for the selection box
    if (this.selectedBoxManager) {
      this.selectedBoxRect = this.selectedBoxManager.getBox();
    } else {
      // Fallback to old calculation method if selectedBoxManager not available
      this.selectedBoxRect = this.calculateSelectedBounds(selectedElements);
    }
  }

  private calculateSelectedBounds(elements: any[]): ITransformRect {
    if (elements.length === 1) {
      const element = elements[0];
      const width = element.attrs.width || 100;
      const height = element.attrs.height || 100;
      
      // Use proper world transform like Suika
      let transform: IMatrixArr;
      if (element.attrs.transform) {
        transform = element.attrs.transform;
      } else {
        transform = [1, 0, 0, 1, element.attrs.x || 0, element.attrs.y || 0];
      }
      
      console.log('🎯 ControlHandleManager.calculateSelectedBounds (single):', {
        elementId: element.id,
        width, height, transform,
        elementAttrs: element.attrs
      });
      
      return { width, height, transform };
    }

    // For multiple elements, calculate combined bounds using proper bbox calculation
    const bboxes = elements.map(element => this.getBboxForElement(element));
    const mergedBbox = this.mergeBoxes(bboxes);
    const rect = this.boxToRect(mergedBbox);

    return {
      width: rect.width,
      height: rect.height,
      transform: [1, 0, 0, 1, rect.x, rect.y]
    };
  }

  private getBboxForElement(element: any): { minX: number; minY: number; maxX: number; maxY: number } {
    const width = element.attrs.width || 0;
    const height = element.attrs.height || 0;
    
    // Get world transform
    let transform: IMatrixArr;
    if (element.attrs.transform) {
      transform = element.attrs.transform;
    } else {
      transform = [1, 0, 0, 1, element.attrs.x || 0, element.attrs.y || 0];
    }
    
    return this.calcRectBbox({ width, height, transform });
  }

  private calcRectBbox(rect: { width: number; height: number; transform: IMatrixArr }): { minX: number; minY: number; maxX: number; maxY: number } {
    const { width, height, transform } = rect;
    const matrix = new Matrix(...transform);
    
    // Get all four corners of the rectangle
    const corners = [
      { x: 0, y: 0 },           // top-left
      { x: width, y: 0 },       // top-right
      { x: width, y: height },  // bottom-right
      { x: 0, y: height }       // bottom-left
    ];
    
    // Transform all corners
    const transformedCorners = corners.map(corner => matrix.apply(corner));
    
    // Find min/max bounds
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    
    for (const corner of transformedCorners) {
      minX = Math.min(minX, corner.x);
      minY = Math.min(minY, corner.y);
      maxX = Math.max(maxX, corner.x);
      maxY = Math.max(maxY, corner.y);
    }
    
    return { minX, minY, maxX, maxY };
  }

  private mergeBoxes(boxes: { minX: number; minY: number; maxX: number; maxY: number }[]): { minX: number; minY: number; maxX: number; maxY: number } {
    if (boxes.length === 0) {
      throw new Error('the count of boxes can not be 0');
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    
    for (const box of boxes) {
      minX = Math.min(minX, box.minX);
      minY = Math.min(minY, box.minY);
      maxX = Math.max(maxX, box.maxX);
      maxY = Math.max(maxY, box.maxY);
    }

    return { minX, minY, maxX, maxY };
  }

  private boxToRect(box: { minX: number; minY: number; maxX: number; maxY: number }): IRect {
    return {
      x: box.minX,
      y: box.minY,
      width: box.maxX - box.minX,
      height: box.maxY - box.minY,
    };
  }

  private createTransformHandles(): void {
    // 🎯 Use Suika-exact settings
    const handleParams = {
      size: this.settings.get('handleSize'),        // 7px like Suika
      fill: this.settings.get('handleFill'),        // '#fcfcfc' like Suika  
      stroke: this.settings.get('handleStroke'),    // '#1592fe' like Suika
      strokeWidth: this.settings.get('handleStrokeWidth') // 2px like Suika
    };

    this.transformHandles = createTransformHandles(handleParams);
  }

  private updateTransformHandles(rect: ITransformRect): void {
    if (!this.enableTransformControl) {
      return;
    }

    const zoom = this.zoomManager.getZoom();
    
    console.log('🎯 ControlHandleManager.updateTransformHandles:', {
      rect, 
      zoom,
      handleCount: this.transformHandles.size
    });
    
    // 🔥 KEY FIX: Use the new handle positioning system from handle-utils
    // This properly handles zoom responsiveness following Suika's pattern
    updateHandlePositions(this.transformHandles, rect, zoom);
  }

  private checkEnableRender(rect: ITransformRect): boolean {
    const polygon = rectToVertices(
      { x: 0, y: 0, width: Math.abs(rect.width), height: Math.abs(rect.height) },
      rect.transform
    ).map((pt) => this.viewportManager.sceneToViewport(pt));

    const minSize = 20; // Minimum size in viewport pixels
    return (
      distance(polygon[0], polygon[1]) >= minSize ||
      distance(polygon[1], polygon[2]) >= minSize
    );
  }

  /**
   * Draws all control handles in scene coordinates (like Suika)
   */
  draw(drawInfo: IDrawInfo): void {
    const rect = this.selectedBoxRect;
    if (!rect || !this.checkEnableRender(rect)) {
      return;
    }

    this.updateTransformHandles(rect);

    const zoom = this.zoomManager.getZoom();
    
    console.log('🎯 ControlHandleManager.draw:', {
      rect: this.selectedBoxRect,
      zoom,
      handlesCount: this.transformHandles.size,
      viewport: this.viewportManager.getViewport()
    });
    
    // Check if handles should be visible
    if (!shouldShowHandles(rect, zoom)) {
      return;
    }

    const showRotation = shouldShowRotationHandles(rect, zoom, this.customHandlesVisible);

    // Draw transform handles
    const handlesToDraw = Array.from(this.transformHandles.values()).filter(handle => {
      if (handle.type.includes('Rotation')) {
        return showRotation;
      }
      return true;
    });

    // Sort handles by drawing priority (corners first, then edges, then rotation)
    handlesToDraw.sort((a, b) => {
      const aPriority = a.type.includes('Rotation') ? 2 : 
                      ['nw', 'ne', 'se', 'sw'].includes(a.type) ? 0 : 1;
      const bPriority = b.type.includes('Rotation') ? 2 : 
                      ['nw', 'ne', 'se', 'sw'].includes(b.type) ? 0 : 1;
      return aPriority - bPriority;
    });

    // Draw handles using the correct renderer
    const renderer = drawInfo.renderer;
    handlesToDraw.forEach(handle => {
      handle.draw(renderer);
    });

    // Draw custom handles if any
    if (this.customHandlesVisible) {
      this.customHandles.forEach(handle => {
        handle.draw(renderer);
      });
    }
  }

  /**
   * Performs hit testing to find handle at point (in scene coordinates)
   */
  getHandleInfoByPoint(hitPoint: IPoint): {
    handleName: string;
    cursor: ICursor;
  } | null {
    if (!this.selectedBoxRect || !this.shouldRenderTransformControl()) {
      return null;
    }

    const zoom = this.zoomManager.getZoom();
    const tolerance = 5 / zoom; // Scale tolerance with zoom
    
    // Check if handles should be visible
    if (!shouldShowHandles(this.selectedBoxRect, zoom)) {
      return null;
    }

    const showRotation = shouldShowRotationHandles(this.selectedBoxRect, zoom, this.customHandlesVisible);
    
    // 🔥 KEY FIX: Use the new getHandleAtPoint function
    const handle = getHandleAtPoint(
      this.transformHandles, 
      hitPoint, 
      this.selectedBoxRect, 
      tolerance, 
      showRotation
    );
    
    if (handle) {
      const cursor = handle.getCursorAtPoint(this.selectedBoxRect);
      return {
        handleName: handle.type,
        cursor,
      };
    }

    // Check custom handles
    for (const customHandle of this.customHandles) {
      if (customHandle.containsPoint(hitPoint, tolerance, this.selectedBoxRect)) {
        const cursor = customHandle.getCursorAtPoint(this.selectedBoxRect);
        return {
          handleName: customHandle.type,
          cursor,
        };
      }
    }

    return null;
  }

  private shouldRenderTransformControl(): boolean {
    return this.selectedBoxRect !== null && this.enableTransformControl;
  }

  /**
   * Sets custom handles for specific graphics types
   */
  setCustomHandles(handles: ControlHandle[]): void {
    this.customHandles = handles;
  }

  /**
   * Gets current custom handles
   */
  getCustomHandles(): ControlHandle[] {
    return this.customHandles;
  }

  /**
   * Shows/hides custom handles
   */
  showCustomHandles(): void {
    this.customHandlesVisible = true;
  }

  hideCustomHandles(): void {
    this.customHandlesVisible = false;
  }

  /**
   * Gets the current selected box
   */
  getSelectedBox(): ITransformRect | null {
    return this.selectedBoxRect;
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.transformHandles.clear();
    this.customHandles = [];
    this.selectedBoxRect = null;
  }
}