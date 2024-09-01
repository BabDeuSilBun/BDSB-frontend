import { apiClientWithCredentials } from './apiClient';

import { ChatListsResponse, ChatMessageType } from '@/types/chatTypes';
import { GetListParams } from '@/types/types';

export const CHAT_LIST_API_URL = '/api/users/chat-rooms';
const CHAT_API_URL = '/api/users/chat-rooms/{chatRoomId}';

export const getChatList = async ({
  page = 0,
  size = 10,
}: GetListParams): Promise<ChatListsResponse> => {
  try {
    const response = await apiClientWithCredentials.get<ChatListsResponse>(
      CHAT_LIST_API_URL,
      {
        params: {
          size,
          page,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching chatroom list:', error);
    throw new Error(
      '채팅 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getChatDetail = async (
  chatRoomId: number,
): Promise<ChatMessageType> => {
  try {
    const response = await apiClientWithCredentials.get(
      CHAT_API_URL.replace('{chatRoomId}', chatRoomId.toString()),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching chatroom details:', error);
    throw new Error(
      '해당 채팅 메세지 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
