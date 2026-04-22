import { describe, expect, it } from 'vitest';
import {
  BASIS_POINTS,
  CLAIM_COOLDOWN_SECONDS,
  CREATOR_SHARE_BPS,
  DEFAULT_STABLE_TOKEN,
  Difficulty,
  DIFFICULTY_MULTIPLIERS,
  DIFFICULTY_NAMES,
  GAME_TYPE_NAMES,
  GameType,
  MAX_SCORE,
  MIN_SCORE,
  PRIZE_SHARE_BPS,
  SUPPORTED_CHAIN_IDS,
  getExplorerAddressUrl,
  getExplorerTxUrl,
} from '../src/constants';
import { ContractEvent } from '../src/events';
import { ReadMethod, WriteMethod } from '../src/methods';

describe('constants prize shares', () => {
  it('fill the remainder of the basis point budget', () => {
    expect(PRIZE_SHARE_BPS).toBe(BASIS_POINTS - CREATOR_SHARE_BPS);
  });
});

describe('constants cooldown', () => {
  it('uses a seven-day prize claim cooldown window', () => {
    expect(CLAIM_COOLDOWN_SECONDS).toBe(7 * 24 * 60 * 60);
  });
});

describe('constants supported chains', () => {
  it('includes Celo mainnet and Alfajores', () => {
    expect(SUPPORTED_CHAIN_IDS).toEqual([42220, 44787]);
  });
});

describe('constants default stable token', () => {
  it('exposes the default USDT metadata', () => {
    expect(DEFAULT_STABLE_TOKEN).toMatchObject({
      symbol: 'USDT',
      decimals: 6,
    });
  });
});

describe('constants GameType', () => {
  it('keeps puzzle mapped to game type four', () => {
    expect(GameType.PUZZLE).toBe(4);
  });

  it('includes five supported game types', () => {
    expect(Object.keys(GameType)).toHaveLength(5);
  });
});

describe('constants Difficulty', () => {
  it('keeps easy mapped to difficulty zero', () => {
    expect(Difficulty.EASY).toBe(0);
  });

  it('keeps hard mapped to difficulty two', () => {
    expect(Difficulty.HARD).toBe(2);
  });
});

describe('events ContractEvent', () => {
  it('exposes the access granted event name', () => {
    expect(ContractEvent.ACCESS_GRANTED).toBe('AccessGranted');
  });

  it('exposes the leaderboard updated event name', () => {
    expect(ContractEvent.LEADERBOARD_UPDATED).toBe('LeaderboardUpdated');
  });
});

describe('methods ReadMethod', () => {
  it('exposes the leaderboard getter name', () => {
    expect(ReadMethod.GET_LEADERBOARD).toBe('getLeaderboard');
  });

  it('exposes the prize pool getter name', () => {
    expect(ReadMethod.GET_PRIZE_POOL).toBe('getPrizePool');
  });
});

describe('methods WriteMethod', () => {
  it('exposes the score submission method name', () => {
    expect(WriteMethod.SUBMIT_SCORE).toBe('submitScore');
  });

  it('exposes the creator earnings withdrawal name', () => {
    expect(WriteMethod.WITHDRAW_CREATOR_EARNINGS).toBe('withdrawCreatorEarnings');
  });
});
