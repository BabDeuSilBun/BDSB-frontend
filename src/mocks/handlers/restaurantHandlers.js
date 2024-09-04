import { http, HttpResponse } from 'msw';

import { applyFiltersAndSorting } from '../filteringAndSorting';
import { paginatedCategories } from '../mockData/categories';
import { paginatedStores, stores } from '../mockData/restaurants';

import {
  CATEGORY_LIST_API_URL,
  RESTAURANT_LIST_API_URL,
} from '@/services/restaurantService';

export const restaurantHandlers = [
  http.get(RESTAURANT_LIST_API_URL, async (req) => {
    const { request } = await req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const keyword = url.searchParams.get('searchMenu');
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
        { foodCategoryFilter, keyword, size },
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

  http.get(CATEGORY_LIST_API_URL, async (req) => {
    const { request } = await req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const paginatedResponse = paginatedCategories[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      return HttpResponse.json(paginatedResponse);
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),
];
