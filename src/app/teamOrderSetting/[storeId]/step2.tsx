'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getRestaurantInfo } from '@/services/restaurantService';
import { RestaurantType } from '@/types/coreTypes';
import { getMyData } from '@/services/myDataService';
import { useOrderStore } from '@/state/orderStore';
import SettingLabel from '@/components/meetings/settingLabel';
import SettingHeadcount from '@/components/meetings/settingHeadcount';
import SettingDescription from '@/components/meetings/settingDescription';
import DeliveryFees from '@/components/meetings/deliveryFee';
import { paymentFormatter } from '@/utils/paymentFormatter';

const Step2 = () => {
  // State management using the order store
  const {
    formData,
    setMinHeadcount,
    setMaxHeadcount,
    setDescription,
    setButtonActive,
    setMaxIndividualDeliveryFee,
  } = useOrderStore();
  const { minHeadcount = 1, maxHeadcount = 1, description } = formData;
  const { storeId } = useParams();

  // Fetching restaurant information based on storeId
  const { data: store } = useQuery<RestaurantType>({
    queryKey: ['storeInfo', storeId],
    queryFn: () => getRestaurantInfo(Number(storeId)),
    enabled: !!storeId,
  });

  // Fetching user data
  useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  // Effect to handle button activation logic
  useEffect(() => {
    const isActive = minHeadcount > 0 && maxHeadcount >= minHeadcount;
    setButtonActive(isActive);
  }, [minHeadcount, maxHeadcount, setButtonActive]);

  // Effect to set max individual delivery fee
  useEffect(() => {
    if (store) {
      const deliveryPrice = store.deliveryPrice || 0;
      const maxFee = paymentFormatter(
        deliveryPrice / Math.max(minHeadcount, 1),
      );

      setMaxIndividualDeliveryFee(maxFee);
    }
  }, [store, minHeadcount, setMaxIndividualDeliveryFee]);

  if (!store) {
    return null;
  }

  // Calculate delivery fees
  const deliveryPrice = store.deliveryPrice || 0;

  const maxIndividualDeliveryFee = paymentFormatter(
    store.deliveryPrice / Math.max(minHeadcount, 1),
  );

  const minIndividualDeliveryFee = paymentFormatter(
    store.deliveryPrice / Math.max(maxHeadcount, 1),
  );

  return (
    <>
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
        value={description}
        onValueChange={setDescription}
      />
      <DeliveryFees
        totalDeliveryFee={deliveryPrice}
        maxIndividualDeliveryFee={maxIndividualDeliveryFee}
        minIndividualDeliveryFee={minIndividualDeliveryFee}
      />
    </>
  );
};

export default Step2;
