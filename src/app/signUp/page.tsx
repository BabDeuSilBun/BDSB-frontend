'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';

import { useSignUpStore } from '@/state/authStore';

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(150deg, var(--purple200), var(--primary));
  color: white;
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-xxl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const ImageWrapper = styled.div<{ color: string }>`
  border-radius: 50%;
  background-color: ${({ color }) =>
    color === 'white' ? 'white' : 'var(--primary)'};
  width: 7rem;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 3rem;

  p {
    font-weight: var(--font-semi-bold);
    font-size: var(--font-size-xl);
    margin-top: 1rem;
  }
`;

const UserTypeSelection = () => {
  const router = useRouter();
  const { setUserType } = useSignUpStore();

  const handleUserTypeSelect = (type: 'users' | 'businesses') => {
    setUserType(type);
    router.push(`/signUp/${type}`);
  };

  return (
    <Container>
      <h1>환영합니다!</h1>
      <h1>어떤 용도로 이용하시나요?</h1>
      <ButtonContainer>
        <button onClick={() => handleUserTypeSelect('users')}>
          <ImageWrapper color="white">
            <Image
              src="logo.svg"
              alt="user button"
              width="59"
              height="72"
              priority
            />
          </ImageWrapper>
          <p>유저</p>
        </button>
        <button onClick={() => handleUserTypeSelect('businesses')}>
          <ImageWrapper color="primary">
            <Image
              src="logoWhite.svg"
              alt="user button"
              width="59"
              height="72"
              priority
            />
          </ImageWrapper>
          <p>점주</p>
        </button>
      </ButtonContainer>
    </Container>
  );
};

export default UserTypeSelection;
