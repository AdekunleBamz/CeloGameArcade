export type Address = `0x${string}`;

export type ArcadeChainId = 42220 | 44787;

export type DifficultyKey = 'easy' | 'medium' | 'hard';

export interface StableTokenMetadata {
  address: Address;
  symbol: string;
  decimals: number;
}

export interface ArcadeSdkConfig {
  contractAddress: Address;
  stableTokenAddress: Address;
  stableTokenSymbol: string;
  stableTokenDecimals: number;
  miniPayFeeCurrency: Address;
  entryFee: bigint;
}

export interface PlayerStats {
  hasAccess: boolean;
  totalScore: bigint;
  gamesPlayed: bigint;
  lastPlayTime: bigint;
  seasonJoined: bigint;
}

export interface SdkLeaderboardEntry {
  player: Address;
  totalScore: bigint;
}
