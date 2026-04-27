import assert from 'node:assert/strict'
import test from 'node:test'

import { mulBigIntBps } from '../packages/celo-arcade-sdk/src/units.ts'

test('mulBigIntBps calculates basis-point shares', () => {
  assert.equal(mulBigIntBps(1_000n, 250), 25n)
})
