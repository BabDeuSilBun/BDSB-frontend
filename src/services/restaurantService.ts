import axios from 'axios';

const API_URL = 'http://www.test.com/api/meetings';

export const getRestaurantsList = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};
