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

  return {
    contractAddress,
    stableTokenAddress,
    stableTokenSymbol: configuredStableTokenSymbol || DEFAULT_STABLE_TOKEN_SYMBOL,
    stableTokenDecimals,
    miniPayFeeCurrency,
    entryFee: overrides.entryFee ?? parseTokenUnits('0.01', stableTokenDecimals),
  };
}

export const DEFAULT_ARCADE_CONFIG = createArcadeConfig();
