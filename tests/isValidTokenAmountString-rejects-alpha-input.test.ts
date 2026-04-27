import assert from 'node:assert/strict'
import test from 'node:test'

import { isValidTokenAmountString } from '../packages/celo-arcade-sdk/src/units.ts'

test('isValidTokenAmountString rejects alphabetic input', () => {
  assert.equal(isValidTokenAmountString('abc'), false)
})
