/**
 * useCopyToClipboard Hook
 * A custom hook for copying text to clipboard with feedback.
 */

'use client';

import { useState, useCallback } from 'react';

interface CopyState {
  copied: boolean;
  error: Error | null;
}

export function useCopyToClipboard(timeout = 2000) {
  const [state, setState] = useState<CopyState>({
    copied: false,
    error: null,
  });

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setState({ copied: true, error: null });

        setTimeout(() => {
          setState((prev) => ({ ...prev, copied: false }));
        }, timeout);
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setState({ copied: false, error: err });
      }
    },
    [timeout]
  );

  const reset = useCallback(() => {
    setState({ copied: false, error: null });
  }, []);

  return { ...state, copy, reset };
}