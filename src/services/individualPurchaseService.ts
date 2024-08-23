import {
  IndividualPurchasesResponse,
  IndividualPurchaseType,
} from '@/types/coreTypes';
import { GetListParams } from '@/types/types';

import { apiClient } from './apiClient';

export const INDIVIDUAL_PURCHASE_LIST_API_URL =
  '/api/users/meetings/{meetingId}/individual-purchases';
const INDIVIDUAL_PURCHASE_API_URL =
  '/api/users/meetings/{meetingId}/individual-purchases/{purchaseId}';

export const getIndividualPurchaseList = async ({
  page = 0,
  size = 10,
  meetingId,
}: GetListParams & {
  meetingId: number;
}): Promise<IndividualPurchasesResponse> => {
  try {
    const url = INDIVIDUAL_PURCHASE_LIST_API_URL.replace(
      '{meetingId}',
      meetingId.toString(),
    );
    const response = await apiClient.get<IndividualPurchasesResponse>(url, {
      params: {
        size,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching individual purchases:', error);
    throw new Error(
      '개별 메뉴 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getIndividualPurchaseInfo = async (
  meetingId: number,
  purchaseId: number,
): Promise<IndividualPurchaseType> => {
  try {
    const url = INDIVIDUAL_PURCHASE_API_URL.replace(
      '{meetingId}',
      meetingId.toString(),
    ).replace('{purchaseId}', purchaseId.toString());
    const response = await apiClient.get<IndividualPurchaseType>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching individual purchase info:', error);
    throw new Error(
      '개별 메뉴 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
