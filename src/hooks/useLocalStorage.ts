'use client'

import { useState, useCallback } from 'react'

/**
 * Syncs state with localStorage.
 * @param key - Storage key.
 * @param initialValue - Default value.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue
      try { localStorage.setItem(key, JSON.stringify(resolved)) } catch { /* ignore */ }
      return resolved
    })
  }, [key])

  return [value, setStoredValue] as const
}
