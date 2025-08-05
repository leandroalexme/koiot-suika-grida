import { IMatrixArr, IPoint } from './common';

/**
 * Matrix class adapted from Suika's implementation
 * Fast 2D transformation matrix for CanvasKit
 * 
 * Matrix format:
 * | a  | c  | tx |
 * | b  | d  | ty |
 * | 0  | 0  | 1  |
 */
export class Matrix {
  /** x scale @default 1 */
  public a: number;
  /** y skew @default 0 */
  public b: number;
  /** x skew @default 0 */
  public c: number;
  /** y scale @default 1 */
  public d: number;
  /** x translation @default 0 */
  public tx: number;
  /** y translation @default 0 */
  public ty: number;

  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  }

  /**
   * Creates matrix from array
   */
  static fromArray(arr: IMatrixArr): Matrix {
    return new Matrix(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
  }

  /**
   * Sets matrix properties
   */
  public set(a: number, b: number, c: number, d: number, tx: number, ty: number): this {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
    return this;
  }

  /**
   * Gets matrix as array
   */
  public getArray(): IMatrixArr {
    return [this.a, this.b, this.c, this.d, this.tx, this.ty];
  }

  /**
   * Applies transformation to point
   */
  public apply(pos: IPoint): IPoint {
    const x = pos.x;
    const y = pos.y;
    return {
      x: this.a * x + this.c * y + this.tx,
      y: this.b * x + this.d * y + this.ty,
    };
  }

  /**
   * Applies inverse transformation to point
   */
  public applyInverse(pos: IPoint): IPoint {
    const id = 1 / (this.a * this.d + this.c * -this.b);
    const x = pos.x;
    const y = pos.y;

    return {
      x: this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id,
      y: this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id,
    };
  }

  /**
   * Translates matrix
   */
  public translate(x: number, y: number): this {
    this.tx += x;
    this.ty += y;
    return this;
  }

  /**
   * Scales matrix
   */
  public scale(x: number, y: number): this {
    this.a *= x;
    this.d *= y;
    this.c *= x;
    this.b *= y;
    this.tx *= x;
    this.ty *= y;
    return this;
  }

  /**
   * Rotates matrix by angle in radians
   */
  public rotate(angle: number): this {
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
   * Appends matrix (this = this * matrix)
   */
  public append(matrix: Matrix): this {
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
   * Prepends matrix (this = matrix * this)
   */
  public prepend(matrix: Matrix): this {
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
   * Inverts matrix
   */
  public invert(): this {
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

  /**
   * Resets to identity matrix
   */
  public identity(): this {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.tx = 0;
    this.ty = 0;
    return this;
  }

  /**
   * Clones matrix
   */
  public clone(): Matrix {
    return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
  }

  /**
   * Copies from another matrix
   */
  public copyFrom(matrix: Matrix): this {
    this.a = matrix.a;
    this.b = matrix.b;
    this.c = matrix.c;
    this.d = matrix.d;
    this.tx = matrix.tx;
    this.ty = matrix.ty;
    return this;
  }
}