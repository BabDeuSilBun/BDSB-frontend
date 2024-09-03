'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

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
// import { ChatMessagesResponse } from '@/types/chatTypes';

const SOCKET_URL = `ws://${process.env.NEXT_PUBLIC_BACKEND_URL}/stomp`;

const ContainerBox = styled(Container)`
  background: var(--gray100);
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

const ScrollContainer = styled.section`
  padding: 1rem 0;
  flex-grow: 1;
  overflow-y: auto;
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
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // const [messages, setMessages] = useState<ChatMessagesResponse[]>([]);
  const [inputValue, setInputValue] = useState('');
  const client = useRef<CompatClient | null>(null);
  const prevScrollHeightRef = useRef(0);
  const prevScrollTopRef = useRef(0);
  const isManualScroll = useRef(false);

  const { data: myData } = useQuery({
    queryKey: ['MyData'],
    queryFn: getMyData,
  });

  // 이전 메시지 로드
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['chatMessages', chatRoomId],
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

  // useEffect(() => {
  //   if (data) setMessages(data);
  // }, []);

  // WebSocket 연결 설정 및 메시지 수신 처리
  useEffect(() => {
    if (myData) {
      const socket = new SockJS(SOCKET_URL);
      client.current = Stomp.over(socket);

      client.current.connect({}, () => {
        // 특정 채팅방 구독
        client.current?.subscribe(
          `/meeting/chat-rooms/${chatRoomId}`,
          (message) => {
            if (message.body) {
              // const newMessage = JSON.parse(message.body);
              // setMessages((prev) => [...prev, newMessage]);
            }
          },
        );
      });

      return () => {
        client.current?.disconnect();
      };
    }
  }, [myData, chatRoomId]);

  // 수동 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        isManualScroll.current = true;
      }
    };

    chatContainerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      // chatContainerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 스크롤 위치를 저장
  useLayoutEffect(() => {
    if (chatContainerRef.current && isFetchingNextPage) {
      prevScrollTopRef.current = chatContainerRef.current.scrollTop;
      prevScrollHeightRef.current = chatContainerRef.current.scrollHeight;
    }
  }, [isFetchingNextPage]);

  // 데이터가 로드된 후 스크롤 위치를 복구
  useLayoutEffect(() => {
    if (chatContainerRef.current && !isFetchingNextPage) {
      const newScrollHeight = chatContainerRef.current.scrollHeight;
      const scrollDelta = newScrollHeight - prevScrollHeightRef.current;

      // 스크롤 위치를 수동으로 조작한 경우에만 위치 복구
      if (isManualScroll.current) {
        chatContainerRef.current.scrollTop =
          prevScrollTopRef.current + scrollDelta;
        isManualScroll.current = false;
      } else {
        chatContainerRef.current.scrollTop =
          prevScrollTopRef.current + scrollDelta;
      }
    }
  }, [data, isFetchingNextPage]);

  // 컴포넌트가 처음 렌더링될 때 스크롤을 맨 아래로 설정ㄴ
  useEffect(() => {
    if (chatContainerRef.current && status === 'success') {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (myData && client.current && inputValue.trim() !== '') {
      const message = {
        content: inputValue,
      };

      client.current.send(
        `/socket/chat-rooms/${chatRoomId}`,
        {},
        JSON.stringify(message),
      );
      setInputValue(''); // 입력창 초기화
    }
  };

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
            {data.pages.map((page, pageIndex) =>
              page.content.map((message, index) => (
                <div
                  key={message.createdAt}
                  ref={
                    pageIndex === data.pages.length - 1 &&
                    index === page.content.length - 1
                      ? lastElementRef
                      : null
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>
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
