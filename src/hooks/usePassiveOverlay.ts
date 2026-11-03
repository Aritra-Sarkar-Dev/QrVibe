import { useEffect, useRef } from 'react';

export function usePassiveOverlay<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const noop = () => {};

    element.addEventListener('touchstart', noop, { passive: true });
    element.addEventListener('touchmove', noop, { passive: true });
    element.addEventListener('wheel', noop, { passive: true });

    return () => {
      element.removeEventListener('touchstart', noop);
      element.removeEventListener('touchmove', noop);
      element.removeEventListener('wheel', noop);
    };
  }, []);

  return ref;
}
