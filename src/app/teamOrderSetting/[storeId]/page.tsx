'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v4 as uuidv4 } from 'uuid';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';

import Step1 from '@/app/teamOrderSetting/[storeId]/step1';
import Step2 from '@/app/teamOrderSetting/[storeId]/step2';
import Modal from '@/components/common/modal';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { getMyData } from '@/services/myDataService';
import { getRestaurantInfo } from '@/services/restaurantService';
import { useOrderStore } from '@/state/orderStore';
import Container from '@/styles/container';
import { RestaurantType } from '@/types/coreTypes';

const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 var(--spacing-md) 6rem;
`;

const TeamOrderSettingPage = () => {
  // Hooks for navigation and params
  const router = useRouter();
  const { storeId } = useParams();

  // State management hooks
  const [currentStep, setCurrentStep] = useState(1);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isButtonActive, formData, setStoreId } = useOrderStore();

  useEffect(() => {
    if (storeId) {
      setStoreId(Number(storeId));
    }
  }, [storeId, setStoreId]);

  // Fetch restaurant and user data
  useQuery<RestaurantType>({
    queryKey: ['storeInfo', storeId],
    queryFn: () => getRestaurantInfo(Number(storeId)),
    enabled: !!storeId,
  });

  useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  // Handle form submission and team order creation
  const handleSubmit = async () => {
    const requestBody = {
      storeId: formData.storeId,
      purchaseType: formData.purchaseType,
      minHeadcount: formData.minHeadcount,
      maxHeadcount: formData.maxHeadcount,
      isEarlyPaymentAvailable: formData.isEarlyPaymentAvailable,
      paymentAvailableAt: formData.paymentAvailableAt,
      deliveredAddress: formData.deliveredAddress,
      metAddress: formData.metAddress,
      description: formData.description,
    };

    console.log('Submitting request with body:', requestBody);

    try {
      // const response = await axios.post('/api/users/meetings', requestBody);
      // const { meetingId } = response.data;

      const tempMeetingId = storeId; // Use the storeId as the temporary meetingId

      console.log('Response from server:', requestBody);

      // Temporarily redirect with the temporary meetingId
      router.push(
        `/restaurants/${storeId}?context=leaderAfter&meetingId=${tempMeetingId}`,
      );
      // router.push(`/restaurants/${storeId}?context=leaderAfter&meetingId=${meetingId}`);
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  // Handle step navigation
  const handleNextStep = async () => {
    if (currentStep === 2) {
      await handleSubmit();
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBackStep = () => {
    if (isPostcodeOpen) {
      setIsPostcodeOpen(false);
    } else if (currentStep === 1) {
      setIsModalOpen(true);
    } else if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleExit = () => {
    if (isPostcodeOpen) {
      setIsPostcodeOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  // Handle modal actions
  const handleModalContinue = () => {
    setIsModalOpen(false);
  };

  const handleModalExit = () => {
    router.push(`/restaurants/${storeId}?context=leaderBefore`);
  };

  return (
    <>
      <Header
        buttonLeft="back"
        buttonRight="exit"
        onBack={handleBackStep}
        onExit={handleExit}
        text="모임 만들기"
        isPostcodeOpen={isPostcodeOpen}
        onClosePostcodeModal={() => setIsPostcodeOpen(false)}
      />
      <CustomContainer>
        {currentStep === 1 && (
          <Step1
            isPostcodeOpen={isPostcodeOpen}
            setIsPostcodeOpen={setIsPostcodeOpen}
          />
        )}
        {currentStep === 2 && <Step2 />}
        <Footer
          type="button"
          buttonText={currentStep === 2 ? '설정 완료 · 주문하기' : '다음으로'}
          onButtonClick={handleNextStep}
          disabled={!isButtonActive}
        />
      </CustomContainer>

      {isModalOpen && (
        <Modal
          type="text"
          title1="작성 중인 내용이 있습니다."
          title2="정말 나가실 건가요?"
          description="종료하지 않고 페이지를 벗어날 경우, 지금까지 작성한 내용이 사라집니다."
          buttonText1="계속하기"
          buttonText2="종료하기"
          onButtonClick1={handleModalContinue}
          onButtonClick2={handleModalExit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default TeamOrderSettingPage;
