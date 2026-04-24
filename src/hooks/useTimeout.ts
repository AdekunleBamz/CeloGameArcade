'use client'

import { useEffect, useRef } from 'react'

/**
 * Executes a callback after a delay.
 * @param callback - Function to run.
 * @param delay - Milliseconds to wait.
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)
  useEffect(() => { savedCallback.current = callback }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setTimeout(() => savedCallback.current(), delay)
    return () => clearTimeout(id)
  }, [delay])
}
