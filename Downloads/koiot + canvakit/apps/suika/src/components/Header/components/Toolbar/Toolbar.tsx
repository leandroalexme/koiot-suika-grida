import './Toolbar.scss';

import { isWindows } from '@suika/common';
import { Button } from '@suika/components';
import {
  Cursor,
  Square,
  Circle,
  PencilSimpleLine,
  Polygon,
  Star,
  TextT,
  Hand,
  PenNib,
  LineSegment,
  ImageSquare,
  Plus,
} from '@phosphor-icons/react';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { EditorContext } from '../../../../context';
import { type MessageIds } from '../../../../locale';
import { ToolBtn } from './components/ToolBtn';
import { Menu } from './menu';
import { ToolbarSubmenu } from './ToolbarSubmenu';

export const ToolBar = () => {
  const editor = useContext(EditorContext);
  const intl = useIntl();
  const t = (id: MessageIds) => intl.formatMessage({ id });
  const [currTool, setCurrTool] = useState('');
  const [enableTools, setEnableTools] = useState<string[]>([]);
  const [isPathEditorActive, setIsPathEditorActive] = useState(false);

  useEffect(() => {
    if (editor) {
      setCurrTool(editor.toolManager.getActiveToolName() || '');
      setEnableTools(editor.toolManager.getEnableTools());
      setIsPathEditorActive(editor.pathEditor.isActive());

      const onTogglePathEditor = (active: boolean) => {
        setIsPathEditorActive(active);
      };
      const onSwitchTool = (toolName: string) => {
        setCurrTool(toolName);
      };
      const onChangeEnableTools = (tools: string[]) => {
        setEnableTools(tools);
      };

      editor.toolManager.on('switchTool', onSwitchTool);
      editor.toolManager.on('changeEnableTools', onChangeEnableTools);
      editor.pathEditor.on('toggle', onTogglePathEditor);
      return () => {
        editor.toolManager.off('switchTool', onSwitchTool);
        editor.toolManager.off('changeEnableTools', onChangeEnableTools);
        editor.pathEditor.off('toggle', onTogglePathEditor);
      };
    }
  }, [editor]);

  const keyMap: Record<
    string,
    { name: string; hotkey: string; intlId: MessageIds; icon: JSX.Element }
  > = {
    select: {
      name: 'select',
      hotkey: 'V',
      intlId: 'tool.select',
      icon: <Cursor size={20} weight="fill" />,
    },
    drawFrame: {
      name: 'drawFrame',
      hotkey: 'F',
      intlId: 'tool.frame',
      icon: <Plus size={20} weight="fill" />,
    },
    drawRect: {
      name: 'drawRect',
      hotkey: 'R',
      intlId: 'tool.rectangle',
      icon: <Square size={20} weight="fill" />,
    },
    drawEllipse: {
      name: 'drawEllipse',
      hotkey: 'O',
      intlId: 'tool.ellipse',
      icon: <Circle size={20} weight="fill" />,
    },
    drawImg: {
      name: 'drawImg',
      hotkey: '',
      intlId: 'tool.image',
      icon: <ImageSquare size={20} weight="fill" />,
    },
    pathSelect: {
      name: 'pathSelect',
      hotkey: 'V',
      intlId: 'tool.select',
      icon: <Cursor size={20} weight="fill" />,
    },
    pen: {
      name: 'pen',
      hotkey: 'P',
      intlId: 'tool.pen',
      icon: <PenNib size={20} weight="fill" />,
    },
    pencil: {
      name: 'pencil',
      hotkey: `${isWindows() ? 'Shift+' : '⇧'}P`,
      intlId: 'tool.pencil',
      icon: <PencilSimpleLine size={20} weight="fill" />,
    },
    drawLine: {
      name: 'drawLine',
      hotkey: 'L',
      intlId: 'tool.line',
      icon: <LineSegment size={20} weight="fill" />,
    },
    drawRegularPolygon: {
      name: 'drawRegularPolygon',
      hotkey: '',
      intlId: 'tool.polygon',
      icon: <Polygon size={20} weight="fill" />,
    },
    drawStar: {
      name: 'drawStar',
      hotkey: '',
      intlId: 'tool.star',
      icon: <Star size={20} weight="fill" />,
    },
    drawText: {
      name: 'drawText',
      hotkey: 'T',
      intlId: 'tool.text',
      icon: <TextT size={20} weight="regular" />,
    },

    dragCanvas: {
      name: 'dragCanvas',
      hotkey: 'H',
      intlId: 'tool.hand',
      icon: <Hand size={20} weight="fill" />,
    },
  };

  const selectSubmenuItems = [
    { key: 'select', label: t('tool.select'), icon: <Cursor size={16} weight="fill" />, shortcut: 'V' },
    { key: 'dragCanvas', label: t('tool.hand'), icon: <Hand size={16} weight="fill" />, shortcut: 'H' },
  ];

  const penSubmenuItems = [
    { key: 'pen', label: t('tool.pen'), icon: <PenNib size={16} weight="fill" />, shortcut: 'P' },
    { key: 'pencil', label: t('tool.pencil'), icon: <PencilSimpleLine size={16} weight="fill" />, shortcut: '⇧P' },
    { key: 'drawLine', label: t('tool.line'), icon: <LineSegment size={16} weight="fill" />, shortcut: 'L' },
  ];

  const shapeSubmenuItems = [
    { key: 'drawRect', label: t('tool.rectangle'), icon: <Square size={16} weight="fill" />, shortcut: 'R' },
    { key: 'drawEllipse', label: t('tool.ellipse'), icon: <Circle size={16} weight="fill" />, shortcut: 'O' },
    { key: 'drawRegularPolygon', label: t('tool.polygon'), icon: <Polygon size={16} weight="fill" />, shortcut: '' },
    { key: 'drawStar', label: t('tool.star'), icon: <Star size={16} weight="fill" />, shortcut: '' },
  ];

  const toolToIconMap = {
    pen: <PenNib size={20} weight="fill" />,
    pencil: <PencilSimpleLine size={20} weight="fill" />,
    drawLine: <LineSegment size={20} weight="fill" />,
    drawRect: <Square size={20} weight="fill" />,
    drawEllipse: <Circle size={20} weight="fill" />,
    drawRegularPolygon: <Polygon size={20} weight="fill" />,
    drawStar: <Star size={20} weight="fill" />,
    select: <Cursor size={20} weight="fill" />,
    dragCanvas: <Hand size={20} weight="fill" />,
  };

  const toolbarOrder = [
    { type: 'submenu', items: selectSubmenuItems },
    { type: 'submenu', items: penSubmenuItems },
    { type: 'submenu', items: shapeSubmenuItems },
    { type: 'tool', key: 'drawText' },
    { type: 'tool', key: 'drawImg' },
    { type: 'tool', key: 'drawFrame' },
  ];

  return (
    <div className="suika-tool-bar">
      <Menu />
      {toolbarOrder.map((item, index) => {
        if (item.type === 'submenu' && item.items) {
          return (
            <ToolbarSubmenu
              key={index}
              items={item.items}
              toolToIconMap={toolToIconMap}
              activeTool={currTool}
            />
          );
        }
        if (item.type === 'tool' && item.key && enableTools.includes(item.key)) {
          const tool = keyMap[item.key];
          if (tool) {
        return (
          <ToolBtn
            key={tool.name}
            className={classNames({ active: currTool === tool.name })}
                tooltipContent={t(tool.intlId)}
            hotkey={tool.hotkey}
            showTooltip={true}
            onMouseDown={() => {
              editor?.toolManager.setActiveTool(tool.name);
            }}
          >
            {tool.icon}
          </ToolBtn>
        );
          }
        }
        return null;
      })}

      {isPathEditorActive && (
        <Button
          style={{
            marginLeft: '16px',
            userSelect: 'none',
          }}
          onClick={() => {
            if (editor) {
              editor.pathEditor.inactive();
            }
          }}
        >
          {t('done')}
        </Button>
      )}
    </div>
  );
};
