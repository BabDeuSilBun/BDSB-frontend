'use client';

import { useEffect, useRef, useState } from 'react';

import { Divider } from '@chakra-ui/react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SmallCustomDropdown } from '@/components/common/dropdown';
import CategoryItem from '@/components/listItems/categoryItem';
import { getRestaurantsList } from '@/services/restaurantService';
import BigRestaurantItem from '@/components/listItems/bigRestaurantItem';
import BigRestaurantItemSkeleton from '@/components/listItems/bigRestaurantSkeleton';

const ListContainer = styled.section`
  margin: 110px 0 20px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  padding: 1rem 1rem 0 0;
  justify-content: right;
`;

const options = [
  { id: 1, value: 'delivery-fee', name: '배달비가 낮은 순' },
  { id: 2, value: 'min-price', name: '최소주문금액이 낮은 순' },
  { id: 3, value: 'delivery-time', name: '배송시간이 짧은 순' },
];

function RestaurantsList() {
  const [selectedSort, setSelectedSort] = useState<string>('delivery-fee');
  const [isOpen, setIsOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['restaurantsList', selectedSort],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({ page: pageParam, sortCriteria: selectedSort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
  });

  useEffect(() => {
    if (isFetchingNextPage) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    // Initialize IntersectionObserver
    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    // Observe the last element
    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    // Cleanup function to unobserve the last element
    return () => {
      if (observer.current && lastElementRef.current) {
        observer.current.unobserve(lastElementRef.current);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const handleSelect = (value: string | null) => {
    if (value !== null) {
      setSelectedSort(value);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ListContainer>
      {/* 항상 렌더링되는 컴포넌트들 */}
      <CategoryItem />
      <Divider />
      <DropDownWrapper>
        <SmallCustomDropdown
          options={options}
          selectedValue={selectedSort}
          onSelect={handleSelect}
          isOpen={isOpen}
          onToggle={handleToggle}
        />
      </DropDownWrapper>

      {/* 상태에 따른 조건부 렌더링 */}
      {status === 'pending' ? (
        <>
          <BigRestaurantItemSkeleton />
          <BigRestaurantItemSkeleton />
        </>
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : data && data.pages.length > 0 ? (
        <>
          {data.pages.map((page) =>
            page.content.map((item, index) => (
              <div
                key={item.storeId}
                ref={index === page.content.length - 1 ? lastElementRef : null}
              >
                <BigRestaurantItem item={item} key={item.storeId} />
              </div>
            )),
          )}
        </>
      ) : (
        <div>주문 가능한 가게가 없습니다.</div>
      )}
    </ListContainer>
  );
}

export default RestaurantsList;
