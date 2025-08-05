import { type KoiotEditor } from '../editor';
import { type IGraphicsAttrs } from '../graphics/types';
import { type ICommand } from './type';

/**
 * UpdateGraphicsAttrsCmd - Comando principal do Koiot (baseado no Suika)
 * Gerencia todas as mudanças de atributos, incluindo deleções via setDeleted
 */
export class UpdateGraphicsAttrsCmd implements ICommand {
  static readonly type = 'UpdateGraphicsAttrs';
  
  constructor(
    public desc: string,
    private editor: KoiotEditor,
    private originAttrsMap: Map<string, Partial<IGraphicsAttrs>>,
    private updatedAttrsMap: Map<string, Partial<IGraphicsAttrs>>,
    private removedIds: Set<string> = new Set(),
    private newIds: Set<string> = new Set(),
  ) {
    if (originAttrsMap.size !== updatedAttrsMap.size) {
      console.warn(
        `originAttrsMap e updatedAttrsMap têm tamanhos diferentes: ${originAttrsMap.size} vs ${updatedAttrsMap.size}`,
      );
    }
  }

  redo() {
    const attrsMap = this.updatedAttrsMap;
    const sceneManager = this.editor.getSceneManager();

    // Apply attribute updates
    for (const [id, attrs] of Array.from(attrsMap)) {
      const graphics = sceneManager.getGraphicsById(id);
      if (!graphics) {
        console.warn(`Graphics ${id} não encontrado.`);
        continue;
      }
      
      // TODO: Implement parent-child relationships when needed
      
      graphics.updateAttrs(attrs);
    }

    // Mark removed graphics as deleted
    for (const id of Array.from(this.removedIds)) {
      const graphics = sceneManager.getGraphicsById(id);
      if (graphics) {
        graphics.setDeleted(true);
        sceneManager.removeGraphics(graphics);
      }
    }

    // Restore new graphics
    for (const id of Array.from(this.newIds)) {
      const graphics = sceneManager.getGraphicsById(id);
      if (graphics) {
        graphics.setDeleted(false);
        sceneManager.addGraphics(graphics);
      }
    }

    this.editor.render();
  }

  undo() {
    const attrsMap = this.originAttrsMap;
    const sceneManager = this.editor.getSceneManager();

    // Restore original attributes
    for (const [id, attrs] of Array.from(attrsMap)) {
      const graphics = sceneManager.getGraphicsById(id);
      if (!graphics) {
        console.warn(`Graphics ${id} não encontrado.`);
        continue;
      }
      
      // TODO: Implement parent-child relationships when needed
      
      graphics.updateAttrs(attrs);
    }

    // Restore removed graphics
    for (const id of Array.from(this.removedIds)) {
      const graphics = sceneManager.getGraphicsById(id);
      if (graphics) {
        graphics.setDeleted(false);
        sceneManager.addGraphics(graphics);
      }
    }

    // Remove new graphics
    for (const id of Array.from(this.newIds)) {
      const graphics = sceneManager.getGraphicsById(id);
      if (graphics) {
        graphics.setDeleted(true);
        sceneManager.removeGraphics(graphics);
      }
    }

    // Clear selection if we removed new items
    if (this.newIds.size !== 0) {
      this.editor.getSelectionManager().clearSelection();
    }

    this.editor.render();
  }
}