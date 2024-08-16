import axios from 'axios';
import Cookies from 'js-cookie';
import { apiClient } from '@/services/apiClient';

// 인증이 필요한 API 클라이언트 생성
// const response = await httpClientForCredentials.get('/user/profile');
export const httpClientForCredentials = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  withCredentials: true,
});

// AccessToken 설정 함수
export const setAuthToken = (token: string) => {
  httpClientForCredentials.defaults.headers.common['Authorization'] =
    `Bearer ${token}`;
};

interface NextRouter {
  push: (path: string) => void;
}

// 인터셉터 설정 함수
export const setupInterceptors = (router: NextRouter) => {
  httpClientForCredentials.interceptors.response.use(
    (response) => response, // 정상적인 응답
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = Cookies.get('refreshToken');

        if (refreshToken) {
          try {
            const res = await apiClient.post('/api/refresh-token', {
              token: refreshToken,
            });

            const newJwtToken = res.headers['Authorization'];
            const newRefreshToken = res.headers['Refresh'];

            // 새로 발급받은 토큰을 쿠키에 저장
            Cookies.set('jwtToken', newJwtToken);
            Cookies.set('refreshToken', newRefreshToken);

            // 새로운 JWT로 원래 요청 재시도
            setAuthToken(newJwtToken);
            return httpClientForCredentials(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            router.push('/auth/signIn');
          }
        } else {
          router.push('/auth/signIn');
        }
      }
      return Promise.reject(error);
    },
  );
};
