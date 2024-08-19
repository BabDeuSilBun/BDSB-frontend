'use client';

import { useSignUpStore } from '@/state/authStore';
import styled from 'styled-components';

import Step0Name from '../steps/step0Name';
import Step1Phone from '../steps/step1Phone';
import Step2Email from '../steps/step2Email';
import Step3Campus from '../steps/step3Campus';
import Step4Department from '../steps/step4Department';
import Step5Address from '../steps/step5Address';
import Step6Password from '../steps/step6Password';

const Container = styled.section`
  margin-top: 90px;
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: var(--font-size-xxl);
  font-weight: var(--font-semi-bold);
  margin-bottom: 1.2rem;
  white-space: pre-line;
`;

const steps = [
  Step0Name,
  Step1Phone,
  Step2Email,
  Step3Campus,
  Step4Department,
  Step5Address,
  Step6Password,
];

const titles = [
  '이름을 알려주세요',
  '휴대 전화번호를 알려주세요',
  '사용하실 이메일을 알려주세요',
  `다니시는 학교 명과 
  주로 이용하는 캠퍼스를 골라주세요`,
  '소속 학과를 선택해주세요',
  '기본 배송지를 입력해주세요',
  `이제 다 왔어요. 
  마지막으로 비밀번호를 입력해주세요`,
];

const SignUpForm = () => {
  const { currentStep } = useSignUpStore();
  const CurrentStepComponent = steps[currentStep];

  return (
    <Container>
      <Title>{titles[currentStep]}</Title>
      <CurrentStepComponent />
    </Container>
  );
};

export default SignUpForm;
