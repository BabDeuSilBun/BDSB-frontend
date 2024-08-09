import axios from 'axios';

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
          campusFilter,
          sortCriteria,
          foodCategoryFilter,
          searchMenu,
          size: 10,
          page: pageParam,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
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
    throw error;
  }
};
