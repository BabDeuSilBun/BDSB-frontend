'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SignUpForm from './form';
import { useRouter } from 'next/navigation';
import { useSignUpStore } from '@/state/authStore';

const SignUp = () => {
  const router = useRouter();
  const { currentStep, setStep, isButtonActive, buttonText } = useSignUpStore();

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
          onButtonClick={handleNextpage}
        />
      ) : (
        <Footer buttonText={buttonText} type="inactiveButton" />
      )}
    </>
  );
};

export default SignUp;
