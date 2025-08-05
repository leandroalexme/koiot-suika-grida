/**
 * CanvasKit Native Matrix - TRUE Skia Matrix implementation
 * 
 * Esta implementação usa APENAS a Matrix nativa do CanvasKit/Skia
 * garantindo máxima performance com hardware acceleration.
 */

// Note: Using any for CanvasKit types due to incomplete type definitions
export type CanvasKitAPI = any;
export type Matrix = any;
import { IMatrixArr, IPoint } from './common';

export class CanvasKitNativeMatrix {
  private canvasKit: CanvasKitAPI;
  private skiaMatrix: Matrix;

  constructor(canvasKit: CanvasKitAPI, matrix?: Matrix) {
    this.canvasKit = canvasKit;
    this.skiaMatrix = matrix || canvasKit.Matrix.identity();
  }

  // ✅ Factory methods
  static fromArray(canvasKit: CanvasKitAPI, arr: IMatrixArr): CanvasKitNativeMatrix {
    const matrix = canvasKit.Matrix.multiply(
      canvasKit.Matrix.identity(),
      arr as Float32Array
    );
    return new CanvasKitNativeMatrix(canvasKit, matrix);
  }

  static identity(canvasKit: CanvasKitAPI): CanvasKitNativeMatrix {
    return new CanvasKitNativeMatrix(canvasKit, canvasKit.Matrix.identity());
  }

  // ✅ Native Skia operations - HARDWARE ACCELERATED
  translate(x: number, y: number): this {
    const translateMatrix = this.canvasKit.Matrix.translated(x, y);
    this.skiaMatrix = this.canvasKit.Matrix.multiply(this.skiaMatrix, translateMatrix);
    translateMatrix.delete(); // Clean up
    return this;
  }

  scale(sx: number, sy: number): this {
    const scaleMatrix = this.canvasKit.Matrix.scaled(sx, sy);
    this.skiaMatrix = this.canvasKit.Matrix.multiply(this.skiaMatrix, scaleMatrix);
    scaleMatrix.delete(); // Clean up
    return this;
  }

  rotate(angle: number): this {
    const rotateMatrix = this.canvasKit.Matrix.rotated(angle);
    this.skiaMatrix = this.canvasKit.Matrix.multiply(this.skiaMatrix, rotateMatrix);
    rotateMatrix.delete(); // Clean up
    return this;
  }

  // ✅ FLIP NATIVO - Esta é a implementação CORRETA para CanvasKit
  flipHorizontal(centerX: number = 0): this {
    // 1. Translate to origin
    this.translate(-centerX, 0);
    
    // 2. Scale negatively (flip)
    this.scale(-1, 1);
    
    // 3. Translate back
    this.translate(centerX, 0);
    
    return this;
  }

  flipVertical(centerY: number = 0): this {
    // 1. Translate to origin  
    this.translate(0, -centerY);
    
    // 2. Scale negatively (flip)
    this.scale(1, -1);
    
    // 3. Translate back
    this.translate(0, centerY);
    
    return this;
  }

  flipBoth(centerX: number = 0, centerY: number = 0): this {
    // 1. Translate to origin
    this.translate(-centerX, -centerY);
    
    // 2. Scale negatively (flip both)
    this.scale(-1, -1);
    
    // 3. Translate back
    this.translate(centerX, centerY);
    
    return this;
  }

  // ✅ Native composition
  multiply(other: CanvasKitNativeMatrix): this {
    this.skiaMatrix = this.canvasKit.Matrix.multiply(this.skiaMatrix, other.skiaMatrix);
    return this;
  }

  // ✅ Native inversion
  invert(): this {
    const inverted = this.canvasKit.Matrix.invert(this.skiaMatrix);
    if (inverted) {
      this.skiaMatrix.delete(); // Clean up old
      this.skiaMatrix = inverted;
    }
    return this;
  }

  // ✅ Native point transformation
  transformPoint(point: IPoint): IPoint {
    const transformed = this.skiaMatrix.mapPoints([point.x, point.y]);
    return { x: transformed[0], y: transformed[1] };
  }

  transformPoints(points: IPoint[]): IPoint[] {
    const flatPoints = points.flatMap(p => [p.x, p.y]);
    const transformed = this.skiaMatrix.mapPoints(flatPoints);
    
    const result: IPoint[] = [];
    for (let i = 0; i < transformed.length; i += 2) {
      result.push({ x: transformed[i], y: transformed[i + 1] });
    }
    return result;
  }

  // ✅ Compatibility with existing code
  getArray(): IMatrixArr {
    // CanvasKit Matrix is stored as 9-element array (3x3), but we need 6-element (2x3)
    const full = this.skiaMatrix.get();
    return [full[0], full[1], full[3], full[4], full[6], full[7]];
  }

  // ✅ Access native Skia matrix
  getSkiaMatrix(): Matrix {
    return this.skiaMatrix;
  }

  // ✅ Clone
  clone(): CanvasKitNativeMatrix {
    const clonedMatrix = this.canvasKit.Matrix.multiply(
      this.canvasKit.Matrix.identity(),
      this.skiaMatrix
    );
    return new CanvasKitNativeMatrix(this.canvasKit, clonedMatrix);
  }

  // ✅ Reset to identity
  identity(): this {
    this.skiaMatrix.delete(); // Clean up old
    this.skiaMatrix = this.canvasKit.Matrix.identity();
    return this;
  }

  // ✅ Memory cleanup
  delete(): void {
    this.skiaMatrix.delete();
  }

  // ✅ Debug info
  toString(): string {
    const arr = this.getArray();
    return `CanvasKitNativeMatrix(${arr.join(', ')})`;
  }
}

/**
 * Utilities for CanvasKit Native Matrix operations
 */
export class CanvasKitMatrixUtils {
  
  /**
   * Create a flip matrix using NATIVE CanvasKit operations
   * This is the CORRECT way to do flip with CanvasKit/Skia
   */
  static createFlipMatrix(
    canvasKit: CanvasKitAPI,
    options: {
      flipX: boolean;
      flipY: boolean;
      centerX: number;
      centerY: number;
    }
  ): CanvasKitNativeMatrix {
    const { flipX, flipY, centerX, centerY } = options;
    
    const matrix = CanvasKitNativeMatrix.identity(canvasKit);
    
    if (flipX && flipY) {
      matrix.flipBoth(centerX, centerY);
    } else if (flipX) {
      matrix.flipHorizontal(centerX);
    } else if (flipY) {
      matrix.flipVertical(centerY);
    }
    
    console.log('🎯 NATIVE CANVASKIT FLIP:', {
      flipX,
      flipY,
      centerX,
      centerY,
      resultMatrix: matrix.getArray()
    });
    
    return matrix;
  }

  /**
   * Apply resize with flip using NATIVE CanvasKit
   * This replaces our current resize-geometry.ts logic
   */
  static createResizeMatrix(
    canvasKit: CanvasKitAPI,
    options: {
      scaleX: number;
      scaleY: number;
      centerX: number;
      centerY: number;
      allowFlip: boolean;
    }
  ): CanvasKitNativeMatrix {
    const { scaleX, scaleY, centerX, centerY, allowFlip } = options;
    
    const matrix = CanvasKitNativeMatrix.identity(canvasKit);
    
    // Move to center
    matrix.translate(-centerX, -centerY);
    
    if (allowFlip) {
      // ✅ NATIVE FLIP: Just use the scale directly - Skia handles it perfectly
      matrix.scale(scaleX, scaleY);
    } else {
      // No flip: ensure positive scaling
      matrix.scale(Math.abs(scaleX), Math.abs(scaleY));
    }
    
    // Move back
    matrix.translate(centerX, centerY);
    
    console.log('🎯 NATIVE CANVASKIT RESIZE:', {
      scaleX,
      scaleY,
      allowFlip,
      centerX,
      centerY,
      resultMatrix: matrix.getArray()
    });
    
    return matrix;
  }
}