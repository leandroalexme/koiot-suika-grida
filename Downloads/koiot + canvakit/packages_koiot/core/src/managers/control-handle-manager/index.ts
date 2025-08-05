export { ControlHandleManager } from './control-handle-manager';
export { ControlHandle } from './control-handle';
export type { 
  ITransformHandleType, 
  ITransformRect, 
  ICursor, 
  IControlHandleAttrs,
  HitTestFn,
  GetCursorFn 
} from './types';
export { 
  getResizeCursor, 
  getRotationCursor, 
  getDefaultCursor, 
  cursorToCSSCursor 
} from './cursor-utils';
export {
  createTransformHandles,
  updateHandlePositions,
  shouldShowHandles,
  shouldShowRotationHandles,
  getHandleAtPoint
} from './handle-utils';