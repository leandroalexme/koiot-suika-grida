import { IPoint, IRect, genUuid, IMatrixArr } from '../utils/common';
import { isPointInRect, transformPoint, createIdentityMatrix } from '../utils/geo';
import { IGraphics, IGraphicsAttrs, IDrawInfo, GraphicsType, IParentIndex } from './types';
import { generateKeyBetween, sortByFractionalIndex } from '../utils/fractional-indexing';
import { resizeRect } from '../utils/resize-geometry'; // 🎯 CORREÇÃO: Import estático

export abstract class BaseGraphics implements IGraphics {
  public id: string;
  public attrs: IGraphicsAttrs;
  public abstract type: GraphicsType;
  
  // Estado de deleção (seguindo padrão Suika)
  private _deleted = false;
  
  // Parent-Child System (seguindo padrão Suika)
  protected children: IGraphics[] = [];
  protected _sortDirty = false;
  protected _sceneManager?: any; // Reference to scene manager for lookups
  
  // 🎯 CORREÇÃO CRÍTICA: Transform Matrix como fonte da verdade
  // Transform matrix unificado que mantém consistência
  private _worldTransform: IMatrixArr;
  
  // Propriedades diretas sincronizadas com transform matrix
  public get x(): number { 
    return this._worldTransform[4]; 
  }
  public set x(value: number) { 
    this._worldTransform[4] = value;
    this.attrs.x = value; // Sincronizar para compatibilidade
  }
  
  public get y(): number { 
    return this._worldTransform[5]; 
  }
  public set y(value: number) { 
    this._worldTransform[5] = value;
    this.attrs.y = value; // Sincronizar para compatibilidade
  }
  
  public get width(): number { return this.attrs.width; }
  public set width(value: number) { this.attrs.width = value; }
  
  public get height(): number { return this.attrs.height; }
  public set height(value: number) { this.attrs.height = value; }

  constructor(attrs: Partial<IGraphicsAttrs> & { x: number; y: number; width: number; height: number }) {
    this.id = attrs.id || genUuid();
    
    // 🎯 CORREÇÃO CRÍTICA: Inicializar transform matrix primeiro
    const inputTransform = attrs.transform || createIdentityMatrix();
    this._worldTransform = [...inputTransform];
    // Garantir que posição no transform está sincronizada
    this._worldTransform[4] = attrs.x;
    this._worldTransform[5] = attrs.y;
    
    this.attrs = {
      id: this.id,
      x: attrs.x,
      y: attrs.y,
      width: attrs.width,
      height: attrs.height,
      fill: attrs.fill || '#ff0000',
      stroke: attrs.stroke || '#000000',
      strokeWidth: attrs.strokeWidth || 1,
      transform: this._worldTransform, // Use o transform unificado
      visible: attrs.visible !== false,
      zIndex: attrs.zIndex || 0,
      parentIndex: attrs.parentIndex,
      objectName: attrs.objectName || `graphics_${this.id.slice(0, 8)}`,
      isContainer: attrs.isContainer || false
    };
  }

  abstract draw(drawInfo: IDrawInfo): void;

  hitTest(point: IPoint): boolean {
    if (!this.attrs.visible) {
      return false;
    }

    const bounds = this.getBounds();
    return point.x >= bounds.x && 
           point.x <= bounds.x + bounds.width && 
           point.y >= bounds.y && 
           point.y <= bounds.y + bounds.height;
  }

  getBounds(): IRect {
    return {
      x: this.attrs.x,
      y: this.attrs.y,
      width: this.attrs.width,
      height: this.attrs.height
    };
  }

  /**
   * Get element size (width and height only) - used by Suika's SelectedBox
   */
  getSize(): { width: number; height: number } {
    return {
      width: this.attrs.width,
      height: this.attrs.height
    };
  }

  updateAttrs(attrs: Partial<IGraphicsAttrs>): void {
    Object.assign(this.attrs, attrs);
  }

  getCenter(): IPoint {
    return {
      x: this.attrs.x + this.attrs.width / 2,
      y: this.attrs.y + this.attrs.height / 2
    };
  }

  move(dx: number, dy: number): void {
    // 🎯 CORREÇÃO CRÍTICA: Usar sistema unificado de transform
    const newX = this._worldTransform[4] + dx;
    const newY = this._worldTransform[5] + dy;
    
    // Atualizar transform matrix (fonte da verdade)
    this._worldTransform[4] = newX;
    this._worldTransform[5] = newY;
    
    // Sincronizar attrs para compatibilidade
    this.updateAttrs({
      x: newX,
      y: newY,
      transform: this._worldTransform
    });
  }

  setPosition(x: number, y: number): void {
    // 🎯 CORREÇÃO CRÍTICA: Usar sistema unificado de transform
    this._worldTransform[4] = x;
    this._worldTransform[5] = y;
    
    // Sincronizar attrs para compatibilidade
    this.updateAttrs({ 
      x, 
      y, 
      transform: this._worldTransform 
    });
  }

  isVisible(): boolean {
    return this.attrs.visible !== false;
  }

  setVisible(visible: boolean): void {
    this.updateAttrs({ visible });
  }

  /**
   * Get world transform matrix - returns unified transform
   * CORREÇÃO CRÍTICA: Sempre retorna o transform unificado e consistente
   */
  getWorldTransform(): IMatrixArr {
    return [...this._worldTransform];
  }

  /**
   * Set complete transform matrix (usado por resize operations)
   * NOVO MÉTODO: Atualizar transform de forma unificada
   */
  setWorldTransform(transform: IMatrixArr): void {
    this._worldTransform = [...transform];
    
    // Sincronizar attrs para compatibilidade
    this.updateAttrs({
      x: transform[4],
      y: transform[5],
      transform: this._worldTransform
    });
  }

  /**
   * Update by control handle - NOVO MÉTODO baseado no Suika
   * Atualiza graphics usando transform matrix resultante de resize
   */
  updateByControlHandle(
    type: string,
    newPos: IPoint,
    oldRect: { width: number; height: number; transform: IMatrixArr },
    options?: {
      keepRatio?: boolean;
      scaleFromCenter?: boolean;
      flip?: boolean;
    }
  ): void {
    console.log('🎯 updateByControlHandle called:', {
      type,
      newPos,
      oldRect,
      options,
      currentAttrs: { width: this.attrs.width, height: this.attrs.height, x: this.attrs.x, y: this.attrs.y }
    });
    
    try {
      const newRect = resizeRect(type, newPos, oldRect, options);
      console.log('🎯 resizeRect result:', newRect);
      
      // 🎯 CORREÇÃO CRÍTICA: Aplicar resultado diretamente ao transform unificado
      this.setWorldTransform(newRect.transform);
      
      // Atualizar dimensões se mudaram
      if (newRect.width !== undefined) {
        this.attrs.width = newRect.width;
      }
      if (newRect.height !== undefined) {
        this.attrs.height = newRect.height;
      }
      
      console.log('🎯 Updated attrs:', { 
        width: this.attrs.width, 
        height: this.attrs.height, 
        x: this.attrs.x, 
        y: this.attrs.y,
        transform: this.getWorldTransform()
      });
    } catch (error) {
      console.error('❌ Error in updateByControlHandle:', error);
      throw error;
    }
  }

  /**
   * Get attributes copy (seguindo padrão Suika)
   */
  getAttrs(): IGraphicsAttrs {
    return { ...this.attrs };
  }

  /**
   * Check if element is deleted (seguindo padrão Suika)
   */
  isDeleted(): boolean {
    return this._deleted;
  }

  /**
   * Set deleted state (seguindo padrão Suika)
   */
  setDeleted(deleted: boolean): void {
    this._deleted = deleted;
    // TODO: Implement document change tracking when needed
    // this.doc.collectDeletedGraphics(this);
  }

  /**
   * Set scene manager reference for parent lookups
   */
  setSceneManager(sceneManager: any): void {
    this._sceneManager = sceneManager;
  }

  // ===== PARENT-CHILD SYSTEM (seguindo padrão Suika) =====

  /**
   * Get parent graphics
   */
  getParent(): IGraphics | undefined {
    const parentId = this.getParentId();
    if (!parentId || !this._sceneManager) {
      return undefined;
    }
    return this._sceneManager.getGraphicsById(parentId);
  }

  /**
   * Get parent ID
   */
  getParentId(): string | undefined {
    return this.attrs.parentIndex?.guid;
  }

  /**
   * Get children array
   */
  getChildren(): IGraphics[] {
    return [...this.children];
  }

  /**
   * Get children count
   */
  getChildrenCount(): number {
    return this.children.length;
  }

  /**
   * Add child (alias for insertChild)
   */
  addChild(child: IGraphics, position?: string): void {
    this.insertChild(child, position);
  }

  /**
   * Remove child from this parent
   */
  removeChild(child: IGraphics): void {
    this.children = this.children.filter(item => item.id !== child.id);
  }

  /**
   * Insert child at specific position (seguindo padrão Suika) - SIMPLIFICADO
   */
  insertChild(child: IGraphics, sortIdx?: string): void {
    if (!this.attrs.isContainer) {
      console.warn(`Graphics "${this.type}" is not a container`);
      return;
    }

    // Check if child already exists
    if (this.children.some(item => item.id === child.id)) {
      console.log('Child already exists in container');
      return;
    }

    try {
      // Generate sort index if not provided
      if (!sortIdx) {
        const maxSortIdx = this.getMaxChildIndex();
        sortIdx = generateKeyBetween(maxSortIdx, null);
      }

      // Remove from current parent CUIDADOSAMENTE
      if (child.getParent() && child.getParent() !== this) {
        child.removeFromParent();
      }

      // Set new parent index
      const newParentIndex: IParentIndex = {
        guid: this.attrs.id,
        position: sortIdx,
      };

      child.updateAttrs({
        parentIndex: newParentIndex,
      });

      this.children.push(child);
      
      // Configure scene manager reference
      if (this._sceneManager && child.setSceneManager) {
        child.setSceneManager(this._sceneManager);
      }
      
      console.log(`Added child ${child.id} to ${this.id}`);
      
    } catch (error) {
      console.error('Error inserting child:', error);
    }
  }

  /**
   * Remove this graphics from its parent
   */
  removeFromParent(): void {
    const parent = this.getParent();
    if (parent) {
      parent.removeChild(this);
    }
  }

  /**
   * Insert this graphics at parent with specific position
   */
  insertAtParent(position: string): void {
    const parent = this.getParent();
    if (parent) {
      parent.insertChild(this, position);
    }
  }

  /**
   * Get sort index (fractional index position)
   */
  getSortIndex(): string {
    return this.attrs.parentIndex?.position ?? '';
  }

  /**
   * Get maximum child index
   */
  getMaxChildIndex(): string | null {
    if (this.children.length === 0) {
      return null;
    }
    
    if (!this._sortDirty) {
      return this.children.at(-1)!.getSortIndex() || null;
    }

    let maxIndex = this.children[0].getSortIndex();
    for (let i = 1; i < this.children.length; i++) {
      const currIndex = this.children[i].getSortIndex();
      if (currIndex > maxIndex) {
        maxIndex = currIndex;
      }
    }
    return maxIndex;
  }

  /**
   * Get minimum child index
   */
  getMinChildIndex(): string | null {
    if (this.children.length === 0) {
      return null;
    }
    
    if (!this._sortDirty) {
      return this.children.at(0)!.getSortIndex() || null;
    }

    let minIndex = this.children[0].getSortIndex();
    for (let i = 1; i < this.children.length; i++) {
      const currIndex = this.children[i].getSortIndex();
      if (currIndex < minIndex) {
        minIndex = currIndex;
      }
    }
    return minIndex;
  }

  /**
   * Sort children by fractional index
   */
  sortChildren(): void {
    this.children.sort((a, b) => {
      const aPos = a.getSortIndex();
      const bPos = b.getSortIndex();
      return aPos < bPos ? -1 : aPos > bPos ? 1 : 0;
    });
    this._sortDirty = false;
  }

  /**
   * Mark children as needing sort
   */
  markSortDirty(): void {
    this._sortDirty = true;
  }

  /**
   * Get next sibling
   */
  getNextSibling(): IGraphics | null {
    const parent = this.getParent();
    if (!parent) {
      return null;
    }
    
    const children = parent.getChildren();
    const index = children.findIndex(item => item === this);
    if (index === -1) {
      console.warn('Index should not be -1!');
      return null;
    }
    
    return children[index + 1] ?? null;
  }

  /**
   * Get sort index path (for hierarchical sorting)
   */
  getSortIndexPath(): string[] {
    const path: string[] = [];
    let node: IGraphics | undefined = this;
    
    while (node) {
      path.push(node.getSortIndex());
      node = node.getParent();
    }
    
    return path.reverse();
  }
}