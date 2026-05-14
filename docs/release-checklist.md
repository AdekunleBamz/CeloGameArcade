# Celo Arcade Release Checklist

Use this checklist before promoting a Vercel deployment.

## Local Checks

- Run `npm run sdk:test` after SDK-facing changes.
- Run `npm run sdk:build` when SDK exports or package metadata changes.
- Run `npm run check:fast` for the app-level fast checks.
- Run `npm run typecheck` to confirm TypeScript compiles cleanly.
- Run `npm run build` before production deployment.
- Confirm Vercel public variables match the intended contract and stable token.

## Runtime Checks

- Confirm the app reads the current contract address on Celo mainnet.
- Confirm the entry fee shown in the UI matches the contract value.
- Confirm at least one game can complete locally before signing a score transaction.
- Confirm one support link opens without leaving the mini app in an unusable state.
- Open the production URL inside a Farcaster client and verify the mini app shell loads.
- Attach one score submission hash and preview URL to the release notes.
