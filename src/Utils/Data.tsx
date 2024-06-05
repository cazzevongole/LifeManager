import { useCallback, useEffect, useRef } from "react";

export const trueFirstSorting = (a: boolean, b: boolean) => a === b ? 0 : a ? -1 : 1;

export const falseFirstSorting = (a: boolean, b: boolean) => a === b ? 0 : a ? 1 : -1;

/* export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export const useDebounce = (func, delay) => {
  return useCallback(debounce(func, delay), [func, delay]);
} */

export function useDebounce(func: Function, delay: number) {
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return function (...args: any[]) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };
}