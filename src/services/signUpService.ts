import { SchoolsResponse } from '@/types/authTypes';
import { GetListParams } from '@/types/types';
import { apiClient } from './apiClient';

export const SCHOOL_LIST_API_URL = '/api/schools';
export const MAJOR_LIST_API_URL = '/api/users/signup/majors';

export const getSchoolsList = async ({
  page = 0,
  schoolName = undefined,
  size = 10,
}: GetListParams): Promise<SchoolsResponse> => {
  try {
    const response = await apiClient.get<SchoolsResponse>(SCHOOL_LIST_API_URL, {
      params: {
        schoolName,
        size,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching university lists:', error);
    throw new Error(
      '학교 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getMajorsList = async ({
  page = 0,
  majorName = undefined,
  size = 10,
}: GetListParams): Promise<SchoolsResponse> => {
  try {
    const response = await apiClient.get<SchoolsResponse>(MAJOR_LIST_API_URL, {
      params: {
        majorName,
        size,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching major lists:', error);
    throw new Error(
      '학과 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
