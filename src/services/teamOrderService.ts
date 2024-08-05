import axios from 'axios';

const API_URL = 'http://www.test.com/api/restaurants';

export const getTeamOrderList = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching team orders:', error);
    throw error;
  }
};
