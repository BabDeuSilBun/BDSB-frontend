'use client';

import { useState } from 'react';

import { Divider } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

import { SmallCustomDropdown } from '@/components/common/dropdown';
import RestaurantsItem from '@/components/listItems/restaurantItem';
import RestaurantSkeleton from '@/components/listItems/skeletons/restaurantSkeleton';
import { RestaurantCategory } from '@/constant/category';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getRestaurantsList } from '@/services/restaurantService';

const ListContainer = styled.section`
  margin: 120px 0 20px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  padding: 1rem 1rem 0 0;
  justify-content: right;
`;

const options = [
  { value: 'delivery-fee', name: '배달비가 낮은 순' },
  { value: 'min-price', name: '최소주문금액이 낮은 순' },
  { value: 'delivery-time', name: '배송시간이 짧은 순' },
];

function SortedList() {
  const params = useParams();
  const category = (params.category as RestaurantCategory) || '치킨';

  const [selectedSort, setSelectedSort] = useState<string>('delivery-fee');
  const [isOpen, setIsOpen] = useState(false);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['sortedList', selectedSort, category],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({
        page: pageParam,
        sortCriteria: selectedSort,
        foodCategoryFilter: category,
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
    <ListContainer>
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
                <RestaurantsItem item={item} key={item.storeId} />
                <Divider />
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

export default SortedList;
