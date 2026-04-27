import assert from 'node:assert/strict'
import test from 'node:test'

import { isPositiveAmount } from '../packages/celo-arcade-sdk/src/units.ts'

test('isPositiveAmount treats zero as not positive', () => {
  assert.equal(isPositiveAmount(0n), false)
})
