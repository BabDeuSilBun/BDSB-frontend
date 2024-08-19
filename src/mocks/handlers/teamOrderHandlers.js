import { http, HttpResponse } from 'msw';
import { TEAM_ORDER_LIST_API_URL } from '@/services/teamOrderService';

import { applyFiltersAndSorting } from '../filteringAndSorting';
import { meetings, paginatedMeetings } from '../mockData/meetings';

export const teamOrderHandlers = [
  http.get(TEAM_ORDER_LIST_API_URL, (req) => {
    const { request } = req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const searchMenu = url.searchParams.get('searchMenu');
      const sortCriteria = url.searchParams.get('sortCriteria');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));
      const foodCategoryFilter = url.searchParams.get('foodCategoryFilter');

      const paginatedResponse = paginatedMeetings[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { foodCategoryFilter, searchMenu, size },
        sortCriteria,
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  http.get('/api/users/meetings/:meetingId', (req) => {
    const meetingId = Number(req.params.meetingId);
    const meeting = meetings.find((m) => m.meetingId === meetingId);
    if (meeting) {
      return HttpResponse.json(meeting);
    }
    return HttpResponse.status(404).json({ message: 'Meeting not found' });
  }),

  http.get('/api/users/meetings/:meetingId/headcount', () => {
    const headcount = {
      currentHeadCount: 5,
    };
    return HttpResponse.json(headcount);
  }),
];
