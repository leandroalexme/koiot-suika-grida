/**
 * Resize Geometry Functions
 * Exact implementation from Suika adapted for CanvasKit
 * 
 * These functions handle the mathematical calculations for resizing elements
 * following Suika's precise algorithms
 */

import { IPoint, IMatrixArr } from './common';
import { Matrix } from './matrix';
import { distance, getSweepAngle, getPolarTrackSnapPt } from './geo';

export interface ITransformRect {
  width: number;
  height: number;
  transform: IMatrixArr;
}

interface IResizeOp {
  getLocalOrigin(width: number, height: number): IPoint;
  getNewSize(
    newLocalPt: IPoint,
    localOrigin: IPoint,
    rect: { width: number; height: number },
  ): {
    width: number;
    height: number;
  };
  /**
   * Keep ratio based on width or height when maintaining aspect ratio
   */
  isBaseWidthWhenKeepRatio(isWidthLarger: boolean): boolean;
  /**
   * Size adjustment when scaling from center
   */
  getSizeWhenScaleFromCenter(
    width: number,
    height: number,
  ): { width: number; height: number };
}

const doubleSize = (width: number, height: number) => ({
  width: width * 2,
  height: height * 2,
});

/**
 * Resize operations for each handle type - Exact Suika implementation
 */
const resizeOps: Record<string, IResizeOp> = {
  sw: {
    getLocalOrigin: (width: number) => ({ x: width, y: 0 }),
    getNewSize: (newLocalPt: IPoint, localOrigin: IPoint) => ({
      width: localOrigin.x - newLocalPt.x,
      height: newLocalPt.y - localOrigin.y,
    }),
    isBaseWidthWhenKeepRatio: (isWidthLarger: boolean) => isWidthLarger,
    getSizeWhenScaleFromCenter: doubleSize,
  },
  se: {
    getLocalOrigin: () => ({ x: 0, y: 0 }),
    getNewSize: (newLocalPt, localOrigin) => ({
      width: newLocalPt.x - localOrigin.x,
      height: newLocalPt.y - localOrigin.y,
    }),
    isBaseWidthWhenKeepRatio: (isWidthLarger: boolean) => isWidthLarger,
    getSizeWhenScaleFromCenter: doubleSize,
  },
  nw: {
    getLocalOrigin: (width, height) => {
      return { x: width, y: height };
    },
    getNewSize: (newLocalPt, localOrigin) => {
      return {
        width: localOrigin.x - newLocalPt.x,
        height: localOrigin.y - newLocalPt.y,
      };
    },
    isBaseWidthWhenKeepRatio: (isWidthLarger: boolean) => isWidthLarger,
    getSizeWhenScaleFromCenter: doubleSize,
  },
  ne: {
    getLocalOrigin: (_width, height) => ({ x: 0, y: height }),
    getNewSize: (newLocalPt, localOrigin) => ({
      width: newLocalPt.x - localOrigin.x,
      height: localOrigin.y - newLocalPt.y,
    }),
    isBaseWidthWhenKeepRatio: (isWidthLarger: boolean) => isWidthLarger,
    getSizeWhenScaleFromCenter: doubleSize,
  },
  n: {
    getLocalOrigin: (width, height) => ({ x: width / 2, y: height }),
    getNewSize: (newLocalPt, localOrigin, rect) => ({
      width: rect.width,
      height: localOrigin.y - newLocalPt.y,
    }),
    isBaseWidthWhenKeepRatio: () => false,
    getSizeWhenScaleFromCenter: (width, height) => ({
      width: width,
      height: height * 2,
    }),
  },
  s: {
    getLocalOrigin: (width) => ({ x: width / 2, y: 0 }),
    getNewSize: (newLocalPt, localOrigin, rect) => ({
      width: rect.width,
      height: newLocalPt.y - localOrigin.y,
    }),
    isBaseWidthWhenKeepRatio: () => false,
    getSizeWhenScaleFromCenter: (width, height) => ({
      width: width,
      height: height * 2,
    }),
  },
  e: {
    getLocalOrigin: (_width, height) => ({ x: 0, y: height / 2 }),
    getNewSize: (newLocalPt, localOrigin, rect) => ({
      width: newLocalPt.x - localOrigin.x,
      height: rect.height,
    }),
    isBaseWidthWhenKeepRatio: () => true,
    getSizeWhenScaleFromCenter: (width, height) => ({
      width: width * 2,
      height: height,
    }),
  },
  w: {
    getLocalOrigin: (width, height) => ({ x: width, y: height / 2 }),
    getNewSize: (newLocalPt, localOrigin, rect) => ({
      width: localOrigin.x - newLocalPt.x,
      height: rect.height,
    }),
    isBaseWidthWhenKeepRatio: () => true,
    getSizeWhenScaleFromCenter: (width, height) => ({
      width: width * 2,
      height: height,
    }),
  },
};

/**
 * Resize rectangle - Exact Suika implementation adapted for CanvasKit
 * 
 * @param type Handle type: 'se' | 'ne' | 'nw' | 'sw' | 'n' | 'e' | 's' | 'w'
 * @param newGlobalPt New position in global coordinates
 * @param rect Current rectangle with transform
 * @param options Resize options
 * @returns New rectangle with updated transform
 */
export const resizeRect = (
  type: string,
  newGlobalPt: IPoint,
  rect: ITransformRect,
  options?: {
    keepRatio?: boolean;
    scaleFromCenter?: boolean;
    noChangeWidthAndHeight?: boolean;
    flip?: boolean;
  },
): ITransformRect => {
  console.log('🔧 resizeRect called:', {
    type,
    newGlobalPt,
    rect,
    options
  });
  
  const resizeOp = resizeOps[type];
  if (!resizeOp) {
    throw new Error(`resize type ${type} is invalid`);
  }
  
  const {
    keepRatio,
    scaleFromCenter,
    noChangeWidthAndHeight,
    flip = true,
  } = options ?? {};
  
  const transform = new Matrix(...rect.transform);
  const newRect = {
    width: 0,
    height: 0,
    transform: transform.clone(),
  };

  const localOrigin = scaleFromCenter
    ? { x: rect.width / 2, y: rect.height / 2 }
    : resizeOp.getLocalOrigin(rect.width, rect.height);

  const newLocalPt = transform.applyInverse(newGlobalPt);
  // FIXME: consider case when width or height is 0
  let size = resizeOp.getNewSize(newLocalPt, localOrigin, rect);

  if (scaleFromCenter) {
    size = resizeOp.getSizeWhenScaleFromCenter(size.width, size.height);
  }

  if (keepRatio) {
    const ratio = rect.width / rect.height;
    const newRatio = Math.abs(size.width / size.height);
    const isWidthLarger = newRatio > ratio;
    if (resizeOp.isBaseWidthWhenKeepRatio(isWidthLarger)) {
      size.height = (Math.sign(size.height) * Math.abs(size.width)) / ratio;
    } else {
      size.width = Math.sign(size.width) * Math.abs(size.height) * ratio;
    }
  }

  const scaleTf = new Matrix();
  const scaleX = Math.sign(size.width) || 1;
  const scaleY = Math.sign(size.height) || 1;

  if (noChangeWidthAndHeight) {
    scaleTf.scale(size.width / rect.width, size.height / rect.height);
    newRect.width = rect.width;
    newRect.height = rect.height;
  } else {
    newRect.width = Math.abs(size.width);
    newRect.height = Math.abs(size.height);
    scaleTf.scale(scaleX, scaleY);
  }

  newRect.transform = newRect.transform.append(scaleTf);

  const newGlobalOrigin = newRect.transform.apply(
    scaleFromCenter
      ? { x: newRect.width / 2, y: newRect.height / 2 }
      : resizeOp.getLocalOrigin(newRect.width, newRect.height),
  );
  const globalOrigin = transform.apply(localOrigin);

  const offset = {
    x: globalOrigin.x - newGlobalOrigin.x,
    y: globalOrigin.y - newGlobalOrigin.y,
  };
  newRect.transform.prepend(new Matrix().translate(offset.x, offset.y));

  // 🎯 FIGMA-STYLE FLIP LOGIC - ABORDAGEM CORRETA
  // Editores como Figma fazem flip de forma diferente: reflexão em torno de um eixo
  // preservando a posição visual do objeto
  
  const hasNegativeScale = scaleX < 0 || scaleY < 0;
  
  console.log('🎯 Figma-style flip logic:', { 
    flip, 
    scaleX, 
    scaleY, 
    hasNegativeScale,
    originalRect: { width: rect.width, height: rect.height },
    newRect: { width: newRect.width, height: newRect.height },
    beforeTransform: newRect.transform.getArray()
  });
  
  if (flip && hasNegativeScale) {
    console.log('🎯 FIGMA FLIP: Applying reflection transformation');
    
    // ABORDAGEM FIGMA: Flip é reflexão que preserva posição visual
    // 1. Normalizar dimensões (sempre positivas)
    const normalizedWidth = Math.abs(newRect.width);
    const normalizedHeight = Math.abs(newRect.height);
    
    // 2. Calcular centro do objeto no mundo
    const objectCenterWorld = newRect.transform.apply({
      x: newRect.width / 2,
      y: newRect.height / 2
    });
    
    // 3. Criar matriz de reflexão
    const reflectionMatrix = new Matrix();
    
    // 4. Aplicar reflexão em torno do centro do objeto
    if (scaleX < 0 && scaleY < 0) {
      // Reflexão horizontal e vertical (rotação 180°)
      reflectionMatrix.translate(objectCenterWorld.x, objectCenterWorld.y)
        .scale(-1, -1)
        .translate(-objectCenterWorld.x, -objectCenterWorld.y);
    } else if (scaleX < 0) {
      // Reflexão horizontal
      reflectionMatrix.translate(objectCenterWorld.x, objectCenterWorld.y)
        .scale(-1, 1)
        .translate(-objectCenterWorld.x, -objectCenterWorld.y);
    } else if (scaleY < 0) {
      // Reflexão vertical
      reflectionMatrix.translate(objectCenterWorld.x, objectCenterWorld.y)
        .scale(1, -1)
        .translate(-objectCenterWorld.x, -objectCenterWorld.y);
    }
    
    // 5. Aplicar reflexão à transformação
    newRect.transform = reflectionMatrix.append(newRect.transform);
    
    // 6. Normalizar dimensões
    newRect.width = normalizedWidth;
    newRect.height = normalizedHeight;
    
    console.log('🎯 Figma flip applied:', {
      objectCenter: objectCenterWorld,
      reflectionMatrix: reflectionMatrix.getArray(),
      finalTransform: newRect.transform.getArray(),
      normalizedDimensions: { width: normalizedWidth, height: normalizedHeight }
    });
    
  } else if (!flip && hasNegativeScale) {
    console.log('🎯 FLIP DISABLED: Converting negative scale to positive');
    
    // Quando flip está desabilitado, simplesmente normalizar para positivo
    // sem aplicar reflexão visual
    newRect.width = Math.abs(newRect.width);
    newRect.height = Math.abs(newRect.height);
    
    console.log('🎯 Normalized to positive scale without visual flip');
  } else {
    console.log('🎯 No flip needed - normal scaling');
  }

  const result = {
    width: newRect.width,
    height: newRect.height,
    transform: newRect.transform.getArray(),
  };
  
  console.log('🔧 resizeRect result:', result);
  
  return result;
};

/**
 * Resize line - Exact Suika implementation adapted for CanvasKit
 * Lines are considered graphics with height = 0
 * 
 * @param type Control type: 'se' | 'ne' | 'nw' | 'sw'
 * @param newPos New position in global coordinates
 * @param rect Current line rect with transform
 * @param options Resize options
 * @returns New line rect with updated transform
 */
export const resizeLine = (
  type: string,
  newPos: IPoint,
  rect: ITransformRect,
  options: {
    /** keep rotation in 0 45 90 ... */
    keepPolarSnap?: boolean;
    scaleFromCenter?: boolean;
  } = {
    keepPolarSnap: false,
    scaleFromCenter: false,
  },
): ITransformRect => {
  if (!['se', 'ne', 'nw', 'sw'].includes(type)) {
    throw new Error(`invalid type "${type}"`);
  }

  const isRightControl = type === 'se' || type === 'ne';

  let globalOrigin: IPoint = { x: 0, y: 0 };
  if (options.scaleFromCenter) {
    globalOrigin = new Matrix(...rect.transform).apply({
      x: rect.width / 2,
      y: rect.height / 2,
    });
  } else if (isRightControl) {
    globalOrigin = {
      x: rect.transform[4],
      y: rect.transform[5],
    };
  } else {
    globalOrigin = new Matrix(...rect.transform).apply({
      x: rect.width,
      y: rect.height,
    });
  }

  if (options.keepPolarSnap) {
    newPos = getPolarTrackSnapPt(globalOrigin, newPos);
  }

  let width = distance(newPos, globalOrigin);
  if (options.scaleFromCenter) {
    width *= 2;
  }

  if (isRightControl) {
    const offset = {
      x: newPos.x - globalOrigin.x,
      y: newPos.y - globalOrigin.y,
    };
    const rotate = getSweepAngle(
      { x: 1, y: 0 },
      {
        x: newPos.x - globalOrigin.x,
        y: newPos.y - globalOrigin.y,
      },
    );
    const tf = new Matrix()
      .rotate(rotate)
      .translate(globalOrigin.x, globalOrigin.y);

    if (options.scaleFromCenter) {
      tf.translate(-offset.x, -offset.y);
    }

    return {
      width,
      height: 0,
      transform: tf.getArray(),
    };
  } else {
    const offset = {
      x: globalOrigin.x - newPos.x,
      y: globalOrigin.y - newPos.y,
    };
    const rotate = getSweepAngle({ x: 1, y: 0 }, offset);

    const tf = new Matrix().rotate(rotate);
    const newRightBottom = tf.apply({ x: width, y: rect.height });
    tf.translate(
      globalOrigin.x - newRightBottom.x,
      globalOrigin.y - newRightBottom.y,
    );

    if (options.scaleFromCenter) {
      tf.translate(offset.x, offset.y);
    }

    return {
      width,
      height: 0,
      transform: tf.getArray(),
    };
  }
};