'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
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
import { ChatMessageType } from '@/types/chatTypes';

const SOCKET_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/stomp`;

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
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const client = useRef<CompatClient | null>(null);

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
    rootMargin: '400px 0px 0px 0px',
  });

  useEffect(() => {
    if (data) {
      // 메시지를 상태로 설정
      setMessages(data.pages.flatMap((page) => page.content));
    }

    console.log(messages);
  }, [data]);

  // WebSocket 연결 설정 및 메시지 수신 처리
  useEffect(() => {
    if (myData) {
      const socket = new SockJS(SOCKET_URL);
      client.current = Stomp.over(socket);

      client.current.connect(
        {},
        () => {
          console.log('STOMP client connected successfully.');

          // 특정 채팅방 구독
          client.current?.subscribe(
            `/meeting/chat-rooms/${chatRoomId}`,
            (message) => {
              if (message.body) {
                const newMessage = JSON.parse(message.body);

                // 새로운 메시지를 상태에 추가
                setMessages((prevMessages) => [...prevMessages, newMessage]);
              }
            },
          );
        },
        (error: Error) => {
          console.error('STOMP client failed to connect:', error);
        },
      );

      return () => {
        if (client.current?.connected) {
          client.current.disconnect(() => {
            console.log('STOMP client disconnected.');
          });
        }
      };
    }
  }, [myData, chatRoomId]);

  // 컴포넌트가 처음 렌더링될 때 스크롤을 맨 아래로 설정
  useEffect(() => {
    if (chatContainerRef.current && status === 'success') {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, status]);

  const sendMessage = () => {
    if (myData && client.current) {
      if (!client.current.connected) {
        console.error('STOMP client is not connected.');
        return;
      }

      if (inputValue.trim() === '') {
        console.error('Input is empty.');
        return;
      }

      const message = {
        content: inputValue,
      };

      client.current.send(
        `/socket/chat-rooms/${chatRoomId}`,
        {},
        JSON.stringify(message),
      );
      setInputValue('');
    } else {
      console.error('STOMP client is not initialized.');
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
        ) : status === 'success' && myData ? (
          messages.length > 0 ? (
            <ScrollContainer ref={chatContainerRef}>
              {messages.map((message, index) => (
                <div
                  key={message.createdAt}
                  ref={index === messages.length - 1 ? lastElementRef : null}
                >
                  {message.senderId === myData.userId ? (
                    <MyMessageItem message={message} />
                  ) : (
                    <MessageItem message={message} />
                  )}
                </div>
              ))}
            </ScrollContainer>
          ) : (
            <PaddingBox>
              이전 기록이 없습니다. 가장 먼저 대화를 시작해보세요!
            </PaddingBox>
          )
        ) : null}
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
