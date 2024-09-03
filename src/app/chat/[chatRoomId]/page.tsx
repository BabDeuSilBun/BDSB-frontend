'use client';

// import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
// import SockJS from 'sockjs-client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Header from '@/components/layout/header';
import MessageItem from '@/components/listItems/messageItem';
import MyMessageItem from '@/components/listItems/myMessageItem';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getChatMessages } from '@/services/chatService';
import { getMyData } from '@/services/myDataService';
import Container from '@/styles/container';
import PaddingBox from '@/styles/paddingBox';

// const SOCKET_URL = `ws://${process.env.NEXT_PUBLIC_BACKEND_URL}/stomp`;

const ContainerBox = styled(Container)`
  background: var(--gray100);
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;
`;

const ScrollContainer = styled.section`
  flex-grow: 1; /* ScrollContainer가 남은 공간을 모두 차지하도록 */
  overflow-y: auto; /* ScrollContainer 내부에서만 스크롤 발생 */
  display: flex;
  flex-direction: column-reverse;
  gap: 1.5rem;
`;

const InputBox = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  background: white;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  width: 100vw;
  padding: 1rem 1rem 3rem 1rem;

  input {
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 1rem;
    border-radius: 50px 50px;
    background: var(--gray100);
  }

  button {
    position: absolute;
    right: 1.6rem;
    bottom: 3.5rem;
  }
`;

const ChatPage = () => {
  const params = useParams();
  const chatRoomId = params.chatRoomId as string;
  // const client = useRef<CompatClient | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState('');

  const { data: myData } = useQuery({
    queryKey: ['MyData'],
    queryFn: getMyData,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['restaurantsList', chatRoomId],
      queryFn: ({ pageParam = 0 }) =>
        getChatMessages({
          page: pageParam,
          chatRoomId: Number(chatRoomId),
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
      },
      enabled: !!myData,
    });

  const lastElementRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    rootMargin: '100% 0px 0px 0px',
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <>
      <Header text="채팅" buttonLeft="back" />
      <ContainerBox>
        {status === 'pending' ? (
          <>로딩중</>
        ) : status === 'error' ? (
          <PaddingBox>문의 내역을 불러오지 못했습니다.</PaddingBox>
        ) : data && myData && data.pages.length > 0 ? (
          <ScrollContainer ref={chatContainerRef}>
            {data.pages.map((page) =>
              page.content.map((message, index) => (
                <div
                  key={message.createdAt}
                  ref={
                    index === page.content.length - 1 ? lastElementRef : null
                  }
                >
                  {message.senderId === myData.userId ? (
                    <MyMessageItem message={message} />
                  ) : (
                    <MessageItem message={message} />
                  )}
                </div>
              )),
            )}
          </ScrollContainer>
        ) : (
          <PaddingBox>
            이전 기록이 없습니다. 가장 먼저 대화를 시작해보세요!
          </PaddingBox>
        )}
        <InputBox>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button>
            <Image
              src="/sendMessage.svg"
              alt="메세지 전송 버튼"
              width="24"
              height="24"
            />
          </button>
        </InputBox>
      </ContainerBox>
    </>
  );
};

export default ChatPage;
