# Celo Arcade Release Checklist

Use this checklist before promoting a Vercel deployment.

## Local Checks

- Run `npm run sdk:test` after SDK-facing changes.
- Run `npm run sdk:build` when SDK exports or package metadata changes.
- Run `npm run check:fast` for the app-level fast checks.
- Run `npm run build` before production deployment.
- Confirm Vercel public variables match the intended contract and stable token.

## Runtime Checks

- Confirm the app reads the current contract address on Celo mainnet.
- Confirm the entry fee shown in the UI matches the contract value.
- Open the production URL inside a Farcaster client and verify the mini app shell loads.
