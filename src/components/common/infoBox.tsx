'use client';

import styled from 'styled-components';
import { useState } from 'react';
import InfoBoxIcon from '@/components/svg/infoBoxIcon';

interface InfoBoxProps {
  textItems: { text: string; $textStyle: 'DescriptionOnly' | 'Title' | 'Description'; sameRow?: boolean }[];
  showIcon?: boolean;
  width?: string;
}

const InfoContainer = styled.div`
  display: flex;
  align-items: start;
  position: relative;
`;

const InfoBoxWrapper = styled.div<{ width?: string; $zIndex?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--gray100);
  border: 1px solid var(--gray200);
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-md);
  width: ${({ width }) => width || 'auto'};
  position: absolute;
  z-index: ${({ $zIndex }) => $zIndex || 0};
  top: 0;
  left: calc(100%); /* Position it to the right of the icon with some space */
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

const Text = styled.p<{ $textStyle: 'DescriptionOnly' | 'Title' | 'Description' }>`
  margin: 0;
  font-size: var(--font-size-xs);
  color: var(--gray400);
  text-align: left;

  ${({ $textStyle }) => {
    switch ($textStyle) {
      case 'DescriptionOnly':
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
        <InfoBoxWrapper width={width} $zIndex={10}>
          {textItems.map((item, index) => {
            if (item.$textStyle === 'DescriptionOnly') {
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
