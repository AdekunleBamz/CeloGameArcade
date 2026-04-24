'use client'

import { useState, useEffect } from 'react'

/**
 * Tracks device orientation changes.
 */
export function useOrientation() {
  const [isLandscape, setIsLandscape] = useState(false)

  useEffect(() => {
    const check = () => setIsLandscape(window.innerWidth > window.innerHeight)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return { isLandscape, isPortrait: !isLandscape }
}
