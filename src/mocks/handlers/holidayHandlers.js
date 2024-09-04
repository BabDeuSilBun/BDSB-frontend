import { http, HttpResponse } from 'msw';

import { getPaginatedHolidays } from '../mockData/holidays';

export const holidayHandlers = [
  http.get('/api/stores/:storeId/holidays', ({ request, params }) => {
    const { storeId } = params;

    try {
      const url = new URL(request.url);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size')) || 10;

      // Fetch the paginated holidays based on storeId, page, and size
      const paginatedResponse = getPaginatedHolidays(
        Number(storeId),
        pageParam,
        size,
      );

      return HttpResponse.json({
        content: paginatedResponse.content,
        totalElements: paginatedResponse.totalElements,
        totalPages: paginatedResponse.totalPages,
        size: paginatedResponse.size,
        number: pageParam,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        first: pageParam === 0,
        last: pageParam === paginatedResponse.totalPages - 1,
        numberOfElements: paginatedResponse.numberOfElements,
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
        empty: paginatedResponse.empty,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),
];
