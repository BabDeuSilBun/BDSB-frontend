'use client';

import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';

interface OrderDetailsProps {
  storeName: string;
  info1Description: string;
  info2Description: string;
  info3Description: string;
  purchaseType1: string;
  menuItem1Name: string;
  menuItem1Price: string;
  menuItem1Quantity: number;
  purchaseType2: string;
  menuItem2Name: string;
  menuItem2Price: string;
  menuItem2Quantity: number;
}

const Container = styled.div`
  width: 100%;
  padding: var(--spacing-lg) 0;
`;

const StoreName = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-semi-bold);
  color: var(--text);
  margin-bottom: var(--spacing-sm);
`;

const InfoList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: var(--spacing-xs);
`;

const InfoTitle = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-semi-bold);
  color: var(--text);
  margin-right: var(--spacing-lg);
`;

const InfoDescription = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-regular);
  color: var(--text);
  word-break: keep-all;
  white-space: normal;
  overflow-wrap: break-word;
`;

const SectionTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: var(--font-semi-bold);
  color: var(--text);
  margin-top: var(--spacing-md);
  margin-bottom: var(--spacing-md);
`;

const MenuTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-md);
`;

const PurchaseTypeTitle = styled.h4`
  font-size: var(--font-size-md);
  font-weight: var(--font-semi-bold);
  color: var(--primary);
  margin-bottom: var(--spacing-sm);
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`;

const MenuItemName = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-regular);
  color: var(--text);
`;

const MenuItemPrice = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-regular);
  color: var(--text);
`;

const OrderDetails: React.FC<OrderDetailsProps> = ({
  storeName,
  info1Description,
  info2Description,
  info3Description,
  purchaseType1,
  menuItem1Name,
  menuItem1Price,
  menuItem1Quantity,
  purchaseType2,
  menuItem2Name,
  menuItem2Price,
  menuItem2Quantity,
}) => {
  return (
    <Container>
      <StoreName>{storeName}</StoreName>

      <InfoList>
        <InfoTitle>배달 시기</InfoTitle>
        <InfoDescription>{info1Description}</InfoDescription>
      </InfoList>

      <InfoList>
        <InfoTitle>주문 유형</InfoTitle>
        <InfoDescription>{info2Description}</InfoDescription>
      </InfoList>

      <InfoList>
        <InfoTitle>수령 장소</InfoTitle>
        <InfoDescription>{info3Description}</InfoDescription>
      </InfoList>

      <Divider
        orientation="horizontal"
        sx={{
          borderWidth: '0.5px',
          borderColor: 'var(--gray200)',
          margin: 'var(--spacing-md) 0',
        }}
      />

      <SectionTitle>주문내역</SectionTitle>

      <MenuTypeContainer>
        <PurchaseTypeTitle>{purchaseType1}</PurchaseTypeTitle>
        <MenuItem>
          <MenuItemName>
            {menuItem1Name} x {menuItem1Quantity}
          </MenuItemName>
          <MenuItemPrice>{menuItem1Price}</MenuItemPrice>
        </MenuItem>
      </MenuTypeContainer>

      <MenuTypeContainer>
        <PurchaseTypeTitle>{purchaseType2}</PurchaseTypeTitle>
        <MenuItem>
          <MenuItemName>
            {menuItem2Name} x {menuItem2Quantity}
          </MenuItemName>
          <MenuItemPrice>{menuItem2Price}</MenuItemPrice>
        </MenuItem>
      </MenuTypeContainer>
    </Container>
  );
};

export default OrderDetails;
