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
