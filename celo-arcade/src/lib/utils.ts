export function clampScore(score: number, min = 0, max = 999_999): number {
  return Math.min(max, Math.max(min, Math.trunc(score)));
}
