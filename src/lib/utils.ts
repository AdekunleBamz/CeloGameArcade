import { STABLE_TOKEN_DECIMALS, STABLE_TOKEN_SYMBOL } from './contract'

/**
 * Converts a value in USDT micro-units to a display string.
 * @param micro - Amount in smallest token unit (e.g. 1_000_000 = 1.00 USDT).
 * @param decimals - Number of decimals for the token.
 */
export function formatTokenAmount(micro: bigint, decimals: number): string {
  const divisor = 10n ** BigInt(decimals)
  const whole = micro / divisor
  const frac = micro % divisor
  if (decimals === 0) return whole.toString()
  const fracStr = frac.toString().padStart(decimals, '0').slice(0, 2)
  return `${whole.toString()}.${fracStr}`
}

/**
 * Truncates a hex wallet address to short form: 0xabcd...1234
 * @param addr - Full EVM address string.
 */
export function shortAddress(addr: string): string {
  const value = addr.trim()
  if (!value) return ''
  if (value.length < 10) return value
  return `${value.slice(0, 6)}...${value.slice(-4)}`
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
  return `${formatTokenAmount(micro, STABLE_TOKEN_DECIMALS)} ${STABLE_TOKEN_SYMBOL}`
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
  return addr.trim().toLowerCase() === '0x0000000000000000000000000000000000000000'
}

/**
 * Formats a number with commas as thousands separator.
 * @param n - The number to format.
 */
export function formatWithCommas(n: number | bigint | string): string {
  if (typeof n === 'bigint') return n.toLocaleString()
  if (typeof n === 'string') {
    const parsed = Number(n.replace(/,/g, ''))
    return Number.isFinite(parsed) ? parsed.toLocaleString() : n
  }
  return n.toLocaleString()
}

/**
 * Returns a short date string from a Unix timestamp (seconds).
 * @param timestamp - Unix timestamp in seconds.
 */
export function formatDate(timestamp: number): string {
  if (!Number.isFinite(timestamp) || timestamp <= 0) return ''
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

/**
 * Calculates the house fee for a given wager.
 * @param wagerMicro - Wager in micro USDT.
 * @param feeBps - Fee in basis points (default 500 = 5%).
 */
export function calcHouseFee(wagerMicro: bigint, feeBps = 500n): bigint {
  return (wagerMicro * feeBps) / 10_000n
}

/**
 * Returns the net prize a player receives after house fee.
 * @param wagerMicro - Wager in micro USDT.
 * @param multiplierBps - Win multiplier in basis points (e.g. 19500 = 1.95x).
 * @param feeBps - House fee in basis points.
 */
export function calcNetPrize(wagerMicro: bigint, multiplierBps: bigint, feeBps = 500n): bigint {
  const gross = (wagerMicro * multiplierBps) / 10_000n
  return gross - calcHouseFee(gross, feeBps)
}

/**
 * Validates that a wager string input can be parsed to a valid USDT amount.
 * @param input - Raw user input string.
 */
export function parseWagerInput(input: string): bigint | null {
  const trimmed = input.trim().replace(/,/g, '')
  if (!/^(?:\d+\.?\d*|\.\d+)$/.test(trimmed)) return null
  const parsed = parseFloat(trimmed)
  if (!Number.isFinite(parsed) || parsed <= 0) return null
  return BigInt(Math.round(parsed * 1_000_000))
}

/**
 * Returns true if the account has any USDT balance.
 * @param balance - Balance in micro USDT.
 */
export function hasBalance(balance: bigint): boolean {
  return balance > 0n
}

/**
 * Pluralizes a word based on a count.
 * @param count - The count to check.
 * @param singular - Singular form.
 * @param plural - Plural form (defaults to singular + 's').
 */
export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count === 1 ? singular : plural
}

/**
 * Returns a debounced version of fn that fires after delay ms.
 * @param fn - The function to debounce.
 * @param delay - Delay in milliseconds.
 */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Rounds a number to a given precision.
 * @param value - Number to round.
 * @param decimals - Decimal places to keep.
 */
export function roundToDecimals(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

/**
 * Formats a relative time string (e.g. "2h ago").
 * @param timestamp - Unix timestamp in seconds.
 */
export function timeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp)
  if (seconds < 60) return 'just now'
  const mins = Math.floor(seconds / 60)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

/**
 * Returns a truncated string with ellipsis in the middle.
 * @param str - String to truncate.
 * @param maxLen - Maximum total length.
 */
export function truncateMiddle(str: string, maxLen = 20): string {
  if (str.length <= maxLen) return str
  const half = Math.floor((maxLen - 3) / 2)
  return `${str.slice(0, half)}...${str.slice(-half)}`
}

/**
 * Returns true if the string is a valid email address.
 * @param email - String to validate.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

/**
 * Returns a random integer between min and max (inclusive).
 * @param min - Minimum value.
 * @param max - Maximum value.
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Returns true if the device is likely a touch device.
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Safely accesses localStorage with try/catch.
 * @param key - Storage key.
 */
export function getLocalStorageItem(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}

/**
 * Safely sets localStorage with try/catch.
 * @param key - Storage key.
 * @param value - Value to store.
 */
export function setLocalStorageItem(key: string, value: string): boolean {
  try { localStorage.setItem(key, value); return true } catch { return false }
}

/**
 * Returns initials from a display name or address.
 * @param name - String to extract initials from.
 */
export function getInitials(name: string): string {
  return name.trim().split(/\s+/).map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

/**
 * Capitalizes the first letter of a string.
 * @param str - String to capitalize.
 */
export function capitalize(str: string): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

/**
 * Converts a hex string to a number safely.
 * @param hex - Hex string starting with 0x.
 */
export function hexToNumber(hex: string): number | null {
  try { return Number.parseInt(hex, 16) } catch { return null }
}

/**
 * Formats a score with appropriate suffix (K, M).
 * @param score - Raw score number.
 */
export function formatScoreCompact(score: number): string {
  if (score >= 1_000_000) return `${(score / 1_000_000).toFixed(1)}M`
  if (score >= 1_000) return `${(score / 1_000).toFixed(1)}K`
  return score.toString()
}

/**
 * Returns true if value is within inclusive range.
 * @param value - Number to check.
 * @param min - Minimum bound.
 * @param max - Maximum bound.
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Delays execution by ms milliseconds.
 * @param ms - Milliseconds to wait.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Returns a shallow compare result for objects.
 * @param a - First object.
 * @param b - Second object.
 */
export function shallowEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  return keysA.every((k) => a[k] === b[k])
}

/**
 * Returns true if the code is running on the server.
 */
export function isServer(): boolean {
  return typeof window === 'undefined'
}

/**
 * Converts a number to a compact locale string.
 * @param n - Number to format.
 */
export function compactNumber(n: number): string {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(n)
}

/**
 * Returns the difference between two dates in days.
 * @param a - First date.
 * @param b - Second date.
 */
export function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.floor(Math.abs(a.getTime() - b.getTime()) / msPerDay)
}

/**
 * Returns a slug from a display name.
 * @param str - String to slugify.
 */
export function slugify(str: string): string {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')
}

/**
 * Limits how often a function can fire.
 * @param fn - Function to throttle.
 * @param limit - Minimum ms between calls.
 */
export function throttle<T extends (...args: unknown[]) => void>(fn: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => inThrottle = false, limit) }
  }
}

/**
 * Returns true if the string is a valid URL.
 * @param url - String to test.
 */
export function isValidUrl(url: string): boolean {
  try { new URL(url); return true } catch { return false }
}

/**
 * Wraps a value between min and max (inclusive loop).
 * @param value - Current value.
 * @param min - Minimum bound.
 * @param max - Maximum bound.
 */
export function wrap(value: number, min: number, max: number): number {
  const range = max - min + 1
  return ((((value - min) % range) + range) % range) + min
}
