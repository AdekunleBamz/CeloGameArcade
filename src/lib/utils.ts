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
