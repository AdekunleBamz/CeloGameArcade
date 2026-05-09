# SDK Validation Notes

The SDK exposes contract defaults, addresses, ABI exports, and token unit helpers.

## Before Publishing

- Run `npm run sdk:test`.
- Run `npm run sdk:build`.
- Check that `packages/celo-arcade-sdk/README.md` examples still import exported names that exist.

## Integration Checks

- Use strict decimal strings for parsed token amounts.
- Pass zero-decimal token fees as base-unit `bigint` values.
- Keep app defaults and SDK defaults aligned when contract addresses or token symbols change.
