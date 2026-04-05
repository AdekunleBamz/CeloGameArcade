import assert from 'node:assert/strict'
import test from 'node:test'

import {
  assertDecimals,
  parseTokenUnits,
} from '../packages/celo-arcade-sdk/src/units.ts'

test('assertDecimals accepts supported token decimal bounds', () => {
  assert.doesNotThrow(() => assertDecimals(0))
  assert.doesNotThrow(() => assertDecimals(18))
})

test('assertDecimals rejects negative decimal values', () => {
  assert.throws(() => assertDecimals(-1), /Invalid token decimals: -1/)
})

test('assertDecimals rejects decimals above eighteen', () => {
  assert.throws(() => assertDecimals(19), /Invalid token decimals: 19/)
})

test('parseTokenUnits passes bigint inputs through unchanged', () => {
  assert.equal(parseTokenUnits(1234n, 6), 1234n)
})

test('parseTokenUnits parses whole-number strings', () => {
  assert.equal(parseTokenUnits('42', 6), 42000000n)
})

test('parseTokenUnits parses fractional strings', () => {
  assert.equal(parseTokenUnits('1.25', 6), 1250000n)
})

test('parseTokenUnits parses number inputs', () => {
  assert.equal(parseTokenUnits(2.5, 6), 2500000n)
})
