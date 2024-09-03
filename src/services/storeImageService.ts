import { apiClientWithCredentials } from './apiClient';

import { StoreImagesResponse } from '@/types/coreTypes';
import { GetListParams } from '@/types/types';

export const STORE_IMAGES_API_URL = '/api/stores/{storeId}/images';

export const getStoreImages = async ({
  page = 0,
  size = 10,
  storeId,
}: GetListParams & { storeId: number }): Promise<StoreImagesResponse> => {
  try {
    const url = STORE_IMAGES_API_URL.replace('{storeId}', storeId.toString());
    const response = await apiClientWithCredentials.get<StoreImagesResponse>(
      url,
      {
        params: {
          page,
          size,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching store images:', error);
    throw new Error(
      '공통 메뉴 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
