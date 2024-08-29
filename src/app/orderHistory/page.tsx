'use client';

import Header from '@/components/layout/header';
import Container from '@/styles/container';

const OrderHistories = () => {
  return (
    <>
      <Header text="주문 내역 목록" buttonRight="home" />
      <Container>주문 내역 목록입니다</Container>
    </>
  );
};

export default OrderHistories;
