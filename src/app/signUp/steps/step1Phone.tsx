'use client';

import { useEffect, ChangeEvent } from 'react';
import { useSignUpStore } from '@/state/authStore';
import { validateSignInput } from '@/utils/validateSignInput';
import styled from 'styled-components';

const Title = styled.h2`
  font-size: var(--font-size-xxl);
  font-weight: var(--font-semi-bold);
  margin: 2rem 0 1.2rem 0;
  white-space: pre-line;
`;

const Step1Phone = () => {
  const {
    userType,
    phoneNumber,
    setPhoneNumber,
    businessNumber,
    setBusinessNumber,
    setButtonActive,
  } = useSignUpStore();

  useEffect(() => {
    if (userType === 'businesses') {
      setButtonActive(
        validateSignInput('phone', phoneNumber) &&
          businessNumber !== undefined &&
          businessNumber.length >= 10 &&
          businessNumber.length <= 12,
      );
    } else {
      setButtonActive(validateSignInput('phone', phoneNumber));
    }
  }, [phoneNumber, businessNumber, userType, setButtonActive]);

  const formatPhoneNumber = (value: string) => {
    return value.replace(/\D/g, '');
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = formatPhoneNumber(e.target.value);
    setPhoneNumber(cleanedValue);
    if (userType === 'users') {
      setButtonActive(validateSignInput('phone', cleanedValue));
    }
  };

  const handleBusinessNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = formatPhoneNumber(e.target.value);
    if (setBusinessNumber) {
      setBusinessNumber(cleanedValue);
    }
    setButtonActive(
      validateSignInput('phone', phoneNumber) &&
        cleanedValue.length >= 10 &&
        cleanedValue.length <= 12,
    );
  };

  return (
    <>
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="휴대 전화번호"
        aria-label="휴대 전화번호 입력"
        aria-required="true"
        aria-invalid={!validateSignInput('phone', phoneNumber)}
      />
      {userType === 'businesses' && (
        <>
          <Title>가게 전화번호를 알려주세요</Title>
          <input
            type="tel"
            value={businessNumber ?? ''}
            onChange={handleBusinessNumberChange}
            placeholder="가게 전화번호"
            aria-label="가게 전화번호 입력"
            aria-required="true"
          />
        </>
      )}
    </>
  );
};

export default Step1Phone;
