import { useEffect, useState } from 'react';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [scheme, setScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setHasHydrated(true);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setScheme(mediaQuery.matches ? 'dark' : 'light');

    const listener = (e: MediaQueryListEvent) => {
      setScheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return hasHydrated ? scheme : 'light';
}
