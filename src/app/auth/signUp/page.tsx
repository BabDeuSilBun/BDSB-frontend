'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import styled from 'styled-components';
import SignUpForm from './form';
import { useRouter } from 'next/navigation';
import { useSignUpStore } from '@/state/authStore';

const SignIn = () => {
  const router = useRouter();
  const { currentStep, setStep } = useSignUpStore();

  const titles = [
    '이름 입력',
    '휴대전화번호 입력',
    '이메일 입력',
    '캠퍼스 선택',
    '학과 선택',
    '배송지 입력',
    '비밀번호 입력',
  ];

  const handleNextpage = () => {
    setStep(currentStep + 1);
  };

  return (
    <>
      <Header
        buttonLeft="back"
        buttonRight="exit"
        onBack={() => setStep(currentStep - 1)}
        onExit={() => router.push('/auth/signIn')}
      />
      <SignUpForm />
      <Footer
        buttonText="다음"
        type="button"
        onButtonClick={handleNextpage}
      />
    </>
  );
};

export default SignIn;
