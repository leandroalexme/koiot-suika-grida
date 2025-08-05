import { IPoint, IRect } from '../../utils/common';
import { IBaseTool, IToolEvent } from '../types';
import { SceneManager } from '../../managers/scene-manager';
import { SelectionManager } from '../../managers/selection-manager';
import { ViewportManager } from '../../managers/viewport-manager';
import { ZoomManager } from '../../managers/zoom-manager';
import { IGraphics } from '../../graphics/types';

interface DrawSelectionDependencies {
  sceneManager: SceneManager;
  selectionManager: SelectionManager;
  viewportManager: ViewportManager;
  zoomManager: ZoomManager;
  requestRender: () => void;
  toScenePt: (x: number, y: number) => IPoint;
  getCursorXY: (event: { clientX: number; clientY: number }) => IPoint;
  getSceneCursorXY: (event: { clientX: number; clientY: number }) => IPoint;
  setSelectionBox: (rect: IRect | null) => void;
  clearSelectionBox: () => void;
}

/**
 * 🎯 DrawSelection Tool - Estratégia para seleção por área (como no Suika)
 * Box selection / area selection
 */
export class DrawSelection implements IBaseTool {
  private isActive = false;
  private startPoint: IPoint = { x: -1, y: -1 };
  private dragPoint: IPoint | null = null;
  private isShiftPressing = false;
  private initialSelection: IGraphics[] = [];

  constructor(private deps: DrawSelectionDependencies) {}

  onActive(): void {
    this.isActive = true;
  }

  onInactive(): void {
    this.isActive = false;
    this.deps.clearSelectionBox();
    
    // 🚀 CORRIGIDO: Re-render para garantir que selection box seja removida
    this.deps.requestRender();
  }

  onStart(event: IToolEvent): void {
    if (!this.isActive) return;
    
    // 🚀 CORRIGIDO: Usar getSceneCursorXY como no Suika original
    this.startPoint = this.deps.getSceneCursorXY(event);
    this.dragPoint = this.deps.getCursorXY(event); // Viewport coords para conversão posterior
    
    this.isShiftPressing = event.shiftKey || false;
    this.initialSelection = this.deps.selectionManager.getSelectedItems();
    
    // 🎯 Se não está segurando shift, limpar seleção
    if (!this.isShiftPressing) {
      this.deps.selectionManager.clearSelection();
    }
  }

  onDrag(event: IToolEvent): void {
    if (!this.isActive || !this.dragPoint) return;
    
    // 🚀 CORRIGIDO: Usar getCursorXY como no Suika original
    this.dragPoint = this.deps.getCursorXY(event);
    
    this.updateSelection();
  }

  onEnd(): void {
    if (!this.isActive) return;
    
    // 🎯 Limpar selection box visual
    this.deps.clearSelectionBox();
    
    // 🚀 CORRIGIDO: Re-render para remover selection box da tela
    this.deps.requestRender();
  }

  afterEnd(): void {
    // 🎯 Cleanup
    this.dragPoint = null;
    this.isShiftPressing = false;
    this.initialSelection = [];
  }

  private updateSelection(): void {
    if (!this.dragPoint) return;
    
    // 🚀 CORRIGIDO: Usar toScenePt para converter dragPoint de forma consistente
    const currentPoint = this.deps.toScenePt(this.dragPoint.x, this.dragPoint.y);
    
    const selectionRect: IRect = {
      x: Math.min(this.startPoint.x, currentPoint.x),
      y: Math.min(this.startPoint.y, currentPoint.y),
      width: Math.abs(currentPoint.x - this.startPoint.x),
      height: Math.abs(currentPoint.y - this.startPoint.y)
    };
    
    // 🎯 Mostrar selection box visual
    this.deps.setSelectionBox(selectionRect);
    
    // 🚀 Encontrar elementos dentro da área de seleção
    const graphicsInSelection = this.getElementsInSelection(selectionRect);
    
    if (this.isShiftPressing) {
      // 🎯 Shift+drag: adicionar à seleção existente
      const newSelection = [...this.initialSelection];
      for (const graphic of graphicsInSelection) {
        if (!newSelection.find(item => item.id === graphic.id)) {
          newSelection.push(graphic);
        }
      }
      this.deps.selectionManager.selectItems(newSelection);
    } else {
      // 🎯 Drag normal: substituir seleção
      this.deps.selectionManager.selectItems(graphicsInSelection);
    }
    
    this.deps.requestRender();
  }

  private getElementsInSelection(rect: IRect): IGraphics[] {
    const allGraphics = this.deps.sceneManager.getAllGraphics();
    const selected: IGraphics[] = [];
    
    for (const graphic of allGraphics) {
      if (this.isGraphicInRect(graphic, rect)) {
        selected.push(graphic);
      }
    }
    
    return selected;
  }

  private isGraphicInRect(graphic: IGraphics, rect: IRect): boolean {
    // 🎯 Verificar se o gráfico intersecta com o retângulo de seleção
    const gx = graphic.x || 0;
    const gy = graphic.y || 0;
    const gw = graphic.width || 0;
    const gh = graphic.height || 0;
    
    return !(
      gx + gw < rect.x ||
      gx > rect.x + rect.width ||
      gy + gh < rect.y ||
      gy > rect.y + rect.height
    );
  }
}