'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Divider } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { SmallCustomDropdown } from '@/components/common/dropdown';
import RestaurantItem from '@/components/listItems/restaurantItem';
import RestaurantSkeleton from '@/components/listItems/skeletons/restaurantSkeleton';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getRestaurantsList } from '@/services/restaurantService';

const Container = styled.section`
  margin-top: 120px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

const options = [
  { value: 'delivery-fee', name: '배달비가 낮은 순' },
  { value: 'min-price', name: '최소주문금액이 낮은 순' },
  { value: 'delivery-time', name: '배송시간이 짧은 순' },
];

const RestaurantSearchResults = () => {
  const [selectedSort, setSelectedSort] = useState<string>('delivery-fee');
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
    queryKey: ['restaurantSearchResults', selectedSort, searchMenu],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({
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
          <RestaurantSkeleton />
          <RestaurantSkeleton />
          <RestaurantSkeleton />
          <RestaurantSkeleton />
          <RestaurantSkeleton />
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
                <RestaurantItem item={item} key={item.storeId} />
                <Divider />
              </div>
            )),
          )}
        </>
      ) : (
        <div>주문 가능한 가게가 없습니다.</div>
      )}
    </Container>
  );
};

export default RestaurantSearchResults;
