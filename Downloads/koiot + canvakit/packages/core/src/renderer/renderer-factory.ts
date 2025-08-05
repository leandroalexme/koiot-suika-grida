import { type IRenderer, type ICanvasKitConfig } from './types';
import { CanvasKitRenderer } from './canvaskit-renderer';

/**
 * Factory para criar renderizadores CanvasKit - 100% nativo
 * Carrega e otimiza CanvasKit para máxima performance
 */
export class CanvasKitFactory {
  private static canvasKitCache: any = null;
  private static canvasKitLoadPromise: Promise<any> | null = null;

  /**
   * Cria um renderer CanvasKit nativo - sem fallbacks
   */
  static async createCanvasKitRenderer(
    canvas: HTMLCanvasElement,
    config: ICanvasKitConfig = {}
  ): Promise<IRenderer> {
    console.log('🚀 CanvasKitFactory: Criando renderer nativo');
    console.log('🎯 Canvas:', canvas);
    console.log('🎯 Config:', config);
    
    const {
      enableGPU = true,
      wasmUrl,
    } = config;

    const canvasKit = await this.loadCanvasKit(wasmUrl);
    if (!canvasKit) {
      throw new Error('CanvasKit não pôde ser carregado - nenhum fallback disponível');
    }

    // 🔧 Preparar canvas para CanvasKit
    if (!canvas.id) {
      canvas.id = 'suika-canvaskit-' + Date.now();
      console.log('🔧 Canvas ID criado:', canvas.id);
    }
    
    // 🔍 Aguardar canvas estar no DOM se necessário
    const canvasInDOM = document.getElementById(canvas.id);
    if (!canvasInDOM) {
      console.log('⏳ Aguardando canvas no DOM...');
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    
    console.log('📐 Canvas dimensões:', canvas.width, 'x', canvas.height);

    let surface = null;

    if (enableGPU) {
      // 🚀 Tentar WebGL primeiro (performance máxima)
      console.log('🚀 Tentando WebGL surface...');
      const webglContext = canvas.getContext('webgl') as WebGLRenderingContext | null || 
                          canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
      
      if (webglContext) {
        try {
          surface = canvasKit.MakeCanvasSurface(canvas.id) || canvasKit.MakeCanvasSurface(canvas);
          if (surface) {
            console.log('✅ WebGL surface criada (GPU acelerado)');
          }
        } catch (error) {
          console.warn('⚠️ WebGL surface falhou:', error);
        }
        
        // Limpar contexto de teste
        const loseContext = webglContext.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }
    }

    // 🔄 Fallback para software rendering se WebGL falhou ou foi desabilitado
    if (!surface && canvasKit.MakeSWCanvasSurface) {
      console.log('🔧 Usando software rendering...');
      try {
        surface = canvasKit.MakeSWCanvasSurface(canvas);
        if (surface) {
          console.log('✅ Software surface criada');
        }
      } catch (error) {
        console.error('❌ Software surface falhou:', error);
      }
    }

    if (!surface) {
      throw new Error('Não foi possível criar surface CanvasKit (WebGL e Software falharam)');
    }

    console.log('🎉 CanvasKitRenderer criado com sucesso');
    return new CanvasKitRenderer(canvasKit, surface);
  }

  /**
   * Carrega CanvasKit com cache inteligente
   */
  private static async loadCanvasKit(wasmUrl?: string): Promise<any> {
    // Cache hit - retorna imediatamente
    if (this.canvasKitCache) {
      console.log('⚡ CanvasKit cache hit');
      return this.canvasKitCache;
    }

    // Carregamento em progresso - aguarda
    if (this.canvasKitLoadPromise) {
      console.log('⏳ CanvasKit carregamento em progresso...');
      return this.canvasKitLoadPromise;
    }

    // Inicia novo carregamento
    this.canvasKitLoadPromise = this.doLoadCanvasKit(wasmUrl);
    
    try {
      this.canvasKitCache = await this.canvasKitLoadPromise;
      console.log('✅ CanvasKit carregado e cached');
      return this.canvasKitCache;
    } catch (error) {
      // Reset promise em caso de erro para retry
      this.canvasKitLoadPromise = null;
      throw error;
    }
  }

  /**
   * Carregamento real do CanvasKit com otimizações
   */
  private static async doLoadCanvasKit(wasmUrl?: string): Promise<any> {
    console.log('📦 Iniciando carregamento CanvasKit...');
    
    try {
      console.log('📦 Importando canvaskit-wasm...');
      const CanvasKitInit = await import('canvaskit-wasm');
      
      console.log('⚙️ Inicializando CanvasKit...');
      const canvasKit = wasmUrl 
        ? await CanvasKitInit.default({
            locateFile: (file: string) => wasmUrl.replace('canvaskit.js', file)
          })
        : await CanvasKitInit.default({
            locateFile: (file: string) => {
              // Usar arquivos locais do diretório public
              if (file.endsWith('.wasm')) {
                const url = `/canvaskit/${file}`;
                console.log('🎯 WASM URL:', url);
                return url;
              }
              return file;
            }
          });

      // 🔍 Verificar features disponíveis
      console.log('🔍 CanvasKit features disponíveis:', {
        MakeCanvasSurface: !!canvasKit.MakeCanvasSurface,
        MakeSWCanvasSurface: !!canvasKit.MakeSWCanvasSurface,
        ParagraphBuilder: !!canvasKit.ParagraphBuilder,
        Paint: !!canvasKit.Paint,
        Path: !!canvasKit.Path,
        parseColorString: !!canvasKit.parseColorString
      });
      
      return canvasKit;
      
    } catch (error) {
      console.error('❌ Erro ao carregar CanvasKit:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`CanvasKit falhou ao carregar: ${errorMessage}`);
    }
  }

  /**
   * Verifica se CanvasKit está disponível no ambiente
   */
  static async isCanvasKitAvailable(): Promise<boolean> {
    try {
      await this.loadCanvasKit();
      return true;
    } catch (error) {
      console.warn('❌ CanvasKit não disponível:', error);
      return false;
    }
  }

  /**
   * Pré-carrega CanvasKit para inicialização mais rápida
   */
  static async preloadCanvasKit(wasmUrl?: string): Promise<void> {
    try {
      await this.loadCanvasKit(wasmUrl);
      console.log('✅ CanvasKit pré-carregado com sucesso');
    } catch (error) {
      console.error('❌ Falha no pré-carregamento CanvasKit:', error);
      throw error;
    }
  }

  /**
   * Limpa cache (útil para testes ou reload)
   */
  static clearCache(): void {
    console.log('🧹 Limpando cache CanvasKit');
    this.canvasKitCache = null;
    this.canvasKitLoadPromise = null;
  }

  /**
   * Obtém informações do CanvasKit carregado
   */
  static getCanvasKitInfo(): { loaded: boolean; features?: any } {
    if (!this.canvasKitCache) {
      return { loaded: false };
    }

    return {
      loaded: true,
      features: {
        MakeCanvasSurface: !!this.canvasKitCache.MakeCanvasSurface,
        MakeSWCanvasSurface: !!this.canvasKitCache.MakeSWCanvasSurface,
        ParagraphBuilder: !!this.canvasKitCache.ParagraphBuilder,
        Paint: !!this.canvasKitCache.Paint,
        Path: !!this.canvasKitCache.Path
      }
    };
  }
}

// Export legacy name for backward compatibility during transition
export const RendererFactory = CanvasKitFactory;