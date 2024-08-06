import axios from 'axios';

export const TEAM_ORDERLIST_API_URL = '/api/users/meetings';
const HEADCOUNT_API_URL = '/api/users/meetings/{meetingId}/headcount';

export const getTeamOrderList = async () => {
  try {
    const response = await axios.get(TEAM_ORDERLIST_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching team orders:', error);
    throw error;
  }
};

export const getCurrentHeadCount = async (meetingId: number) => {
  try {
    const response = await axios.get(
      HEADCOUNT_API_URL.replace('{meetingId}', meetingId.toString()),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching team head count:', error);
    throw error;
  }
};
