'use client';

import { useEffect, ChangeEvent } from 'react';
import { useSignUpStore } from '@/state/authStore';
import { validateSignInput } from '@/utils/validateSignInput';

const Step1Phone = () => {
  const { phone, setPhone, setButtonActive } = useSignUpStore();

  useEffect(() => {
    setButtonActive(validateSignInput('phone', phone));
  }, [phone, setButtonActive]);

  const onValidate = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    setPhone(inputValue);
    setButtonActive(validateSignInput('phone', inputValue));
  };

  return (
    <div>
      <input
        type="text"
        value={phone}
        onChange={onValidate}
        placeholder="휴대 전화번호"
        aria-label="휴대 전화번호 입력" 
        aria-required="true"
        aria-invalid={!validateSignInput('phone', phone)}
      />
    </div>
  );
};

export default Step1Phone;
