'use client'

import { useState, useEffect } from 'react'

/**
 * Returns true once the component has mounted.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return mounted
}
