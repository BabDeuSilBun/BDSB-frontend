import React from 'react';

import { InfiniteData } from '@tanstack/react-query';
import styled from 'styled-components';

import { MeetingType, PurchasesResponse } from '@/types/coreTypes';
import { formatCurrency } from '@/utils/currencyFormatter';

interface RemainingAmountProps {
  meeting: MeetingType;
  teamPurchases: InfiniteData<PurchasesResponse>;
  individualPurchases: PurchasesResponse;
}

const RemainingAmountText = styled.div`
  position: fixed;
  bottom: 5rem;
  width: 100%;
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--primary);
  font-weight: var(--font-regular);
  z-index: 1001;
`;

const RemainingAmount = ({
  meeting,
  teamPurchases,
  individualPurchases,
}: RemainingAmountProps) => {
  const teamPurchasesFee = teamPurchases ? teamPurchases.pages[0].totalFee : 0;
  const individualPurchasesFee = individualPurchases
    ? individualPurchases.totalFee
    : 0;

  const totalFee = teamPurchasesFee + individualPurchasesFee;

  const minPurchasePrice = meeting.minPurchaseAmount;
  const remainingAmount = minPurchasePrice - totalFee;

  return (
    <RemainingAmountText aria-live="polite">
      {remainingAmount > 0
        ? `최소 주문 금액까지 ${formatCurrency(remainingAmount)} 남았어요!`
        : '최소 주문 금액이 다 채워졌어요!'}
    </RemainingAmountText>
  );
};

export default RemainingAmount;
