export interface IToolEvent {
  clientX: number;
  clientY: number;
  button?: number;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
}

export interface ITool {
  name: string;
  cursor: string;
  
  onStart?(event: IToolEvent): void;
  onMove?(event: IToolEvent): void;
  onEnd?(event: IToolEvent): void;
  onCancel?(): void;
}

/**
 * 🎯 IBaseTool - Interface para estratégias (como no Suika)
 * Usado para sub-tools/estratégias dentro do SelectTool
 */
export interface IBaseTool {
  onActive(): void;
  onInactive(): void;
  onStart(event: IToolEvent): void;
  onDrag(event: IToolEvent): void;
  onEnd(): void;
  afterEnd(): void;
}