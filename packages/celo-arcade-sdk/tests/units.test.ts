import { describe, expect, it } from 'vitest';
import { assertDecimals, formatTokenUnits, parseTokenUnits } from '../src/units';

describe('units assertDecimals', () => {
  it('rejects negative token decimals', () => {
    expect(() => assertDecimals(-1)).toThrow('Invalid token decimals: -1');
  });

  it('rejects token decimals above eighteen', () => {
    expect(() => assertDecimals(19)).toThrow('Invalid token decimals: 19');
  });
});

describe('units parseTokenUnits', () => {
  it('trims surrounding whitespace before parsing', () => {
    expect(parseTokenUnits(' 1.25 ', 6)).toBe(1250000n);
  });

  it('parses fractional amounts without a leading zero', () => {
    expect(parseTokenUnits('.5', 6)).toBe(500000n);
  });

  it('parses amounts with a trailing decimal point', () => {
    expect(parseTokenUnits('1.', 6)).toBe(1000000n);
  });

  it('rejects amounts with too much precision', () => {
    expect(() => parseTokenUnits('1.234', 2)).toThrow(
      'Too many decimal places for 2-decimals token amount: 1.234',
    );
  });

  it('rejects negative bigint values', () => {
    expect(() => parseTokenUnits(-1n, 6)).toThrow('Invalid token amount: -1');
  });
});

describe('units formatTokenUnits', () => {
  it('strips trailing zeros from fractional output', () => {
    expect(formatTokenUnits(1234000n, 6)).toBe('1.234');
  });

  it('preserves negative signs when formatting', () => {
    expect(formatTokenUnits(-250000n, 6)).toBe('-0.25');
  });
});
