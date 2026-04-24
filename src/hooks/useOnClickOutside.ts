'use client'

import { useEffect, RefObject } from 'react'

/**
 * Triggers callback when clicking outside a referenced element.
 * @param ref - Element reference.
 * @param handler - Callback to invoke.
 */
export function useOnClickOutside(ref: RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
