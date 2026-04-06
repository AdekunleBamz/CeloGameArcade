/**
 * Application Type Definitions
 * Centralized type definitions for the Celo Game Arcade application.
 */

/** Game types available in the arcade */
export type GameType = 'car' | 'snake' | 'flappy' | 'space';

/** Difficulty levels for games */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/** View states for the main component */
export type ViewState = 'home' | 'game' | 'result';

/** Game state for individual games */
export type GameState = 'play' | 'over' | 'paused';

/** Leaderboard entry structure */
export interface LeaderboardEntry {
  rank: number;
  address: string;
  score: number;
  isUser: boolean;
}

/** Player statistics structure */
export interface PlayerStats {
  hasAccess: boolean;
  totalScore: number;
  gamesPlayed: number;
  lastPlayTime: number;
  seasonJoined: number;
}

/** Game configuration */
export interface GameConfig {
  id: GameType;
  name: string;
  icon: string;
  color: string;
  description: string;
  gameType: number;
}

/** Difficulty configuration */
export interface DifficultyConfig {
  id: DifficultyLevel;
  name: string;
  multiplier: number;
  color: string;
  description: string;
  value: number;
}

/** Score submission data */
export interface ScoreData {
  raw: number;
  final: number;
  difficulty: DifficultyLevel;
}

/** Wallet connection status */
export interface WalletStatus {
  isConnected: boolean;
  address?: string;
  chainId?: number;
}