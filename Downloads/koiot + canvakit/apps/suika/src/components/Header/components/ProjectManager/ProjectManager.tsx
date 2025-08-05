import './ProjectManager.scss';

import { CaretDown, Plus, PencilSimple } from '@phosphor-icons/react';
import { useClickAway } from 'ahooks';
import classNames from 'classnames';
import { type FC, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { type MessageIds } from '../../../../locale';

interface IProps {
  projectName: string;
  onNewProject?: () => void;
  onRenameProject?: () => void;
}

export const ProjectManager: FC<IProps> = ({ 
  projectName = 'Untitled', 
  onNewProject, 
  onRenameProject 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(projectName);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    setPopoverVisible(false);
  }, [containerRef, popoverRef]);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (editedName.trim() && editedName !== projectName) {
      onRenameProject?.();
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (editedName.trim() && editedName !== projectName) {
        onRenameProject?.();
      }
    } else if (e.key === 'Escape') {
      setEditedName(projectName);
      setIsEditing(false);
    }
  };

  const handleRename = () => {
    setIsEditing(true);
    setPopoverVisible(false);
  };

  const handleNewProject = () => {
    onNewProject?.();
    setPopoverVisible(false);
  };

  const handleDuplicate = () => {
    // TODO: Implement duplicate
    setPopoverVisible(false);
  };

  return (
    <div ref={containerRef} className={classNames('project-manager', { editing: isEditing })}>
      <div
        className={classNames(['value', { active: popoverVisible }])}
        onClick={() => {
          setPopoverVisible(!popoverVisible);
        }}
      >
        <div className="project-name-container">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={handleNameKeyDown}
              className="project-name-input"
              autoFocus
            />
          ) : (
            <span 
              className="project-name" 
              onClick={handleNameClick}
              title="Click to rename"
            >
              {projectName}
            </span>
          )}
        </div>
        <CaretDown size={10} />
      </div>
      
      {popoverVisible && (
        <div ref={popoverRef} className="popover">
          <div className="item" onClick={handleNewProject}>
            <Plus size={14} />
            <span>Create New Project</span>
          </div>
          <div className="separator" />
          <div className="item" onClick={handleRename}>
            <PencilSimple size={14} />
            <span>Rename Project</span>
          </div>
          <div className="item" onClick={handleDuplicate}>
            <PencilSimple size={14} />
            <span>Duplicate Project</span>
          </div>
        </div>
      )}
    </div>
  );
}; 