import { http, HttpResponse } from 'msw';
import { MENU_LIST_API_URL } from '@/services/menuService';
import { paginatedMenus, menus } from '../mockData/menus';

export const menuHandlers = [
  http.get('/api/stores/:storeId/menus', (req) => {
    const { request } = req;
    const storeId = Number(req.params.storeId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
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
];
