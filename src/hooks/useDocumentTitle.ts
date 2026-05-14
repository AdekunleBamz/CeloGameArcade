'use client'

import { useEffect } from 'react'

/**
 * Updates the document title dynamically.
 * @param title - New page title.
 * @returns void
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
