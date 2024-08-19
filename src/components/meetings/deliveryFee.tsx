'use client';

import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';
import { formatCurrency } from '@/utils/currencyFormatter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: var(--spacing-sm) 0;
  margin-top: var(--spacing-md);
`;

const DeliveryFeeContainer = styled.div`
  width: 100%;
  margin-top: var(--spacing-md);
`;

const DeliveryFeeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--spacing-xs) 0;
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

interface DeliveryFeeProps {
  totalDeliveryFee: number;
  maxIndividualDeliveryFee: number;
  minIndividualDeliveryFee: number;
}

export default function DeliveryFee({
  totalDeliveryFee,
  maxIndividualDeliveryFee,
  minIndividualDeliveryFee,
}: DeliveryFeeProps) {
  return (
    <Container>
      <Divider
        orientation="horizontal"
        sx={{
          borderWidth: '0.5px',
          borderColor: 'var(--gray200)',
        }}
      />
      <DeliveryFeeContainer>
        <DeliveryFeeWrapper>
          <ItemName>총 배달비</ItemName>
          <Price>{formatCurrency(totalDeliveryFee)}</Price>
        </DeliveryFeeWrapper>
        <DeliveryFeeWrapper>
          <ItemName>최대 개별 배달비</ItemName>
          <Price>{formatCurrency(maxIndividualDeliveryFee)}</Price>
        </DeliveryFeeWrapper>
        <DeliveryFeeWrapper>
          <ItemName>최소 개별 배달비</ItemName>
          <Price>{formatCurrency(minIndividualDeliveryFee)}</Price>
        </DeliveryFeeWrapper>
      </DeliveryFeeContainer>
    </Container>
  );
}
