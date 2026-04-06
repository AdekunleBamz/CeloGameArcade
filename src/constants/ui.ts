/**
 * UI Configuration Constants
 * Centralized constants for consistent styling across the application.
 */

/** Color palette used throughout the application */
export const COLORS = {
  primary: '#00ff88',
  primaryDark: '#00aa55',
  secondary: '#ffd700',
  error: '#ff4444',
  bgDark: '#0f0c29',
  bgMid: '#302b63',
  bgLight: '#24243e',
  text: '#ffffff',
  textMuted: '#888888',
} as const;

/** Spacing scale in pixels */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

/** Border radius values in pixels */
export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

/** Font sizes in pixels */
export const FONT_SIZES = {
  xs: 10,
  sm: 11,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 36,
} as const;

/** Z-index layers for stacking context */
export const Z_INDEX = {
  base: 1,
  dropdown: 100,
  modal: 200,
  toast: 300,
  tooltip: 400,
} as const;