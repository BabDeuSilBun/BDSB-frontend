import { apiClientWithCredentials } from './apiClient';

import { ImageType } from '@/types/types';

export const STORE_IMAGES_API_URL = '/api/stores/{storeId}/images';

export const getStoreImages = async ({
  storeId,
}: {
  storeId: number;
}): Promise<ImageType[]> => {
  try {
    const url = STORE_IMAGES_API_URL.replace('{storeId}', storeId.toString());
    const response = await apiClientWithCredentials.get<ImageType[]>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching store images:', error);
    throw new Error('Error fetching store images. Please try again later.');
  }
};
