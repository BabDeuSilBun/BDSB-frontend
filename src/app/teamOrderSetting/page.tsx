'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Step1 from '@/app/TeamOrderSetting/step1';
import Step2 from '@/app/TeamOrderSetting/step2';
import Footer from '@/components/layout/footer';
import styled from 'styled-components';
import { useOrderStore } from '@/state/orderStore';

const HeaderContainer = styled.div`
  width: 100%;
  header {
    background-color: transparent;
    box-shadow: none;
  }
`;

const TeamOrderSettingPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const formData = useOrderStore((state) => state.formData);

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
        <Header
          buttonLeft="back"
          buttonRight="exit"
          onBack={handleBackStep} 
        />
      </HeaderContainer>

      {currentStep === 1 && (
        <Step1 />
      )}
      {currentStep === 2 && (
        <Step2 />
      )}

      <Footer
        type="button"
        buttonText={currentStep === 2 ? "설정 마무리하고 주문하기" : "다음으로"}
        onButtonClick={handleNextStep}
      />
    </div>
  );
};

export default TeamOrderSettingPage;
