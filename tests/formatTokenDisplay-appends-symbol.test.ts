import assert from 'node:assert/strict'
import test from 'node:test'

import { formatTokenDisplay } from '../packages/celo-arcade-sdk/src/units.ts'

test('formatTokenDisplay appends symbol after formatted value', () => {
  assert.equal(formatTokenDisplay(1250000n, 6, 'cUSD'), '1.25 cUSD')
})
