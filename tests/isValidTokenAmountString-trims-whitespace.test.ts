import assert from 'node:assert/strict'
import test from 'node:test'

import { isValidTokenAmountString } from '../packages/celo-arcade-sdk/src/units.ts'

test('isValidTokenAmountString accepts values with surrounding whitespace', () => {
  assert.equal(isValidTokenAmountString(' 12.5 '), true)
})
