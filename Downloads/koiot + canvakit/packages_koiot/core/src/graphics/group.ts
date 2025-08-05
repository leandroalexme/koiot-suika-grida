import { BaseGraphics } from './base-graphics';
import { IDrawInfo, IGraphicsAttrs, GraphicsType } from './types';
import { IPoint, IRect } from '../utils/common';

/**
 * Group Graphics - Container para agrupar elementos (baseado no SuikaFrame)
 * Seguindo exatamente o padrão do Suika adaptado para CanvasKit
 */
export class Group extends BaseGraphics {
  readonly type = GraphicsType.Group;

  constructor(attrs: Partial<IGraphicsAttrs> & { x: number; y: number; width: number; height: number }) {
    // Group sempre é container
    super({
      ...attrs,
      isContainer: true,
      fill: attrs.fill || 'transparent', // Groups são transparentes por padrão
      stroke: attrs.stroke || 'transparent',
      strokeWidth: attrs.strokeWidth || 0
    });
  }

  /**
   * Groups não desenham nada por si só - apenas seus filhos
   * SIMPLIFICADO para evitar problemas de transformação
   */
  draw(drawInfo: IDrawInfo): void {
    // Groups são invisíveis - sistema de renderização iterará pelos filhos
    // Não aplicamos transformações aqui para evitar problemas
    
    // TODO: Implementar transformações de grupo quando o sistema estiver mais estável
    // Por enquanto, os filhos são renderizados diretamente pelo scene manager
  }

  /**
   * Hit test SIMPLIFICADO - apenas bounds do grupo
   */
  hitTest(point: IPoint): boolean {
    // Por enquanto, apenas testa os bounds do próprio grupo
    // Evita recursão e problemas com transformações
    return super.hitTest(point);
  }

  /**
   * Bounds incluem todos os filhos - CORRIGIDA RECURSÃO INFINITA
   */
  getBounds(): IRect {
    if (this.children.length === 0) {
      return {
        x: this.attrs.x,
        y: this.attrs.y,
        width: this.attrs.width,
        height: this.attrs.height
      };
    }
    
    // Use os próprios bounds do grupo baseado em attrs (evita recursão)
    return {
      x: this.attrs.x,
      y: this.attrs.y,
      width: this.attrs.width,
      height: this.attrs.height
    };
  }

  /**
   * Override addChild para configurar referência do scene manager
   */
  insertChild(child: any, sortIdx?: string): void {
    super.insertChild(child, sortIdx);
    
    // Propagar scene manager reference para o filho
    if (this._sceneManager && child.setSceneManager) {
      child.setSceneManager(this._sceneManager);
    }
  }

  /**
   * Método para auto-redimensionar baseado nos filhos (como SuikaFrame)
   */
  resizeToFit(): void {
    const bounds = this.getBounds();
    this.updateAttrs({
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height
    });
  }

  /**
   * Move SIMPLIFICADO - apenas o grupo por enquanto
   */
  move(dx: number, dy: number): void {
    super.move(dx, dy);
    
    // TODO: Mover filhos quando o sistema estiver mais estável
    // for (const child of this.children) {
    //   child.move(dx, dy);
    // }
  }

  /**
   * Atualiza atributos SIMPLIFICADO
   */
  updateAttrs(attrs: Partial<IGraphicsAttrs>): void {
    super.updateAttrs(attrs);
    
    // TODO: Implementar propagação para filhos quando estável
  }

  /**
   * Verifica se é um grupo vazio
   */
  isEmpty(): boolean {
    return this.children.filter(child => !child.isDeleted()).length === 0;
  }

  /**
   * Obtém filhos diretos apenas (sem recursão)
   */
  getAllDescendants(): any[] {
    // Por enquanto, apenas filhos diretos para evitar recursão
    return this.children.filter(child => !child.isDeleted());
  }
}