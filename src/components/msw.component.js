'use client';

import { useEffect } from 'react';

export const MswComponent = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (typeof window !== 'undefined') {
        (async () => {
          const { worker } = await import('@/mocks/browser');
          if (!worker.isStarted) {
            worker.start();
          }
        })();
      }
    }
  }, []);

  return null;
};
