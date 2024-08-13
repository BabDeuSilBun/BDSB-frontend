'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import { RestaurantType } from '@/types/coreTypes';
import { formatCurrency } from '@/utils/currencyFormatter';

const CardContainer = styled.div`
  display: flex;
  padding: 1rem;
  cursor: pointer;
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

const RestaurantsItem: React.FC<{ item: RestaurantType }> = ({ item }) => {
  const router = useRouter();

  const deliveryPrice = formatCurrency(item.deliveryPrice);
  const minPurchasePrice = formatCurrency(item.minPurchasePrice);

  const handleClick = () => {
    router.push(`/restaurants/${item.storeId}`);
  };

// Find the representative image or use the first one
const imageToShow = item.images && item.images.length > 0
  ? item.images.find(img => img.isRepresentative) || item.images[0]
  : null;

  return (
    <CardContainer>
      <ImageContainer onClick={handleClick}>
        {imageToShow && (
          <Image
            src={imageToShow.url}
            alt="restaurant Image"
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
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
          <span>{item.deliveryTimeRange}</span>
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
          <span>{minPurchasePrice}</span>
        </InfoItem>
      </InfoSection>
    </CardContainer>
  );
};

export default RestaurantsItem;
