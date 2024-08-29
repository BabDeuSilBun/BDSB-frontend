'use client';

import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { updateUserProfile } from '@/services/myDataService';
import { validateSignInput } from '@/utils/validateSignInput';

const Container = styled.section`
  margin-top: 70px;
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: var(--font-size-xxl);
  font-weight: var(--font-semi-bold);
  margin-bottom: 2rem;
  white-space: pre-line;
`;

const EditPhoneNumber = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = e.target.value.replace(/\D/g, '');
    setInputValue(cleanedValue);
    setIsButtonActive(validateSignInput('phone', cleanedValue));
  };

  const onClickSubmitBtn = async () => {
    try {
      const response = await updateUserProfile({
        phoneNumber: inputValue,
      });
      if (response && response.success) {
        router.push('/myPage/edit');
      } else {
        console.error('프로필 업데이트 실패:', response.message);
      }
    } catch (error) {
      console.error('Error during updating profile:', error);
    }
  };

  return (
    <>
      <Header text="휴대전화 번호 변경" buttonLeft="back" />
      <Container>
        <Title>새로운 휴대 전화번호를 입력해주세요</Title>
        <input
          type="text"
          value={inputValue}
          onChange={handlePhoneNumberChange}
          placeholder="휴대 전화번호"
          aria-label="휴대 전화번호 입력"
          aria-required="true"
        />
      </Container>
      <Footer
        buttonText="변경하기"
        type="button"
        onButtonClick={isButtonActive ? onClickSubmitBtn : undefined}
        disabled={!isButtonActive}
      />
    </>
  );
};

export default EditPhoneNumber;
