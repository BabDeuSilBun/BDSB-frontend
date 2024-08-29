'use client';

import { useState } from 'react';
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';

import { Divider } from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { SmallCustomDropdown } from '@/components/common/dropdown';
import ImminentOrderItem from '@/components/listItems/imminentOrderItem';
import ImminentOrderSkeleton from '@/components/listItems/skeletons/imminentOrderSkeleton';
import TeamOrderSkeleton from '@/components/listItems/skeletons/teamOrderSkeleton';
import TeamOrderItem from '@/components/listItems/teamOrderItem';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getTeamOrderList } from '@/services/teamOrderService';
import { MeetingsResponse } from '@/types/coreTypes';

const ListContainer = styled.section`
  margin: 110px 0 20px;
`;

const SectionContainer = styled.section<{ $additional?: string }>`
  padding: 1rem;
  padding-right: ${(props) => props.$additional || '1rem'};
  padding-bottom: ${(props) => props.$additional || '1rem'};
`;

const CardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const DropDownWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GroupTitle = styled.h3`
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-xl);
`;

const options = [
  { value: 'deadline', name: '주문이 임박한 순' },
  { value: 'delivery-fee', name: '배달비가 낮은 순' },
  { value: 'min-price', name: '최소주문금액이 낮은 순' },
  { value: 'delivery-time', name: '배송시간이 짧은 순' },
];

function TeamOrderList() {
  const [isOpen, setIsOpen] = useState(false);
  // const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState<string>('deadline');
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [schoolId, setSchoolId] = useState<number | null>(null);

  // useEffect(() => {
  //   // 초기 로드 시 localStorage에서 schoolId 가져오기
  //   const storedSchoolId = localStorage.getItem('selectedSchoolId');
  //   const parsedStoredSchoolId = storedSchoolId ? Number(storedSchoolId) : null;

  //   if (parsedStoredSchoolId && !isNaN(parsedStoredSchoolId)) {
  //     setSchoolId(parsedStoredSchoolId);
  //   }

  //   // searchParams가 바뀔 때마다 schoolId 업데이트
  //   const schoolIdParam = searchParams.get('schoolId');
  //   const parsedSchoolIdParam = schoolIdParam ? Number(schoolIdParam) : null;

  //   if (parsedSchoolIdParam && !isNaN(parsedSchoolIdParam)) {
  //     if (parsedSchoolIdParam !== schoolId) {
  //       setSchoolId(parsedSchoolIdParam);
  //       localStorage.setItem(
  //         'selectedSchoolId',
  //         parsedSchoolIdParam.toString(),
  //       );
  //     }
  //   }
  // }, [searchParams]);

  const {
    data: imminentData,
    status: imminentStatus,
    error: imminentError,
  } = useQuery<MeetingsResponse>({
    queryKey: ['imminentTeamOrders'],
    queryFn: () =>
      getTeamOrderList({ page: 0, size: 4, sortCriteria: 'deadline' }),
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['teamOrderList', selectedSort, schoolId],
    queryFn: ({ pageParam = 0 }) =>
      getTeamOrderList({
        page: pageParam,
        sortCriteria: selectedSort,
        schoolId: schoolId,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
    enabled: !!schoolId,
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
      <SectionContainer $additional="0">
        <GroupTitle>임박한 모임</GroupTitle>
        <CardContainer>
          {imminentStatus === 'pending' && (
            <>
              <ImminentOrderSkeleton />
              <ImminentOrderSkeleton />
              <ImminentOrderSkeleton />
              <ImminentOrderSkeleton />
            </>
          )}
          {imminentStatus === 'error' && (
            <p>
              Error:{' '}
              {imminentError?.message || '알 수 없는 오류가 발생했습니다.'}
            </p>
          )}
          {imminentStatus === 'success' &&
            (imminentData?.content.length > 0 ? (
              imminentData.content.map((item) => (
                <ImminentOrderItem key={item.meetingId} item={item} />
              ))
            ) : (
              <div>모집 중인 모임이 없습니다.</div>
            ))}
        </CardContainer>
      </SectionContainer>

      <Divider />

      <SectionContainer>
        <DropDownWrapper>
          <GroupTitle>모임 모아보기</GroupTitle>
          <SmallCustomDropdown
            options={options}
            selectedValue={selectedSort}
            onSelect={handleSelect}
            isOpen={isOpen}
            onToggle={handleToggle}
          />
        </DropDownWrapper>

        {status === 'pending' && (
          <>
            <TeamOrderSkeleton />
            <TeamOrderSkeleton />
            <TeamOrderSkeleton />
            <TeamOrderSkeleton />
            <TeamOrderSkeleton />
          </>
        )}
        {status === 'error' && <p>Error: {error.message}</p>}
        {status === 'success' && data && (
          <>
            {data.pages.map((page) =>
              page.content.map((item, index) => (
                <div
                  key={item.meetingId}
                  ref={
                    index === page.content.length - 1 ? lastElementRef : null
                  }
                >
                  <TeamOrderItem item={item} />
                  <Divider />
                </div>
              )),
            )}
          </>
        )}
        {status === 'success' && !data && <div>모집 중인 모임이 없습니다.</div>}
      </SectionContainer>
    </ListContainer>
  );
}

export default TeamOrderList;
