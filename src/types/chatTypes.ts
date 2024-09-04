import { Response } from './types';

export interface ChatListType {
  chatRoomId: number;
  name: string;
}

export interface ChatMessageType {
  type: string;
  senderId: number;
  nickname: string;
  image: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatListsResponse extends Response {
  content: ChatListType[];
}

export interface ChatMessagesResponse extends Response {
  content: ChatMessageType[];
}
