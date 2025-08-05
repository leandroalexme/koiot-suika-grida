import './Header.scss';
import { type FC } from 'react';

import { ZoomActions } from '../ZoomActions';
import { ProjectManager } from './components/ProjectManager';
import { ToolBar } from './components/Toolbar';

interface IProps {
  title: string;
}

export const Header: FC<IProps> = ({ title }) => {
  return (
    <div className="sk-header">
      <ToolBar />
      <ProjectManager projectName={title} />
      <div className="sk-right-area">
        <ZoomActions />
      </div>
    </div>
  );
};
