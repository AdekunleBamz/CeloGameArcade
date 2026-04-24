'use client'

import { useState, useEffect } from 'react'

/**
 * Tracks window scroll position.
 */
export function useScrollPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const update = () => setPosition({ x: window.scrollX, y: window.scrollY })
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return position
}
