// Complete geo utilities adapted from Suika for CanvasKit

import { IPoint, IRect, IMatrixArr } from './common';
import { Matrix } from './matrix';

// Re-export types for convenience
export type { IPoint, IRect, IMatrixArr } from './common';
export { Matrix } from './matrix';

/**
 * Check if point is inside rectangle
 */
export function isPointInRect(point: IPoint, rect: IRect): boolean {
  return point.x >= rect.x && 
         point.x <= rect.x + rect.width && 
         point.y >= rect.y && 
         point.y <= rect.y + rect.height;
}

/**
 * Get center point of rectangle
 */
export function getRectCenter(rect: IRect): IPoint {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2
  };
}

/**
 * Create identity matrix
 */
export function createIdentityMatrix(): IMatrixArr {
  return [1, 0, 0, 1, 0, 0];
}

/**
 * Create translation matrix
 */
export function createTranslationMatrix(dx: number, dy: number): IMatrixArr {
  return [1, 0, 0, 1, dx, dy];
}

/**
 * Create scale matrix
 */
export function createScaleMatrix(sx: number, sy: number): IMatrixArr {
  return [sx, 0, 0, sy, 0, 0];
}

/**
 * Multiply two matrices
 */
export function multiplyMatrices(a: IMatrixArr, b: IMatrixArr): IMatrixArr {
  return [
    a[0] * b[0] + a[2] * b[1],
    a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3],
    a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4],
    a[1] * b[4] + a[3] * b[5] + a[5]
  ];
}

/**
 * Transform point using matrix
 */
export function transformPoint(point: IPoint, matrix: IMatrixArr): IPoint {
  return {
    x: point.x * matrix[0] + point.y * matrix[2] + matrix[4],
    y: point.x * matrix[1] + point.y * matrix[3] + matrix[5]
  };
}

/**
 * Get rotation angle from transform matrix (in radians)
 */
export function getTransformAngle(matrix: IMatrixArr): number {
  return Math.atan2(matrix[1], matrix[0]);
}

/**
 * Check if transform matrix has flip (negative determinant)
 */
export function checkTransformFlip(matrix: IMatrixArr): boolean {
  return (matrix[0] * matrix[3] - matrix[1] * matrix[2]) < 0;
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Normalize angle to 0-360 degrees
 */
export function normalizeAngle(degrees: number): number {
  degrees = degrees % 360;
  if (degrees < 0) {
    degrees += 360;
  }
  return degrees;
}

/**
 * Convert rectangle to vertices array with transformation applied
 * Following Suika's exact implementation for handle positioning
 */
export function rectToVertices(rect: IRect, tf?: IMatrixArr): IPoint[] {
  const { x, y, width, height } = rect;
  
  // 🎯 CRITICAL FIX: Handle negative dimensions correctly for flip
  // When width/height are negative, we need to normalize the rectangle
  const normalizedX = width >= 0 ? x : x + width;
  const normalizedY = height >= 0 ? y : y + height;
  const normalizedWidth = Math.abs(width);
  const normalizedHeight = Math.abs(height);
  
  let pts = [
    { x: normalizedX, y: normalizedY },                                        // top-left
    { x: normalizedX + normalizedWidth, y: normalizedY },                      // top-right  
    { x: normalizedX + normalizedWidth, y: normalizedY + normalizedHeight },   // bottom-right
    { x: normalizedX, y: normalizedY + normalizedHeight }                      // bottom-left
  ];
  
  if (tf) {
    const matrix = new Matrix(...tf);
    pts = pts.map((point) => {
      const pt = matrix.apply(point);
      return { x: pt.x, y: pt.y };
    });
  }
  
  return pts;
}

/**
 * Get rectangle mid-points (edges) with transformation applied
 * Following Suika's exact implementation for N/S/E/W handles
 */
export function rectToMidPoints(rect: IRect, tf?: IMatrixArr): IPoint[] {
  const { x, y, width, height } = rect;
  
  // 🎯 CRITICAL FIX: Handle negative dimensions correctly for flip
  // When width/height are negative, we need to normalize the rectangle
  const normalizedX = width >= 0 ? x : x + width;
  const normalizedY = height >= 0 ? y : y + height;
  const normalizedWidth = Math.abs(width);
  const normalizedHeight = Math.abs(height);
  
  let pts = [
    { x: normalizedX + normalizedWidth / 2, y: normalizedY },                       // north (top)
    { x: normalizedX + normalizedWidth, y: normalizedY + normalizedHeight / 2 },    // east (right)
    { x: normalizedX + normalizedWidth / 2, y: normalizedY + normalizedHeight },    // south (bottom)
    { x: normalizedX, y: normalizedY + normalizedHeight / 2 }                      // west (left)
  ];
  
  if (tf) {
    const matrix = new Matrix(...tf);
    pts = pts.map((point) => {
      const pt = matrix.apply(point);
      return { x: pt.x, y: pt.y };
    });
  }
  
  return pts;
}

/**
 * Offset rectangle by given amounts
 */
export function offsetRect(rect: IRect, offset: number | number[]): IRect {
  if (typeof offset === 'number') {
    return {
      x: rect.x - offset,
      y: rect.y - offset,
      width: rect.width + offset * 2,
      height: rect.height + offset * 2
    };
  }
  
  // Array of offsets: [top, right, bottom, left]
  const [top, right, bottom, left] = offset;
  return {
    x: rect.x - left,
    y: rect.y - top,
    width: rect.width + left + right,
    height: rect.height + top + bottom
  };
}

/**
 * Calculate distance between two points
 */
export function distance(p1: IPoint, p2: IPoint): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Get sweep angle from vector a to vector b (Suika implementation)
 * Direction is clockwise by default
 */
export function getSweepAngle(
  a: IPoint,
  b: IPoint,
  anticlockwise?: boolean,
): number {
  // Dot product to calculate angle
  const dot = a.x * b.x + a.y * b.y;
  const d = Math.sqrt(a.x * a.x + a.y * a.y) * Math.sqrt(b.x * b.x + b.y * b.y);
  let cosTheta = dot / d;
  if (cosTheta > 1) {
    cosTheta = 1;
  } else if (cosTheta < -1) {
    cosTheta = -1;
  }

  let theta = Math.acos(cosTheta);
  const cross = a.x * b.y - a.y * b.x;
  const reverse = anticlockwise ? cross > 0 : cross < 0;
  if (reverse) {
    theta = (2 * Math.PI) - theta;
  }

  return theta;
}

/**
 * Get closest point on line defined by start and end points
 */
export function closestPtOnLine(
  start: IPoint,
  end: IPoint,
  point: IPoint
): { t: number; point: IPoint } {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const px = point.x - start.x;
  const py = point.y - start.y;
  
  const dot = px * dx + py * dy;
  const len_sq = dx * dx + dy * dy;
  
  let t = 0;
  if (len_sq !== 0) {
    t = dot / len_sq;
  }
  
  const closestPt = {
    x: start.x + t * dx,
    y: start.y + t * dy,
  };

  return {
    t,
    point: closestPt,
  };
}

/**
 * Get closest point of polar coordinates snap (0, 45, 90, 135, 180 degrees etc.)
 * Used for constraining line rotation to specific angles
 */
export function getPolarTrackSnapPt(center: IPoint, p: IPoint, count = 4): IPoint {
  let closestPt: IPoint = { x: 0, y: 0 };
  let closestDist = Infinity;
  
  for (let i = 1; i <= count; i++) {
    const rad = (Math.PI / count) * i;
    const pt = {
      x: center.x + Math.cos(rad),
      y: center.y + Math.sin(rad),
    };
    const { point } = closestPtOnLine(center, pt, p);
    const dist = distance(point, p);
    
    if (dist === 0) {
      return point;
    }
    if (dist < closestDist) {
      closestDist = dist;
      closestPt = point;
    }
  }
  return closestPt;
}

/**
 * Check if point is inside transformed rectangle
 */
export function isPointInTransformedRect(point: IPoint, rect: IRect, transform: IMatrixArr): boolean {
  // Transform point to local rect coordinates
  const det = transform[0] * transform[3] - transform[1] * transform[2];
  if (Math.abs(det) < 1e-10) return false; // Degenerate transform
  
  const invDet = 1 / det;
  const localX = invDet * (transform[3] * (point.x - transform[4]) - transform[2] * (point.y - transform[5]));
  const localY = invDet * (-transform[1] * (point.x - transform[4]) + transform[0] * (point.y - transform[5]));
  
    return localX >= rect.x && localX <= rect.x + rect.width && 
         localY >= rect.y && localY <= rect.y + rect.height;
}

// ❌ REMOVIDO: Implementação simplificada duplicada
// Usar apenas a implementação completa do Suika em resize-geometry.ts

/**
 * Resize line - simplified version for now
 * TODO: Implement full Suika resizeLine logic
 */
export function resizeLine(
  handleType: string,
  newPos: IPoint,
  oldRect: { width: number; height: number; transform: IMatrixArr },
  options: { keepPolarSnap?: boolean; scaleFromCenter?: boolean } = {}
): { width: number; height: number; transform: IMatrixArr } {
  // Simplified implementation - lines have height 0
  const { width, transform } = oldRect;
  const [a, b, c, d, tx, ty] = transform;
  
  const newWidth = Math.max(1, distance({ x: tx, y: ty }, newPos));
  
  return {
    width: newWidth,
    height: 0,
    transform: [a, b, c, d, tx, ty]
  };
}