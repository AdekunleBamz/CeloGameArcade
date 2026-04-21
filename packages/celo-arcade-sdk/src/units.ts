export function assertDecimals(decimals: number) {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 18) {
    throw new Error(`Invalid token decimals: ${decimals}`);
  }
}

export function parseTokenUnits(value: string | number | bigint, decimals: number): bigint {
  assertDecimals(decimals);

  if (typeof value === 'bigint') {
    if (value < 0n) {
      throw new Error(`Invalid token amount: ${value.toString()}`);
    }
    return value;
  }

  const normalized = String(value).trim();
  if (!/^(\d+(\.\d*)?|\.\d+)$/.test(normalized)) {
    throw new Error(`Invalid token amount: ${normalized}`);
  }

  const [wholePart, fraction = ''] = normalized.split('.');
  const whole = wholePart === '' ? '0' : wholePart;
  if (fraction.length > decimals) {
    throw new Error(`Too many decimal places for ${decimals}-decimals token amount: ${normalized}`);
  }

  return BigInt(`${whole}${fraction.padEnd(decimals, '0')}`);
}

export function formatTokenUnits(value: bigint, decimals: number): string {
  assertDecimals(decimals);

  const zero = BigInt(0);
  const negative = value < zero;
  const absolute = negative ? -value : value;
  const divisor = BigInt(`1${'0'.repeat(decimals)}`);
  const whole = absolute / divisor;
  const fraction = (absolute % divisor).toString().padStart(decimals, '0').replace(/0+$/, '');
  const formatted = fraction ? `${whole.toString()}.${fraction}` : whole.toString();

  return negative ? `-${formatted}` : formatted;
}

export function toTokenDivisor(decimals: number): bigint {
  assertDecimals(decimals);
  return BigInt(`1${'0'.repeat(decimals)}`);
}

export function isValidTokenAmountString(value: string): boolean {
  const normalizedValue = String(value).trim();
  return /^(\d+(\.\d*)?|\.\d+)$/.test(normalizedValue);
}

export function clampDecimals(decimals: number, min = 0, max = 18): number {
  const normalizedMin = Math.min(min, max);
  const normalizedMax = Math.max(min, max);
  if (!Number.isFinite(decimals)) return normalizedMin;
  return Math.min(normalizedMax, Math.max(normalizedMin, Math.trunc(decimals)));
}

export function parseIntegerUnits(value: string | number | bigint): bigint {
  const normalizedValue = typeof value === 'bigint' ? value.toString() : String(value).trim();
  if (!/^\d+$/.test(normalizedValue)) {
    throw new Error(`Invalid integer token amount: ${normalizedValue}`);
  }
  return BigInt(normalizedValue);
}

export function tryParseTokenUnits(
  value: string | number | bigint,
  decimals: number,
): bigint | null {
  try {
    return parseTokenUnits(value, decimals);
  } catch {
    return null;
  }
}

export function isZeroAmount(value: bigint): boolean {
  return value === 0n;
}

export function formatTokenDisplay(value: bigint, decimals: number, symbol: string): string {
  return `${formatTokenUnits(value, decimals)} ${symbol}`;
}

export function isPositiveAmount(value: bigint): boolean {
  return value > 0n;
}

export function clampBigInt(value: bigint, min: bigint, max: bigint): bigint {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function addBigInt(a: bigint, b: bigint): bigint {
  return a + b;
}

export function subBigIntSafe(a: bigint, b: bigint): bigint {
  return a > b ? a - b : 0n;
}

export function mulBigIntBps(value: bigint, bps: number, totalBps = 10_000): bigint {
  return (value * BigInt(bps)) / BigInt(totalBps);
}

export function scaleBigInt(value: bigint, numerator: number, denominator: number): bigint {
  if (denominator === 0) throw new Error('scaleBigInt: denominator cannot be zero');
  return (value * BigInt(numerator)) / BigInt(denominator);
}

export function formatPercent(bps: number): string {
  return `${(bps / 100).toFixed(2)}%`;
}

export function divBigIntSafe(a: bigint, b: bigint): bigint {
  if (b === 0n) return 0n;
  return a / b;
}
