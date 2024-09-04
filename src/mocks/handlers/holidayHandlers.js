import { http, HttpResponse } from 'msw';

import { getPaginatedHolidays } from '../mockData/holidays';

export const holidayHandlers = [
  http.get('/api/stores/:storeId/holidays', ({ request, params }) => {
    const { storeId } = params;

    try {
      const url = new URL(request.url);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size')) || 10;

      const paginatedResponse = getPaginatedHolidays(
        Number(storeId),
        pageParam,
      );

      if (size !== 10) {
        paginatedResponse.content = paginatedResponse.content.slice(0, size);
      }

      return HttpResponse.json({
        content: paginatedResponse.content,
        totalElements: paginatedResponse.content.length,
        totalPages: paginatedResponse.totalPages,
        size: paginatedResponse.content.length,
        number: pageParam,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        first: pageParam === 0,
        last: pageParam === paginatedResponse.totalPages - 1,
        numberOfElements: paginatedResponse.content.length,
        pageable: {
          offset: pageParam * size,
          pageNumber: pageParam,
          pageSize: size,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          paged: true,
          unpaged: false,
        },
        empty: paginatedResponse.content.length === 0,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),
];
