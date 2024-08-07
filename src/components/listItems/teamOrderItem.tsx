'use client';

import Image from 'next/image';
import { MeetingSummary } from '@/types/meeting';
import styled from 'styled-components';
import { RestaurantSummary } from '@/types/restaurant';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getCurrentHeadCount } from '@/services/teamOrderService';
import { useQuery } from '@tanstack/react-query';
import GroupIcon from '../svg/group';
import { formatCurrency } from '@/utils/currencyFormatter';

// 카드 레이아웃 컨테이너
const CardContainer = styled.div`
  display: flex;
  padding: 1rem 0;
`;

// 이미지 컨테이너
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: var(--border-radius-default);
  width: 80px;
  height: 96px;
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

// 추가 정보 영역
const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  flex: 0 1 auto;
`;

// 참가자 수 표시
const ParticipantCount = styled.div`
  display: flex;
  gap: 8px;
  justify-content: right;
`;

// 매장 이름
const RestaurantName = styled.h4.attrs({ className: 'bold' })`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

// 배달 시간 및 가격 정보
const InfoItem = styled.p.attrs({ className: 'xs' })`
  display: flex;
  gap: 0.3rem;
`;

// 주문 타입
const OrderTypeLabel = styled.p.attrs({ className: 'bold' })`
  color: var(--primary);
`;

const TeamOrderItem: React.FC<{ item: MeetingSummary }> = ({ item }) => {
  const { data: restaurantData } = useQuery<RestaurantSummary>({
    queryKey: ['restaurantInfo', item.storeId],
    queryFn: () => getRestaurantInfo(item.storeId),
    enabled: !!item.storeId,
  });

  const { data: headCountData } = useQuery<{ currentHeadCount: number }>({
    queryKey: ['headCount', item.meetingId],
    queryFn: () => getCurrentHeadCount(item.meetingId),
    enabled: !!item.meetingId,
  });

  const deliveryPrice = restaurantData
    ? formatCurrency(restaurantData.deliveryPrice)
    : 0;

  return (
    <CardContainer>
      <ImageContainer>
        {restaurantData?.image[0] && (
          <Image
            src={restaurantData.image[0].url}
            alt="restaurant Image"
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
      </ImageContainer>
      <InfoSection>
        <p className="sm">4분 뒤 마감</p>
        <RestaurantName>{restaurantData?.name}</RestaurantName>
        <InfoItem>
          <Image
            src="./timer.svg"
            alt="Delivery Time"
            width="18"
            height="18"
            priority={true}
          />
          <span>{restaurantData?.deliveryTime}</span>
        </InfoItem>
        <InfoItem>
          <Image src="./fee.svg" alt="Delivery Fee" width="18" height="18" />
          <span>{deliveryPrice}</span>
        </InfoItem>
      </InfoSection>
      <AdditionalInfo>
        <ParticipantCount>
          <GroupIcon
            color="var(--primary)"
            width={18}
            height={18}
            priority={true}
          />
          <p className="sm">{`${headCountData?.currentHeadCount} / ${item.participantMax}`}</p>
        </ParticipantCount>
        <OrderTypeLabel>{item.orderType}</OrderTypeLabel>
      </AdditionalInfo>
    </CardContainer>
  );
};

export default TeamOrderItem;
