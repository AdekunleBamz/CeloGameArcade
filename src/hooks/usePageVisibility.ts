'use client'

import { useState, useEffect } from 'react'

/**
 * Tracks page visibility state.
 */
export function usePageVisibility(): boolean {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handler = () => setVisible(document.visibilityState === 'visible')
    handler()
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  return visible
}
