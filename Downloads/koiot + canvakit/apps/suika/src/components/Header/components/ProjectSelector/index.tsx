import './style.scss';

import { Button } from '@suika/components';
import { 
  FileText, 
  CaretDown, 
  Plus,
  PencilSimple
} from '@phosphor-icons/react';
import { useClickAway } from 'ahooks';
import classNames from 'classnames';
import { type FC, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

interface IProps {
  value: string;
  onRename?: (newName: string) => void;
  onCreateNew?: () => void;
}

const ProjectSelector: FC<IProps> = ({ value, onRename, onCreateNew }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickAway(() => {
    setIsMenuOpen(false);
  }, containerRef);

  const handleRename = () => {
    if (newName.trim() && newName !== value) {
      onRename?.(newName.trim());
    }
    setIsRenaming(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setNewName(value);
      setIsRenaming(false);
    }
  };

  const startRename = () => {
    setIsRenaming(true);
    setNewName(value);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  return (
    <div className="project-selector-container">
      <div ref={containerRef} className="project-selector">
        <div 
          className="project-info"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FileText size={16} />
          {isRenaming ? (
            <input
              ref={inputRef}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyPress}
              className="rename-input"
            />
          ) : (
            <span className="project-name">{value}</span>
          )}
          <CaretDown size={10} />
        </div>
        
        {isMenuOpen && (
          <div className="project-menu">
            <div className="menu-item" onClick={startRename}>
              <PencilSimple size={14} />
              <span>Renomear</span>
            </div>
            <div className="separator" />
            <div className="menu-item" onClick={() => onCreateNew?.()}>
              <Plus size={14} />
              <span>Criar Novo Projeto</span>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={() => onCreateNew?.()}
      >
        <Plus size={16} />
        <span>Criar Novo Projeto</span>
      </Button>
    </div>
  );
};

export default ProjectSelector; 