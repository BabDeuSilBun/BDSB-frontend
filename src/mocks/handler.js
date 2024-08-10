import { http, HttpResponse } from 'msw';
import { TEAM_ORDERLIST_API_URL } from '@/services/teamOrderService';
import { RESTAURANT_LIST_API_URL } from '@/services/restaurantService';

import { applyFiltersAndSorting } from './filteringAndSorting';
import { paginatedStores, stores } from './restaurants';
import meetings from './meetings';

export const handler = [
  http.get(RESTAURANT_LIST_API_URL, (req) => {
    const { request } = req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const sortCriteria = url.searchParams.get('sortCriteria');
      const campusFilter = url.searchParams.get('campusFilter');
      const foodCategoryFilter = url.searchParams.get('foodCategoryFilter');
      const searchMenu = url.searchParams.get('searchMenu');

      const paginatedResponse = paginatedStores[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { campusFilter, foodCategoryFilter, searchMenu },
        sortCriteria,
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  http.get(TEAM_ORDERLIST_API_URL, () => {
    return HttpResponse.json(meetings);
  }),

  http.get('/api/stores/:storeId', (req) => {
    const storeId = Number(req.params.storeId);
    const store = stores.find((s) => s.storeId === storeId);
    if (store) {
      return HttpResponse.json(store);
    }
    return HttpResponse.status(404).json({ message: 'Store not found' });
  }),

  http.get('/api/users/meetings/:meetingId/headcount', (req) => {
    const meetingId = Number(req.params.meetingId);
    const headcount = {
      currentHeadCount: 5,
    };
    return HttpResponse.json(headcount);
  }),
];
