'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import { RestaurantType } from '@/types/coreTypes';
import { useOrderStore } from '@/state/orderStore';
import SettingLabel from '@/components/meetings/settingLabel';
import SettingHeadcount from '@/components/meetings/settingHeadcount';
import SettingDescription from '@/components/meetings/settingDescription';
import DeliveryFees from '@/components/meetings/deliveryFee';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 var(--spacing-md) 6rem;
  margin-top: 60px;
`;

const Step2 = () => {
  const { formData, setMinHeadcount, setMaxHeadcount, setAdditionalInfo } =
    useOrderStore();
  const { minHeadcount = 1, maxHeadcount = 1, additionalInfo } = formData;
  const { storeId } = useParams();

  const { data: store } = useQuery<RestaurantType>({
    queryKey: ['storeInfo', storeId],
    queryFn: () => getRestaurantInfo(Number(storeId)),
    enabled: !!storeId,
  });

  if (!store) {
    return null;
  }

  const deliveryPrice = store.deliveryPrice || 0;

  const maxIndividualDeliveryFee =
    store.deliveryPrice / Math.max(minHeadcount, 1);
  const minIndividualDeliveryFee =
    store.deliveryPrice / Math.max(maxHeadcount, 1);

  return (
    <Container>
      <SettingLabel text="인원 제한" />
      <SettingHeadcount
        text="본인 포함 최소 인원"
        value={minHeadcount}
        onValueChange={setMinHeadcount}
      />
      <SettingHeadcount
        text="본인 포함 최대 인원"
        value={maxHeadcount}
        onValueChange={setMaxHeadcount}
      />
      <SettingLabel text="추가 설명" />
      <SettingDescription
        placeholder="모임원의 조건이나 본인 소개 등 추가적으로 당부할 말이 있다면 자유롭게 적어주세요."
        value={additionalInfo}
        onValueChange={setAdditionalInfo}
      />

      <DeliveryFees
        totalDeliveryFee={deliveryPrice}
        maxIndividualDeliveryFee={maxIndividualDeliveryFee}
        minIndividualDeliveryFee={minIndividualDeliveryFee}
      />
    </Container>
  );
};

export default Step2;
