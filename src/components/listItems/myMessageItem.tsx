'use client';

import styled from 'styled-components';

import { ChatMessageType } from '@/types/chatTypes';
import { formatDateTime } from '@/utils/formateDateTime';

const Container = styled.div`
  padding-right: 1rem;
  display: flex;
  justify-content: end;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 0.5rem;
  max-width: 13.5rem;

  span {
    color: white;
    background: var(--purple400);
    border: 1px solid var(--gray200);
    border-radius: 10px 2px 10px 10px;
    padding: 0.8rem;
  }
`;

const Time = styled.div`
  font-size: var(--font-size-xs);
  color: var(--gray300);
  align-self: end;
`;

const MyMessageItem: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  const { formattedTime } = formatDateTime(message.updatedAt);

  return (
    <Container>
      <Time>{formattedTime}</Time>
      <MessageContainer>
        <span>{message.content}</span>
      </MessageContainer>
    </Container>
  );
};

export default MyMessageItem;
