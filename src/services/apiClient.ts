import axios from 'axios';
import qs from 'qs';

const baseURL = process.env.NEXT_PUBLIC_SERVER_API_URL;

// 기본 API 클라이언트 생성
// const response = await apiClient.get( RESTAURANT_API_URL.replace('{storeId}', storeId.toString()),);
export const apiClient = axios.create({
  baseURL,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'brackets' }),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});
