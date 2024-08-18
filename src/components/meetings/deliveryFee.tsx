'use client';

import styled from 'styled-components';
import { formatCurrency } from '@/utils/currencyFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: var(--spacing-sm) 0;
  margin-top: var(--spacing-lg);
`;

const DeliveryFeeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--spacing-sm) 0;
`;

const ItemName = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-regular);
  color: var(--text);
  margin: 0;
`;

const Price = styled.p`
  font-size: var(--font-size-md);
  font-weight: var(--font-regular);
  color: var(--text);
  margin: 0;
`;

export default function DeliveryFee() {
  return (
    <Container>
      <DeliveryFeeWrapper>
        <ItemName>총 배달비</ItemName>
        <Price>{formatCurrency(3000)}</Price>
      </DeliveryFeeWrapper>
      <DeliveryFeeWrapper>
        <ItemName>최대 개별 배달비</ItemName>
        <Price>{formatCurrency(1000)}</Price>
      </DeliveryFeeWrapper>
      <DeliveryFeeWrapper>
        <ItemName>최소 개별 배달비</ItemName>
        <Price>{formatCurrency(600)}</Price>
      </DeliveryFeeWrapper>
    </Container>
  );
}
