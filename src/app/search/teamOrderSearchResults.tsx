'use client';

import { useEffect, useRef, useState } from 'react';

import { Divider } from '@chakra-ui/react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SmallCustomDropdown } from '@/components/common/dropdown';
import TeamOrderSkeleton from '@/components/listItems/teamOrderSkeleton';
import TeamOrderItem from '@/components/listItems/teamOrderItem';
import { getTeamOrderList } from '@/services/teamOrderService';
import { useSearchParams } from 'next/navigation';

const Container = styled.section`
  margin: 120px 1rem 0 1rem;
`;

const DropDownWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

const options = [
  { id: 1, value: 'deadline', name: '주문이 임박한 순' },
  { id: 2, value: 'delivery-fee', name: '배달비가 낮은 순' },
  { id: 3, value: 'min-price', name: '최소주문금액이 낮은 순' },
  { id: 4, value: 'delivery-time', name: '배송시간이 짧은 순' },
];

const TeamOrderSearchResults = () => {
  const [selectedSort, setSelectedSort] = useState<string>('deadline');
  const [isOpen, setIsOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const searchMenu = searchParams.get('q') || '';

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['temOrderSearchResults', selectedSort, searchMenu],
    queryFn: ({ pageParam = 0 }) =>
      getTeamOrderList({
        page: pageParam,
        searchMenu: searchMenu,
        sortCriteria: selectedSort,
      }),
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

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

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
    <Container>
      <DropDownWrapper>
        <SmallCustomDropdown
          options={options}
          selectedValue={selectedSort}
          onSelect={handleSelect}
          isOpen={isOpen}
          onToggle={handleToggle}
        />
      </DropDownWrapper>

      {status === 'pending' ? (
        <>
          <TeamOrderSkeleton />
          <TeamOrderSkeleton />
          <TeamOrderSkeleton />
          <TeamOrderSkeleton />
          <TeamOrderSkeleton />
        </>
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : data?.pages.length > 0 ? (
        <>
          {data.pages.map((page) =>
            page.content.map((item, index) => (
              <div
                key={item.storeId}
                ref={index === page.content.length - 1 ? lastElementRef : null}
              >
                <TeamOrderItem item={item} key={item.storeId} />
                <Divider />
              </div>
            )),
          )}
        </>
      ) : (
        <div>참여 가능한 모임이 없습니다.</div>
      )}
    </Container>
  );
};

export default TeamOrderSearchResults;
