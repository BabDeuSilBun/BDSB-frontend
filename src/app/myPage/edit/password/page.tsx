'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { apiClientWithCredentials } from '@/services/apiClient';
import { updateUserProfile } from '@/services/myDataService';
import { validateSignInput } from '@/utils/validateSignInput';

const Container = styled.section`
  margin-top: 70px;
  padding: 1rem;

  input + input {
    margin-top: 1rem;
  }
`;

const Title = styled.h2`
  font-size: var(--font-size-xxl);
  font-weight: var(--font-semi-bold);
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: var(--font-size-xs);
  padding-bottom: 1rem;
`;

const SearchPassword = styled.button`
  display: flex;
  gap: 0.5rem;
  color: var(--gray400);
  margin-bottom: 3rem;
`;

const ButtonIcon = styled.span.attrs({
  className: 'icon',
})`
  padding: 1rem;
  margin: -1rem;
`;

const EditPassword = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordVerity, setNewPasswordVerity] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (currentPassword && !isCurrentPasswordValid) {
      setIsButtonActive(true);
    }
    if (isCurrentPasswordValid && !newPasswordVerity) {
      setIsButtonActive(false);
    }
  }, [
    currentPassword,
    setIsButtonActive,
    isCurrentPasswordValid,
    newPasswordVerity,
  ]);

  const onClickSubmitBtn = async () => {
    if (!isCurrentPasswordValid) {
      const { data: matchCheck } = await apiClientWithCredentials.post(
        '/api/password-confirm',
        { password: currentPassword },
      );

      if (!matchCheck.isCorrected) {
        console.log('비밀번호가 일치하지 않습니다.');
        setErrorMessage('비밀번호가 일치하지 않습니다.');
        setIsCurrentPasswordValid(false);
        return;
      }

      setIsCurrentPasswordValid(true);
      setErrorMessage('');
    } else {
      try {
        await updateUserProfile({
          password: newPassword,
        });
        router.push('/myPage/edit');
      } catch (error) {
        console.error('Error during updating password:', error);
      }
    }
  };

  const onValidate = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNewPasswordVerity(inputValue);

    if (!validateSignInput('password', newPassword)) {
      setErrorMessage('8자 이상, 영문과 숫자를 포함해주세요.');
      setIsButtonActive(false);
    } else if (inputValue !== newPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      setIsButtonActive(false);
    } else {
      setErrorMessage('');
      setIsButtonActive(true);
    }
  };

  return (
    <>
      <Header text="비밀번호 변경" buttonLeft="back" />

      {!isCurrentPasswordValid ? (
        <Container>
          <Title>
            안전한 변경을 위해 <br /> 현재 비밀번호를 확인할게요
          </Title>
          <SearchPassword
            onClick={() => alert('아직 제공되지 않는 기능입니다.')}
          >
            비밀번호 찾기
            <ButtonIcon>{'>'}</ButtonIcon>
          </SearchPassword>
          {errorMessage && (
            <ErrorMessage aria-live="assertive">{errorMessage}</ErrorMessage>
          )}
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호 입력"
            aria-label="현재 비밀번호 입력"
            aria-required="true"
          />
        </Container>
      ) : (
        <Container>
          <Title>새로운 비밀번호를 입력해주세요</Title>
          {errorMessage && (
            <ErrorMessage aria-live="assertive">{errorMessage}</ErrorMessage>
          )}
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새로운 비밀번호 (8자 이상, 영문 + 숫자)"
            aria-label="새로운 비밀번호 (8자 이상, 영문 + 숫자)"
            aria-required="true"
          />
          <input
            type="password"
            value={newPasswordVerity}
            onChange={onValidate}
            placeholder="비밀번호 확인"
            aria-label="비밀번호 확인"
            aria-required="true"
          />
        </Container>
      )}

      <Footer
        buttonText="변경하기"
        type="button"
        onButtonClick={isButtonActive ? onClickSubmitBtn : undefined}
        disabled={!isButtonActive}
      />
    </>
  );
};

export default EditPassword;
