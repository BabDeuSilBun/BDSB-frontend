'use client';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useSilentRefresh from '@/hook/useSlientRefresh';
import { useEffect } from 'react';
import { httpClientForCredentials } from '@/services/apiClient';
import { useRouter } from 'next/navigation';
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const router = useRouter();

  useSilentRefresh();

  useEffect(() => {
    // 초기 렌더링 시 인증 상태를 확인
    const checkAuth = async () => {
      try {
        await httpClientForCredentials.get('/api/check-auth'); // 예시 API 엔드포인트
      } catch {
        router.push('/auth/signIn');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
