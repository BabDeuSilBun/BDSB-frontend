import Cookies from 'js-cookie';

import { apiClientWithCredentials } from '../apiClient';

// AccessToken 설정 함수
export const setAuthToken = (token: string) => {
  apiClientWithCredentials.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// 토큰 갱신 함수
export const onSilentRefresh = async () => {
  try {
    const res = await apiClientWithCredentials.post('/api/refresh-token');
    const newToken = res.headers.Authorization;
    Cookies.set('jwtToken', newToken);
    setAuthToken(newToken);
  } catch (error) {
    console.error('Token refresh failed:', error);
  }
};

interface NextRouter {
  push: (path: string) => void;
}

// 인터셉터 설정 함수
export const setupInterceptors = (router: NextRouter) => {
  apiClientWithCredentials.interceptors.response.use(
    (response) => response, // 정상적인 응답
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = Cookies.get('refreshToken');

        if (refreshToken) {
          try {
            const res =
              await apiClientWithCredentials.post('/api/refresh-token');
            const newJwtToken = res.headers.Authorization;

            setAuthToken(newJwtToken);
            Cookies.set('jwtToken', newJwtToken);
            return apiClientWithCredentials(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            router.push('/signIn');
          }
        } else {
          router.push('/signIn');
        }
      }
      return Promise.reject(error);
    },
  );
};
