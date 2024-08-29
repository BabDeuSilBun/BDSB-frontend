'use client';

import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Header from '@/components/layout/header';
import { getMyData } from '@/services/myDataService';
import Container from '@/styles/container';

const ContainerBox = styled(Container)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    margin-bottom: 1rem;
    font-size: var(--font-size-xs);
  }
`;

const Title = styled.h2`
  font-size: var(--font-size-xxl);
  font-weight: var(--font-semi-bold);

  span {
    font-size: var(--font-size-xxl);
    color: var(--primary);
  }
`;

const Box = styled.div`
  border: 2px solid var(--gray200);
  border-radius: var(--border-radius-lg);
  padding: 1rem;
  line-height: 2rem;

  h3 {
    font-weight: var(--font-semi-bold);
    margin-bottom: 0.5rem;
  }
`;

const ReviewLetter = () => {
  const nickname = '밥먹자';

  const { data } = useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  return (
    <>
      <Header text="거래 후기" buttonLeft="back" />
      <ContainerBox>
        <Title>
          <span>{nickname}</span>님이 보낸 <br /> 따듯한 후기가 도착했어요.
        </Title>
        <span>00님과 교촌 치킨(함께 식사) 모임을 함께 했어요.</span>
        <Box>
          <h3>To. {data?.nickname}</h3>
          <ul>
            <li>· 시간 약속을 잘 지켜요.</li>
            <li>· 소통이 잘 돼요.</li>
          </ul>
        </Box>
      </ContainerBox>
    </>
  );
};

export default ReviewLetter;
