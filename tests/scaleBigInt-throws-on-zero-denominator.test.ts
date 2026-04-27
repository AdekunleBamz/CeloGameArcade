import assert from 'node:assert/strict'
import test from 'node:test'

import { scaleBigInt } from '../packages/celo-arcade-sdk/src/units.ts'

test('scaleBigInt throws when denominator is zero', () => {
  assert.throws(() => scaleBigInt(10n, 1, 0), /denominator cannot be zero/)
})
