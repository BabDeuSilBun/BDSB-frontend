import { GetListParams, IndividualOrdersResponse, IndividualOrderType } from '@/types/coreTypes';

import { apiClient } from './apiClient';

export const INDIVIDUAL_ORDER_LIST_API_URL = '/api/users/meetings/{meetingId}/individual-order';
const INDIVIDUAL_ORDER_API_URL = '/api/users/meetings/{meetingId}/individual-order/{purchaseId}';

export const getIndividualOrderList = async ({
  page = 0,
  schoolId = undefined,
  size = 10,
  meetingId,
}: GetListParams & { meetingId: number }): Promise<IndividualOrdersResponse> => {
  try {
    const url = INDIVIDUAL_ORDER_LIST_API_URL.replace('{meetingId}', meetingId.toString());
    const response = await apiClient.get<IndividualOrdersResponse>(url, {
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
      '개별 메뉴 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getIndividualOrderInfo = async (
  meetingId: number,
  purchaseId: number,
): Promise<IndividualOrderType> => {
  try {
    const url = INDIVIDUAL_ORDER_API_URL.replace('{meetingId}', meetingId.toString()).replace(
      '{purchaseId}',
      purchaseId.toString(),
    );
    const response = await apiClient.get<IndividualOrderType>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching team menu info:', error);
    throw new Error(
      '개별 메뉴 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};