import { describe, expect, it } from 'vitest';
import { isAddress } from '../src/addresses';

describe('addresses isAddress', () => {
  it('accepts valid EVM addresses', () => {
    expect(isAddress('0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0')).toBe(true);
  });
});
