'use client';

import styled from 'styled-components';

import Status from '@/components/deliveryStatus/status';
import Header from '@/components/layout/header';
import Container from '@/styles/container';

const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 0;
`;

const DeliveryStatus = () => {
  const currentStatus = '배달완료'; // '주문접수', '배달시작', '배달거의완료', '배달완료'

  return (
    <>
      <Header buttonLeft="exit" text="배달 현황" buttonRight="refresh" />
      <CustomContainer>
        <Status status={currentStatus} arrivalTime="오후 2:30" />
      </CustomContainer>
    </>
  );
};

export default DeliveryStatus;
