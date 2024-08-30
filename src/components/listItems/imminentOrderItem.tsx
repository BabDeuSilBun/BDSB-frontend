'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import GroupIcon from '../svg/group';

import useRemainingTime from '@/hook/useRemainingTime';
import { getCurrentHeadCount } from '@/services/teamOrderService';
import { MeetingType } from '@/types/coreTypes';

// 스타일 컨테이너
const CardContainer = styled.div`
  flex: 0 0 12rem;
  margin: 1rem 1rem 0 0;
  border-radius: var(--border-radius-default);
  overflow: hidden;
  background-color: white;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  margin-bottom: 1rem;
  cursor: pointer;
`;

// 상단 이미지 컨테이너
const ImageSection = styled.div`
  display: flex;
  height: 8rem;
  overflow: hidden;
  background: var(--gray200);
  position: relative;
`;

// 이미지 래퍼
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// 하단 정보 컨테이너
const InfoSection = styled.div`
  display: flex;
  padding: 0.4rem;
  justify-content: space-between;
`;

// 하단 멀티플라이 정보
const InfoOverlay = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: space-between;
  background-color: rgba(128, 128, 128, 0.3); /* 30% 투명도 */
  padding: 0.4rem;
  color: white;
  width: 100%;
  height: fit-content;
`;

// 인원 수 표시
const ParticipantCount = styled.div`
  display: flex;
  gap: 8px;
  justify-content: right;
`;

// 제목
const StoreTitle = styled.h4`
  font-weight: var(--font-semi-bold);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Information = styled.p<{ $isCritical?: boolean }>`
  font-size: var(--font-size-sm);
  color: ${({ $isCritical }) => $isCritical && 'var(--warning)'};
`;

// 주문 타입
const OrderTypeText = styled.p`
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-sm);
  white-space: nowrap;
  color: var(--primary);
`;

const ImminentOrderItem: React.FC<{ item: MeetingType }> = ({ item }) => {
  const { time: remainingTime, $isCritical } = useRemainingTime(
    item.paymentAvailableAt,
  );
  const router = useRouter();

  const { data: headCountData } = useQuery<{ headcount: number }>({
    queryKey: ['headCount', item.meetingId],
    queryFn: () => getCurrentHeadCount(item.meetingId),
    enabled: !!item.meetingId,
  });

  const handleClick = () => {
    router.push(`/teamOrder/${item.storeId}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageSection>
        {item.image && item.image.length > 0 && item.image[0].url && (
          <ImageWrapper>
            <Image
              src={item.image[0].url}
              alt="Restaurant Image"
              fill
              sizes="50vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </ImageWrapper>
        )}
        <InfoOverlay>
          <Information $isCritical={$isCritical}>{remainingTime}</Information>
          <ParticipantCount>
            <GroupIcon color="white" width={16} height={18} />
            <Information>{`${headCountData ? headCountData.headcount : 0} / ${item.participantMax}`}</Information>
          </ParticipantCount>
        </InfoOverlay>
      </ImageSection>
      <InfoSection>
        <StoreTitle>{item.storeName}</StoreTitle>
        <OrderTypeText>
          {item.purchaseType === 'DINING_TOGETHER' ? '함께 식사' : '각자 식사'}
        </OrderTypeText>
      </InfoSection>
    </CardContainer>
  );
};

export default ImminentOrderItem;
