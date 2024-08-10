import { GetListParams, MeetingsResponse } from '@/types/coreTypes';

import apiClient from './apiClient';

export const TEAM_ORDER_LIST_API_URL = '/api/users/meetings';
const HEADCOUNT_API_URL = '/api/users/meetings/{meetingId}/headcount';

export const getTeamOrderList = async ({
  page = 0,
  schoolId = undefined,
  size = 10,
  sortCriteria = 'delivery-fee',
  searchMenu = undefined,
}: GetListParams): Promise<MeetingsResponse> => {
  try {
    const response = await apiClient.get<MeetingsResponse>(
      TEAM_ORDER_LIST_API_URL,
      {
        params: { schoolId, sortCriteria, searchMenu, size, page },
      },
    );
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
    const response = await apiClient.get(
      HEADCOUNT_API_URL.replace('{meetingId}', meetingId.toString()),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching team head count:', error);
    throw new Error(
      '팀 헤드카운트를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
