import { BaseGraphics } from './base-graphics';
import { IDrawInfo, GraphicsType, IGraphicsAttrs } from './types';

export class Rectangle extends BaseGraphics {
  public type = GraphicsType.Rectangle;

  constructor(attrs: Partial<IGraphicsAttrs> & { x: number; y: number; width: number; height: number }) {
    super(attrs);
  }

  draw(drawInfo: IDrawInfo): void {
    if (!this.attrs.visible) {
      return;
    }

    const { renderer } = drawInfo;
    const { x, y, width, height, fill, stroke, strokeWidth } = this.attrs;

    renderer.save();

    // Draw fill
    if (fill) {
      renderer.fillStyle = fill;
      renderer.fillRect(x, y, width, height);
    }

    // Draw stroke
    if (stroke && strokeWidth && strokeWidth > 0) {
      renderer.strokeStyle = stroke;
      renderer.lineWidth = strokeWidth;
      renderer.strokeRect(x, y, width, height);
    }

    renderer.restore();
  }
}