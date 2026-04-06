/**
 * useThrottle Hook
 * A custom hook for throttling value updates.
 */

'use client';

import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef<number>(0);
  const valueRef = useRef(value);

  valueRef.current = value;

  useEffect(() => {
    const now = Date.now();

    if (now - lastUpdated.current >= interval) {
      lastUpdated.current = now;
      setThrottledValue(valueRef.current);
    } else {
      const id = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(valueRef.current);
      }, interval - (now - lastUpdated.current));

      return () => clearTimeout(id);
    }
  }, [value, interval]);

  return throttledValue;
}

// Hook for throttling function calls
export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCallRef = useRef(0);

  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallRef.current;

    if (timeSinceLastCall >= delay) {
      lastCallRef.current = now;
      callbackRef.current(...args);
    } else if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        lastCallRef.current = Date.now();
        timeoutRef.current = null;
        callbackRef.current(...args);
      }, delay - timeSinceLastCall);
    }
  }) as T;
}