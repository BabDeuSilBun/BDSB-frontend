'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Divider } from '@chakra-ui/react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import styled from 'styled-components';

import PointItem from '@/components/listItems/pointItem';
import PointSkeleton from '@/components/listItems/skeletons/pointSkeleton';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { apiClientWithCredentials } from '@/services/apiClient';
import { getMyData, getPointDetailList } from '@/services/myDataService';
import { RoundBtnFilled, SmallRdBtn } from '@/styles/button';
import Container from '@/styles/container';
import PaddingBox from '@/styles/paddingBox';

const ContainerSection = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
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
  const queryClient = useQueryClient();
  const router = useRouter();

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

  const mutation = useMutation({
    mutationFn: () =>
      apiClientWithCredentials.post('/api/users/points/withdrawal'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myData'] });
    },
    onError: (error) => {
      console.error('포인트 인출 중 오류 발생:', error);
    },
  });

  const handlePointWithdrawal = () => {
    if (confirm('전액 인출하시겠습니까?')) {
      if (
        userData &&
        userData.bankAccount &&
        userData.bankAccount.bank !== null
      ) {
        mutation.mutate();
      } else {
        alert('환불 계좌가 없습니다.');
        router.push('/myPage/edit/bankAccount');
      }
    }
  };

  return (
    <ContainerSection>
      <Flex>
        <div>
          <h2>보유</h2>
          <h3>{`${isErrorUserData ? '포인트를 불러올 수 없음' : isLoadingUserData ? '0' : userData && userData.point}P`}</h3>
        </div>
        <RoundBtnFilled
          onClick={handlePointWithdrawal}
          disabled={isLoadingUserData || (userData && userData.point === 0)}
        >
          전액 인출하기
        </RoundBtnFilled>
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
        ) : data && data.pages[0].content.length > 0 ? (
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
          <PaddingBox>포인트 내역이 없습니다.</PaddingBox>
        )}
      </ul>
    </ContainerSection>
  );
};

export default MyPoint;
