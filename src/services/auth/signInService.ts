import axios from 'axios';
// import Cookies from 'js-cookie';

import { apiClient } from '../apiClient';

import { setAuthToken } from '@/services/auth/authClient';
import { validateSignInput } from '@/utils/validateSignInput';

/* eslint-disable @typescript-eslint/no-unused-vars */
interface NextRouter {
  push: (path: string) => void;
}

export async function handleSignIn(
  email: string,
  password: string,
  userType: string,
  setError: (error: string) => void,
  // router: NextRouter,
) {
  if (email.trim() === '') {
    setError('이메일을 입력해주세요.');
    return;
  }
  if (!validateSignInput('email', email)) {
    setError('유효한 이메일 주소를 입력해주세요.');
    return;
  }
  if (password.trim() === '') {
    setError('비밀번호를 입력해주세요.');
    return;
  }
  if (!validateSignInput('password', password)) {
    setError('비밀번호를 확인해주세요.');
    return;
  }
  setError('');

  try {
    const res = await apiClient.post(`api/${userType}/signin`, {
      email,
      password,
    });

    const jwtToken = res.headers.Authorization;
    // Cookies.set('jwtToken', jwtToken, {
    //   secure: true,
    //   sameSite: 'Strict',
    // });
    console.log(res.headers);
    setAuthToken(jwtToken);
    console.log(jwtToken);
    // router.push('/');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;

      if (status === 401 && data && data.errorCode) {
        switch (data.errorCode) {
          case 'JWT_EXPIRED': // JWT 만료
            console.log('로그인에 실패했습니다. 다시 로그인해 주세요.');
            setError('로그인에 실패했습니다. 다시 로그인해 주세요.');
            break;
          case 'PASSWORD_NOT_MATCH':
            console.log('이메일 혹은 비밀번호가 일치하지 않습니다.');
            setError('이메일 혹은 비밀번호가 일치하지 않습니다.');
            break;
          default:
            setError('로그인에 실패했습니다. 다시 시도해 주세요.');
        }
      } else {
        setError(
          "로그인에 실패했습니다. 만약 문제가 지속될 경우 하단 '문의하기'를 이용해주세요.",
        );
      }
    } else {
      setError(
        "로그인에 실패했습니다. 만약 문제가 지속될 경우 하단 '문의하기'를 이용해주세요.",
      );
    }
  }
}
