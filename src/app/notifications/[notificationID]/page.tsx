'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

const Background = styled.div`
  background: var(--gray100);
`;

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 70px;
`;

const MeetingInfo = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;

  span {
    color: var(--gray400);
    font-size: var(--font-size-xs);
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  width: 42px;
  height: 42px;
  background: var(--primary);
  position: relative;
`;

const EvaluateContainer = styled.section`
  border-radius: var(--border-radius-lg);
  background: white;
  padding: 1.5rem 1rem;
  height: 100%;
`;

const EvaluateBox = styled.div`
  margin: 2rem 0rem;
  font-size: var(--font-size-lg);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h2 {
    font-weight: var(--font-semi-bold);
    margin-bottom: 1.2rem;
  }
`;
const Question = styled.p`
  font-size: var(--font-size-sm);
`;

const Info = styled.p`
  font-size: var(--font-size-sm);
  color: var(--gray400);
`;

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;

  &:before {
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
    background-color: transparent;
    background-image: url('/check.svg');
    background-position: 50%;
    border: 2px solid var(--gray300);
    border-radius: 0.35rem;
  }

  &:after {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    content: '';
    display: block;
    opacity: 0;
    height: 1rem;
    width: 1rem;
    border: 2px solid transparent;
    border-radius: 0.35rem;
    background-image: url('/check.svg');
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--primary);
  }
`;

const StyledInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);

  &:checked + ${StyledLabel} {
    &:after {
      opacity: 1;
    }
  }
`;

const StyledP = styled.p`
  margin-left: 0.5rem;
`;

const data = {
  image: 'https://via.placeholder.com/150x150',
  content: '교촌 오리지널(한마리) 외 1개 23400원',
};

const NotificationDetail = () => {
  const router = useRouter();

  return (
    <Background>
      <Header
        text="거래 후기 보내기"
        buttonRight="exit"
        onExit={() => router.push('/notifications')}
      />
      <ContainerBox>
        <MeetingInfo>
          <ImageWrapper>
            <Image
              src={data.image}
              alt="Meeting Image"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </ImageWrapper>
          <div>
            <span>모임 내역</span>
            <p>{data.content}</p>
          </div>
        </MeetingInfo>
        <EvaluateContainer>
          <Question>00님과의 모임이 어떠셨나요?</Question>

          <EvaluateBox>
            <h2>이런 점이 좋았어요.</h2>

            <StyledInput
              type="radio"
              id="소통이 잘 돼요"
              name="positiveEvaluate"
            />
            <StyledLabel htmlFor="소통이 잘 돼요">
              <StyledP>소통이 잘 돼요</StyledP>
            </StyledLabel>
            <StyledInput
              type="radio"
              id="시간 약속을 잘 지켜요"
              name="positiveEvaluate"
            />
            <StyledLabel htmlFor="시간 약속을 잘 지켜요">
              <StyledP>시간 약속을 잘 지켜요</StyledP>
            </StyledLabel>
            <StyledInput
              type="radio"
              id="같이 먹기 즐거워요"
              name="positiveEvaluate"
            />
            <StyledLabel htmlFor="같이 먹기 즐거워요">
              <StyledP>같이 먹기 즐거워요</StyledP>
            </StyledLabel>
            <StyledInput
              type="radio"
              id="응답이 빨라요"
              name="positiveEvaluate"
            />
            <StyledLabel htmlFor="응답이 빨라요">
              <StyledP>응답이 빨라요</StyledP>
            </StyledLabel>
          </EvaluateBox>
          <EvaluateBox>
            <h2>이런 점이 별로였어요.</h2>

            <StyledInput
              type="radio"
              id="연락을 잘 안받아요"
              name="negativeEvaluate"
            />
            <StyledLabel htmlFor="연락을 잘 안받아요">
              <StyledP>연락을 잘 안받아요</StyledP>
            </StyledLabel>
            <StyledInput
              type="radio"
              id="시간 약속을 안 지켜요"
              name="negativeEvaluate"
            />
            <StyledLabel htmlFor="시간 약속을 안 지켜요">
              <StyledP>시간 약속을 안 지켜요</StyledP>
            </StyledLabel>
            <StyledInput
              type="radio"
              id="같이 먹기 불편해요"
              name="negativeEvaluate"
            />
            <StyledLabel htmlFor="같이 먹기 불편해요">
              <StyledP>같이 먹기 불편해요</StyledP>
            </StyledLabel>
          </EvaluateBox>
          <Info>불만족 후기는 상대방에서 전송되지 않아요.</Info>
        </EvaluateContainer>
      </ContainerBox>
      <Footer
        type="buttonGroup"
        buttonText1="다음으로"
        buttonText2="스킵하기"
      />
    </Background>
  );
};

export default NotificationDetail;
