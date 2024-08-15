'use client';

import { useSignUpStore } from '@/state/authStore';
import { BaseBtnInactive, BaseBtn } from '@/styles/button';
import { validateSignInput } from '@/utils/validateSignInput';
import { useState } from 'react';
import styled from 'styled-components';

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
  const { email, setEmail, setStep } = useSignUpStore();
  const [code, setCode] = useState('');

  const onButtonClick = () => {
    console.log(email);
  };

  return (
    <div>
      <Form>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
        />
        {!validateSignInput('email', email) ? (
          <BaseBtnInactive>메일 전송하기</BaseBtnInactive>
        ) : (
          <BaseBtn onClick={onButtonClick}>메일 전송하기</BaseBtn>
        )}
        <Caption>메일이 오지 않았을 경우, 스팸 메일함을 확인해주세요.</Caption>
      </Form>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="인증 번호 입력"
      />
    </div>
  );
};

export default Step2Email;
