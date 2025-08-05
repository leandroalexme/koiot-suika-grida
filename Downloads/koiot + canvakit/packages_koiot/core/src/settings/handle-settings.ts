/**
 * Handle Settings - Based on Suika's setting system
 * Centralizes all handle-related configuration following Suika patterns
 */

export interface HandleSettings {
  // Transform control handle settings (from Suika setting.ts)
  handleStroke: string;           // Handle border color
  handleFill: string;             // Handle fill color  
  handleStrokeWidth: number;      // Handle border width
  handleSize: number;             // Square handle size (7px in Suika)
  neswHandleWidth: number;        // North/East/South/West handle width (10px in Suika)
}

/**
 * Default handle settings matching Suika exactly
 */
export const DEFAULT_HANDLE_SETTINGS: HandleSettings = {
  // Exact values from Suika's packages/core/src/setting.ts
  handleStroke: '#1592fe',        // Blue border like Suika
  handleFill: '#fcfcfc',          // Almost white fill like Suika  
  handleStrokeWidth: 2,           // 2px border like Suika
  handleSize: 7,                  // 7px size like Suika (not 8!)
  neswHandleWidth: 10,            // 10px width like Suika (not 3!)
};

/**
 * Handle Settings Manager
 * Simple settings system for handle configuration
 */
export class HandleSettingsManager {
  private settings: HandleSettings;

  constructor(settings: Partial<HandleSettings> = {}) {
    this.settings = { ...DEFAULT_HANDLE_SETTINGS, ...settings };
  }

  get<K extends keyof HandleSettings>(key: K): HandleSettings[K] {
    return this.settings[key];
  }

  set<K extends keyof HandleSettings>(key: K, value: HandleSettings[K]): void {
    this.settings[key] = value;
  }

  getAll(): HandleSettings {
    return { ...this.settings };
  }

  update(settings: Partial<HandleSettings>): void {
    this.settings = { ...this.settings, ...settings };
  }
}