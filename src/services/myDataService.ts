import axios from 'axios';

import { EvaluateType, MyDataType } from '@/types/myDataTypes';

// import { httpClientForCredentials } from './auth/authClient';

export const MY_PROFILE_URL = '/api/users/my-page';
export const EVALUATE_LIST_URL = '/api/users/evaluates';

export const getMyData = async (): Promise<MyDataType> => {
  try {
    // 실제 로그인 될 때 고쳐야 함
    // await httpClientForCredentials.get<MyDataType>(MY_PROFILE_URL);
    const response = await axios.get<MyDataType>(MY_PROFILE_URL);
    console.log(response);
    console.log('뭐가 문제임');
    return response.data;
  } catch (error) {
    console.error('Error fetching my data:', error);
    throw new Error(
      '내 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

export const getMyEvaluates = async (): Promise<EvaluateType> => {
  try {
    const response = await axios.get<EvaluateType>(EVALUATE_LIST_URL);
    // await httpClientForCredentials.get<EvaluateType>(EVALUATE_LIST_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching my evaluates:', error);
    throw new Error(
      '내 평가 정보를 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
