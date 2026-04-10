import { describe, expect, it } from 'vitest';
import { assertAddress, isAddress } from '../src/addresses';
import { ENTRY_FEE } from '../src/constants';
import { createArcadeConfig } from '../src/config';
import { parseTokenUnits } from '../src/units';

describe('addresses isAddress', () => {
  it('accepts valid EVM addresses', () => {
    expect(isAddress('0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0')).toBe(true);
  });
});

describe('addresses assertAddress', () => {
  it('includes custom labels in validation errors', () => {
    expect(() => assertAddress('0x1234', 'fee currency')).toThrow('Invalid fee currency: 0x1234');
  });
});

describe('config createArcadeConfig', () => {
  it('uses the default entry fee when none is provided', () => {
    expect(createArcadeConfig().entryFee).toBe(ENTRY_FEE);
  });

  it('recomputes the default entry fee for custom token decimals', () => {
    expect(createArcadeConfig({ stableTokenDecimals: 18 }).entryFee).toBe(parseTokenUnits('0.01', 18));
  });

  it('rejects invalid MiniPay fee currency addresses', () => {
    expect(() => createArcadeConfig({ miniPayFeeCurrency: '0x1234' as `0x${string}` })).toThrow(
      'Invalid MiniPay fee currency: 0x1234',
    );
  });

  it('trims configured addresses before validating', () => {
    expect(
      createArcadeConfig({
        contractAddress: ' 0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0 ' as `0x${string}`,
      }).contractAddress,
    ).toBe('0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0');
  });
});
