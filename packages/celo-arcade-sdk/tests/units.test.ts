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

  it('accepts leading decimal token amount text', () => {
    expect(isValidTokenAmountString('.25')).toBe(true);
  });

  it('trims token amount text before validating', () => {
    expect(isValidTokenAmountString(' 1.25 ')).toBe(true);
  });

  it('rejects negative token amount text', () => {
    expect(isValidTokenAmountString('-1')).toBe(false);
  });

  it('rejects scientific notation amount text', () => {
    expect(isValidTokenAmountString('1e2')).toBe(false);
  });
});

describe('units clampDecimals', () => {
  it('truncates fractional decimal values', () => {
    expect(clampDecimals(6.9)).toBe(6);
  });

  it('clamps decimals below the minimum', () => {
    expect(clampDecimals(-2)).toBe(0);
  });

  it('clamps decimals above the maximum', () => {
    expect(clampDecimals(30)).toBe(18);
  });

  it('uses the minimum for non-finite decimals', () => {
    expect(clampDecimals(Number.NaN)).toBe(0);
  });

  it('honors custom decimal bounds', () => {
    expect(clampDecimals(2, 4, 8)).toBe(4);
  });
});

describe('units parseIntegerUnits', () => {
  it('parses integer strings', () => {
    expect(parseIntegerUnits('123')).toBe(123n);
  });

  it('parses integer numbers', () => {
    expect(parseIntegerUnits(456)).toBe(456n);
  });

  it('parses integer bigints', () => {
    expect(parseIntegerUnits(789n)).toBe(789n);
  });

  it('rejects decimal integer unit strings', () => {
    expect(() => parseIntegerUnits('1.5')).toThrow('Invalid integer token amount: 1.5');
  });

  it('rejects negative integer unit strings', () => {
    expect(() => parseIntegerUnits('-1')).toThrow('Invalid integer token amount: -1');
  });
});

describe('units tryParseTokenUnits', () => {
  it('returns parsed units for valid token amounts', () => {
    expect(tryParseTokenUnits('2.5', 6)).toBe(2_500_000n);
  });

  it('returns null for invalid token amounts', () => {
    expect(tryParseTokenUnits('bad', 6)).toBeNull();
  });
});

describe('units isZeroAmount', () => {
  it('detects zero amounts', () => {
    expect(isZeroAmount(0n)).toBe(true);
  });

  it('rejects non-zero amounts', () => {
    expect(isZeroAmount(1n)).toBe(false);
  });
});

describe('units formatTokenDisplay', () => {
  it('appends token symbols to formatted amounts', () => {
    expect(formatTokenDisplay(1_250_000n, 6, 'USDT')).toBe('1.25 USDT');
  });
});

describe('units isPositiveAmount', () => {
  it('accepts positive amounts', () => {
    expect(isPositiveAmount(1n)).toBe(true);
  });

  it('rejects zero as a positive amount', () => {
    expect(isPositiveAmount(0n)).toBe(false);
  });
});

describe('units clampBigInt', () => {
  it('raises values below the minimum', () => {
    expect(clampBigInt(-2n, 0n, 10n)).toBe(0n);
  });

  it('lowers values above the maximum', () => {
    expect(clampBigInt(12n, 0n, 10n)).toBe(10n);
  });

  it('keeps values already inside bounds', () => {
    expect(clampBigInt(5n, 0n, 10n)).toBe(5n);
  });
});

describe('units addBigInt', () => {
  it('adds bigint values', () => {
    expect(addBigInt(2n, 3n)).toBe(5n);
  });
});

describe('units subBigIntSafe', () => {
  it('subtracts when the result stays positive', () => {
    expect(subBigIntSafe(5n, 3n)).toBe(2n);
  });

  it('floors negative subtraction results at zero', () => {
    expect(subBigIntSafe(3n, 5n)).toBe(0n);
  });
});

describe('units mulBigIntBps', () => {
  it('applies basis-point multipliers', () => {
    expect(mulBigIntBps(1_000n, 2500)).toBe(250n);
  });
});

describe('units scaleBigInt', () => {
  it('scales bigint values by a fraction', () => {
    expect(scaleBigInt(100n, 3, 2)).toBe(150n);
  });

  it('rejects zero denominators', () => {
    expect(() => scaleBigInt(100n, 1, 0)).toThrow('scaleBigInt: denominator cannot be zero');
  });
});
