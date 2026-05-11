# Stable Token Checks

Celo Arcade currently uses a stablecoin entry flow on Celo mainnet.

## Review Points

- Confirm the displayed token symbol matches the configured stable token.
- Confirm the configured stable token address is the intended Celo mainnet asset.
- Confirm wager amounts are parsed with the token decimal count, not hardcoded display decimals.
- Confirm balances and entry fees are shown in human-readable units before transaction signing.
- Confirm token approval uses the arcade contract address as spender.

## Mini App Review

- Keep wallet prompts inside the Farcaster or injected-wallet session.
- Avoid chain-switch prompts in embedded mini app sessions.
- Record one successful entry transaction hash during release smoke testing.
- Compare the stable token symbol in the app, wallet, and explorer event.
