import { RefObject } from 'react';

import { Divider } from '@chakra-ui/react';
import { InfiniteData } from '@tanstack/react-query';
import styled from 'styled-components';

import { PurchasesResponse } from '@/types/coreTypes';
import { formatCurrency } from '@/utils/currencyFormatter';

const MenuTypeTitle = styled.h2`
  color: var(--primary);
  font-size: var(--font-size-lg); /* 20px */
  font-weight: var(--font-semi-bold);
  text-align: left;
  width: 95%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const MenuItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: var(--background);
`;

const MenuItemName = styled.div`
  font-size: var(--font-size-md); /* 16px */
  color: var(--text);
  font-weight: var(--font-semi-bold);
  text-align: left;
`;

const MenuItemPrice = styled.div`
  font-size: var(--font-size-md); /* 16px */
  color: var(--text);
  font-weight: var(--font-regular);
  text-align: right;
`;

interface TeamOrderItemsProps {
  teamPurchases: InfiniteData<PurchasesResponse>;
  lastElementRef: RefObject<HTMLDivElement>;
}

const TeamPurchaseItems: React.FC<TeamOrderItemsProps> = ({
  teamPurchases,
  lastElementRef,
}) => (
  <>
    <Divider
      orientation="horizontal"
      sx={{
        borderWidth: '3px',
        borderColor: 'var(--gray100)',
      }}
    />
    <MenuTypeTitle>공통 메뉴</MenuTypeTitle>
    <MenuContainer>
      {teamPurchases &&
        teamPurchases.pages.map((page) =>
          page.items?.content.map((item, index) => (
            <MenuItemRow
              key={`${item.purchaseId}-${item.menuId}`}
              ref={
                index === page.items.content.length - 1 ? lastElementRef : null
              }
            >
              <MenuItemName>
                {item.name} x {item.quantity}
              </MenuItemName>
              <MenuItemPrice>
                {formatCurrency(item.price * item.quantity)}
              </MenuItemPrice>
            </MenuItemRow>
          )),
        )}
    </MenuContainer>
  </>
);

export default TeamPurchaseItems;
