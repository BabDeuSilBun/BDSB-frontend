import { http, HttpResponse } from 'msw';

import { getPaginatedStoreImages } from '../mockData/storeImages';

export const storeImageHandlers = [
  http.get('/api/stores/:storeId/images', ({ request, params }) => {
    const { storeId } = params;

    try {
      const url = new URL(request.url);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size')) || 10;

      const paginatedResponse = getPaginatedStoreImages(
        Number(storeId),
        pageParam,
      );

      if (size !== 10) {
        paginatedResponse.content = paginatedResponse.content.slice(0, size);
        paginatedResponse.numberOfElements = paginatedResponse.content.length;
      }

      if (!paginatedResponse) {
        return HttpResponse.json(
          { message: 'Store Images not found' },
          { status: 404 },
        );
      }

      return HttpResponse.json({
        ...paginatedResponse,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),
];
