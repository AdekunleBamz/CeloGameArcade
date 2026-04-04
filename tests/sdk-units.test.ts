import assert from 'node:assert/strict'
import test from 'node:test'

import { assertDecimals } from '../packages/celo-arcade-sdk/src/units.ts'

test('assertDecimals accepts supported token decimal bounds', () => {
  assert.doesNotThrow(() => assertDecimals(0))
  assert.doesNotThrow(() => assertDecimals(18))
})

test('assertDecimals rejects negative decimal values', () => {
  assert.throws(() => assertDecimals(-1), /Invalid token decimals: -1/)
})
