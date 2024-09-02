import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';

import { onSilentRefresh } from '@/services/auth/authClient';

interface NextRouter {
  push: (path: string) => void;
}

let token: string | undefined = undefined;

const REFRESH_THRESHOLD = 3 * 60 * 1000;

export const getRemainingTime = async (router: NextRouter) => {
  if (!token) {
    token = Cookies.get('jwtToken');
  }

  if (token) {
    try {
      const decoded = decodeJwt(token) as { exp?: number };
      const currentTime = Date.now();

      if (decoded.exp) {
        const expirationTime = decoded.exp * 1000;
        const remainingTime = expirationTime - currentTime;

        if (remainingTime > 0) {
          if (remainingTime <= REFRESH_THRESHOLD) {
            console.log('토큰이 거의 만료되었습니다. 리프레시를 수행합니다.');
            await onSilentRefresh();
          } else {
            console.log('토큰이 유효합니다.');
          }
          return;
        } else {
          console.log('토큰이 만료되었습니다.');
          router.push('/signIn');
          return;
        }
      } else {
        console.log('토큰에 만료 시간(exp)이 포함되어 있지 않습니다.');
      }
    } catch (e) {
      console.error('토큰 디코딩 중 오류 발생:', e);
    }
  } else {
    console.log('jwtToken이 쿠키에 존재하지 않습니다.');
  }

  router.push('/signIn');
};
