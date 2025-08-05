var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b ||= {})
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/geo/geo_matrix_class.ts
var Matrix = class {
  /**
   * @param a - x scale
   * @param b - y skew
   * @param c - x skew
   * @param d - y scale
   * @param tx - x translation
   * @param ty - y translation
   */
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    /** @default 1 */
    __publicField(this, "a");
    /** @default 0 */
    __publicField(this, "b");
    /** @default 0 */
    __publicField(this, "c");
    /** @default 1 */
    __publicField(this, "d");
    /** @default 0 */
    __publicField(this, "tx");
    /** @default 0 */
    __publicField(this, "ty");
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  }
  /**
   * Sets the matrix properties.
   * @param a - Matrix component
   * @param b - Matrix component
   * @param c - Matrix component
   * @param d - Matrix component
   * @param tx - Matrix component
   * @param ty - Matrix component
   * @returns This matrix. Good for chaining method calls.
   */
  set(a, b, c, d, tx, ty) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
    return this;
  }
  /**
   * Creates an array from the current Matrix object.
   * @returns The newly created array which contains the matrix
   */
  getArray() {
    return [this.a, this.b, this.c, this.d, this.tx, this.ty];
  }
  /**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   * @param pos - The origin
   * @returns {IPoint} The new point, transformed through this matrix
   */
  apply(pos) {
    const x = pos.x;
    const y = pos.y;
    return {
      x: this.a * x + this.c * y + this.tx,
      y: this.b * x + this.d * y + this.ty
    };
  }
  /**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   * @param pos - The origin
   * @returns {IPoint} The new point, inverse-transformed through this matrix
   */
  applyInverse(pos) {
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const tx = this.tx;
    const ty = this.ty;
    const id = 1 / (a * d + c * -b);
    const x = pos.x;
    const y = pos.y;
    return {
      x: d * id * x + -c * id * y + (ty * c - tx * d) * id,
      y: a * id * y + -b * id * x + (-ty * a + tx * b) * id
    };
  }
  /**
   * Translates the matrix on the x and y.
   * @param x - How much to translate x by
   * @param y - How much to translate y by
   * @returns This matrix. Good for chaining method calls.
   */
  translate(x, y) {
    this.tx += x;
    this.ty += y;
    return this;
  }
  /**
   * Applies a scale transformation to the matrix.
   * @param x - The amount to scale horizontally
   * @param y - The amount to scale vertically
   * @returns This matrix. Good for chaining method calls.
   */
  scale(x, y) {
    this.a *= x;
    this.d *= y;
    this.c *= x;
    this.b *= y;
    this.tx *= x;
    this.ty *= y;
    return this;
  }
  /**
   * Applies a rotation transformation to the matrix.
   * @param angle - The angle in radians.
   * @returns This matrix. Good for chaining method calls.
   */
  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const a1 = this.a;
    const c1 = this.c;
    const tx1 = this.tx;
    this.a = a1 * cos - this.b * sin;
    this.b = a1 * sin + this.b * cos;
    this.c = c1 * cos - this.d * sin;
    this.d = c1 * sin + this.d * cos;
    this.tx = tx1 * cos - this.ty * sin;
    this.ty = tx1 * sin + this.ty * cos;
    return this;
  }
  /**
   * Appends the given Matrix to this Matrix.
   * @param matrix - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  append(matrix) {
    const a1 = this.a;
    const b1 = this.b;
    const c1 = this.c;
    const d1 = this.d;
    this.a = matrix.a * a1 + matrix.b * c1;
    this.b = matrix.a * b1 + matrix.b * d1;
    this.c = matrix.c * a1 + matrix.d * c1;
    this.d = matrix.c * b1 + matrix.d * d1;
    this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
    this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
    return this;
  }
  /**
   * Appends two matrix's and sets the result to this matrix. AB = A * B
   * @param a - The matrix to append.
   * @param b - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  appendFrom(a, b) {
    const a1 = a.a;
    const b1 = a.b;
    const c1 = a.c;
    const d1 = a.d;
    const tx = a.tx;
    const ty = a.ty;
    const a2 = b.a;
    const b2 = b.b;
    const c2 = b.c;
    const d2 = b.d;
    this.a = a1 * a2 + b1 * c2;
    this.b = a1 * b2 + b1 * d2;
    this.c = c1 * a2 + d1 * c2;
    this.d = c1 * b2 + d1 * d2;
    this.tx = tx * a2 + ty * c2 + b.tx;
    this.ty = tx * b2 + ty * d2 + b.ty;
    return this;
  }
  /**
   * Prepends the given Matrix to this Matrix.
   * @param matrix - The matrix to prepend
   * @returns This matrix. Good for chaining method calls.
   */
  prepend(matrix) {
    const tx1 = this.tx;
    if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
      const a1 = this.a;
      const c1 = this.c;
      this.a = a1 * matrix.a + this.b * matrix.c;
      this.b = a1 * matrix.b + this.b * matrix.d;
      this.c = c1 * matrix.a + this.d * matrix.c;
      this.d = c1 * matrix.b + this.d * matrix.d;
    }
    this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx;
    this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty;
    return this;
  }
  /**
   * Inverts this matrix
   * @returns This matrix. Good for chaining method calls.
   */
  invert() {
    const a1 = this.a;
    const b1 = this.b;
    const c1 = this.c;
    const d1 = this.d;
    const tx1 = this.tx;
    const n = a1 * d1 - b1 * c1;
    this.a = d1 / n;
    this.b = -b1 / n;
    this.c = -c1 / n;
    this.d = a1 / n;
    this.tx = (c1 * this.ty - d1 * tx1) / n;
    this.ty = -(a1 * this.ty - b1 * tx1) / n;
    return this;
  }
  /** Checks if this matrix is an identity matrix */
  isIdentity() {
    return this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.tx === 0 && this.ty === 0;
  }
  /**
   * Resets this Matrix to an identity (default) matrix.
   * @returns This matrix. Good for chaining method calls.
   */
  identity() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.tx = 0;
    this.ty = 0;
    return this;
  }
  /**
   * Creates a new Matrix object with the same values as this one.
   * @returns A copy of this matrix. Good for chaining method calls.
   */
  clone() {
    const matrix = new Matrix();
    matrix.a = this.a;
    matrix.b = this.b;
    matrix.c = this.c;
    matrix.d = this.d;
    matrix.tx = this.tx;
    matrix.ty = this.ty;
    return matrix;
  }
  /**
   * Changes the values of the given matrix to be the same as the ones in this matrix
   * @param matrix - The matrix to copy to.
   * @returns The matrix given in parameter with its values updated.
   */
  copyTo(matrix) {
    matrix.a = this.a;
    matrix.b = this.b;
    matrix.c = this.c;
    matrix.d = this.d;
    matrix.tx = this.tx;
    matrix.ty = this.ty;
    return matrix;
  }
  /**
   * Changes the values of the matrix to be the same as the ones in given matrix
   * @param matrix - The matrix to copy from.
   * @returns this
   */
  copyFrom(matrix) {
    this.a = matrix.a;
    this.b = matrix.b;
    this.c = matrix.c;
    this.d = matrix.d;
    this.tx = matrix.tx;
    this.ty = matrix.ty;
    return this;
  }
  /**
   * check to see if two matrices are the same
   * @param matrix - The matrix to compare to.
   */
  equals(matrix) {
    return matrix.a === this.a && matrix.b === this.b && matrix.c === this.c && matrix.d === this.d && matrix.tx === this.tx && matrix.ty === this.ty;
  }
  // #if _DEBUG
  toString() {
    return `[Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
  }
  // #endif
};

// src/geo/geo_angle.ts
var DOUBLE_PI = Math.PI * 2;
function rad2Deg(radian) {
  return radian * 180 / Math.PI;
}
function deg2Rad(degree) {
  return degree * Math.PI / 180;
}
var normalizeRadian = (radian) => {
  radian = radian % DOUBLE_PI;
  if (radian < 0) {
    radian += DOUBLE_PI;
  }
  return radian;
};
var normalizeDegree = (degree) => {
  degree = degree % 360;
  if (degree < 0) {
    degree += 360;
  }
  return degree;
};
var getAngleBetweenVec = (a, b) => {
  const dot = a.x * b.x + a.y * b.y;
  const d = Math.sqrt(a.x * a.x + a.y * a.y) * Math.sqrt(b.x * b.x + b.y * b.y);
  let cosTheta = dot / d;
  if (cosTheta > 1) {
    cosTheta = 1;
  } else if (cosTheta < -1) {
    cosTheta = -1;
  }
  return Math.acos(cosTheta);
};
var getSweepAngle = (a, b, anticlockwise) => {
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
    theta = DOUBLE_PI - theta;
  }
  return theta;
};
var getTransformAngle = (transform, angleBase = { x: 0, y: -1 }) => {
  const tf = new Matrix(
    transform[0],
    transform[1],
    transform[2],
    transform[3],
    0,
    0
  );
  const angleVec = tf.apply(angleBase);
  return getSweepAngle(angleBase, angleVec);
};
var checkTransformFlip = (transform) => {
  return transform[0] * transform[3] - transform[1] * transform[2] < 0;
};

// src/geo/geo_point.ts
var pointMid = (p1, p2) => {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  };
};
var pointAdd = (p1, p2) => {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y
  };
};
var pointSub = (p1, p2) => {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y
  };
};
var isZeroPoint = (p) => {
  return p.x === 0 && p.y === 0;
};
var TOL = 1e-10;
var isPointEqual = (p1, p2, tol = TOL) => {
  return Math.abs(p1.x - p2.x) < tol && Math.abs(p1.y - p2.y) < tol;
};
var distance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};
var lerpNum = (start, end, t) => {
  return start * (1 - t) + end * t;
};
var lerp = (start, end, t) => {
  return {
    x: lerpNum(start.x, end.x, t),
    y: lerpNum(start.y, end.y, t)
  };
};
var normalizeVec = (p) => {
  const len = Math.sqrt(p.x * p.x + p.y * p.y);
  return {
    x: p.x / len,
    y: p.y / len
  };
};
var getPerpendicularPoints = (line, p, distance2) => {
  const vec = pointSub(line[1], line[0]);
  const perpendicularVec = {
    x: -vec.y,
    y: vec.x
  };
  const unitVec = normalizeVec(perpendicularVec);
  const p1 = {
    x: p.x + unitVec.x * distance2,
    y: p.y + unitVec.y * distance2
  };
  const p2 = {
    x: p.x - unitVec.x * distance2,
    y: p.y - unitVec.y * distance2
  };
  return [p1, p2];
};

// src/geo/geo_bezier.ts
var getBezierPoint = (points, t) => {
  if (points.length === 4) {
    const [p1, cp1, cp2, p2] = points;
    const t2 = t * t;
    const ct = 1 - t;
    const ct2 = ct * ct;
    const a = ct2 * ct;
    const b = 3 * t * ct2;
    const c = 3 * t2 * ct;
    const d = t2 * t;
    return {
      x: a * p1.x + b * cp1.x + c * cp2.x + d * p2.x,
      y: a * p1.y + b * cp1.y + c * cp2.y + d * p2.y
    };
  }
  while (points.length > 1) {
    const nextPts = [];
    for (let i = 0, size = points.length - 1; i < size; i++) {
      nextPts.push(lerp(points[i], points[i + 1], t));
    }
    points = nextPts;
  }
  return points[0];
};
var splitBezierSegs = (seg1, seg2, t) => {
  const p1 = seg1.point;
  const p2 = seg2.point;
  const cp1 = pointAdd(seg1.point, seg1.out);
  const cp2 = pointAdd(seg2.point, seg2.in);
  const a = lerp(p1, cp1, t);
  const b = lerp(cp1, cp2, t);
  const c = lerp(cp2, p2, t);
  const d = lerp(a, b, t);
  const e = lerp(b, c, t);
  const f = lerp(d, e, t);
  return [
    {
      point: seg1.point,
      in: seg1.in,
      out: pointSub(a, seg1.point)
    },
    {
      point: f,
      in: pointSub(d, f),
      out: pointSub(e, f)
    },
    {
      point: seg2.point,
      in: pointSub(c, seg2.point),
      out: seg2.out
    }
  ];
};

// src/geo/geo_matrix.ts
var identityMatrix = () => {
  return [1, 0, 0, 1, 0, 0];
};
var multiplyMatrix = (m1, m2) => {
  const a1 = m1[0];
  const b1 = m1[1];
  const c1 = m1[2];
  const d1 = m1[3];
  return [
    m2[0] * a1 + m2[1] * c1,
    m2[0] * b1 + m2[1] * d1,
    m2[2] * a1 + m2[3] * c1,
    m2[2] * b1 + m2[3] * d1,
    m2[4] * a1 + m2[5] * c1 + m1[4],
    m2[4] * b1 + m2[5] * d1 + m1[5]
  ];
};
var applyMatrix = (tf, pt) => {
  return {
    x: pt.x * tf[0] + pt.y * tf[2] + tf[4],
    y: pt.x * tf[1] + pt.y * tf[3] + tf[5]
  };
};
var applyInverseMatrix = (tf, pt) => {
  return applyMatrix(invertMatrix(tf), pt);
};
var invertMatrix = (tf) => {
  const a1 = tf[0];
  const b1 = tf[1];
  const c1 = tf[2];
  const d1 = tf[3];
  const tx1 = tf[4];
  const n = a1 * d1 - b1 * c1;
  return [
    d1 / n,
    -b1 / n,
    -c1 / n,
    a1 / n,
    (c1 * tf[5] - d1 * tx1) / n,
    -(a1 * tf[5] - b1 * tx1) / n
  ];
};
var getScaleMatrix = (sx, sy) => {
  return [sx, 0, 0, sy, 0, 0];
};
var applySizeToTransform = (transformRect) => {
  return multiplyMatrix(
    transformRect.transform,
    getScaleMatrix(transformRect.width, transformRect.height)
  );
};

// src/transform.ts
var transformRotate = (x, y, radian, cx, cy) => {
  if (!radian) {
    return { x, y };
  }
  const cos = Math.cos(radian);
  const sin = Math.sin(radian);
  return {
    x: (x - cx) * cos - (y - cy) * sin + cx,
    y: (x - cx) * sin + (y - cy) * cos + cy
  };
};

// src/geo/constant.ts
var K = 0.5522847498307936;

// src/geo/geo_rect.ts
var getRectByTwoPoint = (point1, point2) => {
  return {
    x: Math.min(point1.x, point2.x),
    y: Math.min(point1.y, point2.y),
    width: Math.abs(point1.x - point2.x),
    height: Math.abs(point1.y - point2.y)
  };
};
var isPointInTransformedRect = (point, rect, tol = 0) => {
  if (rect.transform) {
    const matrix = new Matrix(...rect.transform);
    point = matrix.applyInverse(point);
  }
  return point.x >= -tol && point.y >= -tol && point.x <= rect.width + tol && point.y <= rect.height + tol;
};
var isPointInRoundRect = (point, rect, cornerRadii, padding = 0) => {
  const x = rect.x - padding;
  const y = rect.y - padding;
  const width = rect.width + padding * 2;
  const height = rect.height + padding * 2;
  if (point.x >= x && point.y >= y && point.x <= x + width && point.y <= y + height) {
    if (point.x <= x + cornerRadii[0] && point.y <= y + cornerRadii[0]) {
      return __pow(point.x - x - cornerRadii[0], 2) + __pow(point.y - y - cornerRadii[0], 2) <= __pow(cornerRadii[0], 2);
    } else if (point.x >= x + width - cornerRadii[1] && point.y <= y + cornerRadii[1]) {
      return __pow(point.x - x - width + cornerRadii[1], 2) + __pow(point.y - y - cornerRadii[1], 2) <= __pow(cornerRadii[1], 2);
    } else if (point.x >= x + width - cornerRadii[2] && point.y >= y + height - cornerRadii[2]) {
      return __pow(point.x - x - width + cornerRadii[2], 2) + __pow(point.y - y - height + cornerRadii[2], 2) <= __pow(cornerRadii[2], 2);
    } else if (point.x <= x + cornerRadii[3] && point.y >= y + height - cornerRadii[3]) {
      return __pow(point.x - x - cornerRadii[3], 2) + __pow(point.y - y - height + cornerRadii[3], 2) <= __pow(cornerRadii[3], 2);
    } else {
      return true;
    }
  } else {
    return false;
  }
};
var normalizeRect = ({ x, y, width, height }) => {
  const x2 = x + width;
  const y2 = y + height;
  return getRectByTwoPoint({ x, y }, { x: x2, y: y2 });
};
var mergeRect = (...rects) => {
  if (rects.length === 0) {
    throw new Error("the count of rect can not be 0");
  }
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const rect of rects) {
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
};
var isRectIntersect = (rect1, rect2) => {
  return rect1.x <= rect2.x + rect2.width && rect1.x + rect1.width >= rect2.x && rect1.y <= rect2.y + rect2.height && rect1.y + rect1.height >= rect2.y;
};
var isRectContain = (rect1, rect2) => {
  return rect1.x <= rect2.x && rect1.y <= rect2.y && rect1.x + rect1.width >= rect2.x + rect2.width && rect1.y + rect1.height >= rect2.y + rect2.height;
};
var offsetRect = (rect, padding) => {
  if (typeof padding === "number") {
    padding = [padding, padding, padding, padding];
  }
  const { x, y, width, height } = rect;
  return {
    x: x - padding[3],
    y: y - padding[0],
    width: width + padding[1] + padding[3],
    height: height + padding[0] + padding[2]
  };
};
var rectToMidPoints = (rect) => {
  const { x, y, width, height } = rect;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  return [
    { x: x + halfWidth, y },
    { x: x + width, y: y + halfHeight },
    { x: x + halfWidth, y: y + height },
    { x, y: y + halfHeight }
  ];
};
var getRotatedRectByTwoPoint = (point1, point2) => {
  const { x, y } = point1;
  const width = point2.x - point1.x;
  const height = point2.y - point1.y;
  const rotation = normalizeRadian(Math.atan2(height, width));
  const cx = x + width / 2;
  const cy = y + height / 2;
  const p = transformRotate(x, y, -rotation, cx, cy);
  return {
    x: p.x,
    y: p.y,
    width: Math.sqrt(width * width + height * height),
    height: 0,
    rotation
  };
};
var rectToVertices = (rect, tf) => {
  const { x, y, width, height } = rect;
  let pts = [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height }
  ];
  if (tf) {
    const matrix = new Matrix(...tf);
    pts = pts.map((point) => {
      const pt = matrix.apply(point);
      return { x: pt.x, y: pt.y };
    });
  }
  return pts;
};
var getRectApplyMatrix = (rect) => {
  const pts = rectToVertices(
    {
      x: 0,
      y: 0,
      width: rect.width,
      height: rect.height
    },
    rect.transform
  );
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const pt of pts) {
    minX = Math.min(minX, pt.x);
    minY = Math.min(minY, pt.y);
    maxX = Math.max(maxX, pt.x);
    maxY = Math.max(maxY, pt.y);
  }
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
};
var getTransformedSize = (rect) => {
  const tf = new Matrix(
    rect.transform[0],
    rect.transform[1],
    rect.transform[2],
    rect.transform[3],
    0,
    0
  );
  const rightTop = tf.apply({ x: rect.width, y: 0 });
  const leftBottom = tf.apply({ x: 0, y: rect.height });
  const zero = { x: 0, y: 0 };
  return {
    width: distance(rightTop, zero),
    height: distance(leftBottom, zero)
  };
};
var recomputeTransformRect = (rect) => {
  const newSize = getTransformedSize(rect);
  const scaleX = newSize.width ? rect.width / newSize.width : 1;
  const scaleY = newSize.height ? rect.height / newSize.height : 1;
  const scaleMatrix = new Matrix().scale(scaleX, scaleY);
  const tf = new Matrix(...rect.transform).append(scaleMatrix);
  return {
    width: newSize.width,
    height: newSize.height,
    transform: tf.getArray()
  };
};
var rectToBox = (rect) => {
  return {
    minX: rect.x,
    minY: rect.y,
    maxX: rect.x + rect.width,
    maxY: rect.y + rect.height
  };
};
var boxToRect = (box) => {
  return {
    x: box.minX,
    y: box.minY,
    width: box.maxX - box.minX,
    height: box.maxY - box.minY
  };
};
var roundRectToPathCmds = (rect, cornerRadius = 0) => {
  const { minX, minY, maxX, maxY } = rectToBox(rect);
  if (cornerRadius <= 0) {
    return [
      { type: "M", points: [{ x: minX, y: minY }] },
      { type: "L", points: [{ x: maxX, y: minY }] },
      { type: "L", points: [{ x: maxX, y: maxY }] },
      { type: "L", points: [{ x: minX, y: maxY }] },
      { type: "Z", points: [] }
    ];
  }
  const halfWidth = rect.width / 2;
  const halfHeight = rect.height / 2;
  const r = Math.min(cornerRadius, halfWidth, halfHeight);
  const isFullWidth = r === halfWidth;
  const isFullHeight = r === halfHeight;
  const lx = r * K;
  const ly = r * K;
  const commands = [
    // left top
    { type: "M", points: [{ x: minX, y: minY + r }] },
    {
      type: "C",
      points: [
        { x: minX, y: minY + r - ly },
        { x: minX + r - lx, y: minY },
        { x: minX + r, y: minY }
      ]
    }
  ];
  if (!isFullWidth) {
    commands.push({
      type: "L",
      points: [{ x: maxX - r, y: minY }]
    });
  }
  commands.push({
    type: "C",
    points: [
      { x: maxX - r + lx, y: minY },
      { x: maxX, y: minY + r - ly },
      { x: maxX, y: minY + r }
    ]
  });
  if (!isFullHeight) {
    commands.push({
      type: "L",
      points: [{ x: maxX, y: maxY - r }]
    });
  }
  commands.push({
    type: "C",
    points: [
      { x: maxX, y: maxY - r + ly },
      { x: maxX - r + lx, y: maxY },
      { x: maxX - r, y: maxY }
    ]
  });
  if (!isFullWidth) {
    commands.push({
      type: "L",
      points: [{ x: minX + r, y: maxY }]
    });
  }
  commands.push({
    type: "C",
    points: [
      { x: minX + r - lx, y: maxY },
      { x: minX, y: maxY - r + ly },
      { x: minX, y: maxY - r }
    ]
  });
  if (!isFullHeight) {
    commands.push({
      type: "L",
      points: [{ x: minX, y: minY + r }]
    });
  }
  commands.push({
    type: "Z",
    points: []
  });
  return commands;
};

// src/geo/geo_box.ts
var isPointInBox = (box, point, tol = 0) => {
  return point.x >= box.minX - tol && point.y >= box.minY - tol && point.x <= box.maxX + tol && point.y <= box.maxY + tol;
};
var mergeBoxes = (boxes) => {
  if (boxes.length === 0) {
    throw new Error("the count of boxes can not be 0");
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
  return {
    minX,
    minY,
    maxX,
    maxY
  };
};
var isBoxIntersect = (box1, box2) => {
  return box1.minX <= box2.maxX && box1.maxX >= box2.minX && box1.minY <= box2.maxY && box1.maxY >= box2.minY;
};
var isBoxContain = (box1, box2) => {
  return box1.minX <= box2.minX && box1.minY <= box2.minY && box1.maxX >= box2.maxX && box1.maxY >= box2.maxY;
};
var getPointsBbox = (points) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const pt of points) {
    minX = Math.min(minX, pt.x);
    minY = Math.min(minY, pt.y);
    maxX = Math.max(maxX, pt.x);
    maxY = Math.max(maxY, pt.y);
  }
  return {
    minX,
    minY,
    maxX,
    maxY
  };
};
var calcRectBbox = (transformRect, paddingBeforeTransform) => {
  let x = 0;
  let y = 0;
  let width = transformRect.width;
  let height = transformRect.height;
  if (paddingBeforeTransform) {
    x -= paddingBeforeTransform;
    y -= paddingBeforeTransform;
    width += paddingBeforeTransform * 2;
    height += paddingBeforeTransform * 2;
  }
  const tf = transformRect.transform;
  const vertices = rectToVertices({
    x,
    y,
    width,
    height
  }).map((item) => {
    return applyMatrix(tf, item);
  });
  return getPointsBbox(vertices);
};

// src/geo/geo_circle.ts
var isPointInCircle = (point, circle) => {
  const dx = point.x - circle.x;
  const dy = point.y - circle.y;
  const dSquare = dx * dx + dy * dy;
  return dSquare <= circle.radius * circle.radius;
};

// src/geo/geo_ellipse.ts
var ellipseToPathCmds = (rect) => {
  const k = 0.5522847498307936;
  const { minX, minY, maxX, maxY } = rectToBox(rect);
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const rx = rect.width / 2;
  const ry = rect.height / 2;
  const lx = rx * k;
  const ly = ry * k;
  return [
    { type: "M", points: [{ x: maxX, y: midY }] },
    // right bottom
    {
      type: "C",
      points: [
        { x: maxX, y: midY + ly },
        { x: midX + lx, y: maxY },
        { x: midX, y: maxY }
      ]
    },
    // left bottom
    {
      type: "C",
      points: [
        { x: midX - lx, y: maxY },
        { x: minX, y: midY + ly },
        { x: minX, y: midY }
      ]
    },
    // left top
    {
      type: "C",
      points: [
        { x: minX, y: midY - ly },
        { x: midX - lx, y: minY },
        { x: midX, y: minY }
      ]
    },
    // right top
    {
      type: "C",
      points: [
        { x: maxX, y: midY - ly },
        { x: midX + lx, y: minY },
        { x: maxX, y: midY }
      ]
    },
    {
      type: "Z",
      points: []
    }
  ];
};

// src/geo/geo_line.ts
var closestPtOnLine = (p1, p2, p, canOutside = true) => {
  if (p1.x === p2.x && p1.y === p2.y) {
    return {
      t: 0,
      point: { x: p1.x, y: p1.y }
    };
  }
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  let t = ((p.x - p1.x) * dx + (p.y - p1.y) * dy) / (dx * dx + dy * dy);
  if (!canOutside) {
    t = Math.max(0, Math.min(1, t));
  }
  const closestPt = {
    x: p1.x + t * dx,
    y: p1.y + t * dy
  };
  return {
    t,
    point: closestPt
  };
};
var getPolarTrackSnapPt = (center, p, count = 4) => {
  let closestPt = { x: 0, y: 0 };
  let closestDist = Infinity;
  for (let i = 1; i <= count; i++) {
    const rad = Math.PI / count * i;
    const pt = {
      x: center.x + Math.cos(rad),
      y: center.y + Math.sin(rad)
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
};
var getLineIntersection = (p1, p2, p3, p4) => {
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;
  const { x: x3, y: y3 } = p3;
  const { x: x4, y: y4 } = p4;
  const a = y2 - y1;
  const b = x1 - x2;
  const c = x1 * y2 - x2 * y1;
  const d = y4 - y3;
  const e = x3 - x4;
  const f = x3 * y4 - x4 * y3;
  const denominator = a * e - b * d;
  if (Math.abs(denominator) < 1e-9) {
    return null;
  }
  const px = (c * e - f * b) / denominator;
  const py = (a * f - c * d) / denominator;
  return { x: px, y: py };
};

// src/geo/geo_path.ts
import fitCurve from "fit-curve";
var simplePath = (segs, tol) => {
  const curves = fitCurve(
    segs.map(({ point }) => [point.x, point.y]),
    tol
  );
  const newSegs = [];
  for (let i = 0, len = curves.length; i <= len; i++) {
    const curve = curves[i];
    const prevCurve = curves[i - 1];
    const point = curve ? {
      x: curve[0][0],
      y: curve[0][1]
    } : {
      x: prevCurve[3][0],
      y: prevCurve[3][1]
    };
    const outPt = curve ? {
      x: curve[1][0] - point.x,
      y: curve[1][1] - point.y
    } : { x: 0, y: 0 };
    const inPt = prevCurve ? {
      x: prevCurve[2][0] - point.x,
      y: prevCurve[2][1] - point.y
    } : { x: 0, y: 0 };
    newSegs.push({
      point,
      in: inPt,
      out: outPt
    });
  }
  return newSegs;
};
var insertPathSeg = (pathItem, leftIndex, t) => {
  const segs = pathItem.segs;
  const isOutRangeAndNoClose = !pathItem.closed && (leftIndex < 0 || leftIndex >= segs.length - 1);
  if (isOutRangeAndNoClose) {
    segs.splice(leftIndex, 1);
    return pathItem;
  }
  let rightIndex = leftIndex + 1;
  if (pathItem.closed) {
    rightIndex %= segs.length;
  }
  const leftSeg = segs[leftIndex];
  const rightSeg = segs[rightIndex];
  const newSegs = splitBezierSegs(leftSeg, rightSeg, t);
  if (rightIndex === 0) {
    pathItem.segs.splice(leftIndex, 1, newSegs[0], newSegs[1]);
    pathItem.segs.splice(0, 1, newSegs[2]);
  } else {
    pathItem.segs.splice(leftIndex, 2, ...newSegs);
  }
  return pathItem;
};
var deletePathSegAndHeal = (pathItem, targetIndex) => {
  const segs = pathItem.segs;
  if (segs.length <= 1) {
    pathItem.segs = [];
    return pathItem;
  }
  const isOutRangeAndNoClose = !pathItem.closed && (targetIndex <= 0 || targetIndex >= segs.length - 1);
  if (isOutRangeAndNoClose) {
    segs.splice(targetIndex, 1);
    return pathItem;
  }
  let leftSegIndex = targetIndex - 1;
  let rightSegIndex = targetIndex + 1;
  if (pathItem.closed) {
    leftSegIndex %= segs.length;
    rightSegIndex %= segs.length;
  }
  const midSeg = segs[targetIndex];
  const leftSeg = segs[leftSegIndex];
  const rightSeg = segs[rightSegIndex];
  const isNoCurve = isZeroPoint(leftSeg.out) && isZeroPoint(rightSeg.in) && isZeroPoint(midSeg.in) && isZeroPoint(midSeg.out);
  if (isNoCurve) {
    segs.splice(targetIndex, 1);
    return pathItem;
  }
  const leftBezier = [
    leftSeg.point,
    pointAdd(leftSeg.out, leftSeg.point),
    pointAdd(midSeg.in, midSeg.point),
    midSeg.point
  ];
  const rightBezier = [
    midSeg.point,
    pointAdd(midSeg.out, midSeg.point),
    pointAdd(rightSeg.in, rightSeg.point),
    rightSeg.point
  ];
  const leftPoints = [
    getBezierPoint(leftBezier, 0.3),
    getBezierPoint(leftBezier, 0.6)
  ];
  const rightPoints = [
    getBezierPoint(rightBezier, 0.3),
    getBezierPoint(rightBezier, 0.6)
  ];
  const curve = fitCurve(
    [
      leftSeg.point,
      ...leftPoints,
      midSeg.point,
      ...rightPoints,
      rightSeg.point
    ].map(({ x, y }) => [x, y]),
    9999
  )[0];
  const handle1 = pointSub(
    {
      x: curve[1][0],
      y: curve[1][1]
    },
    leftSeg.point
  );
  const handle2 = pointSub(
    {
      x: curve[2][0],
      y: curve[2][1]
    },
    rightSeg.point
  );
  let leftOutDir = normalizeVec(leftSeg.out);
  if (Number.isNaN(leftOutDir.x) || Number.isNaN(leftOutDir.y)) {
    leftOutDir = normalizeVec(handle1);
  }
  let rightInDir = normalizeVec(rightSeg.in);
  if (Number.isNaN(rightInDir.x) || Number.isNaN(rightInDir.y)) {
    rightInDir = normalizeVec(handle2);
  }
  const newLeftOutLen = distance({ x: 0, y: 0 }, handle1);
  const newRightInLen = distance({ x: 0, y: 0 }, handle2);
  leftSeg.out = {
    x: leftOutDir.x * newLeftOutLen,
    y: leftOutDir.y * newLeftOutLen
  };
  rightSeg.in = {
    x: rightInDir.x * newRightInLen,
    y: rightInDir.y * newRightInLen
  };
  segs.splice(targetIndex, 1);
  return pathItem;
};

// src/geo/geo_bezier_class.ts
var GeoBezier = class {
  // lookup table
  constructor(points) {
    __publicField(this, "points");
    __publicField(this, "dpoints", []);
    // control points of derivative
    __publicField(this, "_bbox", null);
    __publicField(this, "lut", []);
    this.points = points;
    this.dpoints[0] = {
      x: 3 * (points[1].x - points[0].x),
      y: 3 * (points[1].y - points[0].y)
    };
    this.dpoints[1] = {
      x: 3 * (points[2].x - points[1].x),
      y: 3 * (points[2].y - points[1].y)
    };
    this.dpoints[2] = {
      x: 3 * (points[3].x - points[2].x),
      y: 3 * (points[3].y - points[2].y)
    };
  }
  compute(t) {
    const t2 = t * t;
    const ct = 1 - t;
    const ct2 = ct * ct;
    const a = ct2 * ct;
    const b = 3 * t * ct2;
    const c = 3 * t2 * ct;
    const d = t2 * t;
    const [p1, cp1, cp2, p2] = this.points;
    return {
      x: a * p1.x + b * cp1.x + c * cp2.x + d * p2.x,
      y: a * p1.y + b * cp1.y + c * cp2.y + d * p2.y
    };
  }
  extrema() {
    const dpoints = this.dpoints;
    const extrema = [
      ...getRoot(dpoints[0].x, dpoints[1].x, dpoints[2].x),
      ...getRoot(dpoints[0].y, dpoints[1].y, dpoints[2].y)
    ].filter((t) => t >= 0 && t <= 1);
    return Array.from(new Set(extrema));
  }
  getBbox() {
    if (!this._bbox) {
      const extremaPoints = this.extrema().map((t) => this.compute(t));
      this._bbox = getPointsBbox([
        ...extremaPoints,
        this.points[0],
        this.points[3]
      ]);
    }
    return this._bbox;
  }
  hitTest(point, tol) {
    if (!isPointInBox(this.getBbox(), point, tol)) {
      return false;
    }
    const lookupTable = this.getLookupTable();
    let minDist = Number.MAX_SAFE_INTEGER;
    let minIndex = -1;
    for (let i = 0; i < lookupTable.length; i++) {
      const item = lookupTable[i];
      const dist = distance(point, item.pt);
      if (dist <= tol) {
        return true;
      }
      if (dist < minDist) {
        minDist = dist;
        minIndex = i;
      }
    }
    const minT = lookupTable[minIndex].t;
    const t1 = minIndex > 0 ? lookupTable[minIndex - 1].t : minT;
    const t2 = minIndex < lookupTable.length - 1 ? lookupTable[minIndex + 1].t : minT;
    const step = 1e-3;
    for (let t = t1; t <= t2; t += step) {
      const pt = this.compute(t);
      const dist = distance(point, pt);
      if (dist <= tol) {
        return true;
      }
    }
    return false;
  }
  getLookupTable() {
    if (this.lut.length === 0) {
      const count = 100;
      for (let i = 0; i <= count; i++) {
        const t = i / count;
        const pt = this.compute(t);
        this.lut[i] = { t, pt };
      }
    }
    return this.lut;
  }
  project(targetPt) {
    const lookupTable = this.getLookupTable();
    let minDist = Number.MAX_SAFE_INTEGER;
    let minIndex = -1;
    for (let i = 0; i < lookupTable.length; i++) {
      const item = lookupTable[i];
      const dist = distance(targetPt, item.pt);
      if (dist < minDist) {
        minDist = dist;
        minIndex = i;
        if (dist === 0) {
          break;
        }
      }
    }
    if (minDist === 0) {
      const projectPt2 = this.compute(lookupTable[minIndex].t);
      return {
        point: projectPt2,
        t: lookupTable[minIndex].t,
        dist: distance(targetPt, projectPt2)
      };
    }
    let minT = lookupTable[minIndex].t;
    const t1 = minIndex > 0 ? lookupTable[minIndex - 1].t : minT;
    const t2 = minIndex < lookupTable.length - 1 ? lookupTable[minIndex + 1].t : minT;
    const step = 1e-3;
    for (let t = t1; t <= t2; t += step) {
      const pt = this.compute(t);
      const dist = distance(targetPt, pt);
      if (dist < minDist) {
        minDist = dist;
        minT = t;
        if (dist === 0) {
          break;
        }
      }
    }
    if (minT < 0) {
      minT = 0;
    }
    if (minT > 1) {
      minT = 1;
    }
    const projectPt = this.compute(minT);
    return {
      point: projectPt,
      t: minT,
      dist: distance(targetPt, projectPt)
    };
  }
  toCommand() {
    const [p1, cp1, cp2, p2] = this.points;
    if (p1.x === cp1.x && cp1.x === cp2.x && cp2.x === p2.x) {
      return [
        { type: "M", points: [p1] },
        { type: "C", points: [cp1, cp2, p2] }
      ];
    } else {
      return [
        { type: "M", points: [p1] },
        { type: "C", points: [cp1, cp2, p2] }
      ];
    }
  }
};
var getRoot = (a, b, c) => {
  const d = a - 2 * b + c;
  if (d !== 0) {
    const deltaSquare = b * b - a * c;
    if (deltaSquare < 0) {
      return [];
    }
    const delta = Math.sqrt(deltaSquare);
    const m = a - b;
    if (delta === 0) {
      return [(m - delta) / d];
    } else {
      return [(m - delta) / d, (m + delta) / d];
    }
  } else if (a !== b) {
    return [a / (a - b) / 2];
  } else {
    return [];
  }
};

// src/geo/geo_path_class.ts
var GeoPath = class {
  constructor(pathData) {
    __publicField(this, "bezierLists");
    const bezierItems = [];
    for (let i = 0; i < pathData.length; i++) {
      const pathItem = pathData[i];
      const segs = pathItem.segs;
      bezierItems[i] = {
        isClosed: pathItem.closed,
        curves: []
      };
      for (let j = 1; j <= segs.length; j++) {
        if (j === segs.length && !pathItem.closed) {
          continue;
        }
        const seg = segs[j % segs.length];
        const prevSeg = segs[j - 1];
        bezierItems[i].curves.push(
          new GeoBezier([
            prevSeg.point,
            GeoPath.getHandleOut(prevSeg),
            GeoPath.getHandleIn(seg),
            seg.point
          ])
        );
      }
    }
    this.bezierLists = bezierItems;
  }
  static getHandleIn(seg) {
    return pointAdd(seg.point, seg.in);
  }
  static getHandleOut(seg) {
    return pointAdd(seg.point, seg.out);
  }
  getBbox() {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const { curves } of this.bezierLists) {
      for (const bezier of curves) {
        const bbox = bezier.getBbox();
        minX = Math.min(minX, bbox.minX);
        minY = Math.min(minY, bbox.minY);
        maxX = Math.max(maxX, bbox.maxX);
        maxY = Math.max(maxY, bbox.maxY);
      }
    }
    return {
      minX,
      minY,
      maxX,
      maxY
    };
  }
  getBRect() {
    const bbox = this.getBbox();
    if (bbox.minX === Infinity) {
      return { x: 0, y: 0, width: 100, height: 100 };
    }
    return {
      x: bbox.minX,
      y: bbox.minY,
      width: bbox.maxX - bbox.minX,
      height: bbox.maxY - bbox.minY
    };
  }
  hitTest(point, tol) {
    for (const { curves } of this.bezierLists) {
      for (const bezier of curves) {
        if (bezier.hitTest(point, tol)) {
          return true;
        }
      }
    }
    return false;
  }
  project(point, tol = Infinity) {
    const result = {
      dist: tol,
      point: { x: 0, y: 0 },
      index: [-1, -1],
      t: -1
    };
    for (let i = 0; i < this.bezierLists.length; i++) {
      const { curves } = this.bezierLists[i];
      for (let j = 0; j < curves.length; j++) {
        const bezier = curves[j];
        const projectInfo = bezier.project(point);
        if (projectInfo.dist < result.dist) {
          result.dist = projectInfo.dist;
          result.point = projectInfo.point;
          result.index = [i, j];
          result.t = projectInfo.t;
        }
        if (projectInfo.dist === 0) {
          break;
        }
      }
    }
    if (result.index[0] === -1) {
      return null;
    }
    return result;
  }
  toCommands() {
    const retCmds = [];
    for (const { isClosed, curves } of this.bezierLists) {
      for (let i = 0; i < curves.length; i++) {
        const bezier = curves[i];
        const cmd = bezier.toCommand();
        if (i === 0) {
          retCmds.push(...cmd);
        } else {
          retCmds.push(...cmd.slice(1));
        }
      }
      if (isClosed) {
        retCmds.push({
          type: "Z",
          points: []
        });
      }
    }
    return retCmds;
  }
};
var commandsToStr = (commands, precision) => {
  return commands.map(
    (cmd) => cmd.type + cmd.points.map(
      (pt) => remainDecimal(pt.x, precision) + " " + remainDecimal(pt.y, precision)
    ).join(" ")
  ).join(" ");
};
var remainDecimal = (num, precision = 2) => {
  return Number(num.toFixed(precision));
};

// src/geo/geo_arc.ts
var arcToBezier = ({
  center,
  r,
  startAngle,
  endAngle,
  angleDir = true
}) => {
  if (angleDir === false) {
    [startAngle, endAngle] = [endAngle, startAngle];
  }
  const sweepAngle = (endAngle - startAngle + Math.PI * 2) % (Math.PI * 2);
  const halfSweepAngle = sweepAngle / 2;
  const k = 4 * (1 - Math.cos(halfSweepAngle)) / (3 * Math.sin(halfSweepAngle));
  const matrix = new Matrix().rotate(startAngle).scale(r, r).translate(center.x, center.y);
  endAngle -= startAngle;
  startAngle = 0;
  const p1 = matrix.apply({
    x: 1,
    y: 0
  });
  const p2 = matrix.apply({
    x: 1,
    y: k
  });
  const p3 = matrix.apply({
    x: Math.cos(sweepAngle) + k * Math.sin(sweepAngle),
    y: Math.sin(sweepAngle) - k * Math.cos(sweepAngle)
  });
  const p4 = matrix.apply({
    x: Math.cos(sweepAngle),
    y: Math.sin(sweepAngle)
  });
  if (angleDir) {
    return [p1, p2, p3, p4];
  }
  return [p4, p3, p2, p1];
};

// src/geo/geo_polygon.ts
var getRegularPolygon = (size, count) => {
  const cx = size.width / 2;
  const cy = size.height / 2;
  const points = [{ x: cx, y: 0 }];
  const rad = Math.PI * 2 / count;
  const rotateTf = new Matrix().translate(-cx, -cy).rotate(rad).translate(cx, cy);
  let prevPoint = points[0];
  for (let i = 1; i < count; i++) {
    const { x, y } = rotateTf.apply(prevPoint);
    const pt = { x, y };
    points.push(pt);
    prevPoint = pt;
  }
  const t = size.width / size.height;
  for (let i = 1; i < count; i++) {
    const pt = points[i];
    pt.x = lerpNum(cx, pt.x, t);
  }
  return points;
};
var isPointInConvexPolygon = (polygon, point) => {
  let dir = void 0;
  for (let i = 0; i < polygon.length; i++) {
    const start = polygon[i];
    const end = polygon[(i + 1) % polygon.length];
    const a = {
      x: end.x - start.x,
      y: end.y - start.y
    };
    const b = {
      x: point.x - start.x,
      y: point.y - start.y
    };
    const currDir = Math.sign(a.x * b.y - a.y * b.x);
    if (currDir === 0) {
      continue;
    }
    if (dir === void 0) {
      dir = currDir;
    } else if (dir !== currDir) {
      return false;
    }
  }
  return true;
};
var isPointInPolygon = (polygon, pt) => {
  let isIn = false;
  for (let i = 0; i < polygon.length; i++) {
    let a = polygon[i];
    let b = polygon[(i + 1) % polygon.length];
    if (a.y > b.y) {
      [a, b] = [b, a];
    }
    if (a.y <= pt.y && b.y > pt.y) {
      const crossProduct = (pt.x - a.x) * (b.y - a.y) - (b.x - a.x) * (pt.y - a.y);
      if (crossProduct === 0) {
        return true;
      } else if (crossProduct > 0) {
        isIn = !isIn;
      }
    }
  }
  return isIn;
};
var roundPolygon = (polygon, radius) => {
  const path = [];
  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[(i - 1 + polygon.length) % polygon.length];
    const p2 = polygon[i];
    const p3 = polygon[(i + 1) % polygon.length];
    const r = getCorrectedRadius(
      pointMid(p1, p2),
      p2,
      pointMid(p2, p3),
      radius
    );
    const arc = getLineJointRoundArc([p1, p2], [p2, p3], r);
    if (i === 0) {
      path.push({
        type: "M",
        points: [arc.start]
      });
    } else {
      const lastCmdPoints = path[path.length - 1].points;
      const lastAnchorPoint = lastCmdPoints[lastCmdPoints.length - 1];
      if (!isPointEqual(arc.start, lastAnchorPoint)) {
        path.push({
          type: "L",
          points: [arc.start]
        });
      }
    }
    const pathCmds = arcToBezier({
      center: arc.center,
      r,
      startAngle: arc.startAngle,
      endAngle: arc.endAngle,
      angleDir: arc.angleDir
    });
    path.push({
      type: "C",
      points: [pathCmds[1], pathCmds[2], pathCmds[3]]
    });
  }
  path.push({
    type: "Z",
    points: []
  });
  return path;
};
var getCorrectedRadius = (p1, p2, p3, radius) => {
  const v1 = {
    x: p2.x - p1.x,
    y: p2.y - p1.y
  };
  const v2 = {
    x: p2.x - p3.x,
    y: p2.y - p3.y
  };
  const angle = getAngleBetweenVec(v1, v2) / 2;
  const r1 = Math.tan(angle) * distance(p1, p2);
  const r2 = Math.tan(angle) * distance(p2, p3);
  return Math.min(radius, r1, r2);
};
var getLineJointRoundArc = (line1, line2, radius) => {
  const p1 = line1[0];
  const p2 = line1[1];
  const p3 = line2[0];
  const p4 = line2[1];
  const v1 = {
    x: p1.x - p2.x,
    y: p1.y - p2.y
  };
  const v2 = {
    x: p4.x - p3.x,
    y: p4.y - p3.y
  };
  const cp = v1.x * v2.y - v2.x * v1.y;
  if (cp === 0) {
    return null;
  }
  let normalVec1;
  let normalVec2;
  if (cp < 0) {
    normalVec1 = {
      x: v1.y,
      y: -v1.x
    };
    normalVec2 = {
      x: -v2.y,
      y: v2.x
    };
  } else {
    normalVec1 = {
      x: -v1.y,
      y: v1.x
    };
    normalVec2 = {
      x: v2.y,
      y: -v2.x
    };
  }
  const t1 = radius / distance(p1, p2);
  const d = {
    x: normalVec1.x * t1,
    y: normalVec1.y * t1
  };
  const offsetLine1 = [
    {
      x: p1.x + d.x,
      y: p1.y + d.y
    },
    {
      x: p2.x + d.x,
      y: p2.y + d.y
    }
  ];
  const t2 = radius / distance(p3, p4);
  const d2 = {
    x: normalVec2.x * t2,
    y: normalVec2.y * t2
  };
  const offsetLine2 = [
    {
      x: p3.x + d2.x,
      y: p3.y + d2.y
    },
    {
      x: p4.x + d2.x,
      y: p4.y + d2.y
    }
  ];
  const center = getLineIntersection(
    offsetLine1[0],
    offsetLine1[1],
    offsetLine2[0],
    offsetLine2[1]
  );
  const { point: start } = closestPtOnLine(p1, p2, center, true);
  const { point: end } = closestPtOnLine(p3, p4, center, true);
  const angleBase = { x: 1, y: 0 };
  const startAngle = getSweepAngle(angleBase, {
    x: start.x - center.x,
    y: start.y - center.y
  });
  const endAngle = getSweepAngle(angleBase, {
    x: end.x - center.x,
    y: end.y - center.y
  });
  return {
    center,
    start,
    end,
    startAngle,
    endAngle,
    angleDir: cp < 0
    // positive --> clockwise
  };
};

// src/geo/geo_resize_line.ts
var resizeLine = (type, newPos, rect, options = {
  keepPolarSnap: false,
  scaleFromCenter: false
}) => {
  if (!["se", "ne", "nw", "sw"].includes(type)) {
    throw new Error(`invalid type "${type}"`);
  }
  const isRightControl = type === "se" || type === "ne";
  let globalOrigin = { x: 0, y: 0 };
  if (options.scaleFromCenter) {
    globalOrigin = new Matrix(...rect.transform).apply({
      x: rect.width / 2,
      y: rect.height / 2
    });
  } else if (isRightControl) {
    globalOrigin = {
      x: rect.transform[4],
      y: rect.transform[5]
    };
  } else {
    globalOrigin = new Matrix(...rect.transform).apply({
      x: rect.width,
      y: rect.height
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
      y: newPos.y - globalOrigin.y
    };
    const rotate = getSweepAngle(
      { x: 1, y: 0 },
      {
        x: newPos.x - globalOrigin.x,
        y: newPos.y - globalOrigin.y
      }
    );
    const tf = new Matrix().rotate(rotate).translate(globalOrigin.x, globalOrigin.y);
    if (options.scaleFromCenter) {
      tf.translate(-offset.x, -offset.y);
    }
    return {
      width,
      height: 0,
      transform: tf.getArray()
    };
  } else {
    const offset = {
      x: globalOrigin.x - newPos.x,
      y: globalOrigin.y - newPos.y
    };
    const rotate = getSweepAngle({ x: 1, y: 0 }, offset);
    const tf = new Matrix().rotate(rotate);
    const newRightBottom = tf.apply({ x: width, y: rect.height });
    tf.translate(
      globalOrigin.x - newRightBottom.x,
      globalOrigin.y - newRightBottom.y
    );
    if (options.scaleFromCenter) {
      tf.translate(offset.x, offset.y);
    }
    return {
      width,
      height: 0,
      transform: tf.getArray()
    };
  }
};

// src/geo/geo_resize_rect/geo_resize_rect.ts
var doubleSize = (width, height) => ({
  width: width * 2,
  height: height * 2
});
var resizeOps = {
  sw: {
    getLocalOrigin: (width) => ({ x: width, y: 0 }),
    getNewSize: (newLocalPt, localOrigin) => ({
      width: localOrigin.x - newLocalPt.x,
      height: newLocalPt.y - localOrigin.y
    }),
    isBaseWidthWhenKeepRatio: (isWidthLarger) => isWidthLarger,
    getSizeWhenScaleFromCenter: doubleSize
  },
  se: {
    getLocalOrigin: () => ({ x: 0, y: 0 }),
    getNewSize: (newLocalPt, localOrigin) => ({
      width: newLocalPt.x - localOrigin.x,
      height: newLocalPt.y - localOrigin.y
    }),
    isBaseWidthWhenKeepRatio: (isWidthLarger) => isWidthLarger,
    getSizeWhenScaleFromCenter: doubleSize
  },
  nw: {
    getLocalOrigin: (width, height) => {
      return { x: width, y: height };
    },
    getNewSize: (newLocalPt, localOrigin) => {
      return {
        width: localOrigin.x - newLocalPt.x,
        height: localOrigin.y - newLocalPt.y
      };
    },
    isBaseWidthWhenKeepRatio: (isWidthLarger) => isWidthLarger,
    getSizeWhenScaleFromCenter: doubleSize
  },
  ne: {
    getLocalOrigin: (_width, height) => ({ x: 0, y: height }),
    getNewSize: (newLocalPt, localOrigin) => ({
      width: newLocalPt.x - localOrigin.x,
      height: localOrigin.y - newLocalPt.y
    }),
    isBaseWidthWhenKeepRatio: (isWidthLarger) => isWidthLarger,
    getSizeWhenScaleFromCenter: doubleSize
  },
  n: {
    getLocalOrigin: (width, height) => ({ x: width / 2, y: height }),
    getNewSize: (newLocalPt, localOrigin, rect) => ({
      width: rect.width,
      height: localOrigin.y - newLocalPt.y
    }),
    isBaseWidthWhenKeepRatio: () => false,
    getSizeWhenScaleFromCenter: (width, height) => ({
      width,
      height: height * 2
    })
  },
  s: {
    getLocalOrigin: (width) => ({ x: width / 2, y: 0 }),
    getNewSize: (newLocalPt, localOrigin, rect) => ({
      width: rect.width,
      height: newLocalPt.y - localOrigin.y
    }),
    isBaseWidthWhenKeepRatio: () => false,
    getSizeWhenScaleFromCenter: (width, height) => ({
      width,
      height: height * 2
    })
  },
  e: {
    getLocalOrigin: (_width, height) => ({ x: 0, y: height / 2 }),
    getNewSize: (newLocalPt, localOrigin, rect) => ({
      width: newLocalPt.x - localOrigin.x,
      height: rect.height
    }),
    isBaseWidthWhenKeepRatio: () => true,
    getSizeWhenScaleFromCenter: (width, height) => ({
      width: width * 2,
      height
    })
  },
  w: {
    getLocalOrigin: (width, height) => ({ x: width, y: height / 2 }),
    getNewSize: (newLocalPt, localOrigin, rect) => ({
      width: localOrigin.x - newLocalPt.x,
      height: rect.height
    }),
    isBaseWidthWhenKeepRatio: () => true,
    getSizeWhenScaleFromCenter: (width, height) => ({
      width: width * 2,
      height
    })
  }
};
var resizeRect = (type, newGlobalPt, rect, options) => {
  const resizeOp = resizeOps[type];
  if (!resizeOp) {
    throw new Error(`resize type ${type} is invalid`);
  }
  const {
    keepRatio,
    scaleFromCenter,
    noChangeWidthAndHeight,
    flip = true
  } = options != null ? options : {};
  const transform = new Matrix(...rect.transform);
  const newRect = {
    width: 0,
    height: 0,
    transform: transform.clone()
  };
  const localOrigin = scaleFromCenter ? { x: rect.width / 2, y: rect.height / 2 } : resizeOp.getLocalOrigin(rect.width, rect.height);
  const newLocalPt = transform.applyInverse(newGlobalPt);
  let size = resizeOp.getNewSize(newLocalPt, localOrigin, rect);
  if (scaleFromCenter) {
    size = resizeOp.getSizeWhenScaleFromCenter(size.width, size.height);
  }
  if (keepRatio) {
    const ratio = rect.width / rect.height;
    const newRatio = Math.abs(size.width / size.height);
    const isWidthLarger = newRatio > ratio;
    if (resizeOp.isBaseWidthWhenKeepRatio(isWidthLarger)) {
      size.height = Math.sign(size.height) * Math.abs(size.width) / ratio;
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
    scaleFromCenter ? { x: newRect.width / 2, y: newRect.height / 2 } : resizeOp.getLocalOrigin(newRect.width, newRect.height)
  );
  const globalOrigin = transform.apply(localOrigin);
  const offset = {
    x: globalOrigin.x - newGlobalOrigin.x,
    y: globalOrigin.y - newGlobalOrigin.y
  };
  newRect.transform.prepend(new Matrix().translate(offset.x, offset.y));
  if (!flip) {
    const flipFixedTf = new Matrix().translate(-newRect.width / 2, -newRect.height / 2).scale(scaleX, scaleY).translate(newRect.width / 2, newRect.height / 2);
    newRect.transform.append(flipFixedTf);
  }
  return {
    width: newRect.width,
    height: newRect.height,
    transform: newRect.transform.getArray()
  };
};

// src/geo/geo_star.ts
var getStar = (size, count, innerScale) => {
  const cx = size.width / 2;
  const cy = size.height / 2;
  const points = new Array(count * 2);
  points[0] = { x: cx, y: 0 };
  const rad = Math.PI * 2 / count;
  const rotateTf = new Matrix().translate(-cx, -cy).rotate(rad).translate(cx, cy);
  let prevPoint = points[0];
  for (let i = 1; i < count; i++) {
    const { x, y } = rotateTf.apply(prevPoint);
    const pt = { x, y };
    points[i * 2] = pt;
    prevPoint = pt;
  }
  const innerRotateTf = new Matrix().translate(-cx, -cy).rotate(rad / 2).translate(cx, cy);
  prevPoint = lerp(
    { x: cx, y: cy },
    innerRotateTf.apply(points[0]),
    innerScale
  );
  points[1] = prevPoint;
  for (let i = 1; i < count; i++) {
    const { x, y } = rotateTf.apply(prevPoint);
    const pt = { x, y };
    points[i * 2 + 1] = pt;
    prevPoint = pt;
  }
  const t = size.width / size.height;
  for (let i = 1; i < points.length; i++) {
    const pt = points[i];
    pt.x = lerpNum(cx, pt.x, t);
  }
  return points;
};

// src/geo/geo_text.ts
var _ctx = null;
var getContext = () => {
  if (_ctx)
    return _ctx;
  const canvas = document.createElement("canvas");
  _ctx = canvas.getContext("2d");
  _ctx.fontKerning = "none";
  return _ctx;
};
var calcGlyphInfos = (content, fontStyle) => {
  const glyphs = [];
  const position = { x: 0, y: 0 };
  const ctx = getContext();
  ctx.font = `${fontStyle.fontSize}px ${fontStyle.fontFamily}`;
  for (const c of content) {
    const textMetrics = ctx.measureText(c);
    glyphs.push({
      position: __spreadValues({}, position),
      width: textMetrics.width,
      height: textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent,
      fontBoundingBoxAscent: textMetrics.fontBoundingBoxAscent
    });
    position.x += textMetrics.width;
  }
  glyphs.push({
    position: __spreadValues({}, position),
    width: 0,
    height: 0,
    fontBoundingBoxAscent: 0
  });
  return glyphs;
};
var calcTextSize = (content, fontStyle) => {
  const ctx = getContext();
  ctx.font = `${fontStyle.fontSize}px ${fontStyle.fontFamily}`;
  const textMetrics = ctx.measureText(content);
  return {
    width: textMetrics.width,
    height: textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent,
    fontBoundingBoxAscent: textMetrics.fontBoundingBoxAscent
  };
};
export {
  GeoPath,
  Matrix,
  applyInverseMatrix,
  applyMatrix,
  applySizeToTransform,
  boxToRect,
  calcGlyphInfos,
  calcRectBbox,
  calcTextSize,
  checkTransformFlip,
  closestPtOnLine,
  commandsToStr,
  deg2Rad,
  deletePathSegAndHeal,
  distance,
  ellipseToPathCmds,
  getAngleBetweenVec,
  getBezierPoint,
  getLineIntersection,
  getLineJointRoundArc,
  getPerpendicularPoints,
  getPointsBbox,
  getPolarTrackSnapPt,
  getRectApplyMatrix,
  getRectByTwoPoint,
  getRegularPolygon,
  getRotatedRectByTwoPoint,
  getScaleMatrix,
  getStar,
  getSweepAngle,
  getTransformAngle,
  getTransformedSize,
  identityMatrix,
  insertPathSeg,
  invertMatrix,
  isBoxContain,
  isBoxIntersect,
  isPointEqual,
  isPointInBox,
  isPointInCircle,
  isPointInConvexPolygon,
  isPointInPolygon,
  isPointInRoundRect,
  isPointInTransformedRect,
  isRectContain,
  isRectIntersect,
  isZeroPoint,
  lerp,
  lerpNum,
  mergeBoxes,
  mergeRect,
  multiplyMatrix,
  normalizeDegree,
  normalizeRadian,
  normalizeRect,
  normalizeVec,
  offsetRect,
  pointAdd,
  pointMid,
  pointSub,
  rad2Deg,
  recomputeTransformRect,
  rectToBox,
  rectToMidPoints,
  rectToVertices,
  resizeLine,
  resizeRect,
  roundPolygon,
  roundRectToPathCmds,
  simplePath,
  splitBezierSegs,
  transformRotate
};
//# sourceMappingURL=geo.es.js.map
