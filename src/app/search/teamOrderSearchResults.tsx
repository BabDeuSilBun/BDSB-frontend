'use client';

import { useState } from 'react';

import { Divider } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import { SmallCustomDropdown } from '@/components/common/dropdown';
import TeamOrderSkeleton from '@/components/listItems/skeletons/teamOrderSkeleton';
import TeamOrderItem from '@/components/listItems/teamOrderItem';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getTeamOrderList } from '@/services/teamOrderService';

const Container = styled.section`
  margin: 120px 1rem 0 1rem;
`;

const DropDownWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

const options = [
  { value: 'deadline', name: '주문이 임박한 순' },
  { value: 'delivery-fee', name: '배달비가 낮은 순' },
  { value: 'min-price', name: '최소주문금액이 낮은 순' },
  { value: 'delivery-time', name: '배송시간이 짧은 순' },
];

const TeamOrderSearchResults = () => {
  const [selectedSort, setSelectedSort] = useState<string>('deadline');
  const [isOpen, setIsOpen] = useState(false);
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
        searchMenu,
        sortCriteria: selectedSort,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
  });

  const lastElementRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

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
