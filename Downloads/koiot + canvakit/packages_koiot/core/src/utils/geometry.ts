import { IPoint, IRect } from './common';

/**
 * Check if a point is inside a rectangle
 */
export function isPointInRect(point: IPoint, rect: IRect): boolean {
  return point.x >= rect.x && 
         point.x <= rect.x + rect.width && 
         point.y >= rect.y && 
         point.y <= rect.y + rect.height;
}

/**
 * Calculate distance between two points
 */
export function distanceBetweenPoints(p1: IPoint, p2: IPoint): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Get the bounding box of multiple rectangles
 */
export function getBoundingRect(rects: IRect[]): IRect | null {
  if (rects.length === 0) return null;
  
  let minX = rects[0].x;
  let minY = rects[0].y;
  let maxX = rects[0].x + rects[0].width;
  let maxY = rects[0].y + rects[0].height;
  
  for (let i = 1; i < rects.length; i++) {
    const rect = rects[i];
    minX = Math.min(minX, rect.x);
    minY = Math.min(minY, rect.y);
    maxX = Math.max(maxX, rect.x + rect.width);
    maxY = Math.max(maxY, rect.y + rect.height);
  }
  
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}

/**
 * Create a rectangle from two points (like Suika's getRectByTwoPoint)
 */
export function getRectByTwoPoint(point1: IPoint, point2: IPoint): IRect {
  return {
    x: Math.min(point1.x, point2.x),
    y: Math.min(point1.y, point2.y),
    width: Math.abs(point1.x - point2.x),
    height: Math.abs(point1.y - point2.y),
  };
}

/**
 * Check if two rectangles intersect
 */
export function isRectIntersect(rect1: IRect, rect2: IRect): boolean {
  return (
    rect1.x <= rect2.x + rect2.width &&
    rect1.x + rect1.width >= rect2.x &&
    rect1.y <= rect2.y + rect2.height &&
    rect1.y + rect1.height >= rect2.y
  );
}

/**
 * Check if rect1 contains rect2
 */
export function isRectContain(rect1: IRect, rect2: IRect): boolean {
  return (
    rect1.x <= rect2.x &&
    rect1.y <= rect2.y &&
    rect1.x + rect1.width >= rect2.x + rect2.width &&
    rect1.y + rect1.height >= rect2.y + rect2.height
  );
}