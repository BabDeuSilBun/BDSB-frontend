'use client';

import { useState } from 'react';

import styled from 'styled-components';
import InfoBoxIcon from '@/components/svg/infoBoxIcon';

interface InfoBoxProps {
  textItems: {
    id: number;
    text: string;
    $textStyle: 'withIcon' | 'Title' | 'Description';
    sameRow?: boolean;
  }[];
  // eslint-disable-next-line react/require-default-props
  showIcon?: boolean;
  // eslint-disable-next-line react/require-default-props
  width?: string;
}

const InfoContainer = styled.div`
  display: flex;
  align-items: start;
  position: relative;
  width: 100%;
`;

const InfoBoxWrapper = styled.div<{ width?: string; $isAbsolute?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  background-color: var(--gray100);
  border: 1px solid var(--gray200);
  padding: var(--spacing-xs);
  margin: var(--spacing-xs) 0;
  border-radius: var(--border-radius-md);
  width: ${({ width }) => width || '100%'};

  ${({ $isAbsolute }) =>
    $isAbsolute &&
    `
      position: absolute;
      align-items: center;
      margin: 0;
      z-index: 1005;
      top: 0;
      left: calc(100%);
    `}
`;

const IconWrapper = styled.div`
  margin-right: 0.2rem;
  display: flex;
  align-items: start;
  cursor: pointer;
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p<{ $textStyle: 'withIcon' | 'Title' | 'Description' }>`
  margin: 0;
  font-size: var(--font-size-xs);
  color: var(--gray400);

  ${({ $textStyle }) => {
    switch ($textStyle) {
      case 'withIcon':
        return `
          font-weight: var(--font-regular);
        `;
      case 'Title':
        return `
          font-weight: var(--font-semi-bold);
          margin-right: var(--spacing-xs);
        `;
      case 'Description':
        return `
          font-weight: var(--font-regular);
        `;
      default:
        return '';
    }
  }}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1004;
`;

export default function InfoBox({
  textItems = [],
  showIcon = true,
  width,
}: InfoBoxProps) {
  const [isVisible, setIsVisible] = useState(!showIcon);

  const handleIconClick = () => {
    setIsVisible((prev) => !prev);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <InfoContainer>
      {showIcon && (
        <IconWrapper onClick={handleIconClick}>
          <InfoBoxIcon width={14} height={14} />
        </IconWrapper>
      )}
      {isVisible && (
        <>
          {showIcon && <Overlay onClick={handleClose} />}
          <InfoBoxWrapper width={width} $isAbsolute={showIcon}>
            {textItems.map((item, index) => {
              if (item.$textStyle === 'withIcon') {
                return (
                  <Text key={item.id} $textStyle={item.$textStyle}>
                    {item.text}
                  </Text>
                );
              }

              if (item.sameRow && index < textItems.length - 1) {
                return (
                  <TextRow key={item.id}>
                    <Text $textStyle={item.$textStyle}>{item.text}</Text>
                    <Text $textStyle={textItems[index + 1].$textStyle}>
                      {textItems[index + 1].text}
                    </Text>
                  </TextRow>
                );
              }
              if (
                !item.sameRow &&
                (index === 0 || !textItems[index - 1].sameRow)
              ) {
                return (
                  <Text key={item.id} $textStyle={item.$textStyle}>
                    {item.text}
                  </Text>
                );
              }
              return null;
            })}
          </InfoBoxWrapper>
        </>
      )}
    </InfoContainer>
  );
}
