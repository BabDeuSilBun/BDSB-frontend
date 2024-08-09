'use client';

import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Divider } from '@chakra-ui/react';
import { PaginatedRestaurants, RestaurantSummary } from '@/types/restaurant';
import { SmallCustomDropdown } from '@/components/common/dropdown';
import BigRestarantsItem from '@/components/listItems/bigRestarantItem';
import RestaurantsItem from '@/components/listItems/restaurantsItem';
import CategoryItem from '@/components/listItems/categoryItem';
import { getRestaurantsList } from '@/services/restaurantService';

const ListContainer = styled.section`
  margin: 124px 0 20px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

const options = [
  { id: 'deadline', name: '주문이 임박한 순' },
  { id: 'delivery-fee', name: '배달비가 낮은 순' },
  { id: 'min-price', name: '최소주문금액이 낮은 순' },
  { id: 'delivery-time', name: '배송시간이 짧은 순' },
];

function RestarantsList() {
  const [selectedValue, setSelectedValue] = useState<string>('deadline');
  const [isOpen, setIsOpen] = useState(false);

  const lastItemRef = useRef<HTMLDivElement | null>(null);

  // BigRestaurantsItem 데이터를 위한 쿼리
  const {
    data: bigRestaurantsData,
    isLoading: isLoadingBigRestaurants,
    error: errorBigRestaurants,
  } = useQuery<RestaurantSummary[]>({
    queryKey: ['bigRestaurantsList'],
    queryFn: () =>
      getRestaurantsList({
        sortCriteria: 'deadline',
        size: 4,
        pageParam: 0,
      }).then((res) => res.content),
  });

  // RestaurantsItem 데이터를 위한 무한 스크롤 쿼리
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<PaginatedRestaurants>({
    queryKey: ['restaurantsList', selectedValue],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({ pageParam, sortCriteria: selectedValue }),
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
  });

  useEffect(() => {
    if (!lastItemRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(lastItemRef.current);

    return () => {
      observer.disconnect();
    };
  }, [lastItemRef, hasNextPage, fetchNextPage]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  if (isLoadingBigRestaurants)
    return <p>임박한 가게 목록을 불러오는 중입니다...</p>;
  if (errorBigRestaurants) return <p>Error: {errorBigRestaurants.message}</p>;

  if (isLoading) return <p>데이터를 로딩 중입니다...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ListContainer>
      <CategoryItem />
      <DropDownWrapper>
        <SmallCustomDropdown
          options={options}
          selectedValue={selectedValue}
          onSelect={handleSelect}
          isOpen={isOpen}
          onToggle={handleToggle}
        />
      </DropDownWrapper>

      {bigRestaurantsData ? (
        bigRestaurantsData.map((item) => (
          <BigRestarantsItem item={item} key={item.storeId} />
        ))
      ) : (
        <div>임박한 주문 가능한 가게가 없습니다.</div>
      )}

      {status === 'loading' ? (
        <p>데이터를 로딩 중입니다...</p>
      ) : status === 'error' ? (
        <p>Error: {error?.message}</p>
      ) : (
        <>
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.content.map((item, index) => {
                const isLastItem =
                  pageIndex === data.pages.length - 1 &&
                  index === page.content.length - 1;

                return (
                  <div key={item.storeId} ref={isLastItem ? lastItemRef : null}>
                    <RestaurantsItem item={item} />
                    {index < page.content.length - 1 && <Divider />}
                  </div>
                );
              })}
            </div>
          ))}
          {isFetchingNextPage && <p>더 불러오는 중...</p>}
          {!hasNextPage && <p>마지막 페이지입니다</p>}
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
      )}
    </ListContainer>
  );
}

export default RestarantsList;
