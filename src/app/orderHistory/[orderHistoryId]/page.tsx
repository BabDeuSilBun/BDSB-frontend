'use client';

import Header from '@/components/layout/header';
import Container from '@/styles/container';

const OrderHistoryDetail = () => {
  const number = 1;
  return (
    <>
      <Header text="주문 내역" buttonLeft="back" />
      <Container>
        <section>{`${number}번의 주문 정보`}</section>
        <section>{`${number}번의 주문 상세`}</section>
        <section>{`${number}번의 결제 금액`}</section>
        <section>{`${number}번의 추가 정보`}</section>
        <button>모임에서 탈퇴하기</button>
      </Container>
    </>
  );
};

export default OrderHistoryDetail;
