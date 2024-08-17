import { http, HttpResponse } from 'msw';
import { TEAM_ORDER_LIST_API_URL } from '@/services/teamOrderService';
import { RESTAURANT_LIST_API_URL } from '@/services/restaurantService';
import { MENU_LIST_API_URL } from '@/services/menuService';
import { TEAM_MENU_LIST_API_URL } from '@/services/teamMenuService';
import { INDIVIDUAL_ORDER_LIST_API_URL } from '@/services/individualOrderService';
import { applyFiltersAndSorting } from './filteringAndSorting';
import { paginatedStores, stores } from './mockData/restaurants';
import { paginatedMeetings, meetings } from './mockData/meetings';
import { paginatedMenus, menus } from './mockData/menus';
import { paginatedTeamMenus, teamMenus } from './mockData/teamMenus';
import { paginatedIndividualOrders, individualOrders } from './mockData/individualOrders';

export const handler = [
  // Handler for restaurant list
  http.get(RESTAURANT_LIST_API_URL, async (req) => {
    const { request } = await req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const searchMenu = url.searchParams.get('searchMenu');
      // const schoolId = url.searchParams.get('schoolId');
      const sortCriteria = url.searchParams.get('sortCriteria');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));
      const foodCategoryFilter = url.searchParams.get('foodCategoryFilter');

      const paginatedResponse = paginatedStores[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { foodCategoryFilter, searchMenu, size },
        sortCriteria,
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  // Handler for getting store details by storeId
  http.get('/api/stores/:storeId', (req) => {
    const storeId = Number(req.params.storeId);
    const store = stores.find((s) => s.storeId === storeId);
    if (store) {
      return HttpResponse.json(store);
    }
    return HttpResponse.status(404).json({ message: 'Store not found' });
  }),

  // Handler for team order list
  http.get(TEAM_ORDER_LIST_API_URL, (req) => {
    const { request } = req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const searchMenu = url.searchParams.get('searchMenu');
      // const schoolId = url.searchParams.get('schoolId');
      const sortCriteria = url.searchParams.get('sortCriteria');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));
      const foodCategoryFilter = url.searchParams.get('foodCategoryFilter');

      const paginatedResponse = paginatedMeetings[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { foodCategoryFilter, searchMenu, size },
        sortCriteria,
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  // Handler for fetching specific team order info by meetingId
  http.get('/api/users/meetings/:meetingId', (req) => {
    const meetingId = Number(req.params.meetingId);
    const meeting = meetings.find((m) => m.meetingId === meetingId);
    if (meeting) {
      return HttpResponse.json(meeting);
    }
    return HttpResponse.status(404).json({ message: 'Meeting not found' });
  }),

  // Handler for fetching meeting headcount
  http.get('/api/users/meetings/:meetingId/headcount', () => {
    // const meetingId = Number(req.params.meetingId);
    const headcount = {
      currentHeadCount: 5,
    };
    return HttpResponse.json(headcount);
  }),

  // Handler for menu list
  http.get('/api/stores/:storeId/menus', (req) => {
    const { request } = req;
    const storeId = Number(req.params.storeId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      // const schoolId = url.searchParams.get('schoolId');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));

      const paginatedResponse = paginatedMenus[storeId]?.[pageParam];

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

  // Handler for getting menu details by storeId and menuId
  http.get('/api/stores/:storeId/menus/:menuId', (req) => {
    const storeId = Number(req.params.storeId);
    const menuId = Number(req.params.menuId);

    const storeMenus = menus.filter((menu) => menu.storeId === storeId);
    const menu = storeMenus.find((m) => m.menuId === menuId);

    if (menu) {
      return HttpResponse.json(menu);
    }

    return HttpResponse.status(404).json({ message: 'Menu not found' });
  }),

  // Handler for team menu list
  http.get('/api/users/meetings/:meetingId/team-order', (req) => {
    const { request } = req;
    const meetingId = Number(req.params.meetingId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      // const schoolId = url.searchParams.get('schoolId');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));

      const paginatedResponse = paginatedTeamMenus[meetingId]?.[pageParam];

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

  // Handler for getting team menu details by meetingId and purchaseId
  http.get('/api/users/meetings/:meetingId/team-order/purchaseId', (req) => {
    const meetingId = Number(req.params.meetingId);
    const purchaseId = Number(req.params.purchaseId);

    const teamMenu = teamMenus.filter(
      (teamMenu) => teamMenu.meetingId === meetingId,
    );
    const teamPurchase = teamMenu.find((p) => p.purchaseId === purchaseId);

    if (teamPurchase) {
      return HttpResponse.json(teamPurchase);
    }

    return HttpResponse.status(404).json({
      message: 'Team Menu Item not found',
    });
  }),

  // Handler for individual order list
  http.get('/api/users/meetings/:meetingId/individual-order', (req) => {
    const { request } = req;
    const meetingId = Number(req.params.meetingId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      // const schoolId = url.searchParams.get('schoolId');
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

  // Handler for getting individual order details by meetingId and purchaseId
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

  // Handler for user sign in
  http.post('/api/users/signin', async ({ request }) => {
    try {
      const { email, password } = await request.json();

      if (email === 'test@example.com' && password === 'password123') {
        const headers = new Headers();
        headers.set('Authorization', 'mocked-jwt-token');
        headers.set('Refresh', 'mocked-refresh-token');

        return HttpResponse.json(
          { message: '로그인 성공' },
          { status: 200, headers },
        );
      }

      return HttpResponse.json(
        { message: '이메일 또는 비밀번호가 잘못되었습니다.' },
        { status: 401 },
      );
    } catch (error) {
      console.error('Error handling request:', error);
      return HttpResponse.status(500).json({ message: '서버 오류' });
    }
  }),

  http.post('/api/businesses/signin', async ({ request }) => {
    try {
      const { email, password } = await request.json();

      if (email === 'test@example.com' && password === 'password123') {
        const headers = new Headers();
        headers.set('Authorization', 'mocked-jwt-token');
        headers.set('Refresh', 'mocked-refresh-token');

        return HttpResponse.json(
          { message: '로그인 성공' },
          { status: 200, headers },
        );
      }

      return HttpResponse.json(
        { message: '이메일 또는 비밀번호가 잘못되었습니다.' },
        { status: 401 },
      );
    } catch (error) {
      console.error('Error handling request:', error);
      return HttpResponse.status(500).json({ message: '서버 오류' });
    }
  }),
];
