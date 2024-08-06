import { http, HttpResponse } from 'msw';
import { stores, meetings } from './mockdata';
import { TEAM_ORDERLIST_API_URL } from '@/services/teamOrderService';
import { RESTAURANT_LIST_API_URL } from '@/services/restaurantService';

export const handler = [
  http.get(RESTAURANT_LIST_API_URL, () => {
    return HttpResponse.json(stores);
  }),
  http.get('/api/stores/:storeId', (req) => {
    const storeId = Number(req.params.storeId);
    const store = stores.find((s) => s.storeId === storeId);
    if (store) {
      return HttpResponse.json(store);
    } else {
      return HttpResponse.status(404).json({ message: 'Store not found' });
    }
  }),
  http.get(TEAM_ORDERLIST_API_URL, () => {
    return HttpResponse.json(meetings);
  }),
  http.get('/api/users/meetings/:meetingId/headcount', (req) => {
    const meetingId = Number(req.params.meetingId);
    const headcount = {
      currentHeadCount: 5,
    };
    return HttpResponse.json(headcount);
  }),
];
