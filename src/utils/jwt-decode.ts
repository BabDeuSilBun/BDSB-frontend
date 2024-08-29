import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { onSilentRefresh } from '@/services/auth/authClient';

interface NextRouter {
  push: (path: string) => void;
}

export const getRemainingTime = (router: NextRouter) => {
  const token = Cookies.get('jwtToken');

  if (token) {
    try {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now();
      const expirationTime = decodedToken.exp * 1000;
      const remainingTime = expirationTime - currentTime;

      if (remainingTime > 0) {
        console.log('토큰이 유효합니다.');
        return;
      } else {
        console.log('토큰이 만료되었습니다.');
        onSilentRefresh();
      }
    } catch (e) {
      console.error('토큰 디코딩 중 오류 발생:', e);
    }
  } else {
    console.log('jwtToken이 쿠키에 존재하지 않습니다.');
  }

  router.push('/signIn');
};
