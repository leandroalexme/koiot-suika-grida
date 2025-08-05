import { UpdateGraphicsAttrsCmd } from '../commands/update-graphics-attrs-cmd';
import { type KoiotEditor } from '../editor';
import { type IGraphics, ArrangeType } from '../graphics/types';

/**
 * Arrange Service - Gerencia z-order/layer operations (baseado no Suika)
 * Coordena operações de arrange usando Commands para suporte a undo/redo
 */
export const arrangeAndRecord = (editor: KoiotEditor, type: ArrangeType) => {
  const selectedItems = editor.getSelectionManager().getSelectedItems();
  
  if (selectedItems.length === 0) {
    console.warn("can't arrange, no element selected");
    return;
  }

  const allGraphics = editor.getSceneManager().getAllGraphics();
  
  // Ensure all graphics have zIndex
  ensureZIndexes(allGraphics);
  
  let isArrangeHappen = false;
  
  switch (type) {
    case ArrangeType.Front: {
      isArrangeHappen = bringToFront(editor, selectedItems, allGraphics);
      break;
    }
    case ArrangeType.Back: {
      isArrangeHappen = sendToBack(editor, selectedItems, allGraphics);
      break;
    }
    case ArrangeType.Forward: {
      isArrangeHappen = bringForward(editor, selectedItems, allGraphics);
      break;
    }
    case ArrangeType.Backward: {
      isArrangeHappen = sendBackward(editor, selectedItems, allGraphics);
      break;
    }
    default:
      console.warn(`invalid arrange type ${type}`);
      break;
  }
  
  if (isArrangeHappen) {
    // Sort scene graphics by zIndex after arrange
    editor.getSceneManager().sortGraphicsByZIndex();
    console.log(`Arranged elements: ${type}`);
  } else {
    console.log('No need to arrange - elements already in position.');
  }
};

/**
 * Ensure all graphics have zIndex values
 */
function ensureZIndexes(allGraphics: IGraphics[]): void {
  allGraphics.forEach((graphic, index) => {
    if (graphic.attrs.zIndex === undefined) {
      graphic.updateAttrs({ zIndex: index });
    }
  });
}

/**
 * Bring selected elements to front (highest zIndex)
 */
function bringToFront(
  editor: KoiotEditor, 
  selectedItems: IGraphics[], 
  allGraphics: IGraphics[]
): boolean {
  const maxZIndex = Math.max(...allGraphics.map(g => g.attrs.zIndex || 0));
  
  // Check if already at front
  const selectedMaxZIndex = Math.max(...selectedItems.map(g => g.attrs.zIndex || 0));
  if (selectedMaxZIndex === maxZIndex && selectedItems.length === 1) {
    return false;
  }
  
  const originAttrsMap = new Map();
  const updatedAttrsMap = new Map();
  
  selectedItems.forEach((item, index) => {
    const currentZIndex = item.attrs.zIndex || 0;
    const newZIndex = maxZIndex + 1 + index;
    
    originAttrsMap.set(item.id, { zIndex: currentZIndex });
    updatedAttrsMap.set(item.id, { zIndex: newZIndex });
    
    item.updateAttrs({ zIndex: newZIndex });
  });
  
  // Create and execute command
  const command = new UpdateGraphicsAttrsCmd(
    `Bring to Front`,
    editor,
    originAttrsMap,
    updatedAttrsMap
  );
  
  editor.commandManager.pushCommand(command);
  return true;
}

/**
 * Send selected elements to back (lowest zIndex)
 */
function sendToBack(
  editor: KoiotEditor,
  selectedItems: IGraphics[],
  allGraphics: IGraphics[]
): boolean {
  const minZIndex = Math.min(...allGraphics.map(g => g.attrs.zIndex || 0));
  
  // Check if already at back
  const selectedMinZIndex = Math.min(...selectedItems.map(g => g.attrs.zIndex || 0));
  if (selectedMinZIndex === minZIndex && selectedItems.length === 1) {
    return false;
  }
  
  const originAttrsMap = new Map();
  const updatedAttrsMap = new Map();
  
  selectedItems.forEach((item, index) => {
    const currentZIndex = item.attrs.zIndex || 0;
    const newZIndex = minZIndex - selectedItems.length + index;
    
    originAttrsMap.set(item.id, { zIndex: currentZIndex });
    updatedAttrsMap.set(item.id, { zIndex: newZIndex });
    
    item.updateAttrs({ zIndex: newZIndex });
  });
  
  // Create and execute command
  const command = new UpdateGraphicsAttrsCmd(
    `Send to Back`,
    editor,
    originAttrsMap,
    updatedAttrsMap
  );
  
  editor.commandManager.pushCommand(command);
  return true;
}

/**
 * Bring selected elements forward one level
 */
function bringForward(
  editor: KoiotEditor,
  selectedItems: IGraphics[],
  allGraphics: IGraphics[]
): boolean {
  // Sort all graphics by zIndex
  const sortedGraphics = [...allGraphics].sort((a, b) => (a.attrs.zIndex || 0) - (b.attrs.zIndex || 0));
  
  const originAttrsMap = new Map();
  const updatedAttrsMap = new Map();
  let hasChanges = false;
  
  // Process from highest to lowest to avoid conflicts
  for (let i = selectedItems.length - 1; i >= 0; i--) {
    const item = selectedItems[i];
    const currentIndex = sortedGraphics.findIndex(g => g.id === item.id);
    
    if (currentIndex < sortedGraphics.length - 1) {
      const nextItem = sortedGraphics[currentIndex + 1];
      
      // Skip if next item is also selected (would create conflict)
      if (!selectedItems.some(selected => selected.id === nextItem.id)) {
        const currentZIndex = item.attrs.zIndex || 0;
        const nextZIndex = nextItem.attrs.zIndex || 0;
        const newZIndex = nextZIndex + 1;
        
        originAttrsMap.set(item.id, { zIndex: currentZIndex });
        updatedAttrsMap.set(item.id, { zIndex: newZIndex });
        
        item.updateAttrs({ zIndex: newZIndex });
        hasChanges = true;
        
        // Update sorted array for next iteration
        sortedGraphics.splice(currentIndex, 1);
        sortedGraphics.splice(currentIndex + 1, 0, item);
      }
    }
  }
  
  if (hasChanges) {
    const command = new UpdateGraphicsAttrsCmd(
      `Bring Forward`,
      editor,
      originAttrsMap,
      updatedAttrsMap
    );
    
    editor.commandManager.pushCommand(command);
  }
  
  return hasChanges;
}

/**
 * Send selected elements backward one level
 */
function sendBackward(
  editor: KoiotEditor,
  selectedItems: IGraphics[],
  allGraphics: IGraphics[]
): boolean {
  // Sort all graphics by zIndex
  const sortedGraphics = [...allGraphics].sort((a, b) => (a.attrs.zIndex || 0) - (b.attrs.zIndex || 0));
  
  const originAttrsMap = new Map();
  const updatedAttrsMap = new Map();
  let hasChanges = false;
  
  // Process from lowest to highest to avoid conflicts
  for (let i = 0; i < selectedItems.length; i++) {
    const item = selectedItems[i];
    const currentIndex = sortedGraphics.findIndex(g => g.id === item.id);
    
    if (currentIndex > 0) {
      const prevItem = sortedGraphics[currentIndex - 1];
      
      // Skip if previous item is also selected (would create conflict)
      if (!selectedItems.some(selected => selected.id === prevItem.id)) {
        const currentZIndex = item.attrs.zIndex || 0;
        const prevZIndex = prevItem.attrs.zIndex || 0;
        const newZIndex = prevZIndex - 1;
        
        originAttrsMap.set(item.id, { zIndex: currentZIndex });
        updatedAttrsMap.set(item.id, { zIndex: newZIndex });
        
        item.updateAttrs({ zIndex: newZIndex });
        hasChanges = true;
        
        // Update sorted array for next iteration
        sortedGraphics.splice(currentIndex, 1);
        sortedGraphics.splice(currentIndex - 1, 0, item);
      }
    }
  }
  
  if (hasChanges) {
    const command = new UpdateGraphicsAttrsCmd(
      `Send Backward`,
      editor,
      originAttrsMap,
      updatedAttrsMap
    );
    
    editor.commandManager.pushCommand(command);
  }
  
  return hasChanges;
}