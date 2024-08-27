'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { setupInterceptors } from '@/services/auth/authClient';
import { getRemainingTime } from '@/utils/jwt-decode';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    setupInterceptors(router);
    getRemainingTime();
  }, [router]);

  return children;
}

export default AuthProvider;
