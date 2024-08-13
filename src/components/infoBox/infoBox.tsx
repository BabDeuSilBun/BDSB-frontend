'use client';

import styled from 'styled-components';
import { useState } from 'react';
import InfoBoxIcon from '@/components/svg/infoBoxIcon';

interface InfoBoxProps {
  textItems: { text: string; $textStyle: 'CenteredText' | 'BoldTitle' | 'LeftAlignedText'; sameRow?: boolean }[];
  showIcon?: boolean;
  width?: string;
}

const InfoContainer = styled.div`
  display: flex;
  align-items: start;
`;

const InfoBoxWrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  background-color: var(--gray100);
  border: 1px solid var(--gray200);
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-md);
  width: ${({ width }) => width || 'auto'};
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
  justify-content: start;
`;

const Text = styled.p<{ $textStyle: 'CenteredText' | 'BoldTitle' | 'LeftAlignedText' }>`
  margin: 0;
  font-size: var(--font-size-xs);
  color: var(--gray400);

  ${({ $textStyle }) => {
    switch ($textStyle) {
      case 'CenteredText':
        return `
          text-align: center;
          font-weight: var(--font-regular);
          width: 100%;
        `;
      case 'BoldTitle':
        return `
          text-align: left;
          font-weight: var(--font-semi-bold);
          margin-right: var(--spacing-xs);
        `;
      case 'LeftAlignedText':
        return `
          text-align: left;
          font-weight: var(--font-regular);
        `;
      default:
        return '';
    }
  }}
`;

export default function InfoBox({ textItems = [], showIcon = true, width }: InfoBoxProps) {
  const [isVisible, setIsVisible] = useState(!showIcon);

  const handleIconClick = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <InfoContainer>
      {showIcon && (
        <IconWrapper onClick={handleIconClick}>
          <InfoBoxIcon width={14} height={14} />
        </IconWrapper>
      )}
      {isVisible && (
        <InfoBoxWrapper width={width}>
          {textItems.map((item, index) => {
            if (item.$textStyle === 'CenteredText') {
              return (
                <Text key={index} $textStyle={item.$textStyle}>
                  {item.text}
                </Text>
              );
            }

            if (item.sameRow && index < textItems.length - 1) {
              return (
                <TextRow key={index}>
                  <Text $textStyle={item.$textStyle}>{item.text}</Text>
                  <Text $textStyle={textItems[index + 1].$textStyle}>{textItems[index + 1].text}</Text>
                </TextRow>
              );
            } else if (!item.sameRow && (index === 0 || !textItems[index - 1].sameRow)) {
              return (
                <Text key={index} $textStyle={item.$textStyle}>
                  {item.text}
                </Text>
              );
            }
            return null;
          })}
        </InfoBoxWrapper>
      )}
    </InfoContainer>
  );
}