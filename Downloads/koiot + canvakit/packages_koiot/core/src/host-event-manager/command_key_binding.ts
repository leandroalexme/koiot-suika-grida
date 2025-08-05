import { type KoiotEditor } from '../editor';
import { removeGraphicsAndRecord } from '../service/remove-service';
import { duplicateElementsAndRecord } from '../service/clipboard-service';
import { arrangeAndRecord } from '../service/arrange-service';
import { groupAndRecordSimple, ungroupAndRecordSimple } from '../service/group-service-simple';
import { ArrangeType } from '../graphics/types';

export class CommandKeyBinding {
  private isBound = false;

  constructor(private editor: KoiotEditor) {}

  bindKey() {
    if (this.isBound) {
      console.warn('CommandKeyBinding has been bound, please destroy it first');
      return;
    }
    this.isBound = true;
    const editor = this.editor;

    // undo
    const undoAction = () => editor.commandManager.undo();
    editor.keybindingManager.register({
      key: { metaKey: true, keyCode: 'KeyZ' },
      winKey: { ctrlKey: true, keyCode: 'KeyZ' },
      when: (ctx) => !ctx.isToolDragging,
      actionName: 'Undo',
      action: undoAction,
    });

    // redo
    const redoAction = () => editor.commandManager.redo();
    editor.keybindingManager.register({
      key: { metaKey: true, shiftKey: true, keyCode: 'KeyZ' },
      winKey: { ctrlKey: true, shiftKey: true, keyCode: 'KeyZ' },
      when: (ctx) => !ctx.isToolDragging,
      actionName: 'Redo',
      action: redoAction,
    });

    // delete
    const deleteAction = () => {
      const selectedItems = editor.getSelectionManager().getSelectedItems();
      if (selectedItems.length > 0) {
        removeGraphicsAndRecord(editor, selectedItems);
      }
    };
    editor.keybindingManager.register({
      key: [{ keyCode: 'Backspace' }, { keyCode: 'Delete' }],
      when: (ctx) => !ctx.isToolDragging,
      actionName: 'Delete',
      action: deleteAction,
    });

    // select all
    const selectAllAction = () => {
      console.log('Select all action triggered');
      // TODO: Implement select all when selection system is expanded
      editor.render();
    };
    editor.keybindingManager.register({
      key: { metaKey: true, keyCode: 'KeyA' },
      winKey: { ctrlKey: true, keyCode: 'KeyA' },
      actionName: 'Select All',
      action: selectAllAction,
    });

    // duplicate with Ctrl+D
    const duplicateAction = () => {
      duplicateElementsAndRecord(editor, { x: 10, y: 10 });
    };
    editor.keybindingManager.register({
      key: { metaKey: true, keyCode: 'KeyD' },
      winKey: { ctrlKey: true, keyCode: 'KeyD' },
      actionName: 'Duplicate',
      action: duplicateAction,
    });

    // escape to clear selection or cancel current tool
    const escapeAction = () => {
      if (this.editor.toolManager.getActiveTool()?.name === 'select') {
        // Clear selection if in select tool
        editor.getSelectionManager().clearSelection();
      } else {
        // Switch to select tool
        this.editor.toolManager.setActiveTool('select');
      }
      editor.render();
    };
    editor.keybindingManager.register({
      key: { keyCode: 'Escape' },
      actionName: 'Escape',
      action: escapeAction,
    });

    // ===== ARRANGE ACTIONS =====
    
    // bring to front with ]
    const bringToFrontAction = () => {
      arrangeAndRecord(editor, ArrangeType.Front);
    };
    editor.keybindingManager.register({
      key: { keyCode: 'BracketRight' }, // ]
      actionName: 'Bring to Front',
      action: bringToFrontAction,
    });

    // send to back with [
    const sendToBackAction = () => {
      arrangeAndRecord(editor, ArrangeType.Back);
    };
    editor.keybindingManager.register({
      key: { keyCode: 'BracketLeft' }, // [
      actionName: 'Send to Back', 
      action: sendToBackAction,
    });

    // bring forward with Cmd+]
    const bringForwardAction = () => {
      arrangeAndRecord(editor, ArrangeType.Forward);
    };
    editor.keybindingManager.register({
      key: { metaKey: true, keyCode: 'BracketRight' }, // Cmd+]
      winKey: { ctrlKey: true, keyCode: 'BracketRight' }, // Ctrl+]
      actionName: 'Bring Forward',
      action: bringForwardAction,
    });

    // send backward with Cmd+[
    const sendBackwardAction = () => {
      arrangeAndRecord(editor, ArrangeType.Backward);
    };
    editor.keybindingManager.register({
      key: { metaKey: true, keyCode: 'BracketLeft' }, // Cmd+[
      winKey: { ctrlKey: true, keyCode: 'BracketLeft' }, // Ctrl+[
      actionName: 'Send Backward',
      action: sendBackwardAction,
    });

    // ===== GROUP/UNGROUP ACTIONS =====
    
    // group with Cmd+G
    const groupAction = () => {
      const selectedItems = editor.getSelectionManager().getSelectedItems();
      if (selectedItems.length >= 2) {
        groupAndRecordSimple(selectedItems, editor);
      } else {
        console.log('Select at least 2 elements to group');
      }
    };
    editor.keybindingManager.register({
      key: { metaKey: true, keyCode: 'KeyG' }, // Cmd+G
      winKey: { ctrlKey: true, keyCode: 'KeyG' }, // Ctrl+G
      actionName: 'Group',
      action: groupAction,
    });

    // ungroup with Cmd+Shift+G
    const ungroupAction = () => {
      const selectedItems = editor.getSelectionManager().getSelectedItems();
      if (selectedItems.length === 1 && selectedItems[0].type === 'group') {
        ungroupAndRecordSimple(selectedItems[0], editor);
      } else {
        console.log('Select a group to ungroup');
      }
    };
    editor.keybindingManager.register({
      key: { metaKey: true, shiftKey: true, keyCode: 'KeyG' }, // Cmd+Shift+G
      winKey: { ctrlKey: true, shiftKey: true, keyCode: 'KeyG' }, // Ctrl+Shift+G
      actionName: 'Ungroup',
      action: ungroupAction,
    });
  }

  destroy() {
    this.isBound = false;
    // TODO: Implement cleanup of key bindings if needed
  }
}