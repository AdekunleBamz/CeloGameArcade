export function isAddress(value) {
    return /^0x[a-fA-F0-9]{40}$/.test(value);
}
export function assertAddress(value, label = 'address') {
    if (!isAddress(value)) {
        throw new Error(`Invalid ${label}: ${value}`);
    }
}
