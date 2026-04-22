import { describe, expect, it } from 'vitest';
import {
  addBigInt,
  assertDecimals,
  clampBigInt,
  clampDecimals,
  divBigIntSafe,
  formatPercent,
  formatTokenDisplay,
  formatTokenUnits,
  isPositiveAmount,
  isValidTokenAmountString,
  isZeroAmount,
  mulBigIntBps,
  parseIntegerUnits,
  parseTokenUnits,
  scaleBigInt,
  subBigIntSafe,
  toTokenDivisor,
  tryParseTokenUnits,
} from '../src/units';

describe('units assertDecimals', () => {
  it('accepts zero token decimals', () => {
    expect(() => assertDecimals(0)).not.toThrow();
  });

  it('accepts eighteen token decimals', () => {
    expect(() => assertDecimals(18)).not.toThrow();
  });

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

  it('parses whole amounts when decimals are zero', () => {
    expect(parseTokenUnits('12', 0)).toBe(12n);
  });

  it('preserves leading zero amounts during parsing', () => {
    expect(parseTokenUnits('0001.50', 6)).toBe(1500000n);
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

  it('rejects fractional input for zero-decimal tokens', () => {
    expect(() => parseTokenUnits('1.1', 0)).toThrow(
      'Too many decimal places for 0-decimals token amount: 1.1',
    );
  });

  it('rejects scientific notation values', () => {
    expect(() => parseTokenUnits('1e2', 6)).toThrow('Invalid token amount: 1e2');
  });

  it('rejects comma-formatted amount strings', () => {
    expect(() => parseTokenUnits('1,000', 6)).toThrow('Invalid token amount: 1,000');
  });

  it('rejects blank amount strings', () => {
    expect(() => parseTokenUnits('   ', 6)).toThrow('Invalid token amount:');
  });

  it('rejects negative amount strings', () => {
    expect(() => parseTokenUnits('-1', 6)).toThrow('Invalid token amount: -1');
  });

  it('rejects negative bigint values', () => {
    expect(() => parseTokenUnits(-1n, 6)).toThrow('Invalid token amount: -1');
  });

  it('returns bigint inputs unchanged when non-negative', () => {
    expect(parseTokenUnits(2500000n, 6)).toBe(2500000n);
  });
});

describe('units formatTokenUnits', () => {
  it('formats zero values with token decimals', () => {
    expect(formatTokenUnits(0n, 6)).toBe('0');
  });

  it('formats whole numbers when decimals are zero', () => {
    expect(formatTokenUnits(123n, 0)).toBe('123');
  });

  it('omits fractional output when remainder is zero', () => {
    expect(formatTokenUnits(2000000n, 6)).toBe('2');
  });

  it('strips trailing zeros from fractional output', () => {
    expect(formatTokenUnits(1234000n, 6)).toBe('1.234');
  });

  it('formats tiny fractional values without trimming significant zeros', () => {
    expect(formatTokenUnits(1n, 6)).toBe('0.000001');
  });

  it('preserves negative signs when formatting', () => {
    expect(formatTokenUnits(-250000n, 6)).toBe('-0.25');
  });
});

describe('units toTokenDivisor', () => {
  it('returns one for zero-decimal tokens', () => {
    expect(toTokenDivisor(0)).toBe(1n);
  });

  it('returns a million for six-decimal tokens', () => {
    expect(toTokenDivisor(6)).toBe(1_000_000n);
  });
});

describe('units isValidTokenAmountString', () => {
  it('accepts whole-number token amount text', () => {
    expect(isValidTokenAmountString('100')).toBe(true);
  });
});
