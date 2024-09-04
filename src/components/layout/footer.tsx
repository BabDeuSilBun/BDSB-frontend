'use client';

import React, { useCallback } from 'react';

import styled from 'styled-components';

import { BaseBtn, BaseBtnInactive, BtnGroup } from '@/styles/button';

const FooterContainer = styled.footer<{ $padding?: string }>`
  width: 100vw;
  position: fixed;
  bottom: 0px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  background-color: var(--background);
  padding: ${({ $padding }) =>
    $padding || '1.5rem'}; /* Default padding is 1.5rem */
`;

interface FooterProps {
  type: 'button' | 'inactiveButton' | 'buttonGroup';
  buttonText?: string;
  buttonText1?: string;
  buttonText2?: string;
  onButtonClick?: () => void;
  onButtonClick1?: () => void;
  onButtonClick2?: () => void;
  $padding?: string;
  disabled?: boolean;
}

const Footer: React.FC<FooterProps> = React.memo(
  ({
    type,
    buttonText = 'Button',
    buttonText1 = 'Button 1',
    buttonText2 = 'Button 2',
    onButtonClick,
    onButtonClick1,
    onButtonClick2,
    $padding,
    disabled = false,
  }) => {
    const handleButtonClick = useCallback(() => {
      if (onButtonClick) onButtonClick();
    }, [onButtonClick]);

    const handleButtonClick1 = useCallback(() => {
      if (onButtonClick1) onButtonClick1();
    }, [onButtonClick1]);

    const handleButtonClick2 = useCallback(() => {
      if (onButtonClick2) onButtonClick2();
    }, [onButtonClick2]);

    return (
      <FooterContainer $padding={$padding}>
        {type === 'button' &&
          (disabled ? (
            <BaseBtnInactive>{buttonText}</BaseBtnInactive>
          ) : (
            <BaseBtn onClick={handleButtonClick}>{buttonText}</BaseBtn>
          ))}
        {type === 'inactiveButton' && (
          <BaseBtnInactive onClick={handleButtonClick}>
            {buttonText}
          </BaseBtnInactive>
        )}
        {type === 'buttonGroup' && (
          <BtnGroup>
            <BaseBtn onClick={handleButtonClick1}>{buttonText1}</BaseBtn>
            <BaseBtnInactive onClick={handleButtonClick2}>
              {buttonText2}
            </BaseBtnInactive>
          </BtnGroup>
        )}
      </FooterContainer>
    );
  },
);

Footer.displayName = 'Footer';

export default Footer;
