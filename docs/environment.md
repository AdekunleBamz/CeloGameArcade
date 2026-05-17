# Environment Reference

Celo Arcade reads public settings from `NEXT_PUBLIC_*` variables.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_ARCADE_CONTRACT_ADDRESS` | Deployed arcade contract address. |
| `NEXT_PUBLIC_STABLE_TOKEN_ADDRESS` | Stable token used for entry payments. |
| `NEXT_PUBLIC_STABLE_TOKEN_SYMBOL` | Stable token symbol displayed in the UI. |
| `NEXT_PUBLIC_STABLE_TOKEN_DECIMALS` | Decimal count used for stable token amount parsing. |
| `NEXT_PUBLIC_MINIPAY_FEE_CURRENCY` | MiniPay fee currency address used by the mini app shell. |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Optional WalletConnect project id for external wallet sessions. |
| `NEXT_PUBLIC_APP_URL` | Production domain used in Farcaster frame metadata and share links. Defaults to the hardcoded fallback when not set. |

## Unit Notes

Entry fees and balances are sent onchain in token base units. Display amounts should always use the configured token decimals.

## Vercel Notes

Update public variables in Vercel before promoting a build that changes the contract or stable token. The browser bundle reads the values from the deployment that built it.

Record the Vercel environment and reviewer whenever contract or stable token variables change.

Compare preview and production values before sharing gameplay review links.
