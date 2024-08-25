import MyPoint from './MyPoint';

import Header from '@/components/layout/header';

const Page = () => {
  return (
    <>
      <Header buttonLeft="back" text="포인트 사용내역" />
      <MyPoint />
    </>
  );
};

export default Page;
