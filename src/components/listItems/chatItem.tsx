'use client';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import { ChatListType } from '@/types/chatTypes';

const CardContainer = styled.div`
  display: flex;
  padding: 1rem;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: var(--font-size-lg);
  display: flex;
  gap: 0.3rem;
`;

// const lastMessage = styled.p`
//   color: var(--gray400);
// `;

const ChatItem: React.FC<{ item: ChatListType }> = ({ item }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chat/${item.chatRoomId}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <Title>{item.name}</Title>
      {/* <lastMessage>{item.lastMessage}</lastMessage> */}
    </CardContainer>
  );
};

export default ChatItem;
