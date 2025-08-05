import { IPoint, IRect } from '@koiot/common';

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
 * Create rectangle from two points
 */
export function rectFromPoints(p1: IPoint, p2: IPoint): IRect {
  const minX = Math.min(p1.x, p2.x);
  const minY = Math.min(p1.y, p2.y);
  const maxX = Math.max(p1.x, p2.x);
  const maxY = Math.max(p1.y, p2.y);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}

/**
 * Check if two rectangles intersect
 */
export function rectsIntersect(rect1: IRect, rect2: IRect): boolean {
  return !(rect1.x > rect2.x + rect2.width ||
           rect1.x + rect1.width < rect2.x ||
           rect1.y > rect2.y + rect2.height ||
           rect1.y + rect1.height < rect2.y);
}