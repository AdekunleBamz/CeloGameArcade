import { describe, expect, it } from 'vitest';
import { assertDecimals, formatTokenUnits, parseTokenUnits } from '../src/units';

describe('units assertDecimals', () => {
  it('rejects token decimals above eighteen', () => {
    expect(() => assertDecimals(19)).toThrow('Invalid token decimals: 19');
  });
});

describe('units parseTokenUnits', () => {
  it('trims surrounding whitespace before parsing', () => {
    expect(parseTokenUnits(' 1.25 ', 6)).toBe(1250000n);
  });

  it('rejects amounts with too much precision', () => {
    expect(() => parseTokenUnits('1.234', 2)).toThrow(
      'Too many decimal places for 2-decimals token amount: 1.234',
    );
  });
});

describe('units formatTokenUnits', () => {
  it('strips trailing zeros from fractional output', () => {
    expect(formatTokenUnits(1234000n, 6)).toBe('1.234');
  });
});
