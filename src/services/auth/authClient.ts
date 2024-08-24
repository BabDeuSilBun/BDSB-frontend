import axios from 'axios';
import Cookies from 'js-cookie';

// 인증이 필요한 API 클라이언트 생성
// const response = await httpClientForCredentials.get('/user/profile');
export const httpClientForCredentials = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  withCredentials: true,
});

// AccessToken 설정 함수
export const setAuthToken = (token: string) => {
  httpClientForCredentials.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// 토큰 갱신 함수
export const onSilentRefresh = async () => {
  try {
    const res = await httpClientForCredentials.post('/api/refresh-token');
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
  httpClientForCredentials.interceptors.response.use(
    (response) => response, // 정상적인 응답
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = Cookies.get('refreshToken');

        if (refreshToken) {
          try {
            const res =
              await httpClientForCredentials.post('/api/refresh-token');
            const newJwtToken = res.headers.Authorization;

            setAuthToken(newJwtToken);
            Cookies.set('jwtToken', newJwtToken);
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
