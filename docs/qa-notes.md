# QA Notes

## Pre-Smoke-Test

- Run `npm run typecheck` and `npm run check:fast` before sharing a preview link.
- Confirm `NEXT_PUBLIC_ARCADE_CONTRACT_ADDRESS` is set and matches the deployed contract.

## Wallet Flow

- Connect through a Farcaster mini app session.
- Refresh once after connecting and confirm the wallet label remains understandable.
- Connect through a normal injected wallet session.
- Confirm the connected wallet remains on Celo mainnet.
- Confirm the entry fee shown in the app matches the contract value.

## Gameplay Flow

- Open each game from the arcade selector.
- Complete one round without submitting an onchain score.
- Submit a score only after the local round has completed.
- Confirm the leaderboard refreshes after score submission.
- Confirm reduced-motion users can still complete the core game flow.
- Save the game title and difficulty used for each smoke test.
