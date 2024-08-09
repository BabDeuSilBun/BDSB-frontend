import { http, HttpResponse } from 'msw';
import { TEAM_ORDERLIST_API_URL } from '@/services/teamOrderService';
import { RESTAURANT_LIST_API_URL } from '@/services/restaurantService';

import { paginatedStores, stores } from './restaurants';
import meetings from './meetings';

export const handler = [
  http.get(RESTAURANT_LIST_API_URL, (req) => {
    const { request } = req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const sortCriteria = url.searchParams.get('sortCriteria');
      const campusFilter = url.searchParams.get('campusFilter');
      const foodCategoryFilter = url.searchParams.get('foodCategoryFilter');
      const searchMenu = url.searchParams.get('searchMenu');

      const paginatedResponse = paginatedStores[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      // 필터링 및 정렬 적용
      let filteredContent = paginatedResponse.content;

      // 필터링 적용
      if (campusFilter) {
        filteredContent = filteredContent.filter(
          (item) => item.campus === campusFilter,
        );
      }

      if (foodCategoryFilter) {
        filteredContent = filteredContent.filter(
          (item) => item.foodCategory === foodCategoryFilter,
        );
      }

      if (searchMenu) {
        filteredContent = filteredContent.filter((item) =>
          item.menuItems.some(
            (menuItem) =>
              menuItem.name.includes(searchMenu) ||
              menuItem.description.includes(searchMenu),
          ),
        );
      }

      // 정렬 적용 (기본 정렬 구현 예시, 필요에 따라 조정)
      if (sortCriteria) {
        switch (sortCriteria) {
          case 'deadline':
            filteredContent.sort((a, b) =>
              a.deliveryTime.localeCompare(b.deliveryTime),
            );
            break;
          case 'delivery-fee':
            filteredContent.sort((a, b) => a.deliveryPrice - b.deliveryPrice);
            break;
          case 'min-price':
            filteredContent.sort((a, b) => a.minOrderPrice - b.minOrderPrice);
            break;
          case 'delivery-time':
            filteredContent.sort((a, b) =>
              a.deliveryTime.localeCompare(b.deliveryTime),
            );
            break;
          default:
            break;
        }
      }

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
        totalElements: filteredContent.length, // 필터링 후 전체 데이터 개수
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),
  http.get('/api/stores/:storeId', (req) => {
    const storeId = Number(req.params.storeId);
    const store = stores.find((s) => s.storeId === storeId);
    if (store) {
      return HttpResponse.json(store);
    }
    return HttpResponse.status(404).json({ message: 'Store not found' });
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
