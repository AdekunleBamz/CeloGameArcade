# 🎮 Celo Game Arcade

A blockchain-powered gaming arcade built as a Farcaster mini app on the Celo network. Deposit the current stablecoin entry fee to unlock all games, compete for the top spot on the leaderboard, and claim the entire prize pool!

## 🕹️ Games

- **🏎️ Turbo Racing** - Dodge obstacles and collect coins
- **🐍 Neon Snake** - Classic snake with a neon twist
- **🐦 Flappy Celo** - Fly through pipes, don't crash!
- **🚀 Space Blaster** - Destroy aliens, survive waves

## ⚡ Features

- 💰 **Prize Pool** - 80% of each entry goes to the prize pool, and the #1 player can claim it all
- 🏆 **Leaderboard** - Top 10 players ranked by score
- 🎯 **Difficulty Multipliers** - Easy (1x), Medium (1.5x), Hard (2x)
- 🔗 **On-chain Scores** - All scores recorded on Celo blockchain
- 📱 **Farcaster Integration** - Play directly in Warpcast

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Blockchain:** Celo, Solidity, Wagmi, Viem
- **Farcaster:** @farcaster/miniapp-sdk, @farcaster/miniapp-wagmi-connector
- **Wallet:** WalletConnect, Injected providers

## 📋 Contract

- **Address:** `0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0`
- **Network:** Celo Mainnet (Chain ID: 42220)
- **Entry Fee:** Read from the contract at runtime
- **SDK Amount Parsing:** Uses strict decimal strings (`1`, `1.`, `.5`) and rejects scientific notation.
- **Zero-Decimal Tokens:** When integrating non-fractional tokens, pass `entryFee` explicitly in base units.

## 🚀 Quick Start
```bash
git clone https://github.com/AdekunleBamz/CeloGameArcade.git
cd CeloGameArcade
npm install

# Optional: set WalletConnect project id for QR wallet flow
echo "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id" >> .env.local

npm run dev

# Run SDK unit tests
npm run sdk:test

# Build SDK artifacts
npm run sdk:build

# Run fast local checks
npm run check:fast
```

## 📦 Deploy
```bash
npm run sdk:test
npm run build
npx vercel --prod
```

## 🔐 Security Notes

- Keep `.env.local` out of commits and avoid sharing WalletConnect keys in logs.

## 📄 License

MIT
