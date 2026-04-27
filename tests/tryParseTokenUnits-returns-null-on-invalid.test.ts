import assert from 'node:assert/strict'
import test from 'node:test'

import { tryParseTokenUnits } from '../packages/celo-arcade-sdk/src/units.ts'

test('tryParseTokenUnits returns null for invalid token input', () => {
  assert.equal(tryParseTokenUnits('invalid', 6), null)
})
