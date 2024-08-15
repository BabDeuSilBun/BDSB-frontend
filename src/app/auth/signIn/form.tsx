'use client';

import { BaseBtn, BaseBtnLight } from '@/styles/button';
import styled from 'styled-components';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/services/apiClient';
import Cookies from 'js-cookie';
import { validateSignInput } from '@/utils/validateSignInput';

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

interface Props {
  userType: string;
}

export default function SignInForm({ userType }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState('');
  const router = useRouter();

  const handleBtnClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email.trim() === '') {
      setError('이메일을 입력해주세요.');
      return;
    } else if (!validateSignInput('email', email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    } else if (password.trim() === '') {
      setError('비밀번호를 입력해주세요.');
      return;
    } else {
      setError('');
    }

    try {
      const res = await axios.post(`api/${userType}/signin`, {
        email: email,
        password: password,
      });

      //header jwt 토큰 정보 받아오기
      let jwtToken = res.headers['Authorization'];
      let refreshToken = res.headers['Refresh'];

      // 쿠키에 jwtToken, refreshToken 저장
      Cookies.set('jwtToken', jwtToken);
      Cookies.set('refreshToken', refreshToken);

      // jwt 토큰을 Authorization 헤더에 설정
      setAuthToken(jwtToken);

      // 메인 페이지로 이동
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
      setError(
        "로그인에 실패했습니다. 문제가 계속될 시 '문의하기'를 이용해보세요.",
      );
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
