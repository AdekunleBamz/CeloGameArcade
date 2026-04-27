import assert from 'node:assert/strict'
import test from 'node:test'

import { toTokenDivisor } from '../packages/celo-arcade-sdk/src/units.ts'

test('toTokenDivisor returns a 10^decimals bigint', () => {
  assert.equal(toTokenDivisor(6), 1_000_000n)
})
