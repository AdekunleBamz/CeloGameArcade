import assert from 'node:assert/strict'
import test from 'node:test'

import { clampDecimals } from '../packages/celo-arcade-sdk/src/units.ts'

test('clampDecimals normalizes reversed min and max bounds', () => {
  assert.equal(clampDecimals(25, 18, 6), 18)
})
