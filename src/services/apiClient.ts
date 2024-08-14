import axios from 'axios';
import qs from 'qs';

export const apiClient = axios.create({
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'brackets' }),
});

export const httpClientForCredentials = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  withCredentials: true, // 쿠키를 자동으로 전송
});

// AccessToken을 설정하는 함수
export const setAuthToken = (token: string) => {
  httpClientForCredentials.defaults.headers.common['Authorization'] =
    `Bearer ${token}`;
};