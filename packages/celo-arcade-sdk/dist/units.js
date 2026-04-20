export function assertDecimals(decimals) {
    if (!Number.isInteger(decimals) || decimals < 0 || decimals > 18) {
        throw new Error(`Invalid token decimals: ${decimals}`);
    }
}
export function parseTokenUnits(value, decimals) {
    assertDecimals(decimals);
    if (typeof value === 'bigint')
        return value;
    const normalized = String(value).trim();
    if (!/^\d+(\.\d+)?$/.test(normalized)) {
        throw new Error(`Invalid token amount: ${normalized}`);
    }
    const [whole, fraction = ''] = normalized.split('.');
    if (fraction.length > decimals) {
        throw new Error(`Too many decimal places for ${decimals}-decimals token amount: ${normalized}`);
    }
    return BigInt(`${whole}${fraction.padEnd(decimals, '0')}`);
}
export function formatTokenUnits(value, decimals) {
    assertDecimals(decimals);
    const zero = BigInt(0);
    const negative = value < zero;
    const absolute = negative ? -value : value;
    const divisor = BigInt(`1${'0'.repeat(decimals)}`);
    const whole = absolute / divisor;
    const fraction = (absolute % divisor).toString().padStart(decimals, '0').replace(/0+$/, '');
    const formatted = fraction ? `${whole.toString()}.${fraction}` : whole.toString();
    return negative ? `-${formatted}` : formatted;
}
