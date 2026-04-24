'use client'

import { useState, useCallback, RefObject } from 'react'

/**
 * Tracks hover state on a referenced element.
 */
export function useHover(ref: RefObject<HTMLElement>): boolean {
  const [hovered, setHovered] = useState(false)

  const onMouseEnter = useCallback(() => setHovered(true), [])
  const onMouseLeave = useCallback(() => setHovered(false), [])

  useState(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
    return () => {
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  })

  return hovered
}
