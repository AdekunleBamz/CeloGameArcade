/**
 * Application-wide constants for CeloArcade.
 */

/** Maximum number of prize entries visible on the leaderboard. */
export const MAX_LEADERBOARD_ENTRIES = 50

/** Stable token display symbol used in the UI. */
export const UI_TOKEN_SYMBOL = 'USDT'

/** Default confirmation count to consider a transaction final. */
export const TX_CONFIRMATIONS = 1

/** How often (ms) to poll for transaction status updates. */
export const TX_POLL_INTERVAL_MS = 3_000

/** Timeout (ms) before a pending transaction is considered stale. */
export const TX_TIMEOUT_MS = 120_000

/** Minimum wager amount in micro USDT (0.01 USDT). */
export const MIN_WAGER_MICRO = 10_000n

/** Maximum wager amount in micro USDT (100 USDT). */
export const MAX_WAGER_MICRO = 100_000_000n

/** Number of milliseconds between leaderboard refreshes. */
export const LEADERBOARD_REFRESH_MS = 30_000

/** Duration (ms) for success toast notifications. */
export const TOAST_SUCCESS_DURATION_MS = 4_000

/** Duration (ms) for error toast notifications. */
export const TOAST_ERROR_DURATION_MS = 6_000

/** Zero address used as a sentinel for uninitialized addresses. */
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as const

/** Delay (ms) before retrying a failed RPC call. */
export const RPC_RETRY_DELAY_MS = 2_000

/** Maximum number of RPC retry attempts before giving up. */
export const MAX_RPC_RETRIES = 5
