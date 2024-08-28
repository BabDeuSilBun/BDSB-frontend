'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import { EvaluateSection, MeetingInfo } from './requestComponents';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

const ContainerBox = styled.div`
  background: var(--gray100);
  margin-top: 60px;
`;

const EvaluateContainer = styled.section`
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  background: white;
  padding: 1.5rem 1rem;
  height: 100%;
`;

const Question = styled.p`
  font-size: var(--font-size-sm);
`;

const Info = styled.p`
  font-size: var(--font-size-sm);
  color: var(--gray400);
`;

type EvaluateItem = {
  id: number;
  label: string;
};

const RequestReview = () => {
  const router = useRouter();
  const [positiveEvaluate, setPositiveEvaluate] = useState<
    { id: number; label: string }[]
  >([]);
  const [negativeEvaluate, setNegativeEvaluate] = useState<
    { id: number; label: string }[]
  >([]);

  const data = {
    image: 'https://via.placeholder.com/150x150',
    content: '교촌 오리지널(한마리) 외 1개 23400원',
  };

  const positiveOptions: EvaluateItem[] = [
    { id: 1, label: '소통이 잘 돼요' },
    { id: 2, label: '시간 약속을 잘 지켜요' },
    { id: 3, label: '같이 먹기 즐거워요' },
    { id: 4, label: '응답이 빨라요' },
  ];

  const negativeOptions: EvaluateItem[] = [
    { id: 5, label: '연락을 잘 안받아요' },
    { id: 6, label: '시간 약속을 안 지켜요' },
    { id: 7, label: '같이 먹기 불편해요' },
  ];

  const handleEvaluateChange = (
    id: number,
    evaluateOptions: EvaluateItem[],
    evaluateState: EvaluateItem[],
    setEvaluateState: React.Dispatch<React.SetStateAction<EvaluateItem[]>>,
  ) => {
    const selectedItem = evaluateOptions.find((item) => item.id === id);
    if (!selectedItem) return;

    const isSelected = evaluateState.some((item) => item.id === id);

    if (isSelected) {
      setEvaluateState((prev) => prev.filter((item) => item.id !== id));
    } else {
      setEvaluateState((prev) => [...prev, selectedItem]);
    }
  };

  const handleSubmit = () => {
    const reviewData = {
      positiveEvaluate,
      negativeEvaluate,
    };
    console.log('제출 데이터:', reviewData);

    router.push('/notifications');
  };

  return (
    <>
      <Header
        text="거래 후기 보내기"
        buttonRight="exit"
        onExit={() => router.push('/notifications')}
      />
      <ContainerBox>
        <MeetingInfo imageSrc={data.image} content={data.content} />
        <EvaluateContainer>
          <Question>00님과의 모임이 어떠셨나요?</Question>

          <EvaluateSection
            title="이런 점이 좋았어요."
            options={positiveOptions}
            selectedOptions={positiveEvaluate}
            handleChange={(id) =>
              handleEvaluateChange(
                id,
                positiveOptions,
                positiveEvaluate,
                setPositiveEvaluate,
              )
            }
          />

          <EvaluateSection
            title="이런 점이 별로였어요."
            options={negativeOptions}
            selectedOptions={negativeEvaluate}
            handleChange={(id) =>
              handleEvaluateChange(
                id,
                negativeOptions,
                negativeEvaluate,
                setNegativeEvaluate,
              )
            }
          />

          <Info>불만족 후기는 상대방에서 전송되지 않아요.</Info>
        </EvaluateContainer>
      </ContainerBox>
      <Footer
        type="buttonGroup"
        buttonText1="다음으로"
        buttonText2="스킵하기"
        onButtonClick1={handleSubmit}
        onButtonClick2={handleSubmit}
      />
    </>
  );
};

export default RequestReview;
