import { http, HttpResponse } from 'msw';
import { stores, meetings } from './mockdata';

export const handler = [
  http.get('http://www.test.com/api/stores', () => {
    return HttpResponse.json(stores);
  }),
  http.get('http://www.test.com/api/meetings', () => {
    return HttpResponse.json(meetings);
  }),
];
