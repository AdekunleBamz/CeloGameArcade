'use client'

import { useState, useEffect } from 'react'

/**
 * Debounces a value by a specified delay.
 * @param value - Value to debounce.
 * @param delay - Milliseconds to wait.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
