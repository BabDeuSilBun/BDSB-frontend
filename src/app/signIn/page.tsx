'use client';

import { useState } from 'react';

import { Tab, TabList, Tabs } from '@chakra-ui/react';
import Image from 'next/image';
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

// const Additional = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 0 var(--spacing-sm);
//   color: var(--gray400);
// `;

// const StyledLabel = styled.label`
//   position: relative;
//   display: flex;
//   align-items: center;
//   user-select: none;
//   cursor: pointer;

//   &:before {
//     content: '';
//     display: block;
//     height: 1rem;
//     width: 1rem;
//     background-color: transparent;
//     background-image: url('/check.svg');
//     background-position: 50%;
//     border: 2px solid var(--gray300);
//     border-radius: 0.35rem;
//   }

//   &:after {
//     position: absolute;
//     top: 50%;
//     left: 0;
//     transform: translateY(-50%);
//     content: '';
//     display: block;
//     opacity: 0;
//     height: 1rem;
//     width: 1rem;
//     border: 2px solid transparent;
//     border-radius: 0.35rem;
//     background-image: url('/check.svg');
//     background-position: 50%;
//     background-repeat: no-repeat;
//     background-color: var(--primary);
//   }
// `;

// const StyledInput = styled.input`
//   position: absolute;
//   clip: rect(0 0 0 0);

//   &:checked + ${StyledLabel} {
//     &:after {
//       opacity: 1;
//     }
//   }
// `;

// const StyledP = styled.p`
//   margin-left: 0.5rem;
// `;

const SignIn = () => {
  const [userType, setUserType] = useState<'users' | 'businesses'>('users');
  // const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);
  // const handleAutoLoginChange = () => {
  //   setIsAutoLogin(!isAutoLogin);
  // };

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
      {/* <Additional>
        <StyledInput
          type="checkbox"
          id="auto"
          onChange={handleAutoLoginChange}
        />
        <StyledLabel htmlFor="auto">
          <StyledP>자동 로그인</StyledP>
        </StyledLabel>
        <button>정보찾기</button>
      </Additional> */}
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

// 주석 처리 된 부분은 백엔드 개발 후순위인데 이미 만들어서 놔둔 것입니다..
// 체크 박스는 후기 작성 시 응용 가능할 것 같습니다~~
