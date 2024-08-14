'use client';

import { BaseBtn, BaseBtnLight } from '@/styles/button';
import styled from 'styled-components';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/services/apiClient';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Form = styled.form`
  margin-top: 1.2rem;
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
  position: absolute;
  top: -1.6rem;
`;

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState('');
  const router = useRouter();

  const handleBtnClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email.trim() === '') {
      setError('이메일을 입력해주세요.');
      return;
    } else if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    } else if (password.trim() === '') {
      setError('비밀번호를 입력해주세요.');
      return;
    } else {
      setError('');
    }

    // 임시로 사용할 토큰 값 설정
    const accessToken = 'dummyAccessToken123';

    try {
      // const response = await axios.post('/api/auth/signin', {
      //   email: email,
      //   password: password,
      // });

      // 나중에 활성할 부분 (백엔드에게 보냄)
      // const { accessToken } = response.data;
      setAuthToken(accessToken);

      router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Form>
        {Error && <ErrorMessage>{Error}</ErrorMessage>}
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <BaseBtn onClick={handleBtnClick}>로그인</BaseBtn>
      </Form>
      <Link href="./signUp">
        <BaseBtnLight>회원가입</BaseBtnLight>
      </Link>
    </Container>
  );
}
