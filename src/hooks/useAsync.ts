'use client'

import { useState, useCallback } from 'react'

/**
 * Manages async operation state.
 */
export function useAsync<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async (promise: Promise<T>) => {
    setLoading(true); setError(null)
    try {
      const result = await promise
      setData(result)
      return result
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)))
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => { setData(null); setError(null); setLoading(false) }, [])

  return { data, loading, error, execute, reset }
}
