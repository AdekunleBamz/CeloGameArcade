import assert from 'node:assert/strict'
import test from 'node:test'

import { subBigIntSafe } from '../packages/celo-arcade-sdk/src/units.ts'

test('subBigIntSafe floors subtraction results at zero', () => {
  assert.equal(subBigIntSafe(2n, 5n), 0n)
})
