import axios from 'axios';

export const RESTAURANT_LIST_API_URL = '/api/stores';
const RESTAURANT_API_URL = '/api/stores/{storeId}';

export const getRestaurantsList = async () => {
  try {
    const response = await axios.get(RESTAURANT_LIST_API_URL);
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
