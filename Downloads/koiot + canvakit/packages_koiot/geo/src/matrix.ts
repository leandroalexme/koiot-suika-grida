import { IMatrixArr, IPoint } from '@koiot/common';

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