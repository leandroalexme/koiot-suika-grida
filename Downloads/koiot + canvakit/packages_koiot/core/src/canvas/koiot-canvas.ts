import type { CanvasKit, Surface, Canvas } from 'canvaskit-wasm';

/**
 * KoiotCanvas - Wrapper limpo para CanvasKit
 * 
 * Esta classe é 100% responsável por lidar com o CanvasKit de forma nativa.
 * NÃO tenta simular Canvas 2D - usa diretamente a API do Skia.
 * 
 * Responsabilidades:
 * - Inicializar o CanvasKit/Skia
 * - Gerenciar a SkSurface
 * - Fornecer acesso ao SkCanvas
 * - Gerenciar o ciclo de renderização (clear/flush)
 */
export class KoiotCanvas {
  private canvasId: string;
  private surface: Surface | null = null;
  private canvasKit: CanvasKit | null = null;
  
  constructor(canvasId: string) {
    this.canvasId = canvasId;
  }
  
  /**
   * Inicializa o CanvasKit de forma assíncrona
   * Deve ser chamado antes de usar qualquer outro método
   */
  async init(): Promise<void> {
    try {
      // 1. Carrega o CanvasKit-WASM
      const CanvasKitInit = (await import('canvaskit-wasm')).default;
      this.canvasKit = await CanvasKitInit({
        locateFile: (file: string) => {
          // Ajusta o path para encontrar o canvaskit.wasm
          if (file.endsWith('.wasm')) {
            return `/canvaskit/${file}`;
          }
          return file;
        }
      });
      
      // 2. Cria a superfície Skia associada ao canvas HTML
      this.surface = this.canvasKit.MakeCanvasSurface(this.canvasId);
      
      if (!this.surface) {
        throw new Error(`Falha ao criar SkSurface para o canvas: ${this.canvasId}`);
      }
      
      console.log('✅ KoiotCanvas inicializado com sucesso');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar KoiotCanvas:', error);
      throw error;
    }
  }
  
  /**
   * Retorna o Canvas da superfície
   * Este é o objeto que será usado para desenhar
   */
  getCanvas(): Canvas {
    if (!this.surface) {
      throw new Error('KoiotCanvas não foi inicializado. Chame init() primeiro.');
    }
    return this.surface.getCanvas();
  }
  
  /**
   * Retorna a instância do CanvasKit
   * Necessário para criar objetos Skia (Paint, Path, etc.)
   */
  getCanvasKit(): CanvasKit {
    if (!this.canvasKit) {
      throw new Error('KoiotCanvas não foi inicializado. Chame init() primeiro.');
    }
    return this.canvasKit;
  }
  
  /**
   * Limpa o canvas com uma cor de fundo
   * @param color - Cor em formato RGBA (opcional, padrão: branco)
   */
  clear(color?: number[]): void {
    if (!this.canvasKit || !this.surface) {
      throw new Error('KoiotCanvas não foi inicializado. Chame init() primeiro.');
    }
    
    const canvas = this.getCanvas();
    
    if (color && color.length >= 3) {
      // Usa a cor fornecida
      const skColor = this.canvasKit.Color(
        Math.floor(color[0] * 255), 
        Math.floor(color[1] * 255), 
        Math.floor(color[2] * 255), 
        color[3] !== undefined ? color[3] : 1.0
      );
      canvas.clear(skColor);
    } else {
      // Usa branco como padrão
      canvas.clear(this.canvasKit.WHITE);
    }
  }
  
  /**
   * "Commita" os desenhos para a tela
   * Deve ser chamado após todos os desenhos de um frame
   */
  flush(): void {
    if (!this.surface) {
      throw new Error('KoiotCanvas não foi inicializado. Chame init() primeiro.');
    }
    this.surface.flush();
  }
  
  /**
   * Obtém as dimensões do canvas
   */
  getDimensions(): { width: number; height: number } {
    const canvasElement = document.getElementById(this.canvasId) as HTMLCanvasElement;
    if (!canvasElement) {
      throw new Error(`Canvas element não encontrado: ${this.canvasId}`);
    }
    
    return {
      width: canvasElement.width,
      height: canvasElement.height
    };
  }
  
  /**
   * Redimensiona o canvas e recria a superfície se necessário
   */
  resize(width: number, height: number): void {
    const canvasElement = document.getElementById(this.canvasId) as HTMLCanvasElement;
    if (!canvasElement) {
      throw new Error(`Canvas element não encontrado: ${this.canvasId}`);
    }
    
    // Atualiza o elemento HTML
    canvasElement.width = width;
    canvasElement.height = height;
    
    // Recria a superfície se necessário
    if (this.canvasKit && this.surface) {
      this.surface.delete(); // Limpa a superfície antiga
      this.surface = this.canvasKit.MakeCanvasSurface(this.canvasId);
      
      if (!this.surface) {
        throw new Error('Falha ao recriar SkSurface após redimensionamento');
      }
    }
  }
  
  /**
   * Limpa recursos e destrói objetos Skia
   * Importante para evitar vazamentos de memória
   */
  destroy(): void {
    if (this.surface) {
      this.surface.delete();
      this.surface = null;
    }
    
    // CanvasKit em si não precisa ser destruído explicitamente
    this.canvasKit = null;
    
    console.log('🧹 KoiotCanvas destruído');
  }
}