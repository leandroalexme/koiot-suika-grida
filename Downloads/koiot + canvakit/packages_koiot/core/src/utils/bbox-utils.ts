/**
 * Bounding Box Utilities - Following Suika's exact pattern
 * Handles proper bounding box calculation considering transforms
 */

import { IPoint, IRect, IMatrixArr } from './common';
import { Matrix } from './matrix';

export interface IBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Calculate transformed bounding box for a rectangle with transform matrix
 * This is equivalent to Suika's calcRectBbox function
 */
export function calcRectBbox(rect: {
  width: number;
  height: number;
  transform: IMatrixArr;
}): IBox {
  const { width, height, transform } = rect;
  const matrix = new Matrix(...transform);
  
  // Get all four corners of the rectangle
  const corners: IPoint[] = [
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

/**
 * Merge multiple bounding boxes into one (Suika's mergeBoxes)
 */
export function mergeBoxes(boxes: IBox[]): IBox {
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

/**
 * Convert bounding box to rectangle (Suika's boxToRect)
 */
export function boxToRect(box: IBox): IRect {
  return {
    x: box.minX,
    y: box.minY,
    width: box.maxX - box.minX,
    height: box.maxY - box.minY,
  };
}

/**
 * Calculate world transform for a graphics element
 * This should be implemented to get the actual world transform
 */
export function getWorldTransform(element: any): IMatrixArr {
  // If element has explicit transform, use it
  if (element.attrs.transform) {
    return element.attrs.transform;
  }
  
  // Otherwise, create identity matrix with translation
  return [1, 0, 0, 1, element.attrs.x || 0, element.attrs.y || 0];
}

/**
 * Get bounding box for a graphics element considering its transform
 * This is equivalent to Suika's getBbox() method
 */
export function getBbox(element: any): IBox {
  const width = element.attrs.width || 0;
  const height = element.attrs.height || 0;
  const transform = getWorldTransform(element);
  
  return calcRectBbox({ width, height, transform });
}