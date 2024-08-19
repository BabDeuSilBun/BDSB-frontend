'use client';

import { useState } from 'react';
// import axios from 'axios';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import { RestaurantType } from '@/types/coreTypes';
// import { useOrderStore } from '@/state/orderStore';
import Container from '@/styles/container';
import Header from '@/components/layout/header';
import Step1 from '@/app/teamOrderSetting/[storeId]/step1';
import Step2 from '@/app/teamOrderSetting/[storeId]/step2';
import Footer from '@/components/layout/footer';
import styled from 'styled-components';

const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 var(--spacing-md) 6rem;
`;

const TeamOrderSettingPage = () => {
  const router = useRouter();
  const { storeId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  // const { formData } = useOrderStore();

  useQuery<RestaurantType>({
    queryKey: ['storeInfo', storeId],
    queryFn: () => getRestaurantInfo(Number(storeId)),
    enabled: !!storeId,
  });

  const handleNextStep = () => {
    if (currentStep === 2) {
      router.push(`/restaurants/${storeId}?context=leaderBefore`);
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep === 1) {
      router.push(`/restaurants/${storeId}?context=leaderBefore`);
    } else if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  // const handleSubmit = async () => {
  //   const requestBody = {
  //     storeId: Number(storeId),
  //     purchaseType: formData.mealType,
  //     minHeadcount: formData.minHeadcount,
  //     maxHeadcount: formData.maxHeadcount,
  //     isEarlyPaymentAvailable: formData.orderType === '예약 주문',
  //     paymentAvailableAt: new Date(),
  //     // deliveredAddress: {
  //     //   deliveredPostal: formData.deliveredPostal,
  //     //   deliveredStreetAddress: formData.deliveredStreetAddress,
  //     //   deliveredDetailAddress: formData.deliveredDetailAddress,
  //     // },
  //     // metAddress: {
  //     //   metPostal: formData.metPostal,
  //     //   metStreetAddress: formData.metStreetAddress,
  //     //   metDetailAddress: formData.metDetailAddress,
  //     // },
  //     description: formData.additionalInfo,
  //   };

  //   try {
  //     const response = await axios.post('/api/team-order', requestBody);
  //     router.push(`/restaurants/${storeId}?context=leaderAfter`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <Header
        buttonLeft="back"
        buttonRight="exit"
        onBack={handleBackStep}
        text="모임 만들기"
      />
      <CustomContainer>
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        <Footer
          type="button"
          buttonText={currentStep === 2 ? '설정 완료 · 주문하기' : '다음으로'}
          onButtonClick={handleNextStep}
        />
      </CustomContainer>
    </>
  );
};

export default TeamOrderSettingPage;
