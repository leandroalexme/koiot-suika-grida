/**
 * SelectResizeTool - Exact implementation from Suika adapted for CanvasKit
 * 
 * Handles resizing of selected elements by dragging control handles
 * Follows Suika's precise resize algorithms and behavior
 */

import { IPoint, IMatrixArr } from '../../utils/common';
import { IGraphics } from '../../graphics/types';
import { resizeRect, resizeLine, ITransformRect } from '../../utils/resize-geometry';
import { IBaseTool, IToolEvent } from '../types';
import { 
  detectCanvasKitFlip, 
  applyCanvasKitMultiFlip,
  normalizeCanvasKitMatrix 
} from '../../utils/canvaskit-transforms';

export interface SelectResizeToolDeps {
  selectionManager: {
    getSelectedItems(): IGraphics[];
    notifyElementsChanged(): void;
  };
  controlHandleManager: {
    getHandleInfoByPoint(point: IPoint): { handleName: string; cursor: any } | null;
    getSelectedBox(): ITransformRect | null;
  };
  requestRender(): void;
  toScenePt: (x: number, y: number) => IPoint;
  getSceneCursorXY: (event: { clientX: number; clientY: number }) => IPoint;
}

/**
 * Tool for resizing selected elements using control handles
 * Following Suika's exact architecture and behavior
 */
export class SelectResizeTool implements IBaseTool {
  private isActive = false;
  private startPoint: IPoint = { x: 0, y: 0 };
  private lastDragPoint: IPoint | null = null;
  private activeHandleName = '';
  private startSelectedRect: ITransformRect | null = null;
  
  // Store original state for undo/redo
  private originalAttrsMap = new Map<string, any>();
  private originalWorldTransforms = new Map<string, any>();
  private updatedAttrsMap = new Map<string, any>();

  constructor(private deps: SelectResizeToolDeps) {}

  onActive(): void {
    // Tool is now active
  }

  onInactive(): void {
    // Clean up when tool becomes inactive
    this.reset();
  }

  /**
   * Start resize operation - IBaseTool interface
   */
  onStart(event: IToolEvent): void {
    // Convert event to scene coordinates
    this.startPoint = this.deps.toScenePt(event.clientX, event.clientY);
    
    // Check if we hit a control handle
    const handleInfo = this.deps.controlHandleManager.getHandleInfoByPoint(this.startPoint);
    if (!handleInfo) {
      return; // No handle hit, don't start resize
    }

    this.activeHandleName = handleInfo.handleName;
    this.isActive = true;

    // Store original state for all selected elements
    const selectedElements = this.deps.selectionManager.getSelectedItems();
    this.originalAttrsMap.clear();
    this.originalWorldTransforms.clear();
    this.updatedAttrsMap.clear();

    selectedElements.forEach((element: IGraphics, index: number) => {
      const id = element.id || `element_${index}`;
      this.originalAttrsMap.set(id, { ...element.attrs });
      // Store world transform (simplified - in real implementation would get proper transform)
      this.originalWorldTransforms.set(id, element.attrs.transform || [1, 0, 0, 1, element.attrs.x || 0, element.attrs.y || 0]);
    });

    // Store the selected box bounds at start
    this.startSelectedRect = this.deps.controlHandleManager.getSelectedBox();
    if (!this.startSelectedRect) {
      this.isActive = false;
      return;
    }
  }

  /**
   * Update resize during drag - IBaseTool interface
   */
  onDrag(event: IToolEvent): void {
    if (!this.isActive) return;

    // Convert event to scene coordinates
    this.lastDragPoint = this.deps.toScenePt(event.clientX, event.clientY);
    
    const modifiers = {
      shiftKey: event.shiftKey || false,
      altKey: event.altKey || false
    };
    
    this.updateGraphics(modifiers);
    
    // CRITICAL: Notify selection manager about changes IMMEDIATELY
    // This ensures the handle positions are updated in real-time
    this.deps.selectionManager.notifyElementsChanged();
    this.deps.requestRender();
  }

  /**
   * End resize operation - IBaseTool interface
   */
  onEnd(): void {
    if (!this.isActive) return;

    // Apply final state and clean up
    this.isActive = false;
    this.deps.selectionManager.notifyElementsChanged();
    this.deps.requestRender();
    
    // TODO: Create undo/redo command with originalAttrsMap and updatedAttrsMap
    this.reset();
  }

  /**
   * After end cleanup - IBaseTool interface
   */
  afterEnd(): void {
    // Additional cleanup if needed
    this.reset();
  }

  private reset(): void {
    this.isActive = false;
    this.lastDragPoint = null;
    this.activeHandleName = '';
    this.startSelectedRect = null;
    this.originalAttrsMap.clear();
    this.originalWorldTransforms.clear();
    this.updatedAttrsMap.clear();
  }

  /**
   * Get proper world transform for element (like Suika)
   */
  private getElementWorldTransform(element: any, originalAttrs: any): IMatrixArr {
    // If element has explicit transform matrix, use it
    if (originalAttrs.transform && Array.isArray(originalAttrs.transform) && originalAttrs.transform.length >= 6) {
      return originalAttrs.transform;
    }
    
    // Otherwise create identity matrix with translation
    return [1, 0, 0, 1, originalAttrs.x || 0, originalAttrs.y || 0];
  }

  private updateGraphics(modifiers: { shiftKey: boolean; altKey: boolean }): void {
    const selectedElements = this.deps.selectionManager.getSelectedItems();
    
    console.log('🔧 UpdateGraphics called:', {
      elementCount: selectedElements.length,
      activeHandle: this.activeHandleName,
      lastDragPoint: this.lastDragPoint,
      modifiers
    });
    
    if (selectedElements.length === 1) {
      this.resizeSingleItem(selectedElements[0], modifiers);
    } else if (selectedElements.length > 1) {
      this.resizeMultipleItems(selectedElements, modifiers);
    }
  }

  /**
   * Resize a single selected item
   */
  private resizeSingleItem(graphics: IGraphics, modifiers: { shiftKey: boolean; altKey: boolean }): void {
    if (!this.lastDragPoint || !this.startSelectedRect) {
      return;
    }

    const id = graphics.id || Math.random().toString();
    const originalAttrs = this.originalAttrsMap.get(id);
    const originalWorldTransform = this.originalWorldTransforms.get(id);
    
    if (!originalAttrs || !originalWorldTransform) {
      return;
    }

    // Calculate new attributes using Suika's resize functions
    // Use the element's current size and proper world transform
    const oldRect: ITransformRect = {
      width: originalAttrs.width || 0,
      height: originalAttrs.height || 0,
      // Use proper world transform, not just stored attributes
      transform: this.getElementWorldTransform(graphics, originalAttrs) as [number, number, number, number, number, number]
    };

    let newAttrs;
    
    // Use different resize functions based on graphics type
    if (originalAttrs.height === 0) {
      // Line graphics - use resizeLine
      newAttrs = resizeLine(this.activeHandleName, this.lastDragPoint, oldRect, {
        keepPolarSnap: modifiers.shiftKey,
        scaleFromCenter: modifiers.altKey,
      });
    } else {
      // Rectangle graphics - use resizeRect  
      newAttrs = resizeRect(this.activeHandleName, this.lastDragPoint, oldRect, {
        keepRatio: modifiers.shiftKey,
        scaleFromCenter: modifiers.altKey,
        flip: true, // 🎯 HARDCODED: Sempre habilitado para teste
      });
    }

    // 🎯 CORREÇÃO CRÍTICA: Usar novo método updateByControlHandle
    if (newAttrs && this.checkEnableUpdate(oldRect, newAttrs)) {
      console.log('🔧 Applying resize result:', {
        element: graphics.id,
        old: { width: graphics.attrs.width, height: graphics.attrs.height, transform: graphics.getWorldTransform() },
        new: { width: newAttrs.width, height: newAttrs.height, transform: newAttrs.transform }
      });
      
      // 🎯 CORREÇÃO CRÍTICA: Usar mesmo padrão dos múltiplos elementos
      console.log('🔧 Applying single element resize - using same pattern as multiple elements');
      
      // Aplicar diretamente nos attrs (mesmo padrão dos múltiplos elementos)
      graphics.attrs.width = newAttrs.width;
      graphics.attrs.height = newAttrs.height;
      
      // Extrair posição do transform matrix
      graphics.attrs.x = newAttrs.transform[4];
      graphics.attrs.y = newAttrs.transform[5];
      
      // Aplicar transform completo se disponível
      if (graphics.setWorldTransform) {
        graphics.setWorldTransform(newAttrs.transform);
      } else {
        graphics.attrs.transform = [...newAttrs.transform];
      }
      
      console.log('🔧 Single element updated:', {
        width: graphics.attrs.width,
        height: graphics.attrs.height,
        x: graphics.attrs.x,
        y: graphics.attrs.y,
        transform: newAttrs.transform
      });

      this.updatedAttrsMap.set(id, { 
        width: graphics.attrs.width,
        height: graphics.attrs.height,
        transform: graphics.getWorldTransform(),
        x: graphics.x,
        y: graphics.y
      });
    }
  }

  /**
   * Resize multiple selected items
   */
  private resizeMultipleItems(elements: IGraphics[], modifiers: { shiftKey: boolean; altKey: boolean }): void {
    if (!this.lastDragPoint || !this.startSelectedRect) {
      return;
    }

    // For multiple selection, calculate the combined bounding box transformation
    // and apply proportional scaling to each element
    
    // Calculate new bounds for the combined selection
    const combinedOldRect: ITransformRect = {
      width: this.startSelectedRect.width,
      height: this.startSelectedRect.height,
      transform: this.startSelectedRect.transform
    };

    const newCombinedRect = resizeRect(this.activeHandleName, this.lastDragPoint, combinedOldRect, {
      keepRatio: modifiers.shiftKey,
      scaleFromCenter: modifiers.altKey,
      flip: true, // 🎯 HARDCODED: Sempre habilitado para teste
    });

    if (!this.checkEnableUpdate(combinedOldRect, newCombinedRect)) {
      return;
    }

    // 🎯 CANVASKIT MULTI-SELECTION LOGIC
    // Usar utilidades específicas do CanvasKit para detectar e aplicar flip
    const newTransform = newCombinedRect.transform;
    const oldTransform = combinedOldRect.transform;
    
    // Detectar flip usando utilitário específico do CanvasKit
    const { flipX, flipY } = detectCanvasKitFlip(newTransform);
    const hasFlip = flipX || flipY;
    
    // Scale factors normalizados para CanvasKit
    const scaleX = newCombinedRect.width / combinedOldRect.width;
    const scaleY = newCombinedRect.height / combinedOldRect.height;
    
    console.log('🎯 CanvasKit multi-selection analysis:', { 
      scaleX, 
      scaleY, 
      flipX,
      flipY,
      hasFlip,
      matrixComponents: { a: newTransform[0], b: newTransform[1], c: newTransform[2], d: newTransform[3], tx: newTransform[4], ty: newTransform[5] },
      oldDimensions: { width: combinedOldRect.width, height: combinedOldRect.height },
      newDimensions: { width: newCombinedRect.width, height: newCombinedRect.height }
    });

    // Apply proportional scaling to each element PRESERVANDO flip
    elements.forEach((element: IGraphics, index: number) => {
      const id = element.id || `element_${index}`;
      const originalAttrs = this.originalAttrsMap.get(id);
      
      if (!originalAttrs) return;

      // Calculate element's relative position within the selection bounds
      const relativeX = (originalAttrs.x || 0) - combinedOldRect.transform[4];
      const relativeY = (originalAttrs.y || 0) - combinedOldRect.transform[5];

      // 🎯 CANVASKIT MULTI-ELEMENT SCALING & FLIP
      const newWidth = (originalAttrs.width || 0) * scaleX;
      const newHeight = (originalAttrs.height || 0) * scaleY;
      
      // 🎯 FIGMA-STYLE MULTI-SELECTION FLIP
      if (hasFlip) {
        console.log(`🎯 Figma-style flip for element ${id}:`, { flipX, flipY, newWidth, newHeight });
        
        // ABORDAGEM FIGMA: Reflexão que preserva posição visual
        // 1. Calcular centro da seleção original
        const selectionCenterX = combinedOldRect.transform[4] + combinedOldRect.width / 2;
        const selectionCenterY = combinedOldRect.transform[5] + combinedOldRect.height / 2;
        
        // 2. Calcular posição do elemento relativa ao centro da seleção
        const elementCenterX = (originalAttrs.x || 0) + (originalAttrs.width || 0) / 2;
        const elementCenterY = (originalAttrs.y || 0) + (originalAttrs.height || 0) / 2;
        
        const relativeX = elementCenterX - selectionCenterX;
        const relativeY = elementCenterY - selectionCenterY;
        
        // 3. Aplicar reflexão à posição relativa
        const flippedRelativeX = flipX ? -relativeX : relativeX;
        const flippedRelativeY = flipY ? -relativeY : relativeY;
        
        // 4. Calcular nova posição absoluta do elemento
        const newSelectionCenterX = newCombinedRect.transform[4] + newCombinedRect.width / 2;
        const newSelectionCenterY = newCombinedRect.transform[5] + newCombinedRect.height / 2;
        
        const newElementCenterX = newSelectionCenterX + (flippedRelativeX * Math.abs(scaleX));
        const newElementCenterY = newSelectionCenterY + (flippedRelativeY * Math.abs(scaleY));
        
        // 5. Posição final (top-left corner)
        const finalWidth = Math.abs(newWidth);
        const finalHeight = Math.abs(newHeight);
        const newX = newElementCenterX - finalWidth / 2;
        const newY = newElementCenterY - finalHeight / 2;
        
        // 6. Aplicar reflexão local ao elemento
        let localTransform: [number, number, number, number, number, number] = [1, 0, 0, 1, 0, 0];
        
        if (flipX || flipY) {
          // Criar matriz de reflexão local
          const scaleX = flipX ? -1 : 1;
          const scaleY = flipY ? -1 : 1;
          const offsetX = flipX ? finalWidth : 0;
          const offsetY = flipY ? finalHeight : 0;
          
          localTransform = [scaleX, 0, 0, scaleY, offsetX, offsetY];
        }
        
        // Aplicar ao elemento
        element.attrs.width = finalWidth;
        element.attrs.height = finalHeight;
        element.attrs.x = newX;
        element.attrs.y = newY;
        element.attrs.transform = localTransform;
        
        console.log(`🎯 Figma-style element ${id} flipped:`, {
          originalPosition: { x: originalAttrs.x, y: originalAttrs.y },
          elementCenter: { x: elementCenterX, y: elementCenterY },
          selectionCenter: { x: selectionCenterX, y: selectionCenterY },
          relativePosition: { x: relativeX, y: relativeY },
          flippedRelative: { x: flippedRelativeX, y: flippedRelativeY },
          newPosition: { x: newX, y: newY },
          localTransform,
          flipInfo: { flipX, flipY }
        });
      } else {
        // Sem flip - aplicar scaling normal
        element.attrs.width = newWidth;
        element.attrs.height = newHeight;
        element.attrs.x = newCombinedRect.transform[4] + (relativeX * scaleX);
        element.attrs.y = newCombinedRect.transform[5] + (relativeY * scaleY);
        
        console.log(`🎯 Element ${id} normal scaling:`, {
          position: { x: element.attrs.x, y: element.attrs.y },
          dimensions: { width: newWidth, height: newHeight }
        });
      }

      this.updatedAttrsMap.set(id, {
        width: element.attrs.width,
        height: element.attrs.height,
        x: element.attrs.x,
        y: element.attrs.y
      });
    });
  }

  /**
   * Check if the resize update should be applied
   * Prevents degenerate cases (zero or very small dimensions)
   */
  private checkEnableUpdate(
    originAttrs: ITransformRect,
    updatedAttrs: ITransformRect,
  ): boolean {
    const minSize = 1; // Minimum size in pixels

    // Check for minimum size
    if (Math.abs(updatedAttrs.width) < minSize || Math.abs(updatedAttrs.height) < minSize) {
      return false;
    }

    // Additional checks can be added here (e.g., maximum size, aspect ratio limits)
    return true;
  }

  // Public getters for integration
  getIsActive(): boolean {
    return this.isActive;
  }

  getActiveHandleName(): string {
    return this.activeHandleName;
  }
}