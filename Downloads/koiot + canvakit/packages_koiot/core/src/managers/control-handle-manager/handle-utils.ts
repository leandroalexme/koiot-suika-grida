import { IPoint, IRect, IMatrixArr } from '../../utils/common';
import { 
  transformPoint, 
  rectToVertices, 
  rectToMidPoints, 
  offsetRect,
  distance
} from '../../utils/geo';
import { ITransformHandleType, ITransformRect, HitTestFn } from './types';
import { ControlHandle } from './control-handle';
import { Rectangle } from '../../graphics/rectangle';
import { IGraphics } from '../../graphics/types';
import { getResizeCursor, getRotationCursor } from './cursor-utils';
import { DEFAULT_HANDLE_SETTINGS } from '../../settings/handle-settings';

export interface HandleCreateParams {
  size: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

/**
 * Custom hit test for edge handles (n, s, e, w)
 * These handles should be easier to hit even though they're invisible
 * Following Suika's pattern for invisible but functional edge handles
 */
const createEdgeHitTest = (handleType: 'n' | 's' | 'e' | 'w'): HitTestFn => {
  return (point: IPoint, tolerance: number, rect: ITransformRect | null): boolean => {
    if (!rect) {
      return false;
    }

    // Create a larger hit area for edge handles (following Suika's pattern)
    const hitTolerance = Math.max(tolerance, 8); // Minimum 8px hit area
    
    // Create local rect for hit testing
    const localRect: IRect = {
      x: 0,
      y: 0,
      width: rect.width,
      height: rect.height
    };

    // Get handle-specific hit area (following Suika's logic)
    let hitArea: IRect;
    switch (handleType) {
      case 'n':
        hitArea = {
          x: -hitTolerance,
          y: -hitTolerance,
          width: localRect.width + hitTolerance * 2,
          height: hitTolerance * 2
        };
        break;
      case 's':
        hitArea = {
          x: -hitTolerance,
          y: localRect.height - hitTolerance,
          width: localRect.width + hitTolerance * 2,
          height: hitTolerance * 2
        };
        break;
      case 'e':
        hitArea = {
          x: localRect.width - hitTolerance,
          y: -hitTolerance,
          width: hitTolerance * 2,
          height: localRect.height + hitTolerance * 2
        };
        break;
      case 'w':
        hitArea = {
          x: -hitTolerance,
          y: -hitTolerance,
          width: hitTolerance * 2,
          height: localRect.height + hitTolerance * 2
        };
        break;
    }

    // Transform point to local coordinates
    const transform = rect.transform;
    const det = transform[0] * transform[3] - transform[1] * transform[2];
    if (Math.abs(det) < 1e-10) return false; // Degenerate transform
    
    const invDet = 1 / det;
    const localX = invDet * (transform[3] * (point.x - transform[4]) - transform[2] * (point.y - transform[5]));
    const localY = invDet * (-transform[1] * (point.x - transform[4]) + transform[0] * (point.y - transform[5]));
    
    // Check if point is in hit area
    return localX >= hitArea.x && localX <= hitArea.x + hitArea.width &&
           localY >= hitArea.y && localY <= hitArea.y + hitArea.height;
  };
};

/**
 * 🎯 NOVO: Create handle with graphics (como no Suika)
 */
export const createGraphicsBasedHandle = (
  type: ITransformHandleType,
  params: HandleCreateParams
): ControlHandle => {
  // Criar Rectangle graphics para o handle (como Suika)
  const handleGraphics = new Rectangle({
    x: 0, // Será posicionado dinamicamente
    y: 0,
    width: params.size,
    height: params.size,
    fill: params.fill,
    stroke: params.stroke,
    strokeWidth: params.strokeWidth || 1,
    objectName: `handle_${type}`,
    visible: true
  });

  return new ControlHandle({
    type,
    size: params.size,
    fill: params.fill,
    stroke: params.stroke,
    strokeWidth: params.strokeWidth || 1,
    padding: 3,
    isTransformHandle: true,
    getCursor: type.includes('Rotation') ? getRotationCursor : getResizeCursor,
    graphics: handleGraphics,
    useGraphicsRendering: true, // 🎯 Usar rendering baseado em graphics
  });
};

/**
 * Create all transform handles (resize and rotation) following Suika's exact pattern
 * 🎯 MELHORADO: Suporte opcional para graphics-based handles
 */
export const createTransformHandles = (
  params: HandleCreateParams,
  useGraphicsRendering: boolean = false
): Map<ITransformHandleType, ControlHandle> => {
  const handles = new Map<ITransformHandleType, ControlHandle>();
  
  // Use Suika's exact settings
  const suikaSettings = DEFAULT_HANDLE_SETTINGS;
  
  // Corner resize handles (visible, white fill with blue border like Suika)
  const cornerTypes: ITransformHandleType[] = ['nw', 'ne', 'se', 'sw'];
  cornerTypes.forEach(type => {
    // 🎯 NOVO: Usar graphics-based handles se solicitado
    if (useGraphicsRendering) {
      handles.set(type, createGraphicsBasedHandle(type, {
        size: suikaSettings.handleSize,
        fill: suikaSettings.handleFill,
        stroke: suikaSettings.handleStroke,
        strokeWidth: suikaSettings.handleStrokeWidth,
      }));
    } else {
      // Fallback para o sistema atual
      handles.set(type, new ControlHandle({
        type,
        size: suikaSettings.handleSize, // 7px like Suika
        fill: suikaSettings.handleFill, // '#fcfcfc' like Suika
        stroke: suikaSettings.handleStroke, // '#1592fe' like Suika
        strokeWidth: suikaSettings.handleStrokeWidth, // 2px like Suika
        padding: 3, // Extra padding for easier selection
        isTransformHandle: true,
        getCursor: getResizeCursor,
      }));
    }
  });
  
  // Edge resize handles (invisible but functional like Suika)
  const edgeTypes: ('n' | 'e' | 's' | 'w')[] = ['n', 'e', 's', 'w'];
  edgeTypes.forEach(type => {
    handles.set(type, new ControlHandle({
      type,
      size: suikaSettings.handleSize, // Same size for consistent hit testing
      fill: 'transparent', // Invisible like Suika
      stroke: 'transparent',
      strokeWidth: 0,
      padding: 8, // Larger padding for easier selection
      isTransformHandle: true,
      hitTest: createEdgeHitTest(type),
      getCursor: getResizeCursor,
    }));
  });
  
  // Rotation handles (initially hidden, show on hover like Suika)
  const rotationTypes: ITransformHandleType[] = ['nwRotation', 'neRotation', 'seRotation', 'swRotation'];
  rotationTypes.forEach(type => {
    handles.set(type, new ControlHandle({
      type,
      size: suikaSettings.handleSize, // Same size as corner handles in Suika
      fill: suikaSettings.handleFill, // White fill like Suika
      stroke: suikaSettings.handleStroke, // Blue border like Suika  
      strokeWidth: suikaSettings.handleStrokeWidth, // 2px like Suika
      padding: 4,
      isTransformHandle: true,
      getCursor: getRotationCursor,
    }));
  });
  
  return handles;
};

/**
 * Update handle positions based on selection bounds
 * Following Suika's exact positioning logic with proper zoom handling
 */
export const updateHandlePositions = (
  handles: Map<ITransformHandleType, ControlHandle>,
  rect: ITransformRect,
  zoom: number = 1
): void => {
  console.log('🔧 updateHandlePositions called:', {
    rect,
    zoom,
    handleCount: handles.size,
    rectWidth: rect.width,
    rectHeight: rect.height,
    rectTransform: rect.transform
  });
  
  // 🔥 KEY FIX: Handle size should be FIXED in viewport pixels, not scaled with zoom
  // This is how Suika maintains consistent handle size regardless of zoom level
  const handleSize = DEFAULT_HANDLE_SETTINGS.handleSize; // Always 7px in viewport
  const neswHandleWidth = DEFAULT_HANDLE_SETTINGS.neswHandleWidth; // Always 10px in viewport
  
  console.log('🎯 Handle settings:', {
    handleSize,
    neswHandleWidth,
    handleSizeInScene: handleSize / zoom,
    zoom
  });

  // Create local rect for positioning (in scene coordinates)
  // 🎯 CRITICAL FIX: Keep actual dimensions to properly handle flip
  // The transform matrix already handles the flip rendering
  const localRect: IRect = {
    x: 0,
    y: 0,
    width: rect.width,   // Keep actual width (can be negative for flip)
    height: rect.height  // Keep actual height (can be negative for flip)
  };

  // Calculate handle positions using Suika's exact logic
  const cornerPoints = rectToVertices(localRect, rect.transform);
  const midPoints = rectToMidPoints(localRect).map(point => transformPoint(point, rect.transform));
  
  // Calculate rotation handle positions (offset from corners like Suika)
  // 🔥 KEY FIX: Offset should be in scene coordinates, compensated for zoom
  const rotationOffset = handleSize / 2 / zoom; // Convert viewport size to scene size
  const rotationRect = offsetRect(localRect, rotationOffset);
  const rotationCorners = rectToVertices(rotationRect, rect.transform);

  // Position corner handles
  const cornerMapping: Record<string, number> = {
    'nw': 0, 'ne': 1, 'se': 2, 'sw': 3
  };

  Object.entries(cornerMapping).forEach(([type, index]) => {
    const handle = handles.get(type as ITransformHandleType);
    if (handle) {
      console.log(`🎯 Positioning ${type} handle:`, {
        position: cornerPoints[index],
        size: handleSize / zoom
      });
      handle.updatePosition(cornerPoints[index].x, cornerPoints[index].y);
      // 🔥 KEY FIX: Update handle size to be fixed in viewport regardless of zoom
      handle.size = handleSize / zoom; // Convert viewport size to scene size
    }
  });

  // Position edge handles (following Suika's logic for small rectangles)
  const MIN_SIZE = 40; // Minimum size in viewport pixels
  const edgeMapping: Record<string, number> = {
    'n': 0, 'e': 1, 's': 2, 'w': 3
  };

  // Suika's special logic: offset edge handles when rectangle is too small
  const offsets: number[] = new Array(4).fill(0);
  if (Math.abs(rect.width) * zoom < MIN_SIZE) {
    offsets[1] = offsets[3] = neswHandleWidth / 2 / zoom; // east, west
  }
  if (Math.abs(rect.height) * zoom < MIN_SIZE) {
    offsets[0] = offsets[2] = neswHandleWidth / 2 / zoom; // north, south
  }

  const adjustedRect = offsetRect(localRect, offsets);
  const adjustedMidPoints = rectToMidPoints(adjustedRect).map(point => transformPoint(point, rect.transform));

  Object.entries(edgeMapping).forEach(([type, index]) => {
    const handle = handles.get(type as ITransformHandleType);
    if (handle) {
      handle.updatePosition(adjustedMidPoints[index].x, adjustedMidPoints[index].y);
      // 🔥 KEY FIX: Update handle size to be fixed in viewport regardless of zoom
      handle.size = handleSize / zoom;
    }
  });

  // Position rotation handles
  const rotationMapping: Record<string, number> = {
    'nwRotation': 0, 'neRotation': 1, 'seRotation': 2, 'swRotation': 3
  };

  Object.entries(rotationMapping).forEach(([type, index]) => {
    const handle = handles.get(type as ITransformHandleType);
    if (handle) {
      handle.updatePosition(rotationCorners[index].x, rotationCorners[index].y);
      // 🔥 KEY FIX: Update handle size to be fixed in viewport regardless of zoom
      handle.size = handleSize / zoom;
    }
  });
};

/**
 * Check if handles should be visible based on selection bounds size (following Suika)
 */
export const shouldShowHandles = (rect: ITransformRect, zoom: number): boolean => {
  const MIN_SIZE = 20; // Minimum size in viewport pixels
  return Math.abs(rect.width) * zoom >= MIN_SIZE && Math.abs(rect.height) * zoom >= MIN_SIZE;
};

/**
 * Check if rotation handles should be visible (following Suika - only on hover)
 */
export const shouldShowRotationHandles = (
  rect: ITransformRect, 
  zoom: number, 
  isHovered: boolean
): boolean => {
  // Only show rotation handles when hovering and handles are big enough (Suika pattern)
  return isHovered && shouldShowHandles(rect, zoom);
};

/**
 * Get handle at point (for hit testing) following Suika's priority order
 */
export const getHandleAtPoint = (
  handles: Map<ITransformHandleType, ControlHandle>,
  point: IPoint,
  rect: ITransformRect | null,
  tolerance: number = 5,
  showRotation: boolean = false
): ControlHandle | null => {
  // Test handles in Suika's priority order (corners first, then edges, then rotation)
  const testOrder: ITransformHandleType[] = [
    'nw', 'ne', 'se', 'sw', // corners (highest priority)
    'n', 'e', 's', 'w',     // edges (medium priority)
  ];

  if (showRotation) {
    testOrder.push('nwRotation', 'neRotation', 'seRotation', 'swRotation');
  }

  for (const type of testOrder) {
    const handle = handles.get(type);
    if (handle && handle.containsPoint(point, tolerance, rect)) {
      return handle;
    }
  }

  return null;
};