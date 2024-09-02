import { http, HttpResponse } from 'msw';

import { CHAT_LIST_API_URL } from '../../services/chatService';
import {
  getPaginatedChatMessages,
  paginatedChatLists,
} from '../mockData/chats';

export const myChatHandlers = [
  http.get('/api/users/chat-rooms/:chatRoomId', ({ request, params }) => {
    const { chatRoomId } = params;
    try {
      const url = new URL(request.url);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size')) || 10;

      const paginatedResponse = getPaginatedChatMessages(chatRoomId)[pageParam];

      if (size !== 10) paginatedResponse.items.content.slice(0, size);

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Chat list not found' });
      }

      return HttpResponse.json({
        ...paginatedResponse,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  http.get(CHAT_LIST_API_URL, async (req) => {
    const { request } = await req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const paginatedResponse = paginatedChatLists[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      return HttpResponse.json(paginatedResponse);
    } catch (error) {
      return HttpResponse.status(404).json({
        message: `Campus list not found: ${error}`,
      });
    }
  }),
];
