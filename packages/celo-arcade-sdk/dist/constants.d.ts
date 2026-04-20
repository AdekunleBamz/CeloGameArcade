import type { Address, StableTokenMetadata } from './types';
export declare const DEFAULT_CONTRACT_ADDRESS: Address;
export declare const DEFAULT_STABLE_TOKEN_ADDRESS: Address;
export declare const DEFAULT_STABLE_TOKEN_SYMBOL = "USDT";
export declare const DEFAULT_STABLE_TOKEN_DECIMALS = 6;
export declare const DEFAULT_STABLE_TOKEN: StableTokenMetadata;
export declare const DEFAULT_MINIPAY_FEE_CURRENCY: Address;
export declare const CLAIM_COOLDOWN_SECONDS: number;
export declare const LEADERBOARD_SIZE = 10;
export declare const CREATOR_SHARE_BPS = 2000;
export declare const BASIS_POINTS = 10000;
export declare const PRIZE_SHARE_BPS: number;
export declare const GameType: {
    readonly CAR_RACE: 0;
    readonly SNAKE: 1;
    readonly FLAPPY: 2;
    readonly SPACE_SHOOTER: 3;
    readonly PUZZLE: 4;
};
export declare const Difficulty: {
    readonly EASY: 0;
    readonly MEDIUM: 1;
    readonly HARD: 2;
};
export declare const ENTRY_FEE: bigint;
