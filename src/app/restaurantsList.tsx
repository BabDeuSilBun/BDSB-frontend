'use client';

import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';
import { SmallCustomDropdown } from '@/components/common/dropdown';
import BigRestarantsItem from '@/components/listItems/bigRestarantItem';
import CategoryItem from '@/components/listItems/categoryItem';
import { getRestaurantsList } from '@/services/restaurantService';

import Loading from './loading';

const ListContainer = styled.section`
  margin: 124px 0 20px;
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

function RestarantsList() {
  const [selectedSort, setSelectedSort] = useState<string>('deadline');
  const [isOpen, setIsOpen] = useState(false);
  // const lastItemRef = useRef<HTMLDivElement | null>(null);

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
      getRestaurantsList({ pageParam, sortCriteria: selectedSort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
  });

  const totalResults = data?.pages[0]?.totalElements || 0;

  const handleSelect = (value: string | null) => {
    if (value !== null) {
      setSelectedSort(value);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   if (!lastItemRef.current || !hasNextPage) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         fetchNextPage();
  //       }
  //     },
  //     { threshold: 1.0 },
  //   );

  //   observer.observe(lastItemRef.current);

  //   return () => {
  //     if (lastItemRef.current) observer.unobserve(lastItemRef.current);
  //   };
  // }, [fetchNextPage, hasNextPage]);

  return (
    <ListContainer>
      {status === 'pending' ? (
        <Loading />
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <CategoryItem />
          <div style={{ display: 'flex' }}>
            <p>총 {totalResults}개</p>
            <DropDownWrapper>
              <SmallCustomDropdown
                options={options}
                selectedValue={selectedSort}
                onSelect={handleSelect}
                isOpen={isOpen}
                onToggle={handleToggle}
              />
            </DropDownWrapper>
          </div>
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
          </button>
          {data ? (
            data.pages.map((page) =>
              page.content.map((item) => (
                <BigRestarantsItem item={item} key={item.storeId} />
              )),
            )
          ) : (
            <div>주문 가능한 가게가 없습니다.</div>
          )}
          {isFetchingNextPage && (
            <Spinner
              color="var(--primary)"
              size="xl"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
            />
          )}
        </>
      )}
    </ListContainer>
  );
}

export default RestarantsList;
