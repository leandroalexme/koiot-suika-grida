import { IMatrixArr } from '../../utils/common';
import { ITransformRect, ICursor } from './types';
import { getTransformAngle, checkTransformFlip, radiansToDegrees, normalizeAngle } from '../../utils/geo';

const HALF_PI = Math.PI / 2;

/**
 * Get resize cursor based on handle type and transform
 */
export const getResizeCursor = (
  type: string,
  selectedBox: ITransformRect | null,
): ICursor => {
  if (!selectedBox) {
    return { type: 'default' };
  }
  
  if (selectedBox.height === 0) {
    // Treat as a line
    return { type: 'move' };
  }

  // Handle north/south edge cases specially
  if (type === 'n' || type === 's') {
    // Create a transform matrix rotated 90 degrees for height direction
    const heightTransform: IMatrixArr = [
      -selectedBox.transform[1], selectedBox.transform[0],
      -selectedBox.transform[3], selectedBox.transform[2], 
      selectedBox.transform[4], selectedBox.transform[5]
    ];
    
    const heightRotate = getTransformAngle(heightTransform);
    const degree = radiansToDegrees(heightRotate);
    return { type: 'resize', degree };
  }

  // Get rotation and flip status from transform
  const rotation = getTransformAngle(selectedBox.transform);
  const isFlip = checkTransformFlip(selectedBox.transform);

  let dDegree = 0;
  switch (type) {
    case 'se':
    case 'nw':
      dDegree = -45;
      break;
    case 'ne':
    case 'sw':
      dDegree = 45;
      break;
    case 'e':
    case 'w':
      dDegree = 90;
      break;
    default:
      console.warn('Unknown resize handle type:', type);
      return { type: 'default' };
  }

  const degree = radiansToDegrees(rotation) + (isFlip ? -dDegree : dDegree);
  return { type: 'resize', degree: normalizeAngle(degree) };
};

/**
 * Get rotation cursor based on handle type and transform
 */
export const getRotationCursor = (
  type: string,
  selectedBox: ITransformRect | null,
): ICursor => {
  if (!selectedBox) {
    return { type: 'default' };
  }
  
  const rotation = getTransformAngle(selectedBox.transform);
  const isFlip = checkTransformFlip(selectedBox.transform);
  let dDegree = 0;

  if (selectedBox.height === 0) {
    // Line rotation - simplified angles
    dDegree = {
      neRotation: 90,
      seRotation: 90,
      swRotation: 270,
      nwRotation: 270,
    }[type] || 0;
  } else {
    // Rectangle rotation - corner-based angles
    dDegree = {
      neRotation: 45,
      seRotation: 135,
      swRotation: 225,
      nwRotation: 315,
    }[type] || 0;
  }
  
  const degree = normalizeAngle(
    radiansToDegrees(rotation) + (isFlip ? -dDegree : dDegree)
  );
  
  return { type: 'rotation', degree };
};

/**
 * Get default cursor (for non-interactive elements)
 */
export const getDefaultCursor = (): ICursor => {
  return { type: 'default' };
};

/**
 * Convert cursor object to CSS cursor string
 */
export const cursorToCSSCursor = (cursor: ICursor): string => {
  switch (cursor.type) {
    case 'default':
      return 'default';
    case 'move':
      return 'move';
    case 'resize':
      if (cursor.degree !== undefined) {
        // Map degree to appropriate resize cursor
        const normalizedDegree = normalizeAngle(cursor.degree);
        if (normalizedDegree >= 337.5 || normalizedDegree < 22.5) {
          return 'ew-resize'; // horizontal
        } else if (normalizedDegree >= 22.5 && normalizedDegree < 67.5) {
          return 'nwse-resize'; // diagonal
        } else if (normalizedDegree >= 67.5 && normalizedDegree < 112.5) {
          return 'ns-resize'; // vertical
        } else if (normalizedDegree >= 112.5 && normalizedDegree < 157.5) {
          return 'nesw-resize'; // diagonal
        } else if (normalizedDegree >= 157.5 && normalizedDegree < 202.5) {
          return 'ew-resize'; // horizontal
        } else if (normalizedDegree >= 202.5 && normalizedDegree < 247.5) {
          return 'nwse-resize'; // diagonal
        } else if (normalizedDegree >= 247.5 && normalizedDegree < 292.5) {
          return 'ns-resize'; // vertical
        } else if (normalizedDegree >= 292.5 && normalizedDegree < 337.5) {
          return 'nesw-resize'; // diagonal
        }
      }
      return 'default';
    case 'rotation':
      return 'crosshair'; // For rotation, use crosshair cursor
    default:
      return 'default';
  }
};