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
      senderId: 5,
      nickname: '심심한다람쥐111',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '메세지 확인이 늦었습니다. 1층에서 올라가는 중입니다.',
      createdAt: '2024-09-01T17:00:22.456Z',
      updatedAt: '2024-09-01T17:00:22.456Z',
    },
    {
      senderId: 1,
      nickname: '배고픈대학원생123',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '다들 어디쯤이세요?',
      createdAt: '2024-09-01T16:59:07.407Z',
      updatedAt: '2024-09-01T16:59:07.407Z',
    },
    {
      senderId: 4,
      nickname: '친절한코끼리234',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '네~ 이따 봐요~',
      createdAt: '2024-09-01T16:57:22.456Z',
      updatedAt: '2024-09-01T16:57:22.456Z',
    },
    {
      senderId: 3,
      nickname: '대단한고양이155',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '네, 알겠습니다.',
      createdAt: '2024-09-01T16:57:22.456Z',
      updatedAt: '2024-09-01T16:57:22.456Z',
    },
    {
      senderId: 2,
      nickname: '소심한토끼224',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '네 좋습니다~~',
      createdAt: '2024-09-01T16:56:10.123Z',
      updatedAt: '2024-09-01T16:56:10.123Z',
    },
    {
      senderId: 1,
      nickname: '배고픈대학원생123',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: 'A동 휴게실에 사람이 너무 많은데 2층에서 볼까요?',
      createdAt: '2024-09-01T16:55:07.407Z',
      updatedAt: '2024-09-01T16:55:07.407Z',
    },
    {
      senderId: 1,
      nickname: '배고픈대학원생123',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '넵 ㅎㅎ',
      createdAt: '2024-09-01T16:46:24.456Z',
      updatedAt: '2024-09-01T16:46:24.456Z',
    },
    {
      senderId: 5,
      nickname: '심심한다람쥐111',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '손 부족하시면 불러주세요!',
      createdAt: '2024-09-01T16:46:23.456Z',
      updatedAt: '2024-09-01T16:46:23.456Z',
    },
    {
      senderId: 4,
      nickname: '친절한코끼리234',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '감사합니다 ㅎㅎ',
      createdAt: '2024-09-01T16:46:22.456Z',
      updatedAt: '2024-09-01T16:46:22.456Z',
    },
    {
      senderId: 1,
      nickname: '배고픈대학원생123',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '라이더님 연락 오셔서 출발할게요~',
      createdAt: '2024-09-01T16:45:07.407Z',
      updatedAt: '2024-09-01T16:45:07.407Z',
    },
    {
      senderId: 2,
      nickname: '소심한토끼224',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '빨리 왔으면 좋겠어요 ㅠㅠ 배고파요..',
      createdAt: '2024-09-01T16:34:10.123Z',
      updatedAt: '2024-09-01T16:34:10.123Z',
    },
    {
      senderId: 5,
      nickname: '심심한다람쥐111',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '메세지 확인이 늦었습니다. 1층에서 올라가는 중입니다.',
      createdAt: '2024-09-01T17:00:22.456Z',
      updatedAt: '2024-09-01T17:00:22.456Z',
    },
    {
      senderId: 1,
      nickname: '배고픈대학원생123',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '다들 어디쯤이세요?',
      createdAt: '2024-09-01T16:59:07.407Z',
      updatedAt: '2024-09-01T16:59:07.407Z',
    },
    {
      senderId: 4,
      nickname: '친절한코끼리234',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '네~ 이따 봐요~',
      createdAt: '2024-09-01T16:57:22.456Z',
      updatedAt: '2024-09-01T16:57:22.456Z',
    },
    {
      senderId: 3,
      nickname: '대단한고양이155',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '네, 알겠습니다.',
      createdAt: '2024-09-01T16:57:22.456Z',
      updatedAt: '2024-09-01T16:57:22.456Z',
    },
    {
      senderId: 2,
      nickname: '소심한토끼224',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '네 좋습니다~~',
      createdAt: '2024-09-01T16:56:10.123Z',
      updatedAt: '2024-09-01T16:56:10.123Z',
    },
    {
      senderId: 1,
      nickname: '배고픈대학원생123',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: 'A동 휴게실에 사람이 너무 많은데 2층에서 볼까요?',
      createdAt: '2024-09-01T16:55:07.407Z',
      updatedAt: '2024-09-01T16:55:07.407Z',
    },
    {
      senderId: 1,
      nickname: '배고픈대학원생123',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '넵 ㅎㅎ',
      createdAt: '2024-09-01T16:46:24.456Z',
      updatedAt: '2024-09-01T16:46:24.456Z',
    },
    {
      senderId: 5,
      nickname: '심심한다람쥐111',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '손 부족하시면 불러주세요!',
      createdAt: '2024-09-01T16:46:23.456Z',
      updatedAt: '2024-09-01T16:46:23.456Z',
    },
    {
      senderId: 4,
      nickname: '친절한코끼리234',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '감사합니다 ㅎㅎ',
      createdAt: '2024-09-01T16:46:22.456Z',
      updatedAt: '2024-09-01T16:46:22.456Z',
    },
    {
      senderId: 1,
      nickname: '배고픈대학원생123',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '라이더님 연락 오셔서 출발할게요~',
      createdAt: '2024-09-01T16:45:07.407Z',
      updatedAt: '2024-09-01T16:45:07.407Z',
    },
    {
      senderId: 2,
      nickname: '소심한토끼224',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '빨리 왔으면 좋겠어요 ㅠㅠ 배고파요..',
      createdAt: '2024-09-01T16:34:10.123Z',
      updatedAt: '2024-09-01T16:34:10.123Z',
    },
    {
      senderId: 1,
      nickname: '배고픈대학원생123',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '주문 들어갔네요~',
      createdAt: '2024-09-01T16:32:07.407Z',
      updatedAt: '2024-09-01T16:32:07.407Z',
    },
    {
      senderId: 5,
      nickname: '심심한다람쥐111',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '만나서 반갑습니다!',
      createdAt: '2024-09-01T15:58:22.456Z',
      updatedAt: '2024-09-01T15:58:22.456Z',
    },
    {
      senderId: 4,
      nickname: '친절한코끼리234',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '안녕하세요! 저도 처음이에요.',
      createdAt: '2024-09-01T15:57:22.456Z',
      updatedAt: '2024-09-01T15:57:22.456Z',
    },
    {
      senderId: 3,
      nickname: '대단한고양이155',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '반갑습니다',
      createdAt: '2024-09-01T15:57:22.456Z',
      updatedAt: '2024-09-01T15:57:22.456Z',
    },
    {
      senderId: 1,
      nickname: '배고픈대학원생123',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '안녕하세요~ 처음인데 신기하네요.',
      createdAt: '2024-09-01T15:55:07.407Z',
      updatedAt: '2024-09-01T15:55:07.407Z',
    },
    {
      senderId: 2,
      nickname: '소심한토끼224',
      image: 'https://via.placeholder.com/150x150',
      type: 'CHAT',
      content: '안녕하세요!',
      createdAt: '2024-09-01T13:56:10.123Z',
      updatedAt: '2024-09-01T13:56:10.123Z',
    },
  ],
  2: [
    {
      senderId: 201,
      nickname: '행복한쿼카233',
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
