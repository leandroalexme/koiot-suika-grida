import './FloatingPanel.scss';

import { Minus } from '@phosphor-icons/react';
import { type FC, type PropsWithChildren, type CSSProperties, useRef, useState, useCallback } from 'react';
import { IconButton } from '@suika/components';

interface IProps extends PropsWithChildren {
  title: string;
  style?: CSSProperties;
  onClose?: () => void;
  resizable?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

export const FloatingPanel: FC<IProps> = ({ 
  title, 
  children, 
  style, 
  onClose, 
  resizable = false,
  minHeight = 200,
  maxHeight = 600
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!resizable) return;
    
    e.preventDefault();
    setIsResizing(true);
    
    const startY = e.clientY;
    const startHeight = panelRef.current?.offsetHeight || 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;
      const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
      setHeight(newHeight);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [resizable, minHeight, maxHeight]);

  const panelStyle = {
    ...style,
    height: height,
  };

  return (
    <div 
      ref={panelRef}
      className={`floating-panel ${isResizing ? 'resizing' : ''}`} 
      style={panelStyle}
    >
      <div className="floating-panel-header">
        <h2 className="floating-panel-title">{title}</h2>
        {onClose && (
          <div className="panel-close-button">
            <IconButton onClick={onClose}>
              <Minus size={16} />
            </IconButton>
          </div>
        )}
      </div>
      <div className="floating-panel-content">
        {children}
      </div>
      {resizable && (
        <div 
          className="resize-handle"
          onMouseDown={handleMouseDown}
        />
      )}
    </div>
  );
}; 