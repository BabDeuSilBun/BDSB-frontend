import { http, HttpResponse } from 'msw';

import {
  paginatedPostIndividualPurchases,
  postIndividualPurchases,
} from '../mockData/postIndividualPurchases';

export const postIndividualPurchaseHandlers = [
  http.get(
    '/api/users/meetings/:meetingId/snapshots/post-purchases/individuals',
    (req) => {
      const { request } = req;
      const meetingId = Number(req.params.meetingId);
      const urlString = request.url.toString();

      try {
        const url = new URL(urlString);
        const pageParam = Number(url.searchParams.get('page')) || 0;

        const paginatedResponse =
          paginatedPostIndividualPurchases[meetingId]?.[pageParam];

        if (!paginatedResponse) {
          return HttpResponse.json({ message: 'Page not found' });
        }

        return HttpResponse.json({
          ...paginatedResponse,
        });
      } catch (error) {
        console.error('Error parsing URL:', error);
        return HttpResponse.status(500).json({ message: 'Error parsing URL' });
      }
    },
  ),

  http.get(
    '/api/users/meetings/:meetingId/snapshots/post-purchases/individuals/:menuId',
    (req) => {
      const meetingId = Number(req.params.meetingId);
      const menuId = Number(req.params.menuId);

      const purchases = postIndividualPurchases.find(
        (purchase) => purchase.meetingId === meetingId,
      );

      if (!purchases) {
        return HttpResponse.status(404).json({
          message: 'Meeting not found',
        });
      }

      const individualPurchase = purchases.purchases.find(
        (p) => p.menuId === menuId,
      );

      if (individualPurchase) {
        return HttpResponse.json(individualPurchase);
      }

      return HttpResponse.status(404).json({
        message: 'Individual Purchase Item not found',
      });
    },
  ),
];
