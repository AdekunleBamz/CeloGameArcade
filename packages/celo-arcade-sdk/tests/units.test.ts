import { describe, expect, it } from 'vitest';
import { assertDecimals } from '../src/units';

describe('units assertDecimals', () => {
  it('rejects token decimals above eighteen', () => {
    expect(() => assertDecimals(19)).toThrow('Invalid token decimals: 19');
  });
});
