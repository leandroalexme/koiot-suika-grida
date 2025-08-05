import { IPoint, IMatrixArr } from '../../utils/common';

export type ITransformHandleType =
  | 'nw'    // Northwest corner
  | 'ne'    // Northeast corner  
  | 'se'    // Southeast corner
  | 'sw'    // Southwest corner
  | 'n'     // North edge
  | 'e'     // East edge
  | 's'     // South edge
  | 'w'     // West edge
  | 'nwRotation'  // Northwest rotation
  | 'neRotation'  // Northeast rotation
  | 'seRotation'  // Southeast rotation
  | 'swRotation'; // Southwest rotation

export interface ITransformRect {
  width: number;
  height: number;
  transform: IMatrixArr;
}

export interface ICursor {
  type: 'default' | 'move' | 'resize' | 'rotation';
  degree?: number;
}

export interface IControlHandleAttrs {
  cx?: number;
  cy?: number;
  type: string;
  rotation?: number;
  transform?: IMatrixArr;
  padding?: number;
  size: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  isTransformHandle?: boolean;
  hitTest?: (point: IPoint, tolerance: number, rect: ITransformRect | null) => boolean;
  getCursor: (type: string, selectedBox: ITransformRect | null) => ICursor;
}

export type HitTestFn = (
  point: IPoint,
  tolerance: number,
  rect: ITransformRect | null,
) => boolean;

export type GetCursorFn = (
  type: string,
  selectedBox: ITransformRect | null,
) => ICursor;