import { IPoint, IRect } from '../utils/common';
import { ITool, IToolEvent, IBaseTool } from './types';
import { SceneManager } from '../managers/scene-manager';
import { SelectionManager } from '../managers/selection-manager';
import { ViewportManager } from '../managers/viewport-manager';
import { ZoomManager } from '../managers/zoom-manager';
import { IGraphics } from '../graphics/types';
import { SelectMoveTool } from './tool-select/tool-select-move';
import { DrawSelection } from './tool-select/tool-select-selection';
import { SelectResizeTool } from './tool-select/tool-select-resize';
import { ControlHandleManager } from '../managers/control-handle-manager/control-handle-manager';
import { SelectedBoxManager } from '../managers/selected-box-manager';
import { getTopHitElement, isPointInsideSelectedBox } from './tool-select/utils';

export interface SelectToolDependencies {
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
  // Add handle managers
  selectedBoxManager: () => SelectedBoxManager;
  controlHandleManager: () => ControlHandleManager;
}

/**
 * 🎯 SelectTool - Tool principal usando padrão Strategy (como no Suika)
 * Delega para estratégias específicas: move, selection, resize, rotation
 */
export class SelectTool implements ITool {
  name = 'select';
  cursor = 'default';

  private startPoint: IPoint = { x: -1, y: -1 };
  private currStrategy: IBaseTool | null = null;
  
  // 🎯 Estratégias (como no Suika)
  private readonly strategyMove: SelectMoveTool;
  private readonly strategyDrawSelection: DrawSelection;
  private readonly strategyResize: SelectResizeTool;
  
  /** O gráfico que deve ser removido da seleção se não foi movido */
  private graphShouldRemovedFromSelectedIfNotMoved: IGraphics | null = null;

  constructor(private deps: SelectToolDependencies) {
    // 🚀 Inicializar estratégias
    this.strategyMove = new SelectMoveTool({
      sceneManager: deps.sceneManager,
      selectionManager: deps.selectionManager,
      viewportManager: deps.viewportManager,
      zoomManager: deps.zoomManager,
      requestRender: deps.requestRender,
      toScenePt: deps.toScenePt,
      getCursorXY: deps.getCursorXY,
      getSceneCursorXY: deps.getSceneCursorXY
    });
    
    this.strategyDrawSelection = new DrawSelection({
      sceneManager: deps.sceneManager,
      selectionManager: deps.selectionManager,
      viewportManager: deps.viewportManager,
      zoomManager: deps.zoomManager,
      requestRender: deps.requestRender,
      toScenePt: deps.toScenePt,
      getCursorXY: deps.getCursorXY,
      getSceneCursorXY: deps.getSceneCursorXY,
      setSelectionBox: deps.setSelectionBox,
      clearSelectionBox: deps.clearSelectionBox
    });

    this.strategyResize = new SelectResizeTool({
      selectionManager: deps.selectionManager,
      controlHandleManager: deps.controlHandleManager(),
      requestRender: deps.requestRender,
      toScenePt: deps.toScenePt,
      getSceneCursorXY: deps.getSceneCursorXY
    });
  }

  onStart(event: IToolEvent): void {
    this.currStrategy = null;
    this.graphShouldRemovedFromSelectedIfNotMoved = null;
    
    // 🚀 Converter para coordenadas da cena (event já é viewport coords do ToolManager)
    this.startPoint = this.deps.toScenePt(event.clientX, event.clientY);
    
    const isShiftPressing = event.shiftKey || false;
    const selectedElements = this.deps.selectionManager.getSelectedItems();
    
    // 🎯 Determinar estratégia baseado no contexto (como no Suika)
    
    // 1. Primeiro verificar se clicou em um handle de controle
    const handleInfo = this.deps.controlHandleManager().getHandleInfoByPoint(this.startPoint);
    if (handleInfo) {
      // Clicou em um handle -> iniciar resize
      this.currStrategy = this.strategyResize;
      if (this.currStrategy) {
        this.currStrategy.onStart(event);
      }
      return;
    }
    
    // 2. Verificar se clicou dentro da selected box
    const isInsideSelectedBox = isPointInsideSelectedBox(this.startPoint, selectedElements);
    
    // 3. Encontrar elemento no topo
    const topHitElement = getTopHitElement(this.deps.sceneManager, this.startPoint);
    
    if (topHitElement && isShiftPressing && selectedElements.find(item => item.id === topHitElement.id)) {
      this.graphShouldRemovedFromSelectedIfNotMoved = topHitElement;
    }
    
    // 🎯 Lógica de seleção (idêntica ao Suika)
    if (isInsideSelectedBox) {
      // Clicou dentro da selected box -> mover
      this.currStrategy = this.strategyMove;
    } else if (topHitElement) {
      // Clicou em um elemento
      if (!isShiftPressing) {
        // Seleção única
        this.deps.selectionManager.selectItems([topHitElement]);
      } else {
        // Shift+click: toggle selection
        if (!selectedElements.find(item => item.id === topHitElement.id)) {
          const newSelection = [...selectedElements, topHitElement];
          this.deps.selectionManager.selectItems(newSelection);
        }
      }
      
      this.deps.requestRender();
      this.currStrategy = this.strategyMove;
    } else {
      // Clicou em área vazia -> seleção por área
      this.currStrategy = this.strategyDrawSelection;
    }
    
    // 🚀 Ativar estratégia selecionada
    if (this.currStrategy) {
      this.currStrategy.onActive();
      this.currStrategy.onStart(event);
    }
  }

  onMove(event: IToolEvent): void {
    if (!this.currStrategy) return;
    this.currStrategy.onDrag(event);
  }

  onEnd(event: IToolEvent): void {
    if (!this.currStrategy) return;
    
    // 🎯 Determinar se houve drag
    const currentPoint = this.deps.toScenePt(event.clientX, event.clientY);
    const isDragHappened = Math.abs(currentPoint.x - this.startPoint.x) > 2 || 
                          Math.abs(currentPoint.y - this.startPoint.y) > 2;
    
    this.currStrategy.onEnd();
    this.currStrategy.afterEnd();
    this.currStrategy.onInactive();
    
    // 🎯 Remover elemento da seleção se não foi movido (lógica do Suika)
    if (this.graphShouldRemovedFromSelectedIfNotMoved && !isDragHappened) {
      const currentSelection = this.deps.selectionManager.getSelectedItems();
      const newSelection = currentSelection.filter(item => 
        item.id !== this.graphShouldRemovedFromSelectedIfNotMoved!.id
      );
      this.deps.selectionManager.selectItems(newSelection);
      this.deps.requestRender();
    }
    
    this.currStrategy = null;
    this.graphShouldRemovedFromSelectedIfNotMoved = null;
  }

  onCancel(): void {
    if (this.currStrategy) {
      this.currStrategy.onInactive();
      this.currStrategy = null;
    }
  }
}