import { UpdateGraphicsAttrsCmd } from '../commands/update-graphics-attrs-cmd';
import { AddGraphsCmd } from '../commands/add-graphs';
import { type KoiotEditor } from '../editor';
import { type IGraphics, GraphicsObjectSuffix, type IParentIndex } from '../graphics/types';
import { Group } from '../graphics/group';
import { generateNKeysBetween } from '../utils/fractional-indexing';

/**
 * Group Service - Gerencia operações de grouping (baseado no Suika)
 * Coordena agrupamento usando Commands para suporte a undo/redo
 */
export const groupAndRecord = (
  graphicsArray: IGraphics[],
  editor: KoiotEditor,
) => {
  if (graphicsArray.length === 0) {
    console.warn('Graphics array should not be empty');
    return;
  }

  if (graphicsArray.length === 1) {
    console.warn('Cannot group single element');
    return;
  }

  // Ordenar elementos pela posição hierárquica
  const sortedGraphics = sortGraphicsArray(graphicsArray);
  
  // Encontrar o parent comum (por simplicidade, usamos o root)
  const lastGraphics = sortedGraphics[sortedGraphics.length - 1];
  const parentOfGroup = lastGraphics.getParent() || getSceneRoot(editor);
  
  if (!parentOfGroup) {
    console.warn('Cannot find parent for group');
    return;
  }

  // Posição do grupo (após o último elemento)
  const groupSortIndex = lastGraphics.getSortIndex();
  
  // Calcular bounds combinados (simples)
  const boundRect = calculateCombinedBounds(sortedGraphics);
  
  // Criar grupo com bounds básicos
  const group = new Group({
    x: boundRect.x,
    y: boundRect.y,
    width: Math.max(boundRect.width, 100), // Mínimo 100px
    height: Math.max(boundRect.height, 100), // Mínimo 100px
    objectName: getNoConflictObjectName(parentOfGroup, GraphicsObjectSuffix.Group),
    isContainer: true
  });

  console.log('Criando grupo:', { x: boundRect.x, y: boundRect.y, width: boundRect.width, height: boundRect.height });

  // Configurar scene manager reference
  group.setSceneManager(editor.getSceneManager());
  
  // SIMPLIFICADO: Sempre adicionar via scene manager por enquanto
  editor.getSceneManager().addGraphics(group);
  console.log('Grupo adicionado ao scene manager');

  // Preparar command data
  const originAttrsMap = new Map();
  const updatedAttrsMap = new Map();
  const newIds = new Set([group.id]);
  
  // Gerar posições para os filhos dentro do grupo
  const sortKeys = generateNKeysBetween(null, null, sortedGraphics.length);
  
  // Mover elementos para o grupo
  console.log('Movendo elementos para o grupo:', sortedGraphics.length);
  for (let i = 0; i < sortedGraphics.length; i++) {
    const graphics = sortedGraphics[i];
    const newParentIndex: IParentIndex = {
      guid: group.id,
      position: sortKeys[i],
    };
    
    console.log(`Processando elemento ${i + 1}/${sortedGraphics.length}:`, graphics.id);
    
    try {
      // Salvar estado original
      originAttrsMap.set(graphics.id, {
        parentIndex: graphics.attrs.parentIndex ? { ...graphics.attrs.parentIndex } : undefined,
      });
      
      // Remover do parent atual
      graphics.removeFromParent();
      
      // Adicionar ao grupo
      group.insertChild(graphics, sortKeys[i]);
      
      // Salvar novo estado
      updatedAttrsMap.set(graphics.id, {
        parentIndex: { ...newParentIndex },
      });
      
      console.log(`Elemento ${graphics.id} adicionado ao grupo com sucesso`);
      
    } catch (error) {
      console.error(`Erro ao adicionar elemento ${graphics.id} ao grupo:`, error);
    }
  }
  
  // TODO: Ajustar tamanho do grupo aos filhos quando getBounds estiver estável
  // group.resizeToFit();

  // SIMPLIFICADO: Por enquanto apenas usar AddGraphsCmd para o grupo
  const command = new AddGraphsCmd(
    'Group Elements',
    editor,
    [group]
  );
  
  editor.commandManager.pushCommand(command);
  console.log('Comando de agrupamento executado');
  
  // Selecionar o grupo criado
  editor.getSelectionManager().selectItem(group);
  
  console.log(`Grouped ${sortedGraphics.length} elements`);
};

/**
 * Ungroup Service - Desfaz agrupamento (baseado no Suika)
 */
export const ungroupAndRecord = (
  group: IGraphics,
  editor: KoiotEditor,
) => {
  if (group.type !== 'group') {
    console.warn('Element is not a group');
    return;
  }

  const children = group.getChildren();
  if (children.length === 0) {
    console.warn('Group is empty');
    return;
  }

  // Encontrar parent do grupo
  const parentOfGroup = group.getParent() || getSceneRoot(editor);
  if (!parentOfGroup) {
    console.warn('Cannot find parent for ungrouping');
    return;
  }

  // Preparar command data
  const originAttrsMap = new Map();
  const updatedAttrsMap = new Map();
  const removedIds = new Set([group.id]);
  
  // Gerar posições para os elementos fora do grupo
  const groupSortIndex = group.getSortIndex();
  const nextSibling = group.getNextSibling();
  const nextSortIndex = nextSibling ? nextSibling.getSortIndex() : null;
  
  const sortKeys = generateNKeysBetween(
    groupSortIndex, 
    nextSortIndex, 
    children.length
  );

  // Mover filhos para o parent do grupo
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const newParentIndex: IParentIndex = {
      guid: parentOfGroup.id || 'scene-root',
      position: sortKeys[i],
    };
    
    // Salvar estado original
    originAttrsMap.set(child.id, {
      parentIndex: child.attrs.parentIndex ? { ...child.attrs.parentIndex } : undefined,
    });
    
    // Remover do grupo
    group.removeChild(child);
    
    // Adicionar ao parent do grupo
    if (parentOfGroup.insertChild) {
      parentOfGroup.insertChild(child, sortKeys[i]);
    } else {
      // Se parent é scene root, adicionar via scene manager
      editor.getSceneManager().addGraphics(child);
      child.updateAttrs({ parentIndex: undefined });
    }
    
    // Salvar novo estado
    updatedAttrsMap.set(child.id, {
      parentIndex: parentOfGroup.id ? { ...newParentIndex } : undefined,
    });
  }
  
  // Remover grupo
  group.removeFromParent();
  editor.getSceneManager().removeGraphics(group);
  group.setDeleted(true);

  // Criar e executar command
  const command = new UpdateGraphicsAttrsCmd(
    'Ungroup Elements',
    editor,
    originAttrsMap,
    updatedAttrsMap,
    removedIds,
    new Set()
  );
  
  editor.commandManager.pushCommand(command);
  
  // Selecionar os elementos ungrouped
  editor.getSelectionManager().selectItems(children);
  
  console.log(`Ungrouped ${children.length} elements`);
};

/**
 * Helper functions
 */

function sortGraphicsArray(graphicsArray: IGraphics[]): IGraphics[] {
  return graphicsArray.sort((a, b) => {
    const aPos = a.getSortIndex();
    const bPos = b.getSortIndex();
    return aPos < bPos ? -1 : aPos > bPos ? 1 : 0;
  });
}

function calculateCombinedBounds(graphics: IGraphics[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  
  for (const graphic of graphics) {
    // Use attrs direto para evitar problemas com getBounds()
    const x = graphic.attrs.x;
    const y = graphic.attrs.y;
    const width = graphic.attrs.width;
    const height = graphic.attrs.height;
    
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + width);
    maxY = Math.max(maxY, y + height);
  }
  
  if (minX === Infinity) {
    return { x: 0, y: 0, width: 100, height: 100 };
  }
  
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}

function getSceneRoot(editor: KoiotEditor): any {
  // Para simplicidade, retornamos um objeto que representa a cena raiz
  return {
    id: 'scene-root',
    insertChild: undefined // Scene root não tem insertChild, usa scene manager
  };
}

function getNoConflictObjectName(parent: any, suffix: GraphicsObjectSuffix): string {
  // Gerar nome único para o objeto
  const baseName = suffix;
  let counter = 1;
  let name = `${baseName} ${counter}`;
  
  // Para simplicidade, apenas incrementamos o contador
  // Em implementação completa, verificaríamos conflitos com filhos do parent
  while (counter < 1000) { // Limite de segurança
    name = `${baseName} ${counter}`;
    // TODO: Verificar se nome existe nos filhos do parent
    break; // Por enquanto, aceitamos o primeiro nome
  }
  
  return name;
}