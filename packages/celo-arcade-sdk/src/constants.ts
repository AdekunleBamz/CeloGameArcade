import type { Address, StableTokenMetadata } from './types';
import { parseTokenUnits } from './units';

export const DEFAULT_CONTRACT_ADDRESS = '0xD3Cb0357edF92E1056cfBC3dC5cC1DA52846DDB0' as Address;
export const DEFAULT_STABLE_TOKEN_ADDRESS = '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e' as Address;
export const DEFAULT_STABLE_TOKEN_SYMBOL = 'USDT';
export const DEFAULT_STABLE_TOKEN_DECIMALS = 6;
export const DEFAULT_STABLE_TOKEN: StableTokenMetadata = {
  address: DEFAULT_STABLE_TOKEN_ADDRESS,
  symbol: DEFAULT_STABLE_TOKEN_SYMBOL,
  decimals: DEFAULT_STABLE_TOKEN_DECIMALS,
};
export const DEFAULT_MINIPAY_FEE_CURRENCY = '0x765DE816845861e75A25fCA122bb6898B8B1282a' as Address;
export const DEFAULT_CELO_RPC_URL = 'https://forno.celo.org';
export const CELO_EXPLORER_URL = 'https://celoscan.io';
export const ALFAJORES_EXPLORER_URL = 'https://alfajores.celoscan.io';
export const CELO_MAINNET_CHAIN_ID = 42220;
export const CELO_ALFAJORES_CHAIN_ID = 44787;
export const SUPPORTED_CHAIN_IDS = [CELO_MAINNET_CHAIN_ID, CELO_ALFAJORES_CHAIN_ID] as const;
export const CLAIM_COOLDOWN_SECONDS = 7 * 24 * 60 * 60;
export const LEADERBOARD_SIZE = 10;
export const CREATOR_SHARE_BPS = 2000;
export const BASIS_POINTS = 10_000;
export const MAX_BASIS_POINTS = BASIS_POINTS;
export const PRIZE_SHARE_BPS = BASIS_POINTS - CREATOR_SHARE_BPS;

export const GameType = {
  CAR_RACE: 0,
  SNAKE: 1,
  FLAPPY: 2,
  SPACE_SHOOTER: 3,
  PUZZLE: 4,
} as const;

export const Difficulty = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2,
} as const;

export const DEFAULT_ENTRY_FEE_STRING = '0.01';
export const ENTRY_FEE = parseTokenUnits(DEFAULT_ENTRY_FEE_STRING, DEFAULT_STABLE_TOKEN_DECIMALS);

export const GAME_TYPE_NAMES: Record<number, string> = {
  [GameType.CAR_RACE]: 'Car Race',
  [GameType.SNAKE]: 'Snake',
  [GameType.FLAPPY]: 'Flappy Bird',
  [GameType.SPACE_SHOOTER]: 'Space Shooter',
  [GameType.PUZZLE]: 'Puzzle',
};

export const DIFFICULTY_NAMES: Record<number, string> = {
  [Difficulty.EASY]: 'Easy',
  [Difficulty.MEDIUM]: 'Medium',
  [Difficulty.HARD]: 'Hard',
};

export const DIFFICULTY_MULTIPLIERS: Record<number, number> = {
  [Difficulty.EASY]: 1,
  [Difficulty.MEDIUM]: 2,
  [Difficulty.HARD]: 3,
};

export const MIN_SCORE = 0;
export const MAX_SCORE = 999_999;

export const CLAIM_COOLDOWN_DAYS = Math.round(CLAIM_COOLDOWN_SECONDS / 86400);
export const MAX_LEADERBOARD_SIZE = LEADERBOARD_SIZE;
