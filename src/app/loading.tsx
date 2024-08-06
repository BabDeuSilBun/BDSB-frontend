'use client';

import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #123145;
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
