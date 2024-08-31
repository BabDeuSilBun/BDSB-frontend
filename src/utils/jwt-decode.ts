import { JWTPayload, jwtVerify } from 'jose';
import Cookies from 'js-cookie';

import { secret } from '@/constant/authority';
import { onSilentRefresh } from '@/services/auth/authClient';

interface NextRouter {
  push: (path: string) => void;
}

interface JWTClaim extends JWTPayload {
  exp?: number;
}

let token: string | undefined = undefined;

const REFRESH_THRESHOLD = 3 * 60 * 1000;

export const getRemainingTime = async (router: NextRouter) => {
  if (!token) {
    token = Cookies.get('jwtToken');
  }

  if (token) {
    try {
      const { payload } = (await jwtVerify(token, secret)) as {
        payload: JWTClaim;
      };
      const currentTime = Date.now();

      if (payload.exp) {
        const expirationTime = payload.exp * 1000;
        const remainingTime = expirationTime - currentTime;

        if (remainingTime > 0) {
          if (remainingTime <= REFRESH_THRESHOLD) {
            console.log('토큰이 거의 만료되었습니다. 리프레시를 수행합니다.');
            onSilentRefresh();
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
