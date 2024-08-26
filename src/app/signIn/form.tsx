'use client';

import { FormEvent, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { handleSignIn } from '@/services/auth/signInService';
import { BaseBtn, BaseBtnLight } from '@/styles/button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  input {
    padding: 0.65rem !important;
  }

  button {
    margin-top: 1rem;
  }
`;

const Container = styled.section`
  margin-top: 0.4rem;
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: var(--font-size-xs);
`;

interface Props {
  userType: 'users' | 'businesses';
}

export default function SignInForm({ userType }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState('');
  const router = useRouter();

  const handleBtnClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSignIn(email, password, userType, setError, router);
  };

  return (
    <Container>
      <Form>
        {Error && <ErrorMessage aria-live="assertive">{Error}</ErrorMessage>}
        <input
          id="email"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
        />
        <input
          id="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
        />
        <BaseBtn
          type="submit"
          onClick={handleBtnClick}
          aria-label="로그인 버튼"
        >
          로그인
        </BaseBtn>
      </Form>
      <Link href="./signUp">
        <BaseBtnLight aria-label="회원가입 페이지로 이동">
          회원가입
        </BaseBtnLight>
      </Link>
    </Container>
  );
}
