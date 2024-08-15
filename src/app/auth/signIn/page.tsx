'use client';

import Image from 'next/image';
import styled from 'styled-components';
import SignInForm from './form';
// import { Divider, Box, AbsoluteCenter } from '@chakra-ui/react';
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { useState } from 'react';

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
  const [userType, setUserType] = useState<string>('');
  const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);

  const handleUserType = (type: string) => {
    setUserType(type);
    console.log(`Selected user type: ${type}`);
  };

  const handleAutoLoginChange = () => {
    setIsAutoLogin(!isAutoLogin);
    console.log(`Auto login: ${!isAutoLogin}`);
  };

  return (
    <>
      <LogoWrapper>
        <Image src="/logo.svg" alt="Logo" width="72" height="90" priority />
        <Title>밥드실분</Title>
      </LogoWrapper>
      <Tabs align="center" isFitted>
        <TabList>
          <Tab onClick={() => handleUserType('users')}>유저로 로그인</Tab>
          <Tab onClick={() => handleUserType('businesses')}>점주로 로그인</Tab>
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
      </Additional>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          회원가입
        </AbsoluteCenter>
      </Box>
      <Flexbox>
        <button>
          <Image src="/google.svg" alt="Logo" width="36" height="36" priority />
        </button>
        <button>
          <Image src="/kakao.svg" alt="Logo" width="36" height="36" priority />
        </button>
        <button>
          <Image src="/google.svg" alt="Logo" width="36" height="36" priority />
        </button>
      </Flexbox> */}
      <Footer>
        <button>이용약관</button>
        <button>개인정보처리방침</button>
        <a href="mailto:bdsb@test.com">문의하기</a>
        <p>밥드실분</p>
      </Footer>
    </>
  );
};

export default SignIn;

// 주석 처리 된 부분은 후순위나 개발 예정 없음인데 이미 만들어서 놔둔 것입니다..
