import { describe, expect, it } from 'vitest';
import {
  BASIS_POINTS,
  CLAIM_COOLDOWN_SECONDS,
  CREATOR_SHARE_BPS,
  Difficulty,
  GameType,
  PRIZE_SHARE_BPS,
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
  it('exposes the leaderboard updated event name', () => {
    expect(ContractEvent.LEADERBOARD_UPDATED).toBe('LeaderboardUpdated');
  });
});

describe('methods ReadMethod', () => {
  it('exposes the prize pool getter name', () => {
    expect(ReadMethod.GET_PRIZE_POOL).toBe('getPrizePool');
  });
});

describe('methods WriteMethod', () => {
  it('exposes the creator earnings withdrawal name', () => {
    expect(WriteMethod.WITHDRAW_CREATOR_EARNINGS).toBe('withdrawCreatorEarnings');
  });
});
