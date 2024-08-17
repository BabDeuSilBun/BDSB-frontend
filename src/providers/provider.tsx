'use client';

import ChakraProvider from './chakraProvider';
import QueryClientProvider from './queryClientProvider';
import AuthProvider from './authProvider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <ChakraProvider>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default Providers;
