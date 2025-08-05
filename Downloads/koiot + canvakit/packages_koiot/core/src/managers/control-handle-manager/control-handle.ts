import { IPoint, IMatrixArr } from '../../utils/common';
import { IRenderer } from '../../renderer/types';
import { ITransformRect, ICursor, IControlHandleAttrs, HitTestFn, GetCursorFn } from './types';
import { IGraphics } from '../../graphics/types';

/**
 * Control Handle class following Suika's pattern but adapted for CanvasKit
 * Represents a single resizable/rotatable handle on the selection box
 * 🎯 MELHORADO: Suporte opcional para graphics reais como no Suika
 */
export class ControlHandle {
  /** Center X position in scene coordinates */
  public cx: number;
  
  /** Center Y position in scene coordinates */
  public cy: number;
  
  /** Optional rotation in radians */
  public rotation?: number;
  
  /** Optional transform matrix */
  public transform?: IMatrixArr;
  
  /** Handle type identifier */
  public type: string;
  
  /** Hit test padding/tolerance */
  public padding: number;
  
  /** Handle size (will be adjusted for zoom) */
  public size: number;
  
  /** Fill color */
  public fill: string;
  
  /** Stroke color */
  public stroke: string;
  
  /** Stroke width */
  public strokeWidth: number;
  
  /** Whether this handle follows transform rotations */
  public isTransformHandle: boolean;
  
  /** Custom hit test function */
  public hitTest?: HitTestFn;
  
  /** Function to get cursor style */
  public getCursor: GetCursorFn;

  /** 🎯 NOVO: Optional graphics object (like Suika) */
  public graphics?: IGraphics;
  
  /** 🎯 NOVO: Whether to use graphics-based rendering */
  public useGraphicsRendering: boolean;

  constructor(attrs: IControlHandleAttrs & { 
    graphics?: IGraphics;
    useGraphicsRendering?: boolean; 
  }) {
    this.cx = attrs.cx ?? 0;
    this.cy = attrs.cy ?? 0;
    this.type = attrs.type;
    this.padding = attrs.padding ?? 0;
    this.size = attrs.size;
    this.fill = attrs.fill;
    this.stroke = attrs.stroke;
    this.strokeWidth = attrs.strokeWidth;
    this.isTransformHandle = attrs.isTransformHandle ?? false;
    this.getCursor = attrs.getCursor;
    
    // 🎯 NOVO: Suporte para graphics como no Suika
    this.graphics = attrs.graphics;
    this.useGraphicsRendering = attrs.useGraphicsRendering ?? false;
    
    if (attrs.rotation !== undefined) {
      this.rotation = attrs.rotation;
    }
    
    if (attrs.transform) {
      this.transform = attrs.transform;
    }
    
    if (attrs.hitTest) {
      this.hitTest = attrs.hitTest;
    }
  }

  /**
   * Draw control handle using CanvasKit renderer
   * 🎯 MELHORADO: Suporte híbrido para graphics-based rendering como no Suika
   */
  draw(renderer: IRenderer): void {
    // 🎯 NOVO: Usar graphics-based rendering se disponível (como Suika)
    if (this.useGraphicsRendering && this.graphics) {
      this.drawWithGraphics(renderer);
      return;
    }

    // Fallback para rendering primitivo (mantém compatibilidade)
    this.drawPrimitive(renderer);
  }

  /**
   * Graphics-based rendering (como no Suika)
   */
  private drawWithGraphics(renderer: IRenderer): void {
    if (!this.graphics) return;

    // Posicionar o graphics na posição do handle
    const halfSize = this.size / 2;
    const x = this.cx - halfSize;
    const y = this.cy - halfSize;
    
    // Atualizar posição do graphics
    this.graphics.setPosition?.(x, y);
    
    // Renderizar usando o sistema de graphics
    this.graphics.draw({ renderer });
  }

  /**
   * Rendering primitivo (sistema atual)
   */
  private drawPrimitive(renderer: IRenderer): void {
    // Skip drawing if fill and stroke are both transparent (invisible handles)
    if (this.fill === 'transparent' && (this.stroke === 'transparent' || this.strokeWidth === 0)) {
      return;
    }

    // Safety check - ensure renderer has required methods
    if (!renderer || typeof renderer.save !== 'function') {
      return;
    }

    renderer.save();
    
    try {
      // Calculate final size and position
      const halfSize = this.size / 2;
      const x = this.cx - halfSize;
      const y = this.cy - halfSize;

      // Draw fill first (following Suika's pattern)
      if (this.fill && this.fill !== 'transparent') {
        renderer.fillStyle = this.fill;
        renderer.fillRect(x, y, this.size, this.size);
      }

      // Draw stroke (following Suika's pattern)
      if (this.stroke && this.stroke !== 'transparent' && this.strokeWidth > 0) {
        renderer.strokeStyle = this.stroke;
        renderer.lineWidth = this.strokeWidth;
        renderer.strokeRect(x, y, this.size, this.size);
      }
    } finally {
      renderer.restore();
    }
  }

  /**
   * Test if point hits this control handle
   * 🎯 MELHORADO: Suporte para graphics-based hit testing como no Suika
   */
  containsPoint(point: IPoint, tolerance: number = 0, rect: ITransformRect | null = null): boolean {
    // 🎯 NOVO: Usar graphics hit test se disponível (como Suika)
    if (this.useGraphicsRendering && this.graphics) {
      return this.graphics.hitTest(point);
    }

    // Custom hit test tem prioridade
    if (this.hitTest) {
      return this.hitTest(point, tolerance, rect);
    }
    
    // Default hit test - check if point is within handle bounds
    const halfSize = (this.size + this.padding + tolerance) / 2;
    return (
      point.x >= this.cx - halfSize &&
      point.x <= this.cx + halfSize &&
      point.y >= this.cy - halfSize &&
      point.y <= this.cy + halfSize
    );
  }

  /**
   * Update handle position
   */
  updatePosition(cx: number, cy: number): void {
    this.cx = cx;
    this.cy = cy;
  }

  /**
   * Update handle transform matrix
   */
  updateTransform(transform: IMatrixArr): void {
    this.transform = transform;
  }

  /**
   * Update handle rotation
   */
  updateRotation(rotation: number): void {
    this.rotation = rotation;
  }

  /**
   * Get cursor for this handle
   */
  getCursorAtPoint(selectedBox: ITransformRect | null): ICursor {
    return this.getCursor(this.type, selectedBox);
  }
}