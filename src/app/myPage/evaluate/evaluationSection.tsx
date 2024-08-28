'use client';

import Image from 'next/image';

import { Flex } from '@chakra-ui/react';
import styled from 'styled-components';

import EvaluateList from './evaluateList';
import LoadingSkeleton from './skeleton';

const Title = styled.h2`
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-xl);
`;

const EvaluationSection = ({
  title,
  imageSrc,
  evaluations,
  isLoading,
  isError,
}: {
  title: string;
  imageSrc: string;
  evaluations: { content: string; count: number }[];
  isLoading: boolean;
  isError: boolean;
}) => (
  <div>
    <Flex align="center" gap="1" p="1rem" mt="5">
      <Image src={imageSrc} alt={`${title} 이미지`} width={32} height={32} />
      <Title>{title}</Title>
    </Flex>
    <ul aria-label={`${title} 목록`}>
      {isError ? (
        <p>에러가 발생하였습니다.</p>
      ) : isLoading ? (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      ) : (
        <EvaluateList evaluations={evaluations} />
      )}
    </ul>
  </div>
);

export default EvaluationSection;
