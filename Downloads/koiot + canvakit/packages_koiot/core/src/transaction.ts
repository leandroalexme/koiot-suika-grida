import { IGraphicsAttrs } from './graphics/types';

interface TransactionRecord {
  id: string;
  before: Partial<IGraphicsAttrs>;
  after: Partial<IGraphicsAttrs>;
}

/**
 * 🎯 Transaction - Sistema básico de undo/redo (como no Suika)
 * Permite reverter operações de transformação
 */
export class Transaction {
  private records = new Map<string, TransactionRecord>();
  private isRecording = false;

  constructor() {}

  /**
   * Iniciar uma nova transação
   */
  start(): void {
    this.records.clear();
    this.isRecording = true;
  }

  /**
   * Registrar mudança em um gráfico
   */
  record(id: string, before: Partial<IGraphicsAttrs>, after: Partial<IGraphicsAttrs>): void {
    if (!this.isRecording) return;

    this.records.set(id, {
      id,
      before,
      after
    });
  }

  /**
   * Finalizar transação
   */
  commit(): void {
    this.isRecording = false;
    // Em uma implementação completa, aqui adicionaríamos ao histórico de undo
    console.log('🎯 Transaction committed with', this.records.size, 'changes');
  }

  /**
   * Cancelar transação
   */
  rollback(): void {
    this.isRecording = false;
    this.records.clear();
  }

  /**
   * Verificar se está gravando
   */
  isActive(): boolean {
    return this.isRecording;
  }

  /**
   * Obter mudanças registradas
   */
  getChanges(): TransactionRecord[] {
    return Array.from(this.records.values());
  }
}