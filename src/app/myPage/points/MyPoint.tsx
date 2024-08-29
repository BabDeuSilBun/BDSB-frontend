'use client';

import { useState } from 'react';

import { Divider } from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import PointItem from '@/components/listItems/pointItem';
import PointSkeleton from '@/components/listItems/skeletons/pointSkeleton';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getMyData, getPointDetailList } from '@/services/myDataService';
import { RoundBtnFilled, SmallRdBtn } from '@/styles/button';
import Container from '@/styles/container';

const ContainerSection = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.3rem 1rem;
  align-items: center;

  h3 {
    font-weight: var(--font-semi-bold);
    font-size: var(--font-size-xxl);
  }

  h2 {
    font-weight: var(--font-semi-bold);
    font-size: var(--font-size-lg);
  }
`;

const SortingBtns = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem;
`;

const MyPoint = () => {
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const handleBtnClick = (btnType: string | null) => {
    setActiveBtn(btnType);
  };

  const {
    data: userData,
    isLoading: isLoadingUserData,
    isError: isErrorUserData,
  } = useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['pointDetailList', activeBtn],
    queryFn: ({ pageParam = 0 }) =>
      getPointDetailList({
        page: pageParam,
        sortCriteria: activeBtn,
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

  return (
    <ContainerSection>
      <Flex>
        <div>
          <h2>보유</h2>
          <h3>{`${isErrorUserData ? '포인트를 불러올 수 없음' : isLoadingUserData ? '0' : userData && userData.point}P`}</h3>
        </div>
        <RoundBtnFilled>전액 인출하기</RoundBtnFilled>
      </Flex>
      <SortingBtns>
        <SmallRdBtn
          onClick={() => handleBtnClick(null)}
          active={activeBtn === '전체'}
        >
          전체
        </SmallRdBtn>
        <SmallRdBtn
          onClick={() => handleBtnClick('earn')}
          active={activeBtn === '적립'}
        >
          적립
        </SmallRdBtn>
        <SmallRdBtn
          onClick={() => handleBtnClick('use')}
          active={activeBtn === '사용'}
        >
          사용
        </SmallRdBtn>
      </SortingBtns>
      <ul>
        {status === 'pending' ? (
          <>
            <PointSkeleton />
            <PointSkeleton />
            <PointSkeleton />
          </>
        ) : status === 'error' ? (
          <p>Error: {error.message}</p>
        ) : data && data.pages.length > 0 ? (
          <>
            {data.pages.map((page) =>
              page.content.map((item, index) => (
                <div
                  key={index}
                  ref={
                    index === page.content.length - 1 ? lastElementRef : null
                  }
                >
                  <PointItem item={item} />
                  <Divider />
                </div>
              )),
            )}
          </>
        ) : (
          <div>포인트 내역이 없습니다.</div>
        )}
      </ul>
    </ContainerSection>
  );
};

export default MyPoint;
