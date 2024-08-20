'use client';

import { RoundBtnFilled, SmallRdBtn } from '@/styles/button';
import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';
import { formatDateTime } from '@/utils/formateDateTime';
import { useState } from 'react';
import Container from '@/styles/container';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMyData } from '@/services/myDataService';

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

const Flex1 = styled.div`
  flex: 1;
`;

const SortingBtns = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem;
`;

const ListItem = styled.li`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;

  p {
    font-weight: var(--font-semi-bold);
    font-size: var(--font-size-lg);
  }

  span {
    font-size: var(--font-size-sm);
    color: var(--caption);
    line-height: 1.8;
  }
`;

const Contents = styled.div`
  display: flex;
  height: 1.3rem;
  width: max-content;
  gap: 0.5rem;

  span {
    color: var(--caption);
  }
`;

const mockData = [
  {
    createdAt: '2024-07-19T06:36:00',
    store: '교촌치킨',
    type: '적립',
    content: '차액 적립',
    amount: 2000,
  },
  {
    createdAt: '2024-07-19T06:40:00',
    store: '아마스빈',
    type: '사용',
    content: '결제 시 사용',
    amount: 1000,
  },
];

const MyPoint = () => {
  const [activeBtn, setActiveBtn] = useState('전체');

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
        {mockData.map((item, index) => {
          const { formattedDate, formattedTime } = formatDateTime(
            item.createdAt,
          );
          return (
            <div key={index}>
              <ListItem>
                <span>{formattedDate}</span>
                <div>
                  <p>{item.store}</p>
                  <Contents>
                    <span>{formattedTime}</span>
                    <Divider orientation="vertical" />
                    <span>{item.content}</span>
                  </Contents>
                </div>
                <Flex1 />
                <p>{`${item.type === '적립' ? '+' : '-'} ${item.amount}P`}</p>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </ul>
    </ContainerSection>
  );
};

export default MyPoint;
