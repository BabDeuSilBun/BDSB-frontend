'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';

import { BaseBtn, BaseBtnInactive } from '@/styles/button';
import { validateSignInput } from '@/utils/validateSignInput';
import { useSignUpStore } from '@/state/authStore';

const Caption = styled.p<{ warning?: boolean }>`
  font-size: var(--font-size-xs);
  color: ${({ warning }) => warning && 'var(--warning)'};
  margin-bottom: ${({ warning }) => (warning ? '-0.7rem' : '1rem')};
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Step2Email = () => {
  const {
    userType,
    email,
    setEmail,
    setButtonActive,
    isEmailVerified,
    setEmailVerified,
  } = useSignUpStore();
  const [tempEmail, setTempEmail] = useState(email);
  const [verifiedEmail, setVerifiedEmail] = useState(email);
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [codeButtonActive, setCodeButtonActive] = useState(false);

  useEffect(() => {
    if (isEmailVerified) {
      setTempEmail(email);
      setButtonActive(true);
    }
    setButtonActive(false);
  }, [isEmailVerified, setButtonActive, email]);

  const emailMutation = useMutation({
    mutationFn: async (emailInput: string) => {
      const { data: duplicationCheck } = await axios.post(
        `/api/${userType}/email-duplicated`,
        { emailInput },
      );

      if (!duplicationCheck.usable) {
        setErrorMessage('중복된 이메일입니다.');
        return;
      }

      try {
        await axios.post('/api/signup/email-verify', { email });
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('이메일 전송 중 오류가 발생했습니다.');
        setEmailVerified(false);
        throw error;
      }
    },
  });

  const codeMutation = useMutation({
    mutationFn: async ({
      emailValue,
      codeValue,
    }: {
      emailValue: string;
      codeValue: string;
    }) => {
      const { data: codeCheck } = await axios.post('/api/signup/verify-code', {
        email: emailValue,
        code: codeValue,
      });

      if (!codeCheck.result) {
        setButtonActive(false);
        setEmailVerified(false);
        return;
      }
      setButtonActive(true);
      setEmail(verifiedEmail);
    },
    onError: () => {
      setButtonActive(false);
      setEmailVerified(false);
    },
  });

  const handleEmailSend = () => {
    if (validateSignInput('email', tempEmail)) {
      emailMutation.mutate(tempEmail);
      setVerifiedEmail(tempEmail);
    } else {
      setErrorMessage('유효한 이메일 주소를 입력해주세요.');
    }
  };

  const handleCodeVerify = () => {
    if (code) {
      codeMutation.mutate({ emailValue: tempEmail, codeValue: code });
    } else {
      setErrorMessage('인증 번호를 입력해주세요.');
    }
  };

  const handleCodeBtnActive = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    setCode(inputValue);
    setCodeButtonActive(!!inputValue);
  };

  return (
    <Form>
      <input
        type="text"
        value={tempEmail}
        onChange={(e) => setTempEmail(e.target.value)}
        placeholder="이메일 주소"
        aria-label="이메일 주소 입력"
        aria-required="true"
      />
      {validateSignInput('email', tempEmail) ? (
        <BaseBtn onClick={handleEmailSend}>메일 전송하기</BaseBtn>
      ) : (
        <BaseBtnInactive>메일 전송하기</BaseBtnInactive>
      )}
      {errorMessage && <Caption warning>{errorMessage}</Caption>}
      <Caption>메일이 오지 않았을 경우, 스팸 메일함을 확인해주세요.</Caption>
      <input
        type="text"
        value={code}
        onChange={handleCodeBtnActive}
        placeholder="인증 번호 입력"
        aria-label="이메일 인증번호 입력"
        aria-required="true"
      />
      {codeButtonActive ? (
        <BaseBtn onClick={handleCodeVerify}>코드 검증하기</BaseBtn>
      ) : (
        <BaseBtnInactive>코드 검증하기</BaseBtnInactive>
      )}
    </Form>
  );
};

export default Step2Email;
