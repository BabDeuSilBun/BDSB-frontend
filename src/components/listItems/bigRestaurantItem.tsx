'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import { RestaurantType } from '@/types/coreTypes';
import { formatCurrency } from '@/utils/currencyFormatter';

// 카드 레이아웃 컨테이너
const CardContainer = styled.div`
  margin: 1rem;
  background-color: white;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  border-radius: var(--border-radius-default);
  overflow: hidden;
  cursor: pointer;
`;

// 이미지 컨테이너
const ImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 140px;
  background: var(--gray200);
  position: relative;
`;

// 하단 정보 컨테이너
const InfoSection = styled.div`
  padding: 0.7rem;
  text-align: left;
`;

const StoreTitle = styled.h4`
  font-weight: var(--font-semi-bold);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 4px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  font-size: var(--font-size-xs);
  & div {
    display: flex;
    gap: 0.3rem;
  }
`;

const InfoTitle = styled.span`
  color: var(--gray400);
  margin-right: 0.3rem;
`;

const BigRestaurantsItem: React.FC<{ item: RestaurantType }> = ({ item }) => {
  const router = useRouter();

  const deliveryPrice = formatCurrency(item.deliveryPrice);
  const minPurchasePrice = formatCurrency(item.minPurchasePrice);

  const handleClick = () => {
    router.push(`/restaurants/id=${item.storeId}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
        {item.image[0] && (
          <Image
            src={item.image[0].url}
            alt="Store Image"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
      </ImageContainer>
      <InfoSection>
        <StoreTitle>{item.name}</StoreTitle>
        <InfoContainer>
          <div>
            <Image
              src="./timer.svg"
              alt="Delivery Time"
              width="18"
              height="18"
            />
            <span>{item.deliveryTime}</span>
          </div>
          <div>
            <Image src="./fee.svg" alt="Delivery Fee" width="18" height="18" />
            <span>{deliveryPrice}</span>
          </div>
          <div>
            <InfoTitle>최소주문</InfoTitle>
            <span>{minPurchasePrice}</span>
          </div>
        </InfoContainer>
      </InfoSection>
    </CardContainer>
  );
};

export default BigRestaurantsItem;
