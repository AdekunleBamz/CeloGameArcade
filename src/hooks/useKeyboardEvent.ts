/**
 * useKeyboardEvent Hook
 * A custom hook for handling keyboard events with cleanup.
 */

'use client';

import { useEffect, useCallback } from 'react';

interface KeyboardEventHandler {
  (event: KeyboardEvent): void;
}

interface UseKeyboardEventOptions {
  target?: HTMLElement | Document;
  event?: 'keydown' | 'keyup' | 'keypress';
}

export function useKeyboardEvent(
  key: string,
  handler: KeyboardEventHandler,
  options: UseKeyboardEventOptions = {}
) {
  const { target = document, event = 'keydown' } = options;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === key) {
        handler(e);
      }
    },
    [key, handler]
  );

  useEffect(() => {
    target.addEventListener(event, handleKey as EventListener);
    return () => {
      target.removeEventListener(event, handleKey as EventListener);
    };
  }, [target, event, handleKey]);
}

// Convenience hooks for common keys
export function useEscapeKey(handler: KeyboardEventHandler) {
  useKeyboardEvent('Escape', handler);
}

export function useEnterKey(handler: KeyboardEventHandler) {
  useKeyboardEvent('Enter', handler);
}

export function useArrowKeys(handlers: {
  up?: KeyboardEventHandler;
  down?: KeyboardEventHandler;
  left?: KeyboardEventHandler;
  right?: KeyboardEventHandler;
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          handlers.up?.(e);
          break;
        case 'ArrowDown':
          handlers.down?.(e);
          break;
        case 'ArrowLeft':
          handlers.left?.(e);
          break;
        case 'ArrowRight':
          handlers.right?.(e);
          break;
      }
    },
    [handlers]
  );

  useKeyboardEvent('ArrowUp', handleKey);
  useKeyboardEvent('ArrowDown', handleKey);
  useKeyboardEvent('ArrowLeft', handleKey);
  useKeyboardEvent('ArrowRight', handleKey);
}