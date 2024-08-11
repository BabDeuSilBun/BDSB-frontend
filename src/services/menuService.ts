import { MenusResponse } from '@/types/coreTypes';
import apiClient from './apiClient';

export const MENU_LIST_API_URL = '/api/stores/{storeId}/menus';

export const getMenusForStore = async (storeId: number): Promise<MenusResponse> => {
  if (!storeId || isNaN(storeId)) {
    throw new Error('Invalid storeId');
  }

  try {
    const response = await apiClient.get<MenusResponse>(
      MENU_LIST_API_URL.replace('{storeId}', storeId.toString())
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching menus for storeId ${storeId}:`, error);
    throw new Error('메뉴를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
  }
};

