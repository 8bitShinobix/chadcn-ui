/**
 * UI State Store
 * Manages client-side UI state using Zustand
 * Per SRS.md state management specification
 */

// Placeholder - Zustand store will be implemented in Phase 2
// Dependencies: zustand (to be added when implementing theme system)

export type Theme = "light" | "dark" | "system";
export type PreviewViewport = "desktop" | "tablet" | "mobile";

export interface UIState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Command palette
  commandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;

  // Code panel
  codePanelExpanded: boolean;
  codePanelHeight: number;
  toggleCodePanel: () => void;
  setCodePanelHeight: (height: number) => void;

  // Preview
  previewViewport: PreviewViewport;
  previewTheme: Theme;
  setPreviewViewport: (viewport: PreviewViewport) => void;
  setPreviewTheme: (theme: Theme) => void;
}

// Store implementation placeholder
// Will be implemented with Zustand in Phase 2.2
