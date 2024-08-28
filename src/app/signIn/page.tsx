'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Tab, TabList, Tabs } from '@chakra-ui/react';
import styled from 'styled-components';

import SignInForm from './form';

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6.25rem 0 2rem;
  gap: 0.5rem;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translate(-50%, 0);
  white-space: nowrap;
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  font-size: var(--font-size-xs);
  color: var(--gray400);

  button:nth-child(2),
  p {
    font-weight: var(--font-semi-bold);
  }
`;

const Title = styled.h1`
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-xl);
`;

const SignIn = () => {
  const [userType, setUserType] = useState<'users' | 'businesses'>('users');

  return (
    <>
      <LogoWrapper>
        <Image src="/logo.svg" alt="Logo" width="72" height="90" priority />
        <Title>밥드실분</Title>
      </LogoWrapper>
      <Tabs align="center" isFitted aria-label="로그인 방식 선택">
        <TabList>
          <Tab
            onClick={() => setUserType('users')}
            aria-selected={userType === 'users'}
            role="tab"
          >
            유저로 로그인
          </Tab>
          <Tab
            onClick={() => setUserType('businesses')}
            aria-selected={userType === 'businesses'}
            role="tab"
          >
            점주로 로그인
          </Tab>
        </TabList>
      </Tabs>
      <SignInForm userType={userType} />
      <Footer aria-label="페이지 하단 정보">
        <button aria-label="이용약관">이용약관</button>
        <button aria-label="개인정보처리방침">개인정보처리방침</button>
        <a href="mailto:bdsb@test.com" aria-label="문의하기 이메일">
          문의하기
        </a>
        <p>밥드실분</p>
      </Footer>
    </>
  );
};

export default SignIn;
