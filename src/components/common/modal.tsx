'use client';

import styled from 'styled-components';

import {
  BaseBtn,
  BtnGroup,
  HalfBtnLight,
  HalfBtnPurple,
} from '@/styles/button';

interface ModalProps {
  type: 'image' | 'text' | 'info';
  imageUrl?: string;
  title1?: string;
  title2?: string;
  description?: string;
  address1?: string;
  address2?: string;
  openTime?: string;
  closeTime?: string;
  dayOfWeek?: string;
  buttonText?: string;
  buttonText1?: string;
  buttonText2?: string;
  onButtonClick1?: () => void;
  onButtonClick2?: () => void;
  onButtonClick3?: () => void;
  onClose?: () => void;
  context?: 'leaderbefore' | 'leaderafter' | 'participant';
}

const mediaQueries = {
  tablet: `@media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max))`,
  desktop: `@media (min-width: var(--breakpoint-desktop))`,
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const ModalContainer = styled.div`
  max-width: 330px;
  background-color: var(--background);
  box-shadow: 0px 4px 8px var(--shadow);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  ${mediaQueries.tablet} {
    max-width: 25rem; /* Slightly larger modal for tablets */
  }
  ${mediaQueries.desktop} {
    max-width: 30rem; /* Larger modal for desktops */
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-lg);
  @media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max)) {
    max-width: 22rem; /* Slightly larger image for tablets */
  }

  @media (min-width: var(--breakpoint-desktop)) {
    max-width: 26rem; /* Larger image for desktops */
  }
`;

const Title1 = styled.h2`
  margin-top: var(--spacing-md);
  font-size: var(--font-size-lg); /* 20px */
  font-weight: var(--font-semi-bold);
  color: var(--text);
  ${mediaQueries.tablet} {
    font-size: var(--font-size-xl); /* 22px */
  }
  ${mediaQueries.desktop} {
    font-size: var(--font-size-xxl); /* 24px */
  }
`;

const Title2 = styled(Title1)`
  margin-top: 0;
`;

const Description = styled.p`
  font-size: var(--font-size-sm); /* 14px */
  color: var(--text);
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  word-break: keep-all;
  white-space: normal;
  overflow-wrap: break-word;
  ${mediaQueries.tablet} {
    font-size: var(--font-size-md); /* 16px */
  }
  ${mediaQueries.desktop} {
    font-size: var(--font-size-lg); /* 20px */
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: var(--spacing-lg);
`;

const InfoRow = styled.div`
  display: flex;
  padding: var(--spacing-xs);
  align-items: flex-start;
  justify-content: space-between;
  font-size: var(--font-size-sm); /* 14px */
  color: var(--text);

  ${mediaQueries.tablet} {
    font-size: var(--font-size-md); /* 16px */
  }

  ${mediaQueries.desktop} {
    font-size: var(--font-size-lg); /* 20px */
  }
`;

const InfoTitle = styled.div`
  flex-basis: 30%;
  font-weight: var(--font-semi-bold);
  padding-left: 0;
  text-align: left;
`;

const InfoDescription = styled.div`
  flex-basis: 70%;
  word-break: keep-all;
  white-space: normal;
  overflow-wrap: break-word;
  text-align: left;
`;

const Modal: React.FC<ModalProps> = ({
  type,
  imageUrl,
  title1,
  title2,
  description,
  address1,
  address2,
  openTime,
  closeTime,
  dayOfWeek,
  buttonText,
  buttonText1,
  buttonText2,
  onButtonClick1,
  onButtonClick2,
  onButtonClick3,
  onClose = () => {},
  context,
}) => {
  const renderButtons = () => {
    switch (context) {
      case 'leaderbefore':
        return (
          <BtnGroup>
            <HalfBtnPurple onClick={onButtonClick1}>
              {buttonText1 || '모임 만들기'}
            </HalfBtnPurple>
            <HalfBtnLight onClick={onButtonClick2}>
              {buttonText2 || '닫기'}
            </HalfBtnLight>
          </BtnGroup>
        );
      case 'leaderafter':
        return (
          <BtnGroup>
            <HalfBtnPurple onClick={onButtonClick1}>
              {buttonText1 || '공동메뉴'}
            </HalfBtnPurple>
            <HalfBtnLight onClick={onButtonClick2}>
              {buttonText2 || '개별메뉴'}
            </HalfBtnLight>
          </BtnGroup>
        );
      case 'participant':
        return (
          <BtnGroup>
            <HalfBtnPurple onClick={onButtonClick1}>
              {buttonText1 || '개별메뉴'}
            </HalfBtnPurple>
            <HalfBtnLight onClick={onButtonClick2}>
              {buttonText2 || '닫기'}
            </HalfBtnLight>
          </BtnGroup>
        );
      default:
        if (type === 'info') {
          return (
            <BaseBtn onClick={onButtonClick3} style={{ width: '17.625rem' }}>
              {buttonText || '닫기'}
            </BaseBtn>
          );
        }
        if (type === 'text') {
          return (
            <BtnGroup>
              <HalfBtnPurple onClick={onButtonClick1}>
                {buttonText1 || '계속하기'}
              </HalfBtnPurple>
              <HalfBtnLight onClick={onButtonClick2}>
                {buttonText2 || '종료하기'}
              </HalfBtnLight>
            </BtnGroup>
          );
        }
        return (
          <BaseBtn onClick={onButtonClick3} style={{ width: '17.625rem' }}>
            {buttonText || '닫기'}
          </BaseBtn>
        );
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* Modal Content */}
        {type === 'image' && imageUrl && (
          <ModalImage src={imageUrl} alt={title1} sizes="50vw" />
        )}
        <Title1>{title1}</Title1>
        <Title2>{title2}</Title2>
        <Description>{description}</Description>
        {type === 'info' ? (
          <>
            <InfoContainer>
              <InfoRow>
                <InfoTitle>주소</InfoTitle>
                <InfoDescription>
                  {address1}
                  <br />
                  {address2}
                </InfoDescription>
              </InfoRow>
              <InfoRow>
                <InfoTitle>운영시간</InfoTitle>
                <InfoDescription>
                  {openTime} ~ {closeTime}
                </InfoDescription>
              </InfoRow>
              <InfoRow>
                <InfoTitle>휴무일</InfoTitle>
                <InfoDescription>{dayOfWeek}</InfoDescription>
              </InfoRow>
            </InfoContainer>
            {renderButtons()}
          </>
        ) : (
          renderButtons()
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
