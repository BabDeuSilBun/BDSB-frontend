'use client';

import CurrentAddress from './currentAddress';

import Header from '@/components/layout/header';
const ManageAddress = async () => {
  return (
    <>
      <Header text="주소 관리" buttonLeft="back" />
      <CurrentAddress />
    </>
  );
};

export default ManageAddress;
