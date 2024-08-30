import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import GroupIcon from '../svg/group';

import useRemainingTime from '@/hook/useRemainingTime';
import { getCurrentHeadCount } from '@/services/teamOrderService';
import { MeetingType } from '@/types/coreTypes';

// 카드 레이아웃 컨테이너
const CardContainer = styled.div`
  display: flex;
  padding: 1rem 0;
  cursor: pointer;
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
const RestaurantName = styled.h4`
  font-weight: var(--font-semi-bold);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

// 배달 시간 및 가격 정보
const InfoItem = styled.p`
  font-size: var(--font-size-xs);
  display: flex;
  gap: 0.3rem;
`;

const Information = styled.p<{ $isCritical?: boolean }>`
  font-size: var(--font-size-sm);
  color: ${({ $isCritical }) => $isCritical && 'var(--warning)'};
`;

// 주문 타입
const OrderTypeLabel = styled.p`
  font-weight: var(--font-semi-bold);
  color: var(--primary);
`;

const TeamOrderItem: React.FC<{ item: MeetingType }> = ({ item }) => {
  const router = useRouter();
  const { time: remainingTime, $isCritical } = useRemainingTime(
    item.paymentAvailableAt,
  );

  const { data: headCountData } = useQuery<{
    headcount: number;
  }>({
    queryKey: ['headCount', item.meetingId],
    queryFn: () => getCurrentHeadCount(item.meetingId),
  });

  const handleClick = () => {
    router.push(`/teamOrder/${item.storeId}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
        {item.storeImage &&
          item.storeImage.length > 0 &&
          item.storeImage[0].url && (
            <Image
              src={item.storeImage[0].url}
              alt="Restaurant Image"
              fill
              sizes="50vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          )}
      </ImageContainer>
      <InfoSection>
        <Information $isCritical={$isCritical}>{remainingTime}</Information>
        <RestaurantName>{item.storeName}</RestaurantName>
        <InfoItem>
          <Image src="/timer.svg" alt="Delivery Time" width="18" height="18" />
          <span>{item.deliveryTimeRange}</span>
        </InfoItem>
        <InfoItem>
          <Image src="/fee.svg" alt="Delivery Fee" width="18" height="18" />
          <span>{item.deliveryFeeRange}</span>
        </InfoItem>
      </InfoSection>
      <AdditionalInfo>
        <ParticipantCount>
          <GroupIcon color="var(--primary)" width={18} height={18} />
          <Information>
            {`${headCountData ? headCountData.headcount : 0} / ${item.participantMax}`}
          </Information>
        </ParticipantCount>
        <OrderTypeLabel>
          {item.purchaseType === 'DINING_TOGETHER' ? '함께 식사' : '각자 식사'}
        </OrderTypeLabel>
      </AdditionalInfo>
    </CardContainer>
  );
};

export default TeamOrderItem;
