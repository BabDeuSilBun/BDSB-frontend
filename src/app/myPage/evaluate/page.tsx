'use client';

import Image from 'next/image';

import { Divider, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Header from '@/components/layout/header';
import GroupIcon from '@/components/svg/group';
import { getMyEvaluates } from '@/services/myDataService';

const Container = styled.div`
  background: var(--gray100);
  height: 100vh;
`;

const EvaluatesContainer = styled.section`
  margin-top: 70px;
  background: white;
`;

const Title = styled.h2`
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-xl);
`;
const HeadCount = styled.div`
  display: flex;
  gap: 8px;
  justify-content: right;
  font-size: var(--font-size-sm);
`;

const Info = styled.div`
  font-size: var(--font-size-xs);
  color: var(--gray400);
  padding: 1rem;
  line-height: 1.6rem;
`;

const EvaluatesDetail = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['myEvaluates'],
    queryFn: getMyEvaluates,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>에러가 발생했습니다.</p>;

  return (
    <Container>
      <Header text="평가 상세" buttonLeft="back" />
      <EvaluatesContainer>
        <div>
          <Flex align="center" gap="1" p="1rem">
            <Image
              src={'/smiley.svg'}
              alt="웃는 이미지"
              width={32}
              height={32}
            />
            <Title>받은 긍정 평가 배지</Title>
          </Flex>
          <ul>
            {data.positiveEvaluate.map((item, index) => (
              <li key={index}>
                <Flex justify="space-between" p="1rem">
                  <p>{item.content}</p>
                  <HeadCount>
                    <GroupIcon color="var(--gray300)" width={18} height={18} />
                    <span>{item.count}</span>
                  </HeadCount>
                </Flex>
                {index < data.positiveEvaluate.length - 1 && <Divider />}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Flex align="center" gap="1" p="1rem" mt="2rem">
            <Image
              src={'/sadly.svg'}
              alt="슬픈 이미지"
              width={32}
              height={32}
            />
            <Title>받은 부정 평가 배지</Title>
          </Flex>
          <ul>
            {data.negativeEvaluate.map((item, index) => (
              <li key={index}>
                <Flex justify="space-between" p="1rem">
                  <p>{item.content}</p>
                  <HeadCount>
                    <GroupIcon color="var(--gray300)" width={18} height={18} />
                    <span>{item.count}</span>
                  </HeadCount>
                </Flex>
                {index < data.negativeEvaluate.length - 1 && <Divider />}
              </li>
            ))}
          </ul>
        </div>
      </EvaluatesContainer>
      <Info>
        <p>· 받은 부정 평가 배지는 나에게만 보입니다.</p>
        <p>
          · 부정 평가 배지가 일정 수준 이상을 넘어가는 경우 이용 제한을 받을 수
          있습니다.
        </p>
      </Info>
    </Container>
  );
};

export default EvaluatesDetail;
