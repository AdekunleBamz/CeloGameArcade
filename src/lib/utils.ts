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
