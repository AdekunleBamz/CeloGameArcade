/**
 * Application-wide constants for CeloArcade.
 */

/** Maximum number of prize entries visible on the leaderboard. */
export const MAX_LEADERBOARD_ENTRIES = 50

/** Minimum difficulty multiplier (easy). */
export const MIN_DIFFICULTY_MULTIPLIER = 1

/** Maximum difficulty multiplier (hard). */
export const MAX_DIFFICULTY_MULTIPLIER = 2

/** Stable token display symbol used in the UI. */
export const UI_TOKEN_SYMBOL = 'USDT'

/** Stable token symbol for contracts and internal use. */
export const STABLE_TOKEN_SYMBOL = 'USDT' as const

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

/** Game status values used to drive UI state. */
export const GAME_STATUS = Object.freeze({
  IDLE: 'idle',
  PLAYING: 'playing',
  CLAIMING: 'claiming',
  COMPLETE: 'complete',
  ERROR: 'error',
} as const)

/** Minimum prize pool balance (micro USDT) before games are allowed. */
export const MIN_PRIZE_POOL_MICRO = 100_000n

/** House fee in basis points (e.g. 500 = 5%). */
export const HOUSE_FEE_BPS = 500n

/** Maximum number of active games displayed on the board. */
export const MAX_ACTIVE_GAMES_DISPLAY = 20

/** Maximum number of games a wallet can have in pending state simultaneously. */
export const MAX_PENDING_GAMES = 3

/** Default page size for paginated game history queries. */
export const DEFAULT_PAGE_SIZE = 10

/** Debounce delay in ms applied to user input handlers. */
export const INPUT_DEBOUNCE_MS = 300

/** Maximum number of displayed decimal places for wager amounts. */
export const WAGER_DISPLAY_DECIMALS = 2

/** Number of milliseconds in one second. */
export const ONE_SECOND_MS = 1_000

/** Default page to start pagination on. */
export const DEFAULT_PAGE = 1

/** Minimum wallet balance (micro USDT) required to place a wager. */
export const MIN_BALANCE_TO_PLAY_MICRO = 10_000n

/** Number of milliseconds in one hour. */
export const ONE_HOUR_MS = 3_600_000

/** Maximum character length for a display name. */
export const MAX_DISPLAY_NAME_LENGTH = 32

/** Number of milliseconds to wait before showing a loading skeleton. */
export const SKELETON_DELAY_MS = 200

/** Maximum score achievable in a single game round. */
export const MAX_ROUND_SCORE = 100

/**
 * Constant placeholder 1
 */
export const GAME_CONST_1 = 100

/**
 * Constant placeholder 2
 */
export const GAME_CONST_2 = 200

/**
 * Constant placeholder 3
 */
export const GAME_CONST_3 = 300

/**
 * Constant placeholder 4
 */
export const GAME_CONST_4 = 400
