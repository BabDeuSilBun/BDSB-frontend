'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { updateUserProfile } from '@/services/myDataService';
import { getMyData, getRandomNickname } from '@/services/myDataService';
import { NicknameType } from '@/types/myDataTypes';

const Container = styled.section`
  margin-top: 70px;
  padding: 1rem;
  position: relative;
`;

const Title = styled.h2`
  font-size: var(--font-size-xxl);
  font-weight: var(--font-semi-bold);
  margin-bottom: 2rem;
  white-space: pre-line;
`;

const RetryButton = styled.button`
  position: absolute;
  color: var(--primary);
  font-weight: var(--font-semi-bold);
  right: 2rem;
  bottom: 2rem;
`;

const EditNickname = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  const mutation = useMutation({
    mutationFn: getRandomNickname,
    onSuccess: (data: NicknameType) => {
      setInputValue(data.nickname);
      setIsButtonActive(true);
      setIsInitialLoad(false); // 닉네임 변경 후 초기 로드 상태 해제
    },
    onError: (error: Error) => {
      console.error('랜덤 닉네임 생성 실패:', error);
      setIsButtonActive(false);
    },
  });

  const { mutate: fetchRandomNickname } = mutation;

  useEffect(() => {
    if (isLoading) {
      setInputValue('불러오는 중...');
      setIsButtonActive(false);
    } else if (isError) {
      setInputValue('닉네임을 불러오지 못했습니다');
      setIsButtonActive(false);
    } else if (data) {
      setInputValue(data.nickname);
      setIsButtonActive(false);
      setIsInitialLoad(true); // 기본 닉네임이 로드되었음을 표시
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    if (!isInitialLoad && inputValue && inputValue !== data?.nickname) {
      setIsButtonActive(true); // 기본 닉네임이 아닌 경우에만 버튼 활성화
    } else {
      setIsButtonActive(false);
    }
  }, [inputValue, data, isInitialLoad]);

  const onClickSubmitBtn = useCallback(async () => {
    try {
      await updateUserProfile({
        nickname: inputValue,
      });
      router.push('/myPage/edit');
    } catch (error) {
      console.error('Error during updating nickname:', error);
    }
  }, [inputValue, router]);

  const onClickRetryBtn = useCallback(() => {
    fetchRandomNickname();
  }, [fetchRandomNickname]);

  return (
    <>
      <Header text="닉네임 변경" buttonLeft="back" />
      <Container>
        <Title>새로운 닉네임을 선택해주세요</Title>
        <input
          type="text"
          value={inputValue}
          placeholder="닉네임"
          aria-label="닉네임 랜덤 선택"
          aria-required="true"
          readOnly
        />
        <RetryButton onClick={onClickRetryBtn}>{'딴거할래요'}</RetryButton>
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

export default EditNickname;
