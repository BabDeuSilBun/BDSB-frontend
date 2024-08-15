import { GetListParams, TeamMenusResponse, TeamMenuType } from '@/types/coreTypes';

import { apiClient } from './apiClient';

export const TEAM_MENU_LIST_API_URL = '/api/users/meetings/{meetingId}/team-order';
const TEAM_MENU_API_URL = '/api/users/meetings/{meetingId}/team-order/{purchaseId}';

export const getTeamMenuList = async ({
  page = 0,
  schoolId = undefined,
  size = 10,
  meetingId,
}: GetListParams & { meetingId: number }): Promise<TeamMenusResponse> => {
  try {
    const url = TEAM_MENU_LIST_API_URL.replace('{meetingId}', meetingId.toString());
    const response = await apiClient.get<TeamMenusResponse>(url, {
      params: {
        schoolId,
        size,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching team menus:', error);
    throw new Error(
      '공통 메뉴 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getTeamMenuInfo = async (
  meetingId: number,
  purchaseId: number,
): Promise<TeamMenuType> => {
  try {
    const url = TEAM_MENU_API_URL.replace('{meetingId}', meetingId.toString()).replace(
      '{purchaseId}',
      purchaseId.toString(),
    );
    const response = await apiClient.get<TeamMenuType>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching team menu info:', error);
    throw new Error(
      '공통 메뉴 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};