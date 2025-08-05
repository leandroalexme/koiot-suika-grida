/**
 * Editor Settings - Based on Suika's setting system
 * Centralizes all editor-related configuration following Suika patterns
 */

export interface EditorSettings {
  // Resize behavior settings (from Suika setting.ts)
  flipObjectsWhileResizing: boolean;   // Enable/disable flip during resize operations
  
  // Other editor settings (pode expandir no futuro)
  snapToGrid: boolean;                 // Grid snapping
  snapTolerance: number;               // Snap distance tolerance
}

/**
 * Default editor settings matching Suika exactly
 */
export const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
  // Exact values from Suika's packages/core/src/setting.ts
  flipObjectsWhileResizing: true,      // Enable flip by default like Suika
  snapToGrid: false,                   // Disabled by default
  snapTolerance: 5,                    // 5px tolerance
};

/**
 * Editor Settings Manager
 * Simple settings system for editor configuration
 */
export class EditorSettingsManager {
  private settings: EditorSettings;

  constructor(settings: Partial<EditorSettings> = {}) {
    this.settings = { ...DEFAULT_EDITOR_SETTINGS, ...settings };
  }

  get<K extends keyof EditorSettings>(key: K): EditorSettings[K] {
    return this.settings[key];
  }

  set<K extends keyof EditorSettings>(key: K, value: EditorSettings[K]): void {
    this.settings[key] = value;
  }

  getAll(): EditorSettings {
    return { ...this.settings };
  }

  update(settings: Partial<EditorSettings>): void {
    this.settings = { ...this.settings, ...settings };
  }

  // 🎯 Método de conveniência para flip (usado pelos tools)
  isFlipEnabled(): boolean {
    return this.settings.flipObjectsWhileResizing;
  }

  toggleFlip(): void {
    this.settings.flipObjectsWhileResizing = !this.settings.flipObjectsWhileResizing;
  }
}