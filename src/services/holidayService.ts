// holidayService.ts
import { apiClientWithCredentials } from './apiClient';

import { HolidaysResponse } from '@/types/coreTypes';
import { GetListParams } from '@/types/types';

export const HOLIDAYS_API_URL = '/api/stores/{storeId}/holidays';

export const getHolidays = async ({
  page = 0,
  size = 10,
  storeId,
}: GetListParams & { storeId: number }): Promise<HolidaysResponse> => {
  try {
    const url = HOLIDAYS_API_URL.replace('{storeId}', storeId.toString());
    const response = await apiClientWithCredentials.get<HolidaysResponse>(url, {
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching store holidays:', error);
    throw new Error(
      '상점의 휴무일 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
