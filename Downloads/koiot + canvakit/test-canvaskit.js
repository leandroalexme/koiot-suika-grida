// 🧪 TESTE MANUAL CANVASKIT
console.log('=== TESTE MANUAL CANVASKIT ===');

// Teste 1: Verificar se o module está disponível
console.log('🔍 Teste 1: Verificando disponibilidade do módulo...');

import('canvaskit-wasm')
  .then((CanvasKitInit) => {
    console.log('✅ Módulo canvaskit-wasm carregado');
    console.log('🔍 CanvasKitInit:', CanvasKitInit);
    
    // Teste 2: Inicializar CanvasKit
    console.log('🔍 Teste 2: Inicializando CanvasKit...');
    return CanvasKitInit.default();
  })
  .then((canvasKit) => {
    console.log('✅ CanvasKit inicializado!');
    console.log('🔍 CanvasKit object:', canvasKit);
    
    // Teste 3: Verificar recursos principais
    console.log('🔍 Teste 3: Verificando recursos...');
    console.log('- MakeCanvasSurface:', !!canvasKit.MakeCanvasSurface);
    console.log('- MakeSWCanvasSurface:', !!canvasKit.MakeSWCanvasSurface);
    console.log('- ParagraphBuilder:', !!canvasKit.ParagraphBuilder);
    console.log('- FontMgr:', !!canvasKit.FontMgr);
    
    // Teste 4: Tentar criar surface em canvas existente
    console.log('🔍 Teste 4: Tentando criar surface...');
    
    const canvas = document.querySelector('canvas');
    if (canvas) {
      console.log('✅ Canvas encontrado:', canvas);
      
      // Tentar WebGL
      const surface = canvasKit.MakeCanvasSurface(canvas);
      if (surface) {
        console.log('🚀 SUCESSO! Surface WebGL criada');
        
        // Teste básico de desenho
        const skcanvas = surface.getCanvas();
        skcanvas.clear(canvasKit.Color(255, 0, 0, 1)); // Vermelho
        surface.flush();
        
        console.log('🎨 Teste de desenho (fundo vermelho) executado');
        
        // Limpar teste
        setTimeout(() => {
          skcanvas.clear(canvasKit.Color(255, 255, 255, 1)); // Branco
          surface.flush();
          console.log('🧹 Teste limpo');
        }, 2000);
        
      } else {
        console.log('⚠️ WebGL surface falhou, tentando software...');
        
        if (canvasKit.MakeSWCanvasSurface) {
          const swSurface = canvasKit.MakeSWCanvasSurface(canvas);
          if (swSurface) {
            console.log('✅ Software surface criada');
          } else {
            console.log('❌ Software surface também falhou');
          }
        } else {
          console.log('❌ Software rendering não disponível');
        }
      }
    } else {
      console.log('❌ Canvas não encontrado no DOM');
    }
    
    return { success: true, canvasKit };
  })
  .catch((error) => {
    console.error('❌ TESTE FALHOU:', error);
    return { success: false, error };
  })
  .then((result) => {
    console.log('🏁 RESULTADO FINAL:', result);
  });

console.log('⏳ Teste em execução...');