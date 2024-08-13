import { GetListParams, MenusResponse, MenuType } from '@/types/coreTypes';

import apiClient from './apiClient';

export const MENU_LIST_API_URL = '/api/stores/{storeId}/menus';
const MENU_API_URL = '/api/menus/{menuId}';

// Fetch paginated menus for a specific store
export const getMenuList = async ({
  page = 0,
  size = 10,
  storeId,
}: GetListParams & { storeId: number }): Promise<MenusResponse> => {
  try {
    const response = await apiClient.get<MenusResponse>(
      MENU_LIST_API_URL.replace('{storeId}', storeId.toString()),
      {
        params: { page, size },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching menus:', error);
    throw new Error(
      '메뉴 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

// Fetch detailed information for a specific menu
export const getMenuInfo = async (menuId: number): Promise<MenuType> => {
  try {
    const response = await apiClient.get<MenuType>(
      MENU_API_URL.replace('{menuId}', menuId.toString()),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw new Error(
      '메뉴 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
