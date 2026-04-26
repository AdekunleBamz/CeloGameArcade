import { describe, expect, it } from 'vitest';
import {
  assertAddress,
  getAddressShort,
  isAddress,
  isHexString,
  isSameAddress,
  isZeroAddress,
  normalizeAddress,
  parseAddress,
  truncateAddress,
} from '../src/addresses';
import { DEFAULT_STABLE_TOKEN_SYMBOL, ENTRY_FEE } from '../src/constants';
import { createArcadeConfig, getDefaultEntryFee, isArcadeConfig, resolveStableTokenSymbol } from '../src/config';
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

  it('rejects addresses with uppercase prefixes', () => {
    expect(isAddress('0XD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0')).toBe(false);
  });
});

describe('addresses assertAddress', () => {
  it('accepts valid addresses with surrounding whitespace', () => {
    expect(() => assertAddress(' 0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0 ')).not.toThrow();
  });

  it('uses the default label in validation errors', () => {
    expect(() => assertAddress('0x1234')).toThrow('Invalid address: 0x1234');
  });

  it('includes custom labels in validation errors', () => {
    expect(() => assertAddress('0x1234', 'fee currency')).toThrow('Invalid fee currency: 0x1234');
  });
});

describe('addresses isZeroAddress', () => {
  it('detects zero addresses with whitespace and casing', () => {
    expect(isZeroAddress('  0X0000000000000000000000000000000000000000  ')).toBe(true);
  });
});

describe('addresses normalizeAddress', () => {
  it('trims and lowercases addresses', () => {
    expect(normalizeAddress('  0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0  ')).toBe(
      '0xd3cb0357edf92e1056cfbc3dc5cc1da52846ddb0',
    );
  });
});

describe('addresses isSameAddress', () => {
  it('matches addresses ignoring casing', () => {
    expect(
      isSameAddress(
        '0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0',
        '0xd3cb0357edf92e1056cfbc3dc5cc1da52846ddb0',
      ),
    ).toBe(true);
  });

  it('rejects blank address comparisons', () => {
    expect(isSameAddress('', '0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0')).toBe(false);
  });
});

describe('addresses parseAddress', () => {
  it('trims valid parsed addresses', () => {
    expect(parseAddress('  0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0  ')).toBe(
      '0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0',
    );
  });

  it('uses custom labels in parse errors', () => {
    expect(() => parseAddress('0x1234', 'player')).toThrow('Invalid player: 0x1234');
  });
});

describe('addresses isHexString', () => {
  it('accepts prefixed hexadecimal strings', () => {
    expect(isHexString('0xabc123')).toBe(true);
  });

  it('accepts whitespace-padded hex strings after trimming', () => {
    expect(isHexString('  0xabc123  ')).toBe(true);
  });

  it('rejects empty hex payloads', () => {
    expect(isHexString('0x')).toBe(false);
  });
});

describe('addresses truncateAddress', () => {
  it('leaves short values unchanged', () => {
    expect(truncateAddress('0x1234', 4, 4)).toBe('0x1234');
  });

  it('trims short values before returning them', () => {
    expect(truncateAddress('  0x1234  ', 4, 4)).toBe('0x1234');
  });

  it('uses custom truncation windows for long values', () => {
    expect(truncateAddress('0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0', 8, 6)).toBe(
      '0xD3Cb03...46DDB0',
    );
  });
});

describe('addresses getAddressShort', () => {
  it('uses the standard short address format', () => {
    expect(getAddressShort('0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0')).toBe('0xD3Cb...DDB0');
  });

  it('trims addresses before shortening', () => {
    expect(getAddressShort('  0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0  ')).toBe('0xD3Cb...DDB0');
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

  it('rejects invalid contract address overrides', () => {
    expect(() => createArcadeConfig({ contractAddress: '0x1234' as `0x${string}` })).toThrow(
      'Invalid contract address: 0x1234',
    );
  });

  it('trims MiniPay fee currency addresses before validating', () => {
    expect(
      createArcadeConfig({
        miniPayFeeCurrency: ' 0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0 ' as `0x${string}`,
      }).miniPayFeeCurrency,
    ).toBe('0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0');
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

  it('rejects invalid stable token address overrides', () => {
    expect(() => createArcadeConfig({ stableTokenAddress: '0x1234' as `0x${string}` })).toThrow(
      'Invalid stable token address: 0x1234',
    );
  });

  it('falls back to the default symbol when the override is blank', () => {
    expect(createArcadeConfig({ stableTokenSymbol: '   ' }).stableTokenSymbol).toBe(
      DEFAULT_STABLE_TOKEN_SYMBOL,
    );
  });

  it('trims non-empty stable token symbols', () => {
    expect(createArcadeConfig({ stableTokenSymbol: ' cUSD ' }).stableTokenSymbol).toBe('cUSD');
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

  it('accepts explicit bigint entry fee overrides', () => {
    expect(createArcadeConfig({ entryFee: 500000n }).entryFee).toBe(500000n);
  });

  it('rejects non-bigint entry fee overrides at runtime', () => {
    expect(() =>
      createArcadeConfig({
        entryFee: 1 as unknown as bigint,
      }),
    ).toThrow('Entry fee must be a bigint amount in token base units');
  });

  it('supports zero-decimal tokens when entry fee is provided in base units', () => {
    expect(
      createArcadeConfig({
        stableTokenDecimals: 0,
        entryFee: 1n,
      }).stableTokenDecimals,
    ).toBe(0);
  });
});

describe('config isArcadeConfig', () => {
  it('rejects null values', () => {
    expect(isArcadeConfig(null)).toBe(false);
  });

  it('accepts created arcade configs', () => {
    expect(isArcadeConfig(createArcadeConfig())).toBe(true);
  });

  it('rejects config-like objects missing entry fees', () => {
    const { entryFee: _entryFee, ...partialConfig } = createArcadeConfig();
    expect(isArcadeConfig(partialConfig)).toBe(false);
  });
});

describe('config getDefaultEntryFee', () => {
  it('returns the default six-decimal entry fee', () => {
    expect(getDefaultEntryFee()).toBe(parseTokenUnits('0.01', 6));
  });

  it('returns default entry fees for custom decimals', () => {
    expect(getDefaultEntryFee(18)).toBe(parseTokenUnits('0.01', 18));
  });

  it('rejects invalid decimal precision values', () => {
    expect(() => getDefaultEntryFee(19)).toThrow('Invalid token decimals: 19');
  });
});

describe('config resolveStableTokenSymbol', () => {
  it('trims configured symbols', () => {
    expect(resolveStableTokenSymbol(' cUSD ')).toBe('cUSD');
  });

  it('falls back when symbols are blank', () => {
    expect(resolveStableTokenSymbol('   ')).toBe(DEFAULT_STABLE_TOKEN_SYMBOL);
  });

  it('falls back when symbols are undefined', () => {
    expect(resolveStableTokenSymbol(undefined)).toBe(DEFAULT_STABLE_TOKEN_SYMBOL);
  });
});
