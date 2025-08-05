import './Editor.scss';

import { pick, throttle } from '@suika/common';
import { type SettingValue, SuikaEditor } from '@suika/core';
import { type FC, useEffect, useRef, useState } from 'react';

import { EditorContext } from '../context';
import { AutoSaveGraphics } from '../store/auto-save-graphs';
import { ContextMenu } from './ContextMenu';
import { FloatingPanel } from './FloatingPanel/FloatingPanel';
import { Header } from './Header';
import { InfoPanel } from './InfoPanel';
import { LayerPanel } from './LayerPanel';
import { PanelTriggers } from './PanelTriggers/PanelTriggers';

const topMargin = 48;
const leftRightMargin = 0; // No longer needed with floating panels

const USER_PREFERENCE_KEY = 'suika-user-preference';
const storeKeys: Partial<keyof SettingValue>[] = [
  'enablePixelGrid',
  'snapToGrid',
  'enableRuler',

  'keepToolSelectedAfterUse',
  'invertZoomDirection',
  'highlightLayersOnHover',
  'flipObjectsWhileResizing',
  'snapToObjects',
  
  
];

const Editor: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [editor, setEditor] = useState<SuikaEditor | null>(null);
  const [isLayerPanelVisible, setIsLayerPanelVisible] = useState(true);
  const [isInfoPanelVisible, setIsInfoPanelVisible] = useState(false);
  const [hasSelectedElements, setHasSelectedElements] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const userPreferenceEncoded = localStorage.getItem(USER_PREFERENCE_KEY);
      const userPreference = userPreferenceEncoded
        ? (JSON.parse(userPreferenceEncoded) as Partial<SettingValue>)
        : undefined;

      const editor = new SuikaEditor({
        containerElement: containerRef.current,
        width: document.body.clientWidth, // Corrigido
        height: document.body.clientHeight - topMargin,
        offsetY: 48,
        offsetX: 0, // Corrigido
        showPerfMonitor: false,
        userPreference: userPreference,
        // 🚀 Ativar CanvasKit com logs detalhados
        canvasKit: {
          enableGPU: true
        }
      });

      editor.setting.on(
        'update',
        (value: SettingValue, changedKey: keyof SettingValue) => {
          if (!storeKeys.includes(changedKey)) return;

          localStorage.setItem(
            USER_PREFERENCE_KEY,
            JSON.stringify(pick(value, storeKeys)),
          );
        },
      );

      (window as any).editor = editor;

      new AutoSaveGraphics(editor);

      // Escutar mudanças na seleção
      const updateSelectionState = () => {
        const selectedElements = editor.selectedElements.getItems();
        const hasSelection = selectedElements.length > 0;
        setHasSelectedElements(hasSelection);
        
        // Mostrar painel de propriedades automaticamente quando há seleção
        if (hasSelection && !isInfoPanelVisible) {
          setIsInfoPanelVisible(true);
        }
        // Opcional: esconder quando não há seleção
        // else if (!hasSelection && isInfoPanelVisible) {
        //   setIsInfoPanelVisible(false);
        // }
      };

      // Escutar mudanças na seleção
      editor.selectedElements.on('itemsChange', updateSelectionState);
      
      // Verificar estado inicial
      updateSelectionState();

      const changeViewport = throttle(
        () => {
          editor.viewportManager.setViewport({
            width: document.body.clientWidth, // Corrigido
            height: document.body.clientHeight - topMargin,
          });
          editor.render();
        },
        10,
        { leading: false },
      );
      window.addEventListener('resize', changeViewport);
      setEditor(editor);

      return () => {
        editor.destroy(); // 注销事件
        window.removeEventListener('resize', changeViewport);
        changeViewport.cancel();
        editor.selectedElements.off('itemsChange', updateSelectionState);
      };
    }
  }, [containerRef]);

  return (
    <div>
      <EditorContext.Provider value={editor}>
        <Header title="Untitled" />
        <div className="body">
          <div ref={containerRef} className="editor-canvas-container" />
          
          <PanelTriggers
            onToggleLayerPanel={() => setIsLayerPanelVisible(true)}
            onToggleInfoPanel={() => setIsInfoPanelVisible(true)}
            isLayerPanelVisible={isLayerPanelVisible}
            isInfoPanelVisible={isInfoPanelVisible}
            hasSelectedElements={hasSelectedElements}
          />

          {isLayerPanelVisible && (
            <FloatingPanel
              title="Layers"
              onClose={() => setIsLayerPanelVisible(false)}
              resizable={true}
              minHeight={200}
              maxHeight={600}
            >
              <LayerPanel />
            </FloatingPanel>
          )}

          {isInfoPanelVisible && hasSelectedElements && (
            <FloatingPanel
              title="Properties"
              style={{ left: 'auto', right: '16px' }}
              onClose={() => setIsInfoPanelVisible(false)}
            >
              <InfoPanel />
            </FloatingPanel>
          )}

          <ContextMenu />
        </div>
      </EditorContext.Provider>
    </div>
  );
};

export default Editor;
