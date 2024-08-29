'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Divider } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { SmallCustomDropdown } from '@/components/common/dropdown';
import BigRestaurantItem from '@/components/listItems/bigRestaurantItem';
import CategoryItem from '@/components/listItems/categoryItem';
import BigRestaurantItemSkeleton from '@/components/listItems/skeletons/bigRestaurantSkeleton';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getRestaurantsList } from '@/services/restaurantService';
import PaddingBox from '@/styles/paddingBox';

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
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState<string>('deadline');
  const [schoolId, setSchoolId] = useState<number | null>(null);

  useEffect(() => {
    // 초기 로드 시 localStorage에서 schoolId 가져오기
    const storedSchoolId = localStorage.getItem('selectedSchoolId');
    if (storedSchoolId !== null && !isNaN(Number(storedSchoolId))) {
      setSchoolId(Number(storedSchoolId));
    }

    // searchParams가 바뀔 때마다 schoolId 업데이트
    const schoolIdParam = searchParams.get('schoolId');
    if (schoolIdParam !== null && !isNaN(Number(schoolIdParam))) {
      const newSchoolId = Number(schoolIdParam);
      if (newSchoolId !== schoolId && !isNaN(newSchoolId)) {
        setSchoolId(newSchoolId);
        localStorage.setItem('selectedSchoolId', newSchoolId.toString());
      }
    }
  }, [searchParams]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['restaurantsList', selectedSort, schoolId],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({
        page: pageParam,
        sortCriteria: selectedSort,
        schoolId: schoolId,
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
      ) : data && data.pages[0].content.length > 0 ? (
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
        <PaddingBox>주문 가능한 가게가 없습니다.</PaddingBox>
      )}
    </ListContainer>
  );
}

export default RestaurantsList;
