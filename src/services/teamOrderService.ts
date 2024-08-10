import axios from 'axios';

export const TEAM_ORDERLIST_API_URL = '/api/users/meetings';
const HEADCOUNT_API_URL = '/api/users/meetings/{meetingId}/headcount';

export const getTeamOrderList = async () => {
  try {
    const response = await axios.get(TEAM_ORDERLIST_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching team orders:', error);
    throw new Error(
      '팀 주문 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
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
