'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/loading';
import Header from '@/components/layout/header';
import Step1 from '@/app/TeamOrderSetting/step1';
import Step2 from '@/app/TeamOrderSetting/step2';
import Footer from '@/components/layout/footer';
import styled from 'styled-components';

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

  // Handler to go to the next step

  const handleNextStep = () => {
    if (currentStep === 2) {
      router.push('/nextPage');
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div>
      <HeaderContainer>
      <Header 
        buttonRight="exit" 
      />
      </HeaderContainer>

      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}

      <Footer
        type="button"
        buttonText={currentStep === 2 ? "완료하고 주문하기" : "다음으로"}
        onButtonClick={handleNextStep}
      />
    </div>
  );
};

export default TeamOrderSettingPage;