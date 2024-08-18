import { MeetingType, MeetingsResponse } from '@/types/coreTypes';
import { GetListParams } from '@/types/types';
import { apiClient } from './apiClient';
import axios from 'axios';

export const TEAM_ORDER_LIST_API_URL = '/api/users/meetings';
const HEADCOUNT_API_URL = '/api/users/meetings/{meetingId}/headcount';
const TEAM_ORDER_API_URL = '/api/users/meetings/{meetingId}';

export const getTeamOrderList = async ({
  page = 0,
  schoolId = undefined,
  size = 10,
  foodCategoryFilter = undefined,
  sortCriteria = 'delivery-fee',
  searchMenu = undefined,
}: GetListParams): Promise<MeetingsResponse> => {
  try {
    const url =
      `${TEAM_ORDER_LIST_API_URL}?` +
      `schoolId=${schoolId || ''}&` +
      `sortCriteria=${sortCriteria || 'delivery-fee'}&` +
      `foodCategoryFilter=${foodCategoryFilter || ''}&` +
      `searchMenu=${searchMenu || ''}&` +
      `size=${size}&` +
      `page=${page}`;
    const response = await axios.get<MeetingsResponse>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching team orders:', error);
    throw new Error(
      '팀 주문 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getTeamOrderInfo = async (
  meetingId: number,
): Promise<MeetingType> => {
  try {
    const response = await apiClient.get(
      TEAM_ORDER_API_URL.replace('{meetingId}', meetingId.toString()),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching team order info:', error);
    throw new Error(
      '팀 주문 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
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
