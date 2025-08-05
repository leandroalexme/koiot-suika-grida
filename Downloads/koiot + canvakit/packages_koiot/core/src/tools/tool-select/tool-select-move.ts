import { IPoint } from '../../utils/common';
import { IBaseTool, IToolEvent } from '../types';
import { SceneManager } from '../../managers/scene-manager';
import { SelectionManager } from '../../managers/selection-manager';
import { ViewportManager } from '../../managers/viewport-manager';
import { ZoomManager } from '../../managers/zoom-manager';
import { IGraphics } from '../../graphics/types';

interface SelectMoveToolDependencies {
  sceneManager: SceneManager;
  selectionManager: SelectionManager;
  viewportManager: ViewportManager;
  zoomManager: ZoomManager;
  requestRender: () => void;
  toScenePt: (x: number, y: number) => IPoint;
  getCursorXY: (event: { clientX: number; clientY: number }) => IPoint;
  getSceneCursorXY: (event: { clientX: number; clientY: number }) => IPoint;
}

/**
 * 🎯 SelectMoveTool - Estratégia para mover elementos selecionados (como no Suika)
 * Move selected elements
 */
export class SelectMoveTool implements IBaseTool {
  private isActive = false;
  private startPoint: IPoint = { x: -1, y: -1 };
  private dragPoint: IPoint | null = null;
  private selectedItems: IGraphics[] = [];
  private originPositions = new Map<string, IPoint>();

  constructor(private deps: SelectMoveToolDependencies) {}

  onActive(): void {
    this.isActive = true;
    this.selectedItems = this.deps.selectionManager.getSelectedItems();
    
    // 🚀 Salvar posições originais para cálculo do delta
    this.originPositions.clear();
    for (const item of this.selectedItems) {
      // 🎯 CRITICAL FIX: Use attrs.x/y directly for consistency
      this.originPositions.set(item.id, { 
        x: item.attrs.x || 0, 
        y: item.attrs.y || 0 
      });
    }
  }

  onInactive(): void {
    this.isActive = false;
    this.selectedItems = [];
    this.originPositions.clear();
  }

  onStart(event: IToolEvent): void {
    if (!this.isActive) return;
    
    // 🚀 CORRIGIDO: Usar getSceneCursorXY como no Suika original
    this.startPoint = this.deps.getSceneCursorXY(event);
    this.dragPoint = this.deps.getCursorXY(event);
  }

  onDrag(event: IToolEvent): void {
    if (!this.isActive || !this.dragPoint) return;
    
    // 🚀 CORRIGIDO: Usar getCursorXY como no Suika original
    this.dragPoint = this.deps.getCursorXY(event);
    
    this.move();
  }

  onEnd(): void {
    if (!this.isActive) return;
    
    // 🎯 Finalizar movimento - posições já foram atualizadas durante o drag
    console.log('🎯 Move completed for', this.selectedItems.length, 'items');
  }

  afterEnd(): void {
    // 🎯 Cleanup após finalizar o movimento
    this.dragPoint = null;
  }

  private move(): void {
    if (!this.dragPoint || this.selectedItems.length === 0) return;
    
    // 🚀 Calcular delta do movimento
    const currentPoint = this.deps.toScenePt(this.dragPoint.x, this.dragPoint.y);
    const dx = currentPoint.x - this.startPoint.x;
    const dy = currentPoint.y - this.startPoint.y;
    
    // 🎯 Aplicar movimento a todos os itens selecionados
    for (const item of this.selectedItems) {
      const originalPos = this.originPositions.get(item.id);
      if (originalPos && item.setPosition) {
        item.setPosition(
          originalPos.x + dx,
          originalPos.y + dy
        );
      }
    }
    
    // 🎯 CRÍTICO: Notificar que elementos se moveram para atualizar handles/seleção
    this.deps.selectionManager.notifyElementsChanged();
    
    // 🚀 Re-render
    this.deps.requestRender();
  }
}