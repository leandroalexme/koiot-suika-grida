import { AddGraphsCmd } from '../commands/add-graphs';
import { type KoiotEditor } from '../editor';
import { type IGraphics } from '../graphics/types';
import { Group } from '../graphics/group';

/**
 * GRUPO ULTRA-SIMPLIFICADO - SEM PARENT-CHILD POR ENQUANTO
 * Apenas cria um grupo visual sem hierarquia complexa
 */
export const groupAndRecordSimple = (
  graphicsArray: IGraphics[],
  editor: KoiotEditor,
) => {
  if (graphicsArray.length < 2) {
    console.warn('Select at least 2 elements to group');
    return;
  }

  console.log('Iniciando agrupamento simples de', graphicsArray.length, 'elementos');

  try {
    // Calcular bounds básicos
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    
    for (const graphic of graphicsArray) {
      const x = graphic.attrs.x;
      const y = graphic.attrs.y;
      const width = graphic.attrs.width;
      const height = graphic.attrs.height;
      
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    }
    
    // Criar grupo simples
    const group = new Group({
      x: minX - 10, // Margem
      y: minY - 10,
      width: (maxX - minX) + 20,
      height: (maxY - minY) + 20,
      objectName: `Group_${Date.now()}`,
      isContainer: true,
      fill: 'transparent',
      stroke: '#0066ff',
      strokeWidth: 2
    });

    console.log('Grupo criado:', group.id);

    // Configurar scene manager
    group.setSceneManager(editor.getSceneManager());
    
    // Adicionar grupo ao scene
    editor.getSceneManager().addGraphics(group);
    
    // Criar comando simples
    const command = new AddGraphsCmd(
      'Create Group',
      editor,
      [group]
    );
    
    editor.commandManager.pushCommand(command);
    
    // Selecionar grupo
    editor.getSelectionManager().selectItem(group);
    
    console.log('✅ Agrupamento simples concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro no agrupamento simples:', error);
  }
};

/**
 * UNGROUP SIMPLES - apenas remove o grupo
 */
export const ungroupAndRecordSimple = (
  group: IGraphics,
  editor: KoiotEditor,
) => {
  if (group.type !== 'group') {
    console.warn('Selected element is not a group');
    return;
  }

  try {
    console.log('Removendo grupo:', group.id);
    
    // Remover grupo
    editor.getSceneManager().removeGraphics(group);
    group.setDeleted(true);
    
    // Limpar seleção
    editor.getSelectionManager().selectItems([]);
    
    console.log('✅ Desagrupamento simples concluído!');
    
  } catch (error) {
    console.error('❌ Erro no desagrupamento simples:', error);
  }
};