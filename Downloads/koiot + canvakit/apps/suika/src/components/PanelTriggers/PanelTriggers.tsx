import './PanelTriggers.scss';
import { Stack, SlidersHorizontal } from '@phosphor-icons/react';
import { type FC } from 'react';
import { IconButton } from '@suika/components';

interface IProps {
  onToggleLayerPanel: () => void;
  onToggleInfoPanel: () => void;
  isLayerPanelVisible: boolean;
  isInfoPanelVisible: boolean;
  hasSelectedElements: boolean;
}

export const PanelTriggers: FC<IProps> = ({
  onToggleLayerPanel,
  onToggleInfoPanel,
  isLayerPanelVisible,
  isInfoPanelVisible,
  hasSelectedElements,
}) => {
  return (
    <>
      {!isLayerPanelVisible && (
        <div className="panel-triggers-container left">
          <div className="panel-trigger-button">
            <IconButton onClick={onToggleLayerPanel}>
              <Stack size={20} weight="fill" />
            </IconButton>
          </div>
        </div>
      )}
      {!isInfoPanelVisible && hasSelectedElements && (
        <div className="panel-triggers-container right">
          <div className="panel-trigger-button">
            <IconButton onClick={onToggleInfoPanel}>
              <SlidersHorizontal size={20} weight="fill" />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
}; 