import '@/styles/globals.css';
import { MswComponent } from '@/components/msw.component';
import { Providers } from './providers';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import StyledComponentsRegistry from '@/lib/registry';
import theme from '@/styles/chakraTheme';

const font = localFont({
  src: 'fonts/SF-Pro-Display-Regular.otf',
  style: 'normal',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '밥드실분',
  description: 'delievery group app for university students',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    title: '밥드실분',
    description: '대학생을 위한 공동 배달 서비스',
    images: [
      {
        url: '',
        width: 800,
        height: 400,
        alt: 'Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <MswComponent />
        <div id="layout-wrapper">
          <div id="main-content">
            <Providers>
              <ChakraProvider theme={theme}>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
              </ChakraProvider>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
