'use client';

import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';

// 스타일링된 div 컴포넌트 생성
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default function Loading() {
  return (
    <Wrapper>
      <Spinner
        color="var(--primary)"
        size="xl"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
      />
    </Wrapper>
  );
}
