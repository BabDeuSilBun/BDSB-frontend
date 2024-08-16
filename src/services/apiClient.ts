import axios from 'axios';
import qs from 'qs';

// 기본 API 클라이언트 생성
// const response = await apiClient.get( RESTAURANT_API_URL.replace('{storeId}', storeId.toString()),);
export const apiClient = axios.create({
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'brackets' }),
});