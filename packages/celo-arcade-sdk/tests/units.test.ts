import { describe, expect, it } from 'vitest';
import { assertDecimals, parseTokenUnits } from '../src/units';

describe('units assertDecimals', () => {
  it('rejects token decimals above eighteen', () => {
    expect(() => assertDecimals(19)).toThrow('Invalid token decimals: 19');
  });
});

describe('units parseTokenUnits', () => {
  it('trims surrounding whitespace before parsing', () => {
    expect(parseTokenUnits(' 1.25 ', 6)).toBe(1250000n);
  });
});
