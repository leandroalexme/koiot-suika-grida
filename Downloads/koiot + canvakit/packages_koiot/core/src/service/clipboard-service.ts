import { AddGraphsCmd } from '../commands/add-graphs';
import { type KoiotEditor } from '../editor';
import { type IGraphics, GraphicsType } from '../graphics/types';
import { Rectangle } from '../graphics/rectangle';

/**
 * Clipboard Service - Gerencia operações de copy/paste usando Commands (baseado no Suika)
 * Coordena clipboard operations através do sistema de Commands
 */

interface IClipboardData {
  appVersion: string;
  editorId: string;
  data: any[];
}

/**
 * Copy selected elements to clipboard using Commands
 */
export const copyElementsAndRecord = (editor: KoiotEditor): boolean => {
  const selectedItems = editor.getSelectionManager().getSelectedItems();
  if (selectedItems.length === 0) {
    return false;
  }

  const clipboardData = serializeElements(selectedItems);
  
  // Write to clipboard
  navigator.clipboard.writeText(JSON.stringify(clipboardData)).then(() => {
    console.log('Elements copied to clipboard');
  }).catch((error) => {
    console.error('Failed to copy to clipboard:', error);
  });

  return true;
};

/**
 * Paste elements from clipboard using Commands
 */
export const pasteElementsAndRecord = async (
  editor: KoiotEditor,
  offsetPoint?: { x: number; y: number }
): Promise<boolean> => {
  try {
    const clipboardText = await navigator.clipboard.readText();
    const clipboardData: IClipboardData = JSON.parse(clipboardText);
    
    // Validate clipboard data
    if (!isValidClipboardData(clipboardData)) {
      console.warn('Invalid clipboard data format');
      return false;
    }

    const newElements = deserializeElements(clipboardData.data, offsetPoint);
    
    if (newElements.length === 0) {
      return false;
    }

    // Use AddGraphsCmd to add elements with undo/redo support
    editor.commandManager.pushCommand(
      new AddGraphsCmd(
        'paste elements',
        editor,
        newElements
      )
    );

    return true;
  } catch (error) {
    console.error('Failed to paste from clipboard:', error);
    return false;
  }
};

/**
 * Duplicate selected elements using copy/paste with offset
 */
export const duplicateElementsAndRecord = (
  editor: KoiotEditor,
  offset: { x: number; y: number } = { x: 10, y: 10 }
): boolean => {
  const selectedItems = editor.getSelectionManager().getSelectedItems();
  if (selectedItems.length === 0) {
    return false;
  }

  // Create duplicated elements directly
  const duplicatedElements = selectedItems.map(element => {
    // Clone the element with offset
    const clonedElement = cloneElement(element, offset);
    return clonedElement;
  });

  // Use AddGraphsCmd to add duplicated elements
  editor.commandManager.pushCommand(
    new AddGraphsCmd(
      'duplicate elements',
      editor,
      duplicatedElements
    )
  );

  return true;
};

/**
 * Serialize elements for clipboard
 */
function serializeElements(elements: IGraphics[]): IClipboardData {
  const serializedData = elements.map(element => ({
    id: element.id,
    type: element.type,
    attrs: element.getAttrs(),
    // Add any other necessary properties
  }));

  return {
    appVersion: 'koiot-editor-0.1.0',
    editorId: 'koiot',
    data: serializedData,
  };
}

/**
 * Deserialize elements from clipboard data
 */
function deserializeElements(
  data: any[],
  offsetPoint?: { x: number; y: number }
): IGraphics[] {
  const elements: IGraphics[] = [];
  const offset = offsetPoint || { x: 10, y: 10 };

  for (const item of data) {
    try {
      // Create new element based on type
      const newElement = createElementFromData(item, offset);
      if (newElement) {
        elements.push(newElement);
      }
    } catch (error) {
      console.error('Failed to deserialize element:', error);
    }
  }

  return elements;
}

/**
 * Create element from serialized data
 */
function createElementFromData(data: any, offset: { x: number; y: number }): IGraphics | null {
  // Generate new ID for pasted element
  const newId = `koiot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Apply offset to position
  const attrs = {
    ...data.attrs,
    id: newId,
    x: (data.attrs.x || 0) + offset.x,
    y: (data.attrs.y || 0) + offset.y,
  };

  // Create element based on type
  switch (data.type) {
    case GraphicsType.Rectangle:
      return new Rectangle(attrs);
    // TODO: Add other element types as they are implemented
    // case GraphicsType.Ellipse:
    //   return new Ellipse(attrs);
    // case GraphicsType.Line:
    //   return new Line(attrs);
    default:
      console.warn(`Unknown element type: ${data.type}`);
      return null;
  }
}

/**
 * Clone element with offset (for duplication)
 */
function cloneElement(element: IGraphics, offset: { x: number; y: number }): IGraphics {
  const newId = `koiot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const attrs = element.getAttrs();
  
  const clonedAttrs = {
    ...attrs,
    id: newId,
    x: (attrs.x || 0) + offset.x,
    y: (attrs.y || 0) + offset.y,
  };

  // Create new element based on type
  switch (element.type) {
    case GraphicsType.Rectangle:
      return new Rectangle(clonedAttrs);
    // TODO: Add other element types as they are implemented
    default:
      throw new Error(`Cannot clone element of type: ${element.type}`);
  }
}

/**
 * Validate clipboard data format
 */
function isValidClipboardData(data: any): data is IClipboardData {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.appVersion === 'string' &&
    data.appVersion.startsWith('koiot-editor') &&
    Array.isArray(data.data)
  );
}