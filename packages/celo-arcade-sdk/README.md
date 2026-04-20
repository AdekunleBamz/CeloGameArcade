# Celo Arcade SDK

Standalone SDK for integrating with the Celo Arcade contract and app defaults.

## Install

```bash
npm install celo-arcade-sdk
```

## Usage

```ts
import {
  CONTRACT_ABI,
  DEFAULT_ARCADE_CONFIG,
  DEFAULT_STABLE_TOKEN,
  ENTRY_FEE,
  formatTokenUnits,
  parseTokenUnits,
} from 'celo-arcade-sdk';

console.log(DEFAULT_ARCADE_CONFIG.contractAddress);
console.log(DEFAULT_STABLE_TOKEN.symbol);
console.log(formatTokenUnits(ENTRY_FEE, DEFAULT_STABLE_TOKEN.decimals));
console.log(parseTokenUnits("1.5", DEFAULT_STABLE_TOKEN.decimals));
console.log(CONTRACT_ABI.length);
```

## Build Locally

```bash
npm ci
npm run build
npm run test
```

## Validation Notes

- `parseTokenUnits` accepts values like `1`, `1.`, and `.5` when precision is valid.
- `parseTokenUnits` rejects unsupported notation such as `1e2` to avoid ambiguous parsing.
- `createArcadeConfig` expects `entryFee` overrides as `bigint` values in base units.
- For zero-decimal tokens, provide `entryFee` explicitly in base units when overriding config.
