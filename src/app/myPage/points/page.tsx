'use client';

import Header from '@/components/layout/header';
import MyPoint from './MyPoint';

const Page = () => {
  return (
    <>
      <Header buttonLeft="back" text="포인트 사용내역" />
      <MyPoint />
    </>
  );
};

export default Page;
