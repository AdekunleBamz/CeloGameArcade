import { describe, expect, it } from 'vitest';
import { assertAddress, isAddress } from '../src/addresses';
import { DEFAULT_STABLE_TOKEN_SYMBOL, ENTRY_FEE } from '../src/constants';
import { createArcadeConfig } from '../src/config';
import { parseTokenUnits } from '../src/units';

describe('addresses isAddress', () => {
  it('accepts valid EVM addresses', () => {
    expect(isAddress('0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0')).toBe(true);
  });

  it('rejects addresses without the 0x prefix', () => {
    expect(isAddress('D3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0')).toBe(false);
  });

  it('accepts valid addresses with surrounding whitespace', () => {
    expect(isAddress(' 0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0 ')).toBe(true);
  });
});

describe('addresses assertAddress', () => {
  it('uses the default label in validation errors', () => {
    expect(() => assertAddress('0x1234')).toThrow('Invalid address: 0x1234');
  });

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

  it('trims stable token addresses before validating', () => {
    expect(
      createArcadeConfig({
        stableTokenAddress: ' 0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0 ' as `0x${string}`,
      }).stableTokenAddress,
    ).toBe('0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0');
  });

  it('falls back to the default symbol when the override is blank', () => {
    expect(createArcadeConfig({ stableTokenSymbol: '   ' }).stableTokenSymbol).toBe(
      DEFAULT_STABLE_TOKEN_SYMBOL,
    );
  });

  it('rejects invalid decimals even when entry fee is overridden', () => {
    expect(() =>
      createArcadeConfig({
        stableTokenDecimals: 19,
        entryFee: 1n,
      }),
    ).toThrow('Invalid token decimals: 19');
  });

  it('rejects negative entry fee overrides', () => {
    expect(() => createArcadeConfig({ entryFee: -1n })).toThrow('Entry fee cannot be negative');
  });

  it('rejects non-bigint entry fee overrides at runtime', () => {
    expect(() =>
      createArcadeConfig({
        entryFee: 1 as unknown as bigint,
      }),
    ).toThrow('Entry fee must be a bigint amount in token base units');
  });
});
