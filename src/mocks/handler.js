import { http, HttpResponse } from 'msw';
import { TEAM_ORDER_LIST_API_URL } from '@/services/teamOrderService';
import { RESTAURANT_LIST_API_URL } from '@/services/restaurantService';
import { MENU_LIST_API_URL } from '@/services/menuService';
import { applyFiltersAndSorting } from './filteringAndSorting';
import { paginatedStores, stores } from './mockData/restaurants';
import { paginatedMeetings } from './mockData/meetings';
import { Menus } from './mockData/menus';

export const handler = [
  http.get(RESTAURANT_LIST_API_URL, (req) => {
    const { request } = req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const searchMenu = url.searchParams.get('searchMenu');
      // const schoolId = url.searchParams.get('schoolId');
      const sortCriteria = url.searchParams.get('sortCriteria');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));
      const foodCategoryFilter = url.searchParams.get('foodCategoryFilter');

      const paginatedResponse = paginatedStores[pageParam];

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
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  http.get(TEAM_ORDER_LIST_API_URL, (req) => {
    const { request } = req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const searchMenu = url.searchParams.get('searchMenu');
      // const schoolId = url.searchParams.get('schoolId');
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
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  http.get('/api/stores/:storeId', (req) => {
    const storeId = Number(req.params.storeId);
    const store = stores.find((s) => s.storeId === storeId);
    if (store) {
      return HttpResponse.json(store);
    }
    return HttpResponse.status(404).json({ message: 'Store not found' });
  }),

  http.get('/api/users/meetings/:meetingId/headcount', () => {
    // const meetingId = Number(req.params.meetingId);
    const headcount = {
      currentHeadCount: 5,
    };
    return HttpResponse.json(headcount);
  }),

  http.get(MENU_LIST_API_URL.replace('{storeId}', ':storeId'), (req) => {
    const storeId = Number(req.params.storeId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size')) || 10;

      const paginatedResponse = getPaginatedMenus(storeId, size)[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.status(404).json({ message: 'Page not found' });
      }

      return HttpResponse.json(paginatedResponse);
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),
];