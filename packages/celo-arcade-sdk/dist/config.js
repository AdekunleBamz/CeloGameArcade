import { assertAddress } from './addresses';
import { DEFAULT_CONTRACT_ADDRESS, DEFAULT_MINIPAY_FEE_CURRENCY, DEFAULT_STABLE_TOKEN_ADDRESS, DEFAULT_STABLE_TOKEN_DECIMALS, DEFAULT_STABLE_TOKEN_SYMBOL, } from './constants';
import { parseTokenUnits } from './units';
export function createArcadeConfig(overrides = {}) {
    const stableTokenDecimals = overrides.stableTokenDecimals ?? DEFAULT_STABLE_TOKEN_DECIMALS;
    const contractAddress = overrides.contractAddress ?? DEFAULT_CONTRACT_ADDRESS;
    const stableTokenAddress = overrides.stableTokenAddress ?? DEFAULT_STABLE_TOKEN_ADDRESS;
    const miniPayFeeCurrency = overrides.miniPayFeeCurrency ?? DEFAULT_MINIPAY_FEE_CURRENCY;
    assertAddress(contractAddress, 'contract address');
    assertAddress(stableTokenAddress, 'stable token address');
    assertAddress(miniPayFeeCurrency, 'MiniPay fee currency');
    return {
        contractAddress,
        stableTokenAddress,
        stableTokenSymbol: overrides.stableTokenSymbol ?? DEFAULT_STABLE_TOKEN_SYMBOL,
        stableTokenDecimals,
        miniPayFeeCurrency,
        entryFee: overrides.entryFee ?? parseTokenUnits('0.01', stableTokenDecimals),
    };
}
export const DEFAULT_ARCADE_CONFIG = createArcadeConfig();
