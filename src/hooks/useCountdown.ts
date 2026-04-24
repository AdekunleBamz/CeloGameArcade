'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Counts down from a given number of seconds.
 * @param initialSeconds - Starting seconds.
 */
export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(false)

  const start = useCallback(() => setRunning(true), [])
  const pause = useCallback(() => setRunning(false), [])
  const reset = useCallback(() => { setRunning(false); setSeconds(initialSeconds) }, [initialSeconds])

  useEffect(() => {
    if (!running || seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [running, seconds])

  return { seconds, running, start, pause, reset, finished: seconds <= 0 }
}
