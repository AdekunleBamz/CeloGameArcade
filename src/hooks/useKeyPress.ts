'use client'

import { useState, useEffect } from 'react'

/**
 * Tracks whether a specific key is currently pressed.
 * @param targetKey - Key to monitor.
 */
export function useKeyPress(targetKey: string): boolean {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => { if (e.key === targetKey) setPressed(true) }
    const up = (e: KeyboardEvent) => { if (e.key === targetKey) setPressed(false) }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [targetKey])

  return pressed
}
