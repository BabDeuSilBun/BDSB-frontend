/* eslint-disable @typescript-eslint/no-unused-vars */
import { RefObject, useEffect, useRef } from 'react';

interface InfiniteScrollProps<T extends HTMLElement> {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  root?: Element | null;
  rootMargin?: string;
}

export function useInfiniteScroll<T extends HTMLElement>({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  root = null,
  rootMargin = '0px',
}: InfiniteScrollProps<T>): RefObject<T> {
  const lastElementRef = useRef<T | null>(null);

  useEffect(() => {
    if (isFetchingNextPage) return;
    const currentElement = lastElementRef.current;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    const observerInstance = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold: 0.1,
    });

    if (currentElement) {
      observerInstance.observe(currentElement);
    }

    return () => {
      if (observerInstance && currentElement) {
        observerInstance.unobserve(currentElement);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage, root]);

  return lastElementRef;
}
