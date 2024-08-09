import axios from 'axios';
import qs from 'qs';

import {
  GetRestaurantsListParams,
  RestaurantsResponse,
} from '@/types/restaurant';

export const RESTAURANT_LIST_API_URL = '/api/stores';
const RESTAURANT_API_URL = '/api/stores/{storeId}';

export const getRestaurantsList = async ({
  pageParam = 0,
  campusFilter,
  sortCriteria,
  foodCategoryFilter,
  searchMenu,
}: GetRestaurantsListParams): Promise<RestaurantsResponse> => {
  try {
    const response = await axios.get<RestaurantsResponse>(
      RESTAURANT_LIST_API_URL,
      {
        params: {
          campusFilter: campusFilter || undefined,
          sortCriteria: sortCriteria || undefined,
          foodCategoryFilter: foodCategoryFilter || undefined,
          searchMenu: searchMenu || undefined,
          size: 10,
          page: pageParam,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'brackets' });
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
    const response = await axios.get(
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
