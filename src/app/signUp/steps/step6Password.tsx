'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { useSignUpStore } from '@/state/authStore';
import { validateSignInput } from '@/utils/validateSignInput';
import styled from 'styled-components';

const ErrorMessage = styled.p`
  color: red;
  font-size: var(--font-size-xs);
  padding-bottom: 1rem;
`;

const Step6Password = () => {
  const { password, setPassword, setButtonActive } = useSignUpStore();
  const [verify, setVerify] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!validateSignInput('password', password)) {
      setError('8자 이상, 영문과 숫자를 포함해주세요.');
      setButtonActive(false);
    }
  }, [password, setButtonActive]);

  const onValidate = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setVerify(inputValue);

    if (!validateSignInput('password', password)) {
      setError('8자 이상, 영문과 숫자를 포함해주세요.');
      setButtonActive(false);
    } else if (inputValue !== password) {
      setError('비밀번호가 일치하지 않습니다.');
      setButtonActive(false);
    } else {
      setError('');
      setButtonActive(true);
    }
  };

  return (
    <div>
      {error && <ErrorMessage aria-live="assertive">{error}</ErrorMessage>}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호 (8자 이상, 영문 + 숫자)"
        style={{ marginBottom: '1rem' }}
        aria-label="비밀번호 입력"
        aria-required="true"
        aria-invalid={!!error}
      />
      <input
        type="password"
        value={verify}
        onChange={onValidate}
        placeholder="비밀번호 확인"
        aria-label="비밀번호 확인 입력"
        aria-required="true"
        aria-invalid={!!error}
      />
    </div>
  );
};

export default Step6Password;
