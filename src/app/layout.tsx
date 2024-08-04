import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { MswComponent } from '@/components/msw.component';
// tanstack query setting ing

const font = localFont({
  src: [
    {
      path: './fonts/SF-Pro-Display-Light.otf',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Display-Regular.otf',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Display-Semibold.otf',
      style: 'normal',
    },
    {
      path: './fonts/SUIT.woff2',
    },
  ],
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
  // 나중에 themeprovider로 감싸줘야 함
  return (
    <html lang="en">
      <body className={font.className}>
        <MswComponent />
        {children}
      </body>
    </html>
  );
}
