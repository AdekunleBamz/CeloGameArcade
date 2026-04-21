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

export function shortenAddress(address: string, chars = 4): string {
  if (address.length < chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function isValidScoreRange(score: number): boolean {
  return Number.isInteger(score) && score >= 0 && score <= 999_999;
}
