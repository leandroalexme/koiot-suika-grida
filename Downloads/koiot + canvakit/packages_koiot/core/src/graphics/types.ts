import { IMatrixArr, IPoint, IRect } from '../utils/common';
import { IRenderer } from '../renderer/types';

export interface IDrawInfo {
  renderer: IRenderer;
  viewportArea?: IRect;
}

export interface IGraphicsAttrs {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  transform?: IMatrixArr;
  visible?: boolean;
  deleted?: boolean;       // Estado de deleção (padrão Suika)
  zIndex?: number;         // Z-order/layer order (padrão para arrange)
  parentIndex?: IParentIndex; // Parent-child relationship (padrão Suika)
  objectName?: string;     // Nome do objeto (padrão Suika)
  isContainer?: boolean;   // Se pode conter filhos (padrão Suika)
}

export enum GraphicsType {
  Rectangle = 'rectangle',
  Group = 'group'
}

export enum ArrangeType {
  Front = 'Front',
  Back = 'Back', 
  Forward = 'Forward',
  Backward = 'Backward',
}

// Parent-Child System (seguindo padrão Suika)
export interface IParentIndex {
  guid: string;     // ID do parent
  position: string; // Fractional index position
}

export enum GraphicsObjectSuffix {
  Group = 'Group',
  Frame = 'Frame',
}

export interface IGraphics {
  id: string;
  type: GraphicsType;
  attrs: IGraphicsAttrs;
  
  // Core properties for direct access (like Suika)
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  
  draw(drawInfo: IDrawInfo): void;
  hitTest(point: IPoint): boolean;
  getBounds(): IRect;
  getSize(): { width: number; height: number }; // 🆕 Suika compatibility
  getWorldTransform(): IMatrixArr; // 🆕 Critical for correct positioning
  setWorldTransform?(transform: IMatrixArr): void; // 🆕 CORREÇÃO CRÍTICA
  updateAttrs(attrs: Partial<IGraphicsAttrs>): void;
  isVisible(): boolean;
  move(dx: number, dy: number): void;
  setPosition?(x: number, y: number): void;
  
  // 🆕 NOVO MÉTODO: Update by control handle (baseado no Suika)
  updateByControlHandle?(
    type: string,
    newPos: IPoint,
    oldRect: { width: number; height: number; transform: IMatrixArr },
    options?: {
      keepRatio?: boolean;
      scaleFromCenter?: boolean;
      flip?: boolean;
    }
  ): void;
  
  // Métodos de deleção (padrão Suika)
  setDeleted(deleted: boolean): void;
  isDeleted(): boolean;
  
  // Método para acessar atributos (padrão Suika)
  getAttrs(): IGraphicsAttrs;
  
  // Scene manager reference
  setSceneManager(sceneManager: any): void;
  
  // Parent-Child System (seguindo padrão Suika)
  getParent(): IGraphics | undefined;
  getParentId(): string | undefined;
  getChildren(): IGraphics[];
  getChildrenCount(): number;
  addChild(child: IGraphics, position?: string): void;
  removeChild(child: IGraphics): void;
  insertChild(child: IGraphics, position?: string): void;
  removeFromParent(): void;
  insertAtParent(position: string): void;
  getSortIndex(): string;
  getMaxChildIndex(): string | null;
  getMinChildIndex(): string | null;
  sortChildren(): void;
  markSortDirty(): void;
  getNextSibling(): IGraphics | null;
  getSortIndexPath(): string[];
}