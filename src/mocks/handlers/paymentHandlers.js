import { http, HttpResponse } from 'msw';
import { paymentResponse, paymentDoneResponse } from '@/mocks/mockData/payment';

export const paymentHandlers = [
  http.post('/api/users/meetings/:meetingId/purchases/payment', () => {
    try {
      return HttpResponse.json(paymentResponse);
    } catch (error) {
      return HttpResponse.status(500).json({
        message: `Failed to prepare payment: ${error}`,
      });
    }
  }),

  http.post('/api/users/meetings/:meetingId/purchases/payment/done', () => {
    try {
      return HttpResponse.json(paymentDoneResponse);
    } catch (error) {
      return HttpResponse.status(500).json({
        message: `Failed to verify payment: ${error}`,
      });
    }
  }),
];
