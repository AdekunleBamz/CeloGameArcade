import { describe, expect, it } from 'vitest';
import { BASIS_POINTS, CREATOR_SHARE_BPS, Difficulty, GameType, PRIZE_SHARE_BPS } from '../src/constants';

describe('constants prize shares', () => {
  it('fill the remainder of the basis point budget', () => {
    expect(PRIZE_SHARE_BPS).toBe(BASIS_POINTS - CREATOR_SHARE_BPS);
  });
});

describe('constants GameType', () => {
  it('keeps puzzle mapped to game type four', () => {
    expect(GameType.PUZZLE).toBe(4);
  });
});

describe('constants Difficulty', () => {
  it('keeps hard mapped to difficulty two', () => {
    expect(Difficulty.HARD).toBe(2);
  });
});
