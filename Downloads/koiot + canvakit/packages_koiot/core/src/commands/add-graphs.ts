import { type KoiotEditor } from '../editor';
import { type IGraphics } from '../graphics/types';
import { type ICommand } from './type';

/**
 * AddGraphsCmd - Comando para adicionar gráficos (baseado no Suika)
 * Adiciona novos elementos ao canvas e mantém histórico para undo/redo
 */
export class AddGraphsCmd implements ICommand {
  static readonly type = 'AddGraphs';
  
  constructor(
    public desc: string,
    private editor: KoiotEditor,
    private elements: IGraphics[],
  ) {}

  redo() {
    const sceneManager = this.editor.getSceneManager();
    
    for (const el of this.elements) {
      el.setDeleted(false);
      sceneManager.addGraphics(el);
      
      // TODO: Implement parent-child relationships when needed
      // const parent = el.getParent();
      // if (parent) {
      //   parent.insertChild(el, el.attrs.parentIndex?.position);
      // }
    }

    // Select the added elements
    this.editor.getSelectionManager().selectItems(this.elements);
    this.editor.render();
  }

  undo() {
    const sceneManager = this.editor.getSceneManager();
    
    this.elements.forEach((el) => {
      el.setDeleted(true);
      sceneManager.removeGraphics(el);
      
      // TODO: Implement parent-child relationships when needed
      // el.removeFromParent();
    });

    // Clear selection
    this.editor.getSelectionManager().clearSelection();
    this.editor.render();
  }
}