import './ToolbarSubmenu.scss';
import { Popover } from '@suika/components';
import { type FC, useContext, useState, useEffect, useRef } from 'react';
import { useClickAway } from 'ahooks';
import { CaretDown } from '@phosphor-icons/react';

import { EditorContext } from '../../../../context';
import { ActionMenuItem } from './ActionMenuItem';

interface IToolbarSubmenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  shortcut: string;
}

interface IProps {
  items: IToolbarSubmenuItem[];
  toolToIconMap: Record<string, React.ReactNode>;
  activeTool: string;
}

export const ToolbarSubmenu: FC<IProps> = ({ items, toolToIconMap, activeTool }) => {
  const editor = useContext(EditorContext);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [currTool, setCurrTool] = useState(items[0].key);

  const toolKeys = items.map(item => item.key);
  const [isActive, setIsActive] = useState(false);

  useClickAway(() => {
    setIsOpen(false);
  }, [triggerRef, menuRef]);

  useEffect(() => {
    if (editor) {
      const activeToolName = editor.toolManager.getActiveToolName() || '';
      if (toolKeys.includes(activeToolName)) {
        setCurrTool(activeToolName);
        setIsActive(true);
      } else {
        setIsActive(false);
      }

      const onSwitchTool = (toolName: string) => {
        if (toolKeys.includes(toolName)) {
          setCurrTool(toolName);
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      };

      editor.toolManager.on('switchTool', onSwitchTool);
      return () => {
        editor.toolManager.off('switchTool', onSwitchTool);
      };
    }
  }, [editor, toolKeys]);

  useEffect(() => {
    const activeItem = items.find((item) => item.key === activeTool);
    setIsActive(!!activeItem);
  }, [activeTool, items]);

  const handleClick = (key: string) => {
    if (editor) {
      editor.toolManager.setActiveTool(key);
      setIsOpen(false);
    }
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const menu = (
    <div
      ref={menuRef}
      className="toolbar-menu-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toolbar-menu-content">
      {items.map((item) => (
        <ActionMenuItem
          key={item.key}
          icon={item.icon}
          shortcut={item.shortcut}
          onClick={() => handleClick(item.key)}
          isActive={item.key === activeTool}
        >
          {item.label}
        </ActionMenuItem>
      ))}
      </div>
    </div>
  );

  return (
    <Popover
      open={isOpen}
      content={menu}
      placement="bottom-start"
      onOpenChange={setIsOpen}
    >
      <div 
        ref={triggerRef} 
        className={`toolbar-submenu-trigger ${isActive ? 'active' : ''}`} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {toolToIconMap[currTool] ?? toolToIconMap[items[0].key]}
        <CaretDown size={10} />
      </div>
    </Popover>
  );
}; 