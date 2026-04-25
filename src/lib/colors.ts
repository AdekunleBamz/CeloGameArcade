/**
 * Shared color palette for Celo Game Arcade.
 */
export const COLORS = {
  brandGreen: '#00ff88',
  brandGreenDark: '#0a6',
  brandYellow: '#ffd700',
  brandYellowDark: '#f80',
  brandRed: '#ff4444',
  brandRedDark: '#c22',
  brandPurple: '#9933ff',
  brandPurpleDark: '#72c',
  bgDark: '#0f0c29',
  bgMid: '#302b63',
  bgLight: '#24243e',
  textPrimary: '#ffffff',
  textSecondary: '#888888',
  textMuted: '#666666',
  borderSubtle: 'rgba(255,255,255,0.1)',
  borderActive: 'rgba(255,255,255,0.3)',
} as const

/**
 * Type-safe color key accessor with fallback.
 * @param key - Color key from COLORS object.
 * @param fallback - Fallback color if key doesn't exist.
 */
export function getColor(key: keyof typeof COLORS, fallback = '#ffffff'): string {
  return COLORS[key] ?? fallback
}
