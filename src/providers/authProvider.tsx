'use client';

import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { setAuthToken } from '@/services/auth/authClient';
import { setupInterceptors } from '@/services/auth/authClient';
import { getRemainingTime } from '@/utils/jwt-decode';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    setupInterceptors(router);
    const token = Cookies.get('jwtToken');
    if (token) {
      setAuthToken(token);
    }
    getRemainingTime(router);
  }, [router]);

  return children;
}

export default AuthProvider;
