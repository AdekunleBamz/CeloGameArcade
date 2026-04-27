import assert from 'node:assert/strict'
import test from 'node:test'

import { parseIntegerUnits } from '../packages/celo-arcade-sdk/src/units.ts'

test('parseIntegerUnits rejects decimal strings', () => {
  assert.throws(() => parseIntegerUnits('2.5'), /Invalid integer token amount/)
})
