'use client';

import { useEffect, useRef, useState } from 'react';

import { RoundBtnFilled, SmallRdBtn } from '@/styles/button';
import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';
import Container from '@/styles/container';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMyData, getPointDetailList } from '@/services/myDataService';
import PointItem from '@/components/listItems/pointItem';
import PointSkeleton from '@/components/listItems/pointSkeleton';

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
  const [activeBtn, setActiveBtn] = useState('전체');
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const handleBtnClick = (btnType: string) => {
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
          onClick={() => handleBtnClick('전체')}
          active={activeBtn === '전체'}
        >
          전체
        </SmallRdBtn>
        <SmallRdBtn
          onClick={() => handleBtnClick('적립')}
          active={activeBtn === '적립'}
        >
          적립
        </SmallRdBtn>
        <SmallRdBtn
          onClick={() => handleBtnClick('사용')}
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
