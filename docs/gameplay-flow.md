# Gameplay Flow

1. Player connects a supported wallet on Celo mainnet.
2. Player deposits the current stablecoin entry fee.
3. The app unlocks the arcade for the connected wallet.
4. Player selects a game and difficulty.
5. The local game round produces a raw score.
6. The app submits the score with the selected difficulty multiplier.
7. Leaderboard and prize pool views refresh from contract reads.

Difficulty selection should happen before gameplay begins so the submitted score matches the round the player saw.

Keep the selected game, difficulty, and final score together in release evidence.
