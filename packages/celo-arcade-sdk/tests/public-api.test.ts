import { describe, expect, it } from 'vitest';
import { BASIS_POINTS, CREATOR_SHARE_BPS, PRIZE_SHARE_BPS } from '../src/constants';

describe('constants prize shares', () => {
  it('fill the remainder of the basis point budget', () => {
    expect(PRIZE_SHARE_BPS).toBe(BASIS_POINTS - CREATOR_SHARE_BPS);
  });
});
