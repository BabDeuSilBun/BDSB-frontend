'use client';

import { Divider, Flex, Skeleton } from '@chakra-ui/react';
import styled from 'styled-components';

import GroupIcon from '@/components/svg/group';

const HeadCount = styled.div`
  display: flex;
  gap: 8px;
  justify-content: right;
  font-size: var(--font-size-sm);
`;

const LoadingSkeleton = () => (
  <li>
    <Flex justify="space-between" p="1rem">
      <Skeleton w="32" h="6" />
      <HeadCount>
        <GroupIcon color="var(--gray300)" width={18} height={18} />
        <Skeleton w="4" h="6" />
      </HeadCount>
    </Flex>
    <Divider />
  </li>
);

export default LoadingSkeleton;
