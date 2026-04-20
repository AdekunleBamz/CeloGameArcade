import type { Address } from './types';
export declare function isAddress(value: string): value is Address;
export declare function assertAddress(value: string, label?: string): asserts value is Address;
