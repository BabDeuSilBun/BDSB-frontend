import { MenusResponse, MenuType } from '@/types/coreTypes';
import { GetListParams } from '@/types/types';
import { apiClient } from './apiClient';

export const MENU_LIST_API_URL = '/api/stores/{storeId}/menus';
const MENU_API_URL = '/api/stores/{storeId}/menus/{menuId}';

export const getMenuList = async ({
  page = 0,
  schoolId = undefined,
  size = 10,
  storeId,
}: GetListParams & { storeId: number }): Promise<MenusResponse> => {
  try {
    const url = MENU_LIST_API_URL.replace('{storeId}', storeId.toString());
    const response = await apiClient.get<MenusResponse>(url, {
      params: {
        schoolId,
        size,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching menus:', error);
    throw new Error(
      '메뉴 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getMenuInfo = async (
  storeId: number,
  menuId: number,
): Promise<MenuType> => {
  try {
    const url = MENU_API_URL.replace('{storeId}', storeId.toString()).replace(
      '{menuId}',
      menuId.toString(),
    );
    const response = await apiClient.get<MenuType>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw new Error(
      '메뉴 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
