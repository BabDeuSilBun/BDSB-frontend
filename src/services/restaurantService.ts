import { apiClient, apiClientWithCredentials } from './apiClient';

import { CategoriesResponse, RestaurantsResponse } from '@/types/coreTypes';
import { GetListParams } from '@/types/types';

export const RESTAURANT_LIST_API_URL = '/api/users/stores';
export const CATEGORY_LIST_API_URL = '/api/stores/categories';
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
    const response = await apiClientWithCredentials.get<RestaurantsResponse>(
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

export const getCategoriesList = async ({
  page = 0,
  size = 11,
}: GetListParams): Promise<CategoriesResponse> => {
  try {
    const response = await apiClient.get<CategoriesResponse>(
      CATEGORY_LIST_API_URL,
      {
        params: {
          size,
          page,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error(
      '카테고리식점 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
