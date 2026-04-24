'use client'

import { useState, useEffect } from 'react'

/**
 * Tracks whether the browser window is focused.
 */
export function useWindowFocus(): boolean {
  const [focused, setFocused] = useState(true)

  useEffect(() => {
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return focused
}
