'use client';

import { Divider } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';

import ChatSkeleton from '../../components/listItems/skeletons/chatSkeleton';

import Header from '@/components/layout/header';
import ChatItem from '@/components/listItems/chatItem';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getChatList } from '@/services/chatService';
import Container from '@/styles/container';
import PaddingBox from '@/styles/paddingBox';

const Chat = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['chatList'],
    queryFn: ({ pageParam = 0 }) =>
      getChatList({
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
  });

  const lastElementRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <>
      <Header text="채팅 목록" buttonRight="home" />
      <Container>
        {status === 'pending' ? (
          <>
            <ChatSkeleton />
            <ChatSkeleton />
            <ChatSkeleton />
            <ChatSkeleton />
            <ChatSkeleton />
          </>
        ) : status === 'error' ? (
          <p>Error: {error.message}</p>
        ) : data && data.pages.length > 0 ? (
          <>
            {data.pages.map((page) =>
              page.content.map((item, index) => (
                <div
                  key={item.chatRoomId}
                  ref={
                    index === page.content.length - 1 ? lastElementRef : null
                  }
                >
                  <ChatItem item={item} />
                  <Divider />
                </div>
              )),
            )}
          </>
        ) : (
          <PaddingBox zero>합류 가능한 모임이 없습니다.</PaddingBox>
        )}
      </Container>
    </>
  );
};

export default Chat;
