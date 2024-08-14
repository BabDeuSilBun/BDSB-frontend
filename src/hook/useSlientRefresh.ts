import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { httpClientForCredentials, setAuthToken } from '@/services/apiClient';
import { AxiosError } from 'axios';

const TOKEN_REFRESH_PATH = '/api/refresh-token';

const useSilentRefresh = () => {
  const router = useRouter();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response =
          await httpClientForCredentials.post(TOKEN_REFRESH_PATH);
        if (response.status === 200) {
          const { accessToken } = response.data;
          setAuthToken(accessToken);
        } else {
          // AccessToken 갱신 실패 시 로그인 페이지로 이동
          router.push('/auth/signIn');
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          // 인증 오류 시 로그인 페이지로 이동
          router.push('/auth/signIn');
        }
      }
    };

    refreshAccessToken();
  }, [router]);
};

export default useSilentRefresh;
