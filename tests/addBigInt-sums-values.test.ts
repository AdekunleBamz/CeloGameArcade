import assert from 'node:assert/strict'
import test from 'node:test'

import { addBigInt } from '../packages/celo-arcade-sdk/src/units.ts'

test('addBigInt returns the sum of two bigint values', () => {
  assert.equal(addBigInt(3n, 4n), 7n)
})
