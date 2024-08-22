'use client';

import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';
import { formatDateTime } from '@/utils/formateDateTime';
import { PointType } from '@/types/myDataTypes';

const Flex1 = styled.div`
  flex: 1;
`;

const Container = styled.li`
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

const PointItem: React.FC<{ item: PointType }> = ({ item }) => {
  const { formattedMonthDay, formattedTime } = formatDateTime(item.createdAt);

  return (
    <Container>
      <span>{formattedMonthDay}</span>
      <div>
        <p>{item.store}</p>
        <Contents>
          <span>{formattedTime}</span>
          <Divider orientation="vertical" />
          <span>{item.content}</span>
        </Contents>
      </div>
      <Flex1 />
      <p>{`${item.type === '적립' ? '+' : '-'} ${item.amount} P`}</p>
    </Container>
  );
};

export default PointItem;
