import { http, HttpResponse } from 'msw';
import { INDIVIDUAL_ORDER_LIST_API_URL } from '@/services/individualOrderService';
import { paginatedIndividualOrders, individualOrders } from '../mockData/individualOrders';

export const individualOrderHandlers = [
  http.get('/api/users/meetings/:meetingId/individual-order', (req) => {
    const { request } = req;
    const meetingId = Number(req.params.meetingId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));

      const paginatedResponse = paginatedIndividualOrders[meetingId]?.[pageParam];

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

  http.get('/api/users/meetings/:meetingId/individual-order/purchaseId', (req) => {
    const meetingId = Number(req.params.meetingId);
    const purchaseId = Number(req.params.purchaseId);

    const individualOrder = individualOrders.filter(
      (individualOrder) => individualOrder.meetingId === meetingId,
    );
    const individualPurchase = individualOrder.find((p) => p.purchaseId === purchaseId);

    if (individualPurchase) {
      return HttpResponse.json(individualPurchase);
    }

    return HttpResponse.status(404).json({
      message: 'Individual order items not found',
    });
  }),
];
