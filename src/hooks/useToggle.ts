'use client'

import { useState, useCallback } from 'react'

/**
 * Toggles a boolean state.
 * @param initial - Initial boolean value.
 */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue((v) => !v), [])
  const on = useCallback(() => setValue(true), [])
  const off = useCallback(() => setValue(false), [])
  return { value, toggle, on, off, setValue }
}
