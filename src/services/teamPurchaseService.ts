import Cookies from 'js-cookie';

import { apiClientWithCredentials } from './apiClient';

import { PurchasesResponse } from '@/types/coreTypes';
import { GetListParams } from '@/types/types';

export const TEAM_PURCHASE_LIST_API_URL =
  '/api/users/meetings/{meetingId}/team-purchases';

export const getTeamPurchaseList = async ({
  page = 0,
  size = 10,
  meetingId,
}: GetListParams & { meetingId: number }): Promise<PurchasesResponse> => {
  try {
    const url = TEAM_PURCHASE_LIST_API_URL.replace(
      '{meetingId}',
      meetingId.toString(),
    );

    const token = Cookies.get('jwtToken');

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await apiClientWithCredentials.get<PurchasesResponse>(
      url,
      {
        params: {
          size,
          page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching team purchase:', error);
    throw new Error(
      '공통 메뉴 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
