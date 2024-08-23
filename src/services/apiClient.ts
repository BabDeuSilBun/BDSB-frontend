import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

interface CreateApiClientParams {
  withCredentials?: boolean; // withCredentials 옵션을 매개변수로 받음
}

export const createApiClient = ({
  withCredentials = false, // 기본값은 false
}: CreateApiClientParams = {}): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials, // 매개변수로 받은 값 사용
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'brackets' }),
  });
};

// 기본 사용 예시
export const apiClient = createApiClient();

// 인증 정보가 필요한 요청에 사용하는 예시
export const apiClientWithCredentials = createApiClient({
  withCredentials: true,
});
