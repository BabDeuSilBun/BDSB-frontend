'use client';

import { useEffect } from 'react';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useParams, useRouter } from 'next/navigation';
import { useSignUpStore } from '@/state/authStore';

import SignUpForm from '../form/form';

const SignUp = () => {
  const router = useRouter();
  const params = useParams();
  const {
    userType,
    setUserType,
    currentStep,
    setStep,
    isButtonActive,
    buttonText,
  } = useSignUpStore();

  const titles = [
    userType === 'users' ? '이름 입력' : '사업자명 입력',
    '휴대 전화번호 입력',
    userType === 'users' ? '이메일 입력' : '사업자 이메일 입력',
    userType === 'users' ? '캠퍼스 선택' : undefined,
    userType === 'users' ? '학과 선택' : undefined,
    '배송지 입력',
    '비밀번호 입력',
  ].filter(Boolean);

  const handleNextPage = () => {
    setStep(currentStep + 1);
  };

  useEffect(() => {
    setUserType((params.userType as 'users') || 'businesses');
    setStep(0);
  }, []);

  return (
    <>
      <Header
        text={titles[currentStep]}
        buttonLeft={currentStep > 0 ? 'back' : undefined}
        buttonRight="exit"
        onBack={() => setStep(currentStep - 1)}
        onExit={() => router.push('/signIn')}
      />
      <SignUpForm />
      {isButtonActive ? (
        <Footer
          buttonText={buttonText}
          type="button"
          onButtonClick={handleNextPage}
        />
      ) : (
        <Footer buttonText={buttonText} type="inactiveButton" />
      )}
    </>
  );
};

export default SignUp;
