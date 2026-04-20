import type { Address } from './types';

export function isAddress(value: string): value is Address {
  const normalizedValue = typeof value === 'string' ? value.trim() : '';
  return /^0x[a-fA-F0-9]{40}$/.test(normalizedValue);
}

export function assertAddress(value: string, label = 'address'): asserts value is Address {
  if (!isAddress(value)) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
}

export function isZeroAddress(value: string): boolean {
  return value.trim().toLowerCase() === '0x0000000000000000000000000000000000000000';
}

export function normalizeAddress(value: string): string {
  return value.trim().toLowerCase();
}

export function isSameAddress(a: string, b: string): boolean {
  if (!a || !b) return false;
  return normalizeAddress(a) === normalizeAddress(b);
}

export function parseAddress(value: string, label = 'address'): Address {
  const trimmedValue = value.trim();
  assertAddress(trimmedValue, label);
  return trimmedValue;
}

export function isHexString(value: string): boolean {
  const normalizedValue = typeof value === 'string' ? value.trim() : '';
  return /^0x[a-fA-F0-9]+$/.test(normalizedValue);
}

export function truncateAddress(value: string, start = 6, end = 4): string {
  const normalizedValue = value.trim();
  if (normalizedValue.length <= start + end) return normalizedValue;
  return `${normalizedValue.slice(0, start)}...${normalizedValue.slice(-end)}`;
}
