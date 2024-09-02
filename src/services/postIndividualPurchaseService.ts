import { apiClient } from './apiClient';

import {
  PostIndividualPurchasesResponse,
  PostIndividualPurchaseType,
} from '@/types/coreTypes';
import { GetListParams } from '@/types/types';

export const POST_INDIVIDUAL_PURCHASE_LIST_API_URL =
  '/api/users/meetings/{meetingId}/snapshots/post-purchases/individuals';

export const getPostIndividualPurchaseList = async ({
  page = 0,
  size = 10,
  meetingId,
}: GetListParams & {
  meetingId: number;
}): Promise<PostIndividualPurchasesResponse> => {
  try {
    const url = POST_INDIVIDUAL_PURCHASE_LIST_API_URL.replace(
      '{meetingId}',
      meetingId.toString(),
    );
    const response = await apiClient.get<PostIndividualPurchasesResponse>(url, {
      params: {
        size,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post individual purchases:', error);
    throw new Error(
      '개별 메뉴 구입 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getPostIndividualPurchaseInfo = async (
  meetingId: number,
  menuId: number,
): Promise<PostIndividualPurchaseType> => {
  try {
    const url = `${POST_INDIVIDUAL_PURCHASE_LIST_API_URL.replace(
      '{meetingId}',
      meetingId.toString(),
    )}/${menuId}`;
    const response = await apiClient.get<PostIndividualPurchaseType>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching post individual purchase info:', error);
    throw new Error(
      '개별 메뉴 구입 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
