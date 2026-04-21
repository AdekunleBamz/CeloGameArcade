export function clampScore(score: number, min = 0, max = 999_999): number {
  return Math.min(max, Math.max(min, Math.trunc(score)));
}

export function formatScore(score: number): string {
  return score.toLocaleString('en-US');
}
