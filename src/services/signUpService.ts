import { SchoolsResponse } from '@/types/authTypes';
import { GetListParams } from '@/types/types';
import axios from 'axios';

export const SCHOOL_LIST_API_URL = '/api/schools';

export const getSchoolsList = async ({
  page = 0,
  schoolName = undefined,
  size = 10,
}: GetListParams): Promise<SchoolsResponse> => {
  try {
    const url = `${SCHOOL_LIST_API_URL}?schoolName=${schoolName || ''}&size=${size}&page=${page}`;

    const response = await axios.get<SchoolsResponse>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching university lists:', error);
    throw new Error(
      '학교 목록을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
