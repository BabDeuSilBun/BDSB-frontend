import { http, HttpResponse } from 'msw';
import { EVALUATE_LIST_URL, MY_PROFILE_URL } from '@/services/myDataService';

import { evaluates, myData } from '../mockData/myData';

export const myDataHandlers = [
  http.get(MY_PROFILE_URL, () => {
    try {
      console.log('is going');
      return HttpResponse.json(myData);
    } catch (error) {
      console.log('is not going');
      return HttpResponse.status(404).json({
        message: `My data not found: ${error}`,
      });
    }
  }),

  http.get(EVALUATE_LIST_URL, () => {
    try {
      return HttpResponse.json(evaluates);
    } catch (error) {
      return HttpResponse.status(404).json({
        message: `My evaluates not found: ${error}`,
      });
    }
  }),
];
