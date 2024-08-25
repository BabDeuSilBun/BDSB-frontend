'use client';

import { useEffect } from 'react';
import axios from 'axios';

import { useParams, useRouter } from 'next/navigation';

import SignUpForm from '../form/form';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useSignUpStore } from '@/state/authStore';

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
    campus,
    department,
    email,
    password,
    name,
    phoneNumber,
    businessNumber,
    address,
  } = useSignUpStore();

  const titles = [
    userType === 'users' ? '이름 입력' : '사업자명 입력',
    '휴대 전화번호 입력',
    userType === 'users' ? '이메일 입력' : '사업자 이메일 입력',
    userType === 'users' ? '캠퍼스 선택' : undefined,
    userType === 'users' ? '학과 선택' : undefined,
    userType === 'users' ? '배송지 입력' : undefined,
    '비밀번호 입력',
  ].filter(Boolean);

  const handleNextPage = async () => {
    if (
      (userType === 'users' && currentStep === 6) ||
      (userType === 'businesses' && currentStep === 3)
    ) {
      const userData =
        userType === 'users'
          ? {
              schoolId: campus,
              majorId: department,
              email,
              password,
              name,
              phoneNumber,
              address: {
                postal: address.postal,
                streetAddress: address.streetAddress,
                detailAddress: address.detailAddress,
              },
            }
          : {
              email,
              password,
              name,
              phoneNumber,
              businessNumber,
              address: {
                postal: null,
                streetAddress: null,
                detailAddress: null,
              },
            };

      try {
        const response = await axios.post(`/api/${userType}/signup`, userData);
        console.log('Success:', response.data);
        router.push('/signIn');
      } catch (error) {
        console.error('Error during signup:', error);
      }
    } else {
      setStep(currentStep + 1);
    }
  };

  useEffect(() => {
    setUserType((params.userType as 'users') || 'businesses');
    setStep(0);
  }, [setStep, setUserType, params.userType]);

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
      <Footer
        buttonText={buttonText}
        type="button"
        onButtonClick={isButtonActive ? handleNextPage : undefined}
        disabled={!isButtonActive}
      />
    </>
  );
};

export default SignUp;
