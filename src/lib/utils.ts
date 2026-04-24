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

/**
 * Returns the distance between two points.
 * @param x1 - First x coordinate.
 * @param y1 - First y coordinate.
 * @param x2 - Second x coordinate.
 * @param y2 - Second y coordinate.
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.hypot(x2 - x1, y2 - y1)
}

/**
 * Linearly interpolates between two values.
 * @param start - Start value.
 * @param end - End value.
 * @param t - Interpolation factor 0-1.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/**
 * Easing function: ease-out cubic.
 * @param t - Input 0-1.
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Easing function: ease-in-out quad.
 * @param t - Input 0-1.
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

/**
 * Clamps a value and returns progress ratio 0-1.
 * @param value - Current value.
 * @param min - Start of range.
 * @param max - End of range.
 */
export function normalize(value: number, min: number, max: number): number {
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}

/**
 * Returns a promise that rejects after ms milliseconds.
 * @param ms - Timeout in milliseconds.
 * @param message - Rejection message.
 */
export function timeout(ms: number, message = 'Operation timed out'): Promise<never> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms))
}

/**
 * Races a promise against a timeout.
 * @param promise - Promise to race.
 * @param ms - Timeout in milliseconds.
 */
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([promise, timeout(ms)])
}

/**
 * Returns a memoized version of a function.
 * @param fn - Function to memoize.
 */
export function memoize<T extends (arg: string) => unknown>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>()
  return ((arg: string) => {
    if (!cache.has(arg)) cache.set(arg, fn(arg) as ReturnType<T>)
    return cache.get(arg)!
  }) as T
}

/**
 * Returns true if the arrays have the same elements in any order.
 * @param a - First array.
 * @param b - Second array.
 */
export function sameElements<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.every((v, i) => v === sortedB[i])
}

/**
 * Returns a random hex color string.
 */
export function randomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

/**
 * Converts HSL values to a hex color string.
 * @param h - Hue 0-360.
 * @param s - Saturation 0-100.
 * @param l - Lightness 0-100.
 */
export function hslToHex(h: number, s: number, l: number): string {
  const a = s * Math.min(l, 100 - l) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(color * 2.55).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

/**
 * Returns a cookie value by name.
 * @param name - Cookie name.
 */
export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

/**
 * Copies text to clipboard with fallback.
 * @param text - Text to copy.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true } catch { return false }
}

/**
 * Returns true if the element is in viewport.
 * @param el - DOM element.
 */
export function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth
}

/**
 * Returns a readable stream from a string.
 * @param text - Text to stream.
 */
export function stringToStream(text: string): ReadableStream<Uint8Array> {
  return new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode(text)); controller.close() } })
}

/**
 * Strips HTML tags from a string.
 * @param html - HTML string.
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Truncates a string to a word boundary.
 * @param str - String to truncate.
 * @param maxLen - Max length.
 */
export function truncateWords(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str
  const truncated = str.slice(0, maxLen)
  return truncated.slice(0, truncated.lastIndexOf(' ')) + '...'
}

/**
 * Converts bytes to a hex string.
 * @param bytes - Byte array.
 */
export function bytesToHex(bytes: number[]): string {
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Returns true if the value is a plain object.
 * @param value - Value to test.
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * Returns the last element of an array.
 * @param arr - Array.
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}

/**
 * Returns the first element of an array.
 * @param arr - Array.
 */
export function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

/**
 * Flattens a nested array one level deep.
 * @param arr - Nested array.
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((a, b) => a.concat(b), [])
}

/**
 * Picks specified keys from an object.
 * @param obj - Source object.
 * @param keys - Keys to pick.
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach((k) => { result[k] = obj[k] })
  return result
}

/**
 * Omits specified keys from an object.
 * @param obj - Source object.
 * @param keys - Keys to omit.
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((k) => { delete result[k] })
  return result
}

/**
 * Returns true if the string is a valid IPv4 address.
 * @param ip - String to validate.
 */
export function isValidIPv4(ip: string): boolean {
  return /^(?:(?:25[0-5]|2[0-4]\d|1?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|1?\d{1,2})$/.test(ip.trim())
}

/**
 * Returns a SHA-256 hash of a string (hex).
 * @param message - String to hash.
 */
export async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Returns true if the string is a valid Base64 string.
 * @param str - String to validate.
 */
export function isBase64(str: string): boolean {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str.trim())
}

/**
 * Returns a formatted currency string.
 * @param value - Numeric value.
 * @param currency - ISO currency code.
 */
export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en', { style: 'currency', currency }).format(value)
}

/**
 * Returns a formatted date string.
 * @param date - Date to format.
 * @param options - Intl.DateTimeFormat options.
 */
export function formatDateTime(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en', options).format(date)
}

/**
 * Returns true if the element has overflow content.
 * @param el - HTMLElement to check.
 */
export function hasOverflow(el: HTMLElement): boolean {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
}

/**
 * Scrolls an element into view smoothly.
 * @param el - Element to scroll to.
 */
export function scrollToElement(el: HTMLElement): void {
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

/**
 * Returns the scroll position of the window.
 */
export function getScrollPosition(): { x: number; y: number } {
  return { x: window.scrollX, y: window.scrollY }
}

/**
 * Returns the viewport dimensions.
 */
export function getViewportSize(): { width: number; height: number } {
  return { width: window.innerWidth, height: window.innerHeight }
}

/**
 * Returns true if the device is in landscape mode.
 */
export function isLandscape(): boolean {
  return window.innerWidth > window.innerHeight
}

/**
 * Returns true if the device is in portrait mode.
 */
export function isPortrait(): boolean {
  return window.innerWidth <= window.innerHeight
}

/**
 * Returns a promise that resolves when the DOM is ready.
 */
export function domReady(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') resolve()
    else document.addEventListener('DOMContentLoaded', () => resolve())
  })
}

/**
 * Downloads a text file to the user's device.
 * @param filename - Name for the downloaded file.
 * @param text - File content.
 */
export function downloadTextFile(filename: string, text: string): void {
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url)
}

/**
 * Returns true if the string ends with a given suffix.
 * @param str - String to test.
 * @param suffix - Suffix to check.
 */
export function endsWith(str: string, suffix: string): boolean {
  return str.slice(-suffix.length) === suffix
}

/**
 * Returns true if the string starts with a given prefix.
 * @param str - String to test.
 * @param prefix - Prefix to check.
 */
export function startsWith(str: string, prefix: string): boolean {
  return str.slice(0, prefix.length) === prefix
}

/**
 * Repeats a string n times.
 * @param str - String to repeat.
 * @param n - Number of repetitions.
 */
export function repeat(str: string, n: number): string {
  return Array.from({ length: n }).fill(str).join('')
}

/**
 * Returns the byte size of a UTF-8 string.
 * @param str - String to measure.
 */
export function byteSize(str: string): number {
  return new TextEncoder().encode(str).length
}

/**
 * Returns a query parameter value from the current URL.
 * @param key - Query parameter key.
 */
export function getQueryParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key)
}

/**
 * Sets query parameters on the current URL without reloading.
 * @param params - Object of key-value pairs.
 */
export function setQueryParams(params: Record<string, string>): void {
  const url = new URL(window.location.href)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  window.history.replaceState({}, '', url)
}

/**
 * Returns true if the user has granted notification permission.
 */
export function hasNotificationPermission(): boolean {
  return 'Notification' in window && Notification.permission === 'granted'
}

/**
 * Requests notification permission from the user.
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied'
  return Notification.requestPermission()
}

/**
 * Returns true if the tab is currently visible.
 */
export function isTabVisible(): boolean {
  return document.visibilityState === 'visible'
}
