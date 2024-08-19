'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import { RestaurantType } from '@/types/coreTypes';
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
          buttonText={
            currentStep === 2 ? '설정 마무리하고 주문하기' : '다음으로'
          }
          onButtonClick={handleNextStep}
        />
      </CustomContainer>
    </>
  );
};

export default TeamOrderSettingPage;
