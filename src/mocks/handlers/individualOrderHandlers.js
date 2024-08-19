import { http, HttpResponse } from 'msw';

import {
  individualOrders,
  paginatedIndividualOrders,
} from '../mockData/individualOrders';

export const individualOrderHandlers = [
  http.get('/api/users/meetings/:meetingId/individual-order', (req) => {
    const { request } = req;
    const meetingId = Number(req.params.meetingId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const pageParam = Number(url.searchParams.get('page')) || 0;

      const paginatedResponse =
        paginatedIndividualOrders[meetingId]?.[pageParam];

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
    '/api/users/meetings/:meetingId/individual-order/purchaseId',
    (req) => {
      const meetingId = Number(req.params.meetingId);
      const purchaseId = Number(req.params.purchaseId);

      const matchingOrders = individualOrders.filter(
        (order) => order.meetingId === meetingId,
      );
      const individualPurchase = matchingOrders.find(
        (p) => p.individualPurchaseId === purchaseId,
      );

      if (individualPurchase) {
        return HttpResponse.json(individualPurchase);
      }

      return HttpResponse.status(404).json({
        message: 'Individual order items not found',
      });
    },
  ),
];
