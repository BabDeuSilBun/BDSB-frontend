'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import Header from '@/components/layout/header';
import SettingImage from '@/components/meetings/settingImage';
import { BaseBtn } from '@/styles/button';
import Container from '@/styles/container';

const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-md) 6rem;
  gap: var(--spacing-lg);
`;

type ContextType = 'leaderAfter' | 'participant' | null;

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = searchParams.get('context') as ContextType;
  const [isHeaderTransparent] = useState(true);

  const handleTitles = (context: ContextType) => {
    switch (context) {
      case 'leaderAfter':
        return {
          title: '팀 주문 성공!',
          subTitle: '팀원들을 기다려 볼까요?',
        };
      case 'participant':
        return {
          title: '결제 성공!',
          subTitle: '팀원들을 만나러 가볼까요?',
        };
      default:
        return {
          title: '결제 성공!',
          subTitle: '',
        };
    }
  };

  const handleReturnToHome = () => {
    router.push('/');
  };

  const handleExit = () => {
    router.push('/');
  };

  const { title, subTitle } = handleTitles(context);

  return (
    <>
      <Header
        buttonRight="exit"
        $isTransparent={isHeaderTransparent}
        onExit={handleExit}
      />
      <CustomContainer>
        <SettingImage title={title} subTitle={subTitle} />
        <BaseBtn onClick={handleReturnToHome}>홈 화면으로 가기</BaseBtn>
      </CustomContainer>
    </>
  );
};

export default PaymentSuccess;
