/**
 * Shared animation timing constants.
 */
export const ANIMATIONS = {
  fast: '0.05s',
  normal: '0.15s',
  slow: '0.3s',
  easing: 'ease-out',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

/**
 * Converts animation time string to milliseconds.
 * @param time - Animation time constant from ANIMATIONS.
 * @returns Duration in milliseconds.
 */
export function getAnimationMs(time: keyof typeof ANIMATIONS): number {
  const ms = ANIMATIONS[time]
  if (time === 'easing' || time === 'spring') return 0
  return parseInt(ms) * 1000
}
