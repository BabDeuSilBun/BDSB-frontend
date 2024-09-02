import {
  ChatListsResponse,
  ChatListType,
  ChatMessagesResponse,
  ChatMessageType,
} from '@/types/chatTypes';

const chatList: ChatListType[] = [
  {
    name: '교촌치킨',
    chatRoomId: 1,
  },
  {
    name: '아마스빈 버블티',
    chatRoomId: 2,
  },
];

const pageSize = 10;
const totalPages = Math.ceil(chatList.length / pageSize);

export const paginatedChatLists: ChatListsResponse[] = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize;
    const end = start + pageSize;
    const content = chatList.slice(start, end);
    const isLastPage = index === totalPages - 1;

    return {
      content,
      pageable: {
        offset: start,
        pageNumber: index,
        pageSize,
        sort: {
          empty: true,
          unsorted: true,
          sorted: false,
        },
        paged: true,
        unpaged: false,
      },
      last: isLastPage,
      totalPages,
      size: pageSize,
      first: index === 0,
      number: index,
      numberOfElements: content.length,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      totalElements: chatList.length,
      empty: content.length === 0,
    };
  },
);

const allMessage: { [key: number]: ChatMessageType[] } = {
  1: [
    {
      senderId: 101,
      nickname: 'Alice',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: 'Hello everyone!',
      createdAt: '2024-09-01T16:55:07.407Z',
      updatedAt: '2024-09-01T16:55:07.407Z',
    },
    {
      senderId: 102,
      nickname: 'Bob',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: "Hi Alice, how's it going?",
      createdAt: '2024-09-01T16:56:10.123Z',
      updatedAt: '2024-09-01T16:56:10.123Z',
    },
    {
      senderId: 101,
      nickname: 'Alice',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: 'Doing well, thanks! How about you?',
      createdAt: '2024-09-01T16:57:22.456Z',
      updatedAt: '2024-09-01T16:57:22.456Z',
    },
  ],
  2: [
    {
      senderId: 201,
      nickname: 'Charlie',
      image: 'https://via.placeholder.com/150x150',
      type: 'ENTER',
      content: 'Charlie has joined the room.',
      createdAt: '2024-09-01T17:00:00.000Z',
      updatedAt: '2024-09-01T17:00:00.000Z',
    },
    {
      senderId: 202,
      nickname: 'Dave',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: 'Welcome, Charlie!',
      createdAt: '2024-09-01T17:01:00.000Z',
      updatedAt: '2024-09-01T17:01:00.000Z',
    },
    {
      senderId: 201,
      nickname: 'Charlie',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: 'Thanks, Dave! Happy to be here.',
      createdAt: '2024-09-01T17:02:30.000Z',
      updatedAt: '2024-09-01T17:02:30.000Z',
    },
    {
      senderId: 203,
      nickname: 'Eve',
      image: null,
      type: 'CHAT',
      content: "Hi everyone, what's the topic today?",
      createdAt: '2024-09-01T17:03:45.000Z',
      updatedAt: '2024-09-01T17:03:45.000Z',
    },
    {
      senderId: 202,
      nickname: 'Dave',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: "We're discussing the new project proposal.",
      createdAt: '2024-09-01T17:05:00.000Z',
      updatedAt: '2024-09-01T17:05:00.000Z',
    },
  ],
};

const createPages = (items: ChatMessageType[]) => {
  const totalPages = Math.ceil(items.length / pageSize);

  return Array.from({ length: totalPages }, (_, index) => {
    const start = index * pageSize;
    const end = start + pageSize;
    const content = items.slice(start, end);
    const isLastPage = index === totalPages - 1;

    return {
      content,
      pageable: {
        offset: start,
        pageNumber: index,
        pageSize,
        sort: {
          empty: true,
          unsorted: true,
          sorted: false,
        },
        paged: true,
        unpaged: false,
      },
      first: index === 0,
      last: isLastPage,
      totalPages: Math.ceil(items.length / pageSize),
      size: pageSize,
      number: index,
      numberOfElements: content.length,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      totalElements: items.length,
      empty: content.length === 0,
    };
  });
};

// 특정 chatId에 대한 페이지 생성 함수
export const getPaginatedChatMessages = (
  chatroomId: number,
): ChatMessagesResponse[] => {
  const items = allMessage[chatroomId] || [];
  return createPages(items);
};
