import { http, HttpResponse } from 'msw';

import { getPaginatedStoreImages } from '../mockData/storeImages';

export const storeImageHandlers = [
  http.get('/api/stores/:storeId/images', ({ request, params }) => {
    const { storeId } = params;

    try {
      const url = new URL(request.url);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size')) || 10;

      const paginatedResponse = getPaginatedStoreImages(storeId);

      if (!paginatedResponse) {
        return HttpResponse.json(
          { message: 'Store Images not found' },
          { status: 404 },
        );
      }

      if (size !== 10) {
        paginatedResponse.images.content =
          paginatedResponse.images.content.slice(0, size);
      }

      return HttpResponse.json({
        ...paginatedResponse,
        images: {
          ...paginatedResponse.images,
          number: pageParam,
          size,
        },
      });
    } catch (error) {
      console.error('Error handling store images request:', error);
      return HttpResponse.status(500).json({
        message: 'Error handling request',
      });
    }
  }),
];
