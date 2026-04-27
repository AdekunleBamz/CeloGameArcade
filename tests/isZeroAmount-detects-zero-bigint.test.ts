import assert from 'node:assert/strict'
import test from 'node:test'

import { isZeroAmount } from '../packages/celo-arcade-sdk/src/units.ts'

test('isZeroAmount detects zero bigint values', () => {
  assert.equal(isZeroAmount(0n), true)
})
