import { UpdateGraphicsAttrsCmd } from '../commands/update-graphics-attrs-cmd';
import { type KoiotEditor } from '../editor';
import { type IGraphics, type IGraphicsAttrs } from '../graphics/types';

/**
 * Remove Service - Coordena remoção de elementos (baseado no Suika)
 * Cria commands apropriados para deletar elementos com suporte a undo/redo
 */
export const removeGraphicsAndRecord = (
  editor: KoiotEditor,
  graphicsArray: IGraphics[],
) => {
  const removeIdSet = new Set<string>();
  
  // Mark graphics for removal
  for (const graphics of graphicsArray) {
    // TODO: Implement parent-child relationships when needed
    // graphics.removeFromParent();
    graphics.setDeleted(true);
    removeIdSet.add(graphics.id);
  }

  // TODO: Implement parent handling when needed
  // const parentIdSet = getParentIdSet(graphicsArray);
  
  // Remove empty groups
  // for (const id of parentIdSet) {
  //   const parent = editor.getSceneManager().getGraphicsById(id);
  //   if (parent && parent.isEmpty()) {
  //     parent.removeFromParent();
  //     parent.setDeleted(true);
  //     removeIdSet.add(id);
  //   }
  // }

  // TODO: Implement child node handling when needed
  // const childNodeSet = getChildNodeSet(graphicsArray);
  // for (const child of childNodeSet) {
  //   child.setDeleted(true);
  //   removeIdSet.add(child.id);
  // }

  const originAttrsMap = new Map<string, Partial<IGraphicsAttrs>>();
  const updatedAttrsMap = new Map<string, Partial<IGraphicsAttrs>>();

  // Store current state for undo and prepare removal
  for (const graphics of graphicsArray) {
    const id = graphics.id;
    originAttrsMap.set(id, {
      deleted: false,
      // TODO: Add parentIndex when parent-child relationships are implemented
    });
    updatedAttrsMap.set(id, {
      deleted: true,
    });
  }

  // TODO: Implement node size updates when needed
  // updateNodeSize(editor, parentIdSet, originAttrsMap, updatedAttrsMap);

  // Create command for removal
  editor.commandManager.pushCommand(
    new UpdateGraphicsAttrsCmd(
      'remove graphics',
      editor,
      originAttrsMap,
      updatedAttrsMap,
      removeIdSet,
    ),
  );
};

/**
 * Utility functions to be implemented when parent-child relationships are added
 */

// TODO: Implement when parent-child relationships are ready
// export const getParentIdSet = (graphicsArray: IGraphics[]): Set<string> => {
//   const parentIdSet = new Set<string>();
//   for (const graphics of graphicsArray) {
//     const parent = graphics.getParent();
//     if (parent) {
//       parentIdSet.add(parent.id);
//     }
//   }
//   return parentIdSet;
// };

// TODO: Implement when parent-child relationships are ready
// export const getChildNodeSet = (graphicsArray: IGraphics[]): Set<IGraphics> => {
//   const childNodeSet = new Set<IGraphics>();
//   for (const graphics of graphicsArray) {
//     const children = graphics.getChildren();
//     if (children) {
//       for (const child of children) {
//         childNodeSet.add(child);
//       }
//     }
//   }
//   return childNodeSet;
// };

// TODO: Implement when auto-sizing is needed
// export const updateNodeSize = (
//   editor: KoiotEditor,
//   parentIdSet: Set<string>,
//   originAttrsMap: Map<string, Partial<IGraphicsAttrs>>,
//   updatedAttrsMap: Map<string, Partial<IGraphicsAttrs>>,
// ) => {
//   // Update parent sizes when children are removed
// };