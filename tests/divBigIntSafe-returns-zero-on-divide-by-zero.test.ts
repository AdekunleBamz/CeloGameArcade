import assert from 'node:assert/strict'
import test from 'node:test'

import { divBigIntSafe } from '../packages/celo-arcade-sdk/src/units.ts'

test('divBigIntSafe returns zero when dividing by zero', () => {
  assert.equal(divBigIntSafe(10n, 0n), 0n)
})
