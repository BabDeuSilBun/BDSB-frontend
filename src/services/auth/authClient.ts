import Cookies from 'js-cookie';

import { apiClientWithCredentials } from '../apiClient';

// AccessToken 설정 함수
export const setAuthToken = (token: string) => {
  if (token) {
    apiClientWithCredentials.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClientWithCredentials.defaults.headers.common.Authorization;
  }
};

// 요청 인터셉터 설정
apiClientWithCredentials.interceptors.request.use((config) => {
  console.log('Request Headers:', config.headers);
  return config;
});

// 서버 응답 로그 확인
apiClientWithCredentials.interceptors.response.use((response) => {
  console.log('Response Headers:', response.headers);
  return response;
});

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

      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = Cookies.get('refreshToken');

        if (refreshToken) {
          try {
            const res =
              await apiClientWithCredentials.post('/api/refresh-token');
            const newJwtToken = res.data.accessToken;

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
