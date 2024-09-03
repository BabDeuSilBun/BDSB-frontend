import { apiClient } from './apiClient';

import {
  PostTeamPurchasesResponse,
  PostTeamPurchaseType,
} from '@/types/coreTypes';
import { GetListParams } from '@/types/types';

export const POST_TEAM_PURCHASE_LIST_API_URL =
  '/api/users/meetings/{meetingId}/snapshots/post-purchases/team';

export const getPostTeamPurchaseList = async ({
  page = 0,
  size = 10,
  meetingId,
}: GetListParams & {
  meetingId: number;
}): Promise<PostTeamPurchasesResponse> => {
  try {
    const url = POST_TEAM_PURCHASE_LIST_API_URL.replace(
      '{meetingId}',
      meetingId.toString(),
    );
    const response = await apiClient.get<PostTeamPurchasesResponse>(url, {
      params: {
        size,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post team purchases:', error);
    throw new Error(
      '팀 메뉴 구입 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getPostTeamPurchaseInfo = async (
  meetingId: number,
  purchaseId: number,
): Promise<PostTeamPurchaseType> => {
  try {
    const url = `${POST_TEAM_PURCHASE_LIST_API_URL.replace(
      '{meetingId}',
      meetingId.toString(),
    )}/${purchaseId}`;
    const response = await apiClient.get<PostTeamPurchaseType>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching post team purchase info:', error);
    throw new Error(
      '팀 메뉴 구입 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
