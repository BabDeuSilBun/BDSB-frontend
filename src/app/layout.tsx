import '@/styles/globals.css';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import MswComponent from '@/components/msw.component';
import StyledComponentsRegistry from '@/lib/registry';

import Providers from './providers';

const font = localFont({
  src: 'fonts/SF-Pro.ttf',
  style: 'normal',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '밥드실분',
  description: 'delivery group app for university students',
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
        <div id="main-content">
          <Providers>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </Providers>
        </div>
      </body>
    </html>
  );
}
