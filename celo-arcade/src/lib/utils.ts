export function clampScore(score: number, min = 0, max = 999_999): number {
  return Math.min(max, Math.max(min, Math.trunc(score)));
}

export function formatScore(score: number): string {
  return score.toLocaleString('en-US');
}

export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return '0s';
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
