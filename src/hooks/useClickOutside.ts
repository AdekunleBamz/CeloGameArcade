/**
 * useClickOutside Hook
 * A custom hook for detecting clicks outside a referenced element.
 */

'use client';

import { useEffect, useRef, type RefObject } from 'react';

type EventHandler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: EventHandler,
  events: string[] = ['mousedown', 'touchstart']
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event as MouseEvent | TouchEvent);
    };

    events.forEach((event) => {
      document.addEventListener(event, listener);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener);
      });
    };
  }, [ref, handler, events]);

  return ref;
}
