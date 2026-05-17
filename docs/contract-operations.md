# Contract Operations

Use this note for read-only and owner-facing contract review.

- Read `entryFee` before release smoke testing.
- Read `getArcadeStats` before and after a test entry.
- Read `getLeaderboard` after a score submission.
- Confirm owner-only actions are performed from the intended owner wallet.
- Record transaction hashes for entry, score submission, and prize claim smoke tests.
- Compare token balances before and after a deposit when validating prize pool routing.
- Record the player wallet, action, and transaction hash in the operation note.
- Attach the public explorer link to each operation note.
