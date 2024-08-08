'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { RestaurantSummary } from '@/types/restaurant';
import { formatCurrency } from '@/utils/currencyFormatter';

const CardContainer = styled.div`
  display: flex;
  padding: 1rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: var(--border-radius-default);
  width: 92px;
  height: 92px;
  background: var(--gray200);
  position: relative;
`;

// 주 정보 영역
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 10px;
  flex: 1;
  overflow: hidden;
`;

const RestaurantName = styled.h4`
  font-weight: var(--font-semi-bold);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InfoItem = styled.p`
  font-size: var(--font-size-xs);
  display: flex;
  gap: 0.3rem;
`;

const InfoTitle = styled.span`
  color: var(--gray400);
  margin-right: 0.3rem;
`;

const RestaurantsItem: React.FC<{ item: RestaurantSummary }> = ({ item }) => {
  const deliveryPrice = formatCurrency(item.deliveryPrice);
  const minOrderPrice = formatCurrency(item.minOrderPrice);

  return (
    <CardContainer>
      <ImageContainer>
        <Image
          src={item.image[0].url}
          alt="restaurant Image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </ImageContainer>
      <InfoSection>
        <RestaurantName>{item.name}</RestaurantName>
        <InfoItem>
          <Image
            src="./timer.svg"
            alt="Delivery Time"
            width="18"
            height="18"
            priority
          />
          <span>{item.deliveryTime}</span>
        </InfoItem>
        <InfoItem>
          <Image
            src="./fee.svg"
            alt="Delivery Fee"
            width="18"
            height="18"
            priority
          />
          <span>{deliveryPrice}</span>
        </InfoItem>
        <InfoItem>
          <InfoTitle>최소주문</InfoTitle>
          <span>{minOrderPrice}</span>
        </InfoItem>
      </InfoSection>
    </CardContainer>
  );
};

export default RestaurantsItem;
