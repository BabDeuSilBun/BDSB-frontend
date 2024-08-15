import { GetListParams, RestaurantsResponse } from '@/types/coreTypes';

import { apiClient } from './apiClient';

export const RESTAURANT_LIST_API_URL = '/api/stores';
const RESTAURANT_API_URL = '/api/stores/{storeId}';

export const getRestaurantsList = async ({
  page = 0,
  schoolId = undefined,
  size = 10,
  foodCategoryFilter = undefined,
  sortCriteria = 'deadline',
  searchMenu = undefined,
}: GetListParams): Promise<RestaurantsResponse> => {
  
  try {
    const response = await apiClient.get<RestaurantsResponse>(
      RESTAURANT_LIST_API_URL,
      {
        params: {
          schoolId,
          sortCriteria,
          foodCategoryFilter,
          searchMenu,
          size,
          page,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error(
      '음식점 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getRestaurantInfo = async (storeId: number) => {
  try {
    const response = await apiClient.get(
      RESTAURANT_API_URL.replace('{storeId}', storeId.toString()),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    throw new Error(
      '음식점 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
