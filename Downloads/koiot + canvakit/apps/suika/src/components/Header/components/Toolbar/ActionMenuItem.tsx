import cx from 'classnames';
import { type FC, type PropsWithChildren } from 'react';

import './ActionMenuItem.scss';
interface IProps extends PropsWithChildren {
  shortcut?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

export const ActionMenuItem: FC<IProps> = ({
  onClick,
  children,
  shortcut,
  icon,
  isActive,
}) => {
  return (
    <div
      className={cx('action-menu-item-wrap', { active: isActive })}
      onClick={onClick}
    >
      <div className="action-menu-item">
        <div className="suika-icon-box">{icon}</div>
        {children}
      </div>
      {shortcut && <span className="shortcut">{shortcut}</span>}
    </div>
  );
}; 