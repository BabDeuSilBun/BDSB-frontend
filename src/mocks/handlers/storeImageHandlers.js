import { http, HttpResponse } from 'msw';

import storeImages from '../mockData/storeImages';

export const storeImageHandlers = [
  http.get('/api/stores/:storeId/images', ({ params }) => {
    const { storeId } = params;
    const images = storeImages[Number(storeId)];

    if (!images) {
      return HttpResponse.json(
        { message: 'Store Images not found' },
        { status: 404 },
      );
    }

    return HttpResponse.json(images);
  }),
];
