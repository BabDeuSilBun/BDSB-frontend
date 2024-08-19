'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import { RestaurantType } from '@/types/coreTypes';
import Header from '@/components/layout/header';
import Step1 from '@/app/teamOrderSetting/[storeId]/step1';
import Step2 from '@/app/teamOrderSetting/[storeId]/step2';
import Footer from '@/components/layout/footer';
import styled from 'styled-components';
import router from 'next/router';

const HeaderContainer = styled.div`
  width: 100%;
  header {
    background-color: transparent;
    box-shadow: none;
    position: static;
    z-index: auto;
  }
`;

const TeamOrderSettingPage = () => {
  const { storeId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  useQuery<RestaurantType>({
    queryKey: ['storeInfo', storeId],
    queryFn: () => getRestaurantInfo(Number(storeId)),
    enabled: !!storeId,
  });

  const handleNextStep = () => {
    if (currentStep === 2) {
      router.push('/nextPage');
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div>
      <HeaderContainer>
        <Header buttonLeft="back" buttonRight="exit" onBack={handleBackStep} />
      </HeaderContainer>

      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}

      <Footer
        type="button"
        buttonText={currentStep === 2 ? '설정 마무리하고 주문하기' : '다음으로'}
        onButtonClick={handleNextStep}
      />
    </div>
  );
};

export default TeamOrderSettingPage;
