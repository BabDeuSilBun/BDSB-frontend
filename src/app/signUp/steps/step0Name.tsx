'use client';

import { ChangeEvent, useEffect } from 'react';

import { useSignUpStore } from '@/state/authStore';

const Step0Name = () => {
  const { name, setName, setButtonActive } = useSignUpStore();

  useEffect(() => {
    setButtonActive(!!name);
  }, [setButtonActive, name]);

  const onValidate = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);
    setButtonActive(!!inputValue);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={onValidate}
        placeholder="이름"
        aria-label="이름 입력"
        aria-required="true"
      />
    </div>
  );
};

export default Step0Name;
