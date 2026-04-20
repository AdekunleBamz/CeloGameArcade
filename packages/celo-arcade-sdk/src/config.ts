import type { ArcadeSdkConfig } from './types';
import { assertAddress } from './addresses';
import {
  DEFAULT_CONTRACT_ADDRESS,
  DEFAULT_MINIPAY_FEE_CURRENCY,
  DEFAULT_STABLE_TOKEN_ADDRESS,
  DEFAULT_STABLE_TOKEN_DECIMALS,
  DEFAULT_STABLE_TOKEN_SYMBOL,
} from './constants';
import { assertDecimals, parseTokenUnits } from './units';

export function createArcadeConfig(overrides: Partial<ArcadeSdkConfig> = {}): ArcadeSdkConfig {
  const stableTokenDecimals = overrides.stableTokenDecimals ?? DEFAULT_STABLE_TOKEN_DECIMALS;
  assertDecimals(stableTokenDecimals);
  const contractAddress = String(overrides.contractAddress ?? DEFAULT_CONTRACT_ADDRESS).trim();
  const stableTokenAddress = String(overrides.stableTokenAddress ?? DEFAULT_STABLE_TOKEN_ADDRESS).trim();
  const miniPayFeeCurrency = String(
    overrides.miniPayFeeCurrency ?? DEFAULT_MINIPAY_FEE_CURRENCY,
  ).trim();

  assertAddress(contractAddress, 'contract address');
  assertAddress(stableTokenAddress, 'stable token address');
  assertAddress(miniPayFeeCurrency, 'MiniPay fee currency');
  const configuredStableTokenSymbol = String(overrides.stableTokenSymbol ?? '').trim();
  const entryFee = overrides.entryFee ?? parseTokenUnits('0.01', stableTokenDecimals);
  if (typeof entryFee !== 'bigint') {
    throw new Error('Entry fee must be a bigint amount in token base units');
  }
  if (entryFee < 0n) {
    throw new Error('Entry fee cannot be negative');
  }

  return {
    contractAddress,
    stableTokenAddress,
    stableTokenSymbol: configuredStableTokenSymbol || DEFAULT_STABLE_TOKEN_SYMBOL,
    stableTokenDecimals,
    miniPayFeeCurrency,
    entryFee,
  };
}

export const DEFAULT_ARCADE_CONFIG = createArcadeConfig();

export function isArcadeConfig(value: unknown): value is ArcadeSdkConfig {
  if (!value || typeof value !== 'object') return false;
  const config = value as Partial<ArcadeSdkConfig>;
  return (
    typeof config.contractAddress === 'string'
    && typeof config.stableTokenAddress === 'string'
    && typeof config.stableTokenSymbol === 'string'
    && typeof config.stableTokenDecimals === 'number'
    && typeof config.miniPayFeeCurrency === 'string'
    && typeof config.entryFee === 'bigint'
  );
}

export function getDefaultEntryFee(decimals = DEFAULT_STABLE_TOKEN_DECIMALS): bigint {
  assertDecimals(decimals);
  return parseTokenUnits('0.01', decimals);
}
