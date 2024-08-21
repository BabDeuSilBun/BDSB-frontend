import { http, HttpResponse } from 'msw';

import {
  individualPurchases,
  paginatedIndividualPurchases,
} from '../mockData/individualPurchases';

export const individualPurchaseHandlers = [
  http.get('/api/users/meetings/:meetingId/individual-purchases', (req) => {
    const { request } = req;
    const meetingId = Number(req.params.meetingId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const pageParam = Number(url.searchParams.get('page')) || 0;

      const paginatedResponse =
        paginatedIndividualPurchases[meetingId]?.[pageParam];

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
  }),

  http.get(
    '/api/users/meetings/:meetingId/individual-purchases/purchaseId',
    (req) => {
      const meetingId = Number(req.params.meetingId);
      const purchaseId = Number(req.params.purchaseId);

      const purchases = individualPurchases[meetingId];
      if (!purchases) {
        return HttpResponse.status(404).json({
          message: 'Meeting not found',
        });
      }

      const individualPurchase = purchases.find(
        (p) => p.purchaseId === purchaseId,
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
