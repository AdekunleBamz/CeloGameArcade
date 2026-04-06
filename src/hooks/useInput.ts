/**
 * useInput Hook
 * A custom hook for handling form input with validation.
 */

'use client';

import { useState, useCallback, ChangeEvent } from 'react';

interface UseInputOptions<T = string> {
  initialValue: T;
  validate?: (value: T) => boolean;
  errorMessage?: string;
}

interface UseInputReturn<T = string> {
  value: T;
  error: string | null;
  isValid: boolean;
  isDirty: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | T) => void;
  onBlur: () => void;
  reset: () => void;
  setError: (error: string | null) => void;
}

export function useInput<T = string>(
  options: UseInputOptions<T>
): UseInputReturn<T> {
  const { initialValue, validate, errorMessage = 'Invalid input' } = options;

  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = !error && (isTouched || !isDirty);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | T) => {
      const newValue =
        e !== null && typeof e === 'object' && 'target' in e
          ? (e.target.value as unknown as T)
          : e;

      setValue(newValue);
      setIsDirty(true);

      if (validate) {
        const valid = validate(newValue);
        setError(valid ? null : errorMessage);
      } else {
        setError(null);
      }
    },
    [validate, errorMessage]
  );

  const onBlur = useCallback(() => {
    setIsTouched(true);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setIsDirty(false);
    setIsTouched(false);
  }, [initialValue]);

  return { value, error, isValid, isDirty, onChange, onBlur, reset, setError };
}