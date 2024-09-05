'use client';

import Image from 'next/image';

import styled from 'styled-components';

import { ChatMessageType } from '@/types/chatTypes';
import { formatDateTime } from '@/utils/formateDateTime';

const Container = styled.div`
  padding-left: 1rem;
  display: flex;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
  width: 45px;
  height: 45px;
  background: var(--primary);
  position: relative;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
  max-width: 13.5rem;

  span {
    background: white;
    border: 1px solid var(--gray200);
    border-radius: 2px 10px 10px 10px;
    padding: 0.8rem;
  }
`;

const Time = styled.div`
  font-size: var(--font-size-xs);
  color: var(--gray300);
  align-self: end;
  margin-left: 0.5rem;
`;

const MessageItem: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  const { formattedTime } = formatDateTime(message.updatedAt);

  return (
    <Container>
      <ImageWrapper>
        {message.profileImage && (
          <Image
            src={message.profileImage}
            alt={`${message.nickname}님 프로필 이미지`}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
      </ImageWrapper>
      <MessageContainer>
        <p>{message.nickname}</p>
        <span>{message.content}</span>
      </MessageContainer>
      <Time>{formattedTime}</Time>
    </Container>
  );
};

export default MessageItem;
