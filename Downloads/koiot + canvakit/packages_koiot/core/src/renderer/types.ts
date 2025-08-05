export interface IRenderer {
  // Canvas manipulation
  save(): void;
  restore(): void;
  
  // Transform
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  translate(x: number, y: number): void;
  scale(x: number, y: number): void;
  rotate(angle: number): void;
  
  // Drawing
  fillRect(x: number, y: number, width: number, height: number): void;
  strokeRect(x: number, y: number, width: number, height: number): void;
  clearRect(x: number, y: number, width: number, height: number): void;
  
  // Path
  beginPath(): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  rect(x: number, y: number, width: number, height: number): void;
  fill(): void;
  stroke(): void;
  
  // Properties
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  globalAlpha: number;
  
  // Clear background
  clearBackground(color: string, width: number, height: number): void;
  
  // Flush for CanvasKit
  flush(): void;
  
  // Cleanup
  destroy?(): void;
}