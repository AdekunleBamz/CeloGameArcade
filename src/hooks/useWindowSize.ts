/**
 * useWindowSize Hook
 * A custom hook for tracking window dimensions with debounce support.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

interface UseWindowSizeOptions {
  debounceMs?: number;
}

export function useWindowSize(options: UseWindowSizeOptions = {}) {
  const { debounceMs = 150 } = options;
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    // Set initial size
    handleResize();

    // Debounced resize handler
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, debounceMs);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize, debounceMs]);

  return windowSize;
}

// Convenience hooks for common breakpoints
export function useIsMobile(breakpoint = 768) {
  const { width } = useWindowSize();
  return width !== undefined && width < breakpoint;
}

export function useIsTablet(minBreakpoint = 768, maxBreakpoint = 1024) {
  const { width } = useWindowSize();
  return width !== undefined && width >= minBreakpoint && width < maxBreakpoint;
}

export function useIsDesktop(breakpoint = 1024) {
  const { width } = useWindowSize();
  return width !== undefined && width >= breakpoint;
}