'use client';

import styled from 'styled-components';

import DeliveryStatusHeader from '@/components/deliveryStatus/deliveryStatusHeader';
import Status from '@/components/deliveryStatus/status';
import Container from '@/styles/container';

const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 0;
`;

const DeliveryStatus = () => {
  return (
    <>
      <DeliveryStatusHeader />
      <CustomContainer>
        <Status
          title="맛있게 만들고 있어요"
          description="맛있게 드실 수 있도록 사장님께서 메뉴를 조리하고 있어요"
          badgeDescription="15"
          progress={66}
        />
      </CustomContainer>
    </>
  );
};

export default DeliveryStatus;
