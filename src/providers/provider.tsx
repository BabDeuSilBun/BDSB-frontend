'use client';

import AuthProvider from './authProvider';
import ChakraProvider from './chakraProvider';
import QueryClientProvider from './queryClientProvider';

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
