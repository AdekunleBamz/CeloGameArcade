import assert from 'node:assert/strict'
import test from 'node:test'

import { clampBigInt } from '../packages/celo-arcade-sdk/src/units.ts'

test('clampBigInt clamps values above max', () => {
  assert.equal(clampBigInt(15n, 0n, 10n), 10n)
})
