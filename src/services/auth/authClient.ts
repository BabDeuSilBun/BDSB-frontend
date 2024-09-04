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

// 요청 인터셉터 설정: 헤더에 제대로 찍히는지 보려고 넣은 함수입니다: 최종 때 삭제하든 할게요
// apiClientWithCredentials.interceptors.request.use((config) => {
//   console.log(
//     'Request Headers:',
//     config.headers ? config.headers : 'Headers are empty',
//   );
//   return config;
// });

// 서버 응답 로그 확인
// apiClientWithCredentials.interceptors.response.use((response) => {
//   console.log('Response Headers:', response.headers);
//   return response;
// });

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

      // 403 오류가 발생하고, 아직 재시도하지 않은 경우
      if (error.response?.status === 403 && !originalRequest._retry) {
        const errorCode = error.response?.data?.errorCode;

        // 특정 403 에러 코드일 때만 재시도
        if (
          errorCode === 'JWT_TOKEN_EXPIRED' ||
          errorCode === 'JWT_TOKEN_INVALID' ||
          errorCode === 'JWT_TOKEN_IS_BLACK' ||
          errorCode === 'JWT_AND_REFRESH_TOKEN_NOT_MATCH'
        ) {
          originalRequest._retry = true;

          try {
            // 서버에서 새 토큰 요청
            const res =
              await apiClientWithCredentials.post('/api/refresh-token');
            const newJwtToken = res.data.accessToken;

            // 새로운 토큰 설정
            setAuthToken(newJwtToken);
            Cookies.set('jwtToken', newJwtToken);
            // 원래의 요청을 새 토큰으로 재시도
            return apiClientWithCredentials(originalRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            router.push('/signIn');
          }
        } else {
          // 토큰과 관련이 없는 403 오류는 홈 페이지로 리다이렉트
          router.push('/');
        }
      }

      // 에러를 다시 반환
      return Promise.reject(error);
    },
  );
};
