'use client';

import { useEffect, useRef } from 'react';

import { Divider } from '@chakra-ui/react';
import styled from 'styled-components';

import Loading from '@/app/loading';

interface OrderDetailsProps {
  storeName: string;
  info1Description: string;
  info2Description: string;
  info3Description: string;
  purchaseType1: string;
  menuItems1: { name: string; price: number; quantity: number }[];
  fetchNextPage1: () => void;
  hasNextPage1: boolean;
  isFetchingNextPage1: boolean;
  purchaseType2: string;
  menuItems2: { name: string; price: number; quantity: number }[];
  fetchNextPage2: () => void;
  hasNextPage2: boolean;
  isFetchingNextPage2: boolean;
}

const Container = styled.div`
  width: 100%;
  padding: var(--spacing-lg) 0 var(--spacing-xs);
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
  margin-right: var(--spacing-md);
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
  menuItems1,
  fetchNextPage1,
  hasNextPage1,
  isFetchingNextPage1,
  purchaseType2,
  menuItems2,
  fetchNextPage2,
  hasNextPage2,
  isFetchingNextPage2,
}) => {
  const lastElementRef1 = useRef<HTMLDivElement | null>(null);
  const lastElementRef2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isFetchingNextPage1 || !hasNextPage1) return;

    const currentRef = lastElementRef1.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage1();
        }
      },
      { threshold: 1.0 },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isFetchingNextPage1, hasNextPage1, fetchNextPage1]);

  useEffect(() => {
    if (isFetchingNextPage2 || !hasNextPage2) return;

    const currentRef2 = lastElementRef2.current;

    const observer2 = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage2();
        }
      },
      { threshold: 1.0 },
    );

    if (currentRef2) {
      observer2.observe(currentRef2);
    }

    return () => {
      if (currentRef2) {
        observer2.unobserve(currentRef2);
      }
    };
  }, [isFetchingNextPage2, hasNextPage2, fetchNextPage2]);

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
        {menuItems1.map((item, index) => (
          <MenuItem
            key={index}
            ref={index === menuItems1.length - 1 ? lastElementRef1 : null}
          >
            <MenuItemName>
              {item.name} x {item.quantity}
            </MenuItemName>
            <MenuItemPrice>{`${item.price.toLocaleString()}원`}</MenuItemPrice>
          </MenuItem>
        ))}
      </MenuTypeContainer>
      {isFetchingNextPage1 && <Loading />}

      <MenuTypeContainer>
        <PurchaseTypeTitle>{purchaseType2}</PurchaseTypeTitle>
        {menuItems2.map((item, index) => (
          <MenuItem
            key={index}
            ref={index === menuItems2.length - 1 ? lastElementRef2 : null}
          >
            <MenuItemName>
              {item.name} x {item.quantity}
            </MenuItemName>
            <MenuItemPrice>{`${item.price.toLocaleString()}원`}</MenuItemPrice>
          </MenuItem>
        ))}
      </MenuTypeContainer>
      {isFetchingNextPage2 && <Loading />}
    </Container>
  );
};

export default OrderDetails;
