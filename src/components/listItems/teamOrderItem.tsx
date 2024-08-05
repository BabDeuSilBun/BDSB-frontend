'use client';

import Image from 'next/image';
import { MeetingSummary } from '@/types/meeting';
import styled from 'styled-components';
import { StoreSummary } from '@/types/store';
import { getRestaurantDetail } from '@/services/restaurantService';
import { getCurrentHeadCount } from '@/services/teamOrderService';
import { useQuery } from '@tanstack/react-query';
import GroupIcon from '../svg/group';

const Container = styled.div`
  display: flex;
  padding: 10px;
`;

const ImageBox = styled.div`
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

const MainDescriptions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 10px;
  flex: 1;
  overflow: hidden;
`;

const OtherDescriptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  flex: 0 1 auto;
`;

const HeadCount = styled.div`
  display: flex;
  gap: 8px;
  justify-content: right;
`;

const Title = styled.h4.attrs({ className: 'bold' })`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Delivery = styled.p.attrs({ className: 'xs' })`
  display: flex;
  gap: 8px;
`;

const OrderType = styled.p.attrs({ className: 'bold' })`
  color: var(--primary);
`;

const TeamOrderItem: React.FC<{ item: MeetingSummary }> = ({ item }) => {
  const { data: storeData } = useQuery<StoreSummary>({
    queryKey: ['storeDetails', item.storeId],
    queryFn: () => getRestaurantDetail(item.storeId),
    enabled: !!item.storeId,
  });

  const { data: headCountData } = useQuery<{ currentHeadCount: number }>({
    queryKey: ['headCount', item.meetingId],
    queryFn: () => getCurrentHeadCount(item.meetingId),
    enabled: !!item.meetingId,
  });

  return (
    <Container>
      <ImageBox>
        {storeData?.image[0] && (
          <Image src={storeData.image[0].url} alt="store image" layout="fill" />
        )}
      </ImageBox>

      <MainDescriptions>
        <p className="sm">4분 뒤 마감</p>
        <Title> {storeData?.name}</Title>
        <Delivery>
          <Image src="./timer.svg" alt="delivery time" width="18" height="18" />
          <span>{storeData?.deliveryTime}</span>
        </Delivery>
        <Delivery>
          <Image src="./fee.svg" alt="delivery time" width="18" height="18" />
          <span>{storeData?.deliveryPrice}</span>
        </Delivery>
      </MainDescriptions>

      <OtherDescriptions>
        <HeadCount>
          <GroupIcon color="var(--primary)" width={18} height={18} />
          <p className="sm">{`${headCountData?.currentHeadCount} / ${item.participantMax}`}</p>
        </HeadCount>
        <OrderType>{item.orderType}</OrderType>
      </OtherDescriptions>
    </Container>
  );
};

export default TeamOrderItem;

{
  /* 여기 나중에 로직 추가해서 수정 예정 */
}
{
  /* <p>{item.paymentAvailableDt}</p>*/
}
