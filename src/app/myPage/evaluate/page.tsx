'use client';

import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import EvaluationSection from './evaluationSection';

import Header from '@/components/layout/header';
import { getMyEvaluates } from '@/services/myDataService';

const Container = styled.div`
  background: var(--gray100);
  height: 100vh;
`;

const EvaluatesContainer = styled.section`
  margin-top: 70px;
  background: white;
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

  return (
    <Container>
      <Header text="평가 상세" buttonLeft="back" />
      <EvaluatesContainer>
        <EvaluationSection
          title="받은 긍정 평가 배지"
          imageSrc="/smiley.svg"
          evaluations={data?.positiveEvaluate || []}
          isLoading={isLoading}
          isError={isError}
        />
        <EvaluationSection
          title="받은 부정 평가 배지"
          imageSrc="/sadly.svg"
          evaluations={data?.negativeEvaluate || []}
          isLoading={isLoading}
          isError={isError}
        />
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
