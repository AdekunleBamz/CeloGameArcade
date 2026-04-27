import assert from 'node:assert/strict'
import test from 'node:test'

import { parseIntegerUnits } from '../packages/celo-arcade-sdk/src/units.ts'

test('parseIntegerUnits parses integer strings with outer whitespace', () => {
  assert.equal(parseIntegerUnits(' 42 '), 42n)
})
