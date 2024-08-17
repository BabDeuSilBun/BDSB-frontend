'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BaseBtnInactive, BaseBtn } from '@/styles/button';
import { validateSignInput } from '@/utils/validateSignInput';
import { useSignUpStore } from '@/state/authStore';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const Caption = styled.p`
  font-size: var(--font-size-xs);
  color: var(--gray400);
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Step2Email = () => {
  const { email, setEmail, setButtonActive } = useSignUpStore();
  const [code, setCode] = useState('');

  useEffect(() => {}, []);

  const emailMutation = useMutation({
    mutationFn: async (email: string) => {
      return axios.post('/api/signup/email-verify', { email });
    },
    onSuccess: () => {
      console.log('이메일이 성공적으로 전송되었습니다.');
    },
    onError: (error) => {
      console.error('이메일 전송 중 오류가 발생했습니다:', error);
    },
  });

  const codeMutation = useMutation({
    mutationFn: async (data: { email: string; code: string }) => {
      return axios.post('/api/signup/verify-code', data);
    },
    onSuccess: () => {
      setButtonActive(true);
      console.log('코드 검증이 성공적으로 완료되었습니다.');
    },
    onError: (error) => {
      console.error('코드 검증 중 오류가 발생했습니다:', error);
    },
  });

  const handleEmailSend = () => {
    if (validateSignInput('email', email)) {
      emailMutation.mutate(email);
    }
  };

  const handleCodeVerify = () => {
    codeMutation.mutate({ email, code });
  };

  return (
    <div>
      <Form>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          aria-label="이메일 주소 입력"
          aria-required="true"
        />
        {!validateSignInput('email', email) ? (
          <BaseBtnInactive>메일 전송하기</BaseBtnInactive>
        ) : (
          <BaseBtn onClick={handleEmailSend}>메일 전송하기</BaseBtn>
        )}
        <Caption>메일이 오지 않았을 경우, 스팸 메일함을 확인해주세요.</Caption>
      </Form>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="인증 번호 입력"
        aria-label="이메일 인증번호 입력"
        aria-required="true"
      />
      <BaseBtn onClick={handleCodeVerify}>코드 검증하기</BaseBtn>
    </div>
  );
};

export default Step2Email;
