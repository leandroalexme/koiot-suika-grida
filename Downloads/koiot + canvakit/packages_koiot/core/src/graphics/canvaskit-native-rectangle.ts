/**
 * CanvasKit Native Rectangle - TRUE CanvasKit implementation
 * 
 * Esta implementação usa APENAS APIs nativas do CanvasKit/Skia
 * sem passar pela abstração IRenderer, garantindo máxima performance.
 */

import { BaseGraphics } from './base-graphics';
import { GraphicsType, IGraphicsAttrs } from './types';
import { ICanvasKitNativeRenderer } from '../renderer/canvaskit-native-renderer';
import { CanvasKitNativeMatrix, CanvasKitMatrixUtils } from '../utils/canvaskit-native-matrix';

export interface ICanvasKitDrawInfo {
  nativeRenderer: ICanvasKitNativeRenderer;
}

export class CanvasKitNativeRectangle extends BaseGraphics {
  public type = GraphicsType.Rectangle;

  constructor(attrs: Partial<IGraphicsAttrs> & { x: number; y: number; width: number; height: number }) {
    super(attrs);
  }

  /**
   * NATIVE CanvasKit drawing - bypasses IRenderer abstraction
   */
  drawNative(drawInfo: ICanvasKitDrawInfo): void {
    if (!this.attrs.visible) {
      return;
    }

    const { nativeRenderer } = drawInfo;
    const { x, y, width, height, fill, stroke, strokeWidth } = this.attrs;
    const canvasKit = nativeRenderer.getCanvasKit();

    nativeRenderer.save();

    // ✅ Apply transform using NATIVE CanvasKit matrix
    if (this.attrs.transform && this.attrs.transform.length >= 6) {
      const transformMatrix = CanvasKitNativeMatrix.fromArray(canvasKit, this.attrs.transform);
      nativeRenderer.transformCanvas(transformMatrix.getSkiaMatrix());
      transformMatrix.delete(); // Clean up
    }

    // ✅ Create rectangle using NATIVE CanvasKit
    const rect = canvasKit.XYWHRect(x, y, width, height);

    // ✅ Draw fill with NATIVE CanvasKit Paint
    if (fill) {
      const fillColor = this.parseColorToFloat32Array(fill);
      const fillPaint = nativeRenderer.createFillPaint(fillColor);
      nativeRenderer.drawRect(rect, fillPaint);
    }

    // ✅ Draw stroke with NATIVE CanvasKit Paint  
    if (stroke && strokeWidth && strokeWidth > 0) {
      const strokeColor = this.parseColorToFloat32Array(stroke);
      const strokePaint = nativeRenderer.createStrokePaint(strokeColor, strokeWidth);
      nativeRenderer.drawRect(rect, strokePaint);
    }

    nativeRenderer.restore();
  }

  /**
   * NATIVE CanvasKit resize with proper flip support
   */
  resizeNative(
    newWidth: number,
    newHeight: number,
    options: {
      allowFlip?: boolean;
      scaleFromCenter?: boolean;
    } = {}
  ): void {
    const { allowFlip = true, scaleFromCenter = false } = options;
    
    const oldWidth = this.attrs.width;
    const oldHeight = this.attrs.height;
    
    if (oldWidth === 0 || oldHeight === 0) return;
    
    const scaleX = newWidth / oldWidth;
    const scaleY = newHeight / oldHeight;
    
    console.log('🎯 NATIVE RESIZE:', {
      oldSize: { width: oldWidth, height: oldHeight },
      newSize: { width: newWidth, height: newHeight },
      scale: { x: scaleX, y: scaleY },
      allowFlip,
      scaleFromCenter
    });

    // Update dimensions (always positive)
    this.attrs.width = Math.abs(newWidth);
    this.attrs.height = Math.abs(newHeight);

    // ✅ NATIVE CanvasKit flip handling
    if (allowFlip && (scaleX < 0 || scaleY < 0)) {
      // Get current center
      const centerX = scaleFromCenter ? 
        this.attrs.x + oldWidth / 2 : 
        this.attrs.x;
      const centerY = scaleFromCenter ? 
        this.attrs.y + oldHeight / 2 : 
        this.attrs.y;

      // Create native flip matrix
      const flipMatrix = CanvasKitMatrixUtils.createFlipMatrix(
        // We need access to canvasKit here - this would be passed from the renderer
        null as any, // TODO: Pass canvasKit instance
        {
          flipX: scaleX < 0,
          flipY: scaleY < 0,
          centerX,
          centerY
        }
      );

      // Apply to transform
      const currentTransform = this.attrs.transform || [1, 0, 0, 1, this.attrs.x, this.attrs.y];
      const currentMatrix = CanvasKitNativeMatrix.fromArray(null as any, currentTransform);
      
      currentMatrix.multiply(flipMatrix);
      this.attrs.transform = currentMatrix.getArray();
      
      // Update position from transform
      this.attrs.x = this.attrs.transform[4];
      this.attrs.y = this.attrs.transform[5];
      
      // Clean up
      flipMatrix.delete();
      currentMatrix.delete();
      
      console.log('🎯 NATIVE FLIP APPLIED:', {
        flipX: scaleX < 0,
        flipY: scaleY < 0,
        newTransform: this.attrs.transform,
        newPosition: { x: this.attrs.x, y: this.attrs.y }
      });
    }
  }

  /**
   * Parse color string to Float32Array for CanvasKit
   */
  private parseColorToFloat32Array(color: string): Float32Array {
    // Handle hex colors
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      let r, g, b;
      
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16) / 255;
        g = parseInt(hex[1] + hex[1], 16) / 255;
        b = parseInt(hex[2] + hex[2], 16) / 255;
      } else {
        r = parseInt(hex.slice(0, 2), 16) / 255;
        g = parseInt(hex.slice(2, 4), 16) / 255;
        b = parseInt(hex.slice(4, 6), 16) / 255;
      }
      
      return new Float32Array([r, g, b, 1.0]);
    }
    
    // Handle rgb/rgba
    if (color.startsWith('rgb')) {
      const match = color.match(/rgba?\(([^)]+)\)/);
      if (match) {
        const values = match[1].split(',').map(v => parseFloat(v.trim()));
        const r = values[0] / 255;
        const g = values[1] / 255;
        const b = values[2] / 255;
        const a = values.length > 3 ? values[3] : 1.0;
        return new Float32Array([r, g, b, a]);
      }
    }
    
    // Default to black
    return new Float32Array([0, 0, 0, 1.0]);
  }

  /**
   * Get bounding box in world coordinates using NATIVE CanvasKit
   */
  getBoundingBoxNative(canvasKit: any): { x: number; y: number; width: number; height: number } {
    const { x, y, width, height, transform } = this.attrs;
    
    if (!transform || transform.length < 6) {
      return { x, y, width, height };
    }
    
    // ✅ Use NATIVE CanvasKit matrix for accurate bounds
    const matrix = CanvasKitNativeMatrix.fromArray(canvasKit, transform);
    
    // Transform all corners
    const corners = [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height }
    ];
    
    const transformedCorners = matrix.transformPoints(corners);
    
    // Find bounding box
    let minX = transformedCorners[0].x;
    let maxX = transformedCorners[0].x;
    let minY = transformedCorners[0].y;
    let maxY = transformedCorners[0].y;
    
    for (const corner of transformedCorners) {
      minX = Math.min(minX, corner.x);
      maxX = Math.max(maxX, corner.x);
      minY = Math.min(minY, corner.y);
      maxY = Math.max(maxY, corner.y);
    }
    
    matrix.delete(); // Clean up
    
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
}

/**
 * Factory for creating CanvasKit native graphics
 */
export class CanvasKitNativeGraphicsFactory {
  
  static createRectangle(
    attrs: Partial<IGraphicsAttrs> & { x: number; y: number; width: number; height: number }
  ): CanvasKitNativeRectangle {
    return new CanvasKitNativeRectangle(attrs);
  }
}