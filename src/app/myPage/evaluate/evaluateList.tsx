'use client';

import { Divider, Flex } from '@chakra-ui/react';
import styled from 'styled-components';

import GroupIcon from '@/components/svg/group';

const HeadCount = styled.div`
  display: flex;
  gap: 8px;
  justify-content: right;
  font-size: var(--font-size-sm);
`;

const EvaluateList = ({
  evaluations,
}: {
  evaluations: { content: string; count: number }[];
}) => (
  <>
    {evaluations.map((item, index) => (
      <li key={index}>
        <Flex justify="space-between" p="1rem">
          <p>{item.content}</p>
          <HeadCount>
            <GroupIcon color="var(--gray300)" width={18} height={18} />
            <span>{item.count}</span>
          </HeadCount>
        </Flex>
        {index < evaluations.length - 1 && <Divider />}
      </li>
    ))}
  </>
);

export default EvaluateList;
