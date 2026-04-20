import { describe, expect, it } from 'vitest';
import { assertDecimals, formatTokenUnits, parseTokenUnits } from '../src/units';

describe('units assertDecimals', () => {
  it('rejects negative token decimals', () => {
    expect(() => assertDecimals(-1)).toThrow('Invalid token decimals: -1');
  });

  it('rejects non-integer token decimals', () => {
    expect(() => assertDecimals(6.5)).toThrow('Invalid token decimals: 6.5');
  });

  it('rejects token decimals above eighteen', () => {
    expect(() => assertDecimals(19)).toThrow('Invalid token decimals: 19');
  });
});

describe('units parseTokenUnits', () => {
  it('parses zero amounts safely', () => {
    expect(parseTokenUnits('0', 6)).toBe(0n);
  });

  it('trims surrounding whitespace before parsing', () => {
    expect(parseTokenUnits(' 1.25 ', 6)).toBe(1250000n);
  });

  it('parses fractional amounts without a leading zero', () => {
    expect(parseTokenUnits('.5', 6)).toBe(500000n);
  });

  it('parses numeric inputs directly', () => {
    expect(parseTokenUnits(2.5, 6)).toBe(2500000n);
  });

  it('parses amounts with a trailing decimal point', () => {
    expect(parseTokenUnits('1.', 6)).toBe(1000000n);
  });

  it('rejects amounts with too much precision', () => {
    expect(() => parseTokenUnits('1.234', 2)).toThrow(
      'Too many decimal places for 2-decimals token amount: 1.234',
    );
  });

  it('rejects scientific notation values', () => {
    expect(() => parseTokenUnits('1e2', 6)).toThrow('Invalid token amount: 1e2');
  });

  it('rejects negative bigint values', () => {
    expect(() => parseTokenUnits(-1n, 6)).toThrow('Invalid token amount: -1');
  });

  it('returns bigint inputs unchanged when non-negative', () => {
    expect(parseTokenUnits(2500000n, 6)).toBe(2500000n);
  });
});

describe('units formatTokenUnits', () => {
  it('formats whole numbers when decimals are zero', () => {
    expect(formatTokenUnits(123n, 0)).toBe('123');
  });

  it('strips trailing zeros from fractional output', () => {
    expect(formatTokenUnits(1234000n, 6)).toBe('1.234');
  });

  it('preserves negative signs when formatting', () => {
    expect(formatTokenUnits(-250000n, 6)).toBe('-0.25');
  });
});
