'use client';

import React, { useEffect } from 'react';

import { setupInterceptors } from '@/services/auth/authClient';
import { useRouter } from 'next/navigation';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    setupInterceptors(router);
  }, [router]);

  return children;
}

export default AuthProvider;
