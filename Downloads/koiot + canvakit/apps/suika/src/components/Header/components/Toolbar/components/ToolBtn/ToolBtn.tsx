import './ToolBtn.scss';

import classNames from 'classnames';
import React, { type FC } from 'react';

interface IToolBtn {
  className?: string;
  children?: React.ReactNode;
  tooltipContent?: string;
  hotkey?: string;
  onMouseDown: () => void;
  showTooltip?: boolean;
}

export const ToolBtn: FC<IToolBtn> = ({
  children,
  onMouseDown,
  className,
  tooltipContent,
  hotkey,
  showTooltip = true,
}) => {
  return (
    <div
      className={classNames('tool-btn', className)}
      onMouseDown={() => {
        onMouseDown();
      }}
    >
      {children}
      {showTooltip && tooltipContent && (
      <div className="tooltip">
        {tooltipContent}
        {hotkey && <span className="tool-hotkey">{hotkey}</span>}
      </div>
      )}
    </div>
  );
};
