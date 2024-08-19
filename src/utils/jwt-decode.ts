import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { onSilentRefresh } from '@/services/auth/authClient';

export const getRemainingTime = () => {
  const token = Cookies.get('jwtToken');

  if (token) {
    const decodedToken = jwtDecode(token);

    const currentTime = Date.now();
    let expirationTime = 0;

    // 만료 시간 (exp)을 확인 (exp는 Unix 타임스탬프 형식으로 저장됩니다)
    if (decodedToken.exp) {
      expirationTime = decodedToken.exp * 1000; // `exp`는 초 단위이므로 밀리초로 변환
    }
    const remainingTime = expirationTime - currentTime;

    // 만약 토큰이 이미 만료되었거나 만료 시간이 얼마 남지 않았다면
    if (remainingTime <= 0) {
      onSilentRefresh();
    } else {
      console.log('토큰이 유효합니다.');
    }
  } else {
    console.log('jwtToken이 쿠키에 존재하지 않습니다.');
  }
};
