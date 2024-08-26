'use client';

import { useState } from 'react';

import { Divider } from '@chakra-ui/react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { SmallCustomDropdown } from '@/components/common/dropdown';
import CategoryItem from '@/components/listItems/categoryItem';
import { getRestaurantsList } from '@/services/restaurantService';
import BigRestaurantItem from '@/components/listItems/bigRestaurantItem';
import BigRestaurantItemSkeleton from '@/components/listItems/skeletons/bigRestaurantSkeleton';

const ListContainer = styled.section`
  margin: 110px 0 20px;
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

function RestaurantsList() {
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
    queryKey: ['restaurantsList', selectedSort],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({ page: pageParam, sortCriteria: selectedSort }),
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
