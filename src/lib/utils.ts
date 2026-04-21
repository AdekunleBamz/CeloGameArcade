/**
 * Converts a value in USDT micro-units to a display string.
 * @param micro - Amount in smallest token unit (e.g. 1_000_000 = 1.00 USDT).
 * @param decimals - Number of decimals for the token.
 */
export function formatTokenAmount(micro: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals)
  const whole = micro / divisor
  const frac = micro % divisor
  const fracStr = frac.toString().padStart(decimals, '0').slice(0, 2)
  return `${whole.toString()}.${fracStr}`
}

/**
 * Truncates a hex wallet address to short form: 0xabcd...1234
 * @param addr - Full EVM address string.
 */
export function shortAddress(addr: string): string {
  if (addr.length < 10) return addr
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

/**
 * Returns true if the given amount is greater than zero.
 * @param amount - Token amount as bigint.
 */
export function isPositiveAmount(amount: bigint): boolean {
  return amount > 0n
}

/**
 * Clamps a number between min and max values (inclusive).
 * @param value - The value to clamp.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Formats a prize amount in USDT for display in the UI.
 * @param micro - Amount in micro USDT (6 decimals).
 */
export function formatPrize(micro: bigint): string {
  return `${formatTokenAmount(micro, 6)} USDT`
}

/**
 * Returns true if the given amount is within the allowed wager range.
 * @param micro - Amount in micro USDT.
 */
export function isValidWager(micro: bigint): boolean {
  const MIN = 10_000n
  const MAX = 100_000_000n
  return micro >= MIN && micro <= MAX
}

/**
 * Converts micro USDT to human-readable USDT string with 2 decimal places.
 * @param micro - Amount in 6-decimal micro units.
 */
export function microToUsdt(micro: bigint): string {
  const whole = micro / 1_000_000n
  const frac = (micro % 1_000_000n).toString().padStart(6, '0').slice(0, 2)
  return `${whole}.${frac}`
}

/**
 * Returns true if the given address is the zero address.
 * @param addr - EVM address string to check.
 */
export function isZeroAddress(addr: string): boolean {
  return addr === '0x0000000000000000000000000000000000000000'
}

/**
 * Formats a number with commas as thousands separator.
 * @param n - The number to format.
 */
export function formatWithCommas(n: number): string {
  return n.toLocaleString()
}

/**
 * Returns a short date string from a Unix timestamp (seconds).
 * @param timestamp - Unix timestamp in seconds.
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString()
}

/**
 * Returns true if the prize pool has enough funds to allow gameplay.
 * @param poolMicro - Current pool balance in micro USDT.
 */
export function isPrizePoolSufficient(poolMicro: bigint): boolean {
  return poolMicro >= 100_000n
}

/**
 * Converts a bigint percentage value (0-10000) to a display string.
 * Uses 2 implied decimal places, e.g. 5000 => "50.00%".
 * @param bps - Basis-point-style bigint (10000 = 100%).
 */
export function formatBps(bps: bigint): string {
  const whole = bps / 100n
  const frac = (bps % 100n).toString().padStart(2, '0')
  return `${whole}.${frac}%`
}
