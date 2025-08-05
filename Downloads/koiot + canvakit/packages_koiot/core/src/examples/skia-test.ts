import { KoiotEditor } from '../editor';
import { Rectangle } from '../graphics';

/**
 * Teste básico do sistema Skia nativo
 * Este arquivo demonstra como usar o novo KoiotCanvas com API nativa do Skia
 */
export async function testSkiaRendering(): Promise<void> {
  // 1. Cria container para o editor
  const container = document.createElement('div');
  container.style.width = '800px';
  container.style.height = '600px';
  container.style.border = '1px solid #ccc';
  document.body.appendChild(container);

  // 2. Inicializa o editor com KoiotCanvas
  const editor = new KoiotEditor({
    container: container,
    canvasKitConfig: {
      locateFile: (file: string) => {
        if (file.endsWith('.wasm')) {
          return `/canvaskit/${file}`;
        }
        return file;
      }
    }
  });

  // 3. Aguarda inicialização
  await new Promise<void>((resolve) => {
    editor.on('ready', () => {
      console.log('✅ Editor inicializado com sucesso!');
      resolve();
    });
  });

  // 4. Cria um retângulo de teste usando API nativa
  const testRect = new Rectangle({
    x: 100,
    y: 100,
    width: 200,
    height: 150,
    fill: '#ff6b6b',  // Vermelho claro
    stroke: '#4ecdc4', // Verde água
    strokeWidth: 3,
    visible: true,
    id: 'test-rect-skia'
  });

  // 5. Adiciona à cena
  const sceneManager = editor.getSceneManager();
  sceneManager.addGraphics(testRect);

  // 6. Log de sucesso
  console.log('🎨 Retângulo criado usando API nativa do Skia!');
  console.log('📍 Posição:', { x: testRect.attrs.x, y: testRect.attrs.y });
  console.log('📏 Dimensões:', { width: testRect.attrs.width, height: testRect.attrs.height });
  console.log('🎨 Cores:', { fill: testRect.attrs.fill, stroke: testRect.attrs.stroke });

  return;
}

/**
 * Função utilitária para testar diferentes cenários
 */
export function createTestScenarios(editor: KoiotEditor): void {
  const sceneManager = editor.getSceneManager();

  // Cenário 1: Retângulos coloridos
  const colors = [
    { fill: '#ff9999', stroke: '#ff0000' }, // Vermelho
    { fill: '#99ff99', stroke: '#00ff00' }, // Verde  
    { fill: '#9999ff', stroke: '#0000ff' }, // Azul
    { fill: '#ffff99', stroke: '#ffff00' }, // Amarelo
  ];

  colors.forEach((color, index) => {
    const rect = new Rectangle({
      x: 50 + (index * 180),
      y: 50,
      width: 150,
      height: 100,
      fill: color.fill,
      stroke: color.stroke,
      strokeWidth: 2,
      visible: true,
      id: `test-rect-${index}`
    });
    
    sceneManager.addGraphics(rect);
  });

  // Cenário 2: Retângulos sobrepostos (teste de transparência)
  for (let i = 0; i < 5; i++) {
    const rect = new Rectangle({
      x: 300 + (i * 20),
      y: 200 + (i * 20),
      width: 100,
      height: 100,
      fill: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`,
      stroke: '#000000',
      strokeWidth: 1,
      visible: true,
      id: `overlap-rect-${i}`
    });
    
    sceneManager.addGraphics(rect);
  }

  console.log('🧪 Cenários de teste criados com sucesso!');
}

// Exporta para uso global no navegador
(window as any).testSkiaRendering = testSkiaRendering;
(window as any).createTestScenarios = createTestScenarios;