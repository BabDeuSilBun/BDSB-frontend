'use client';

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

const Footer: React.FC<FooterProps> = ({
  type,
  buttonText = 'Button', // 기본값 설정
  buttonText1 = 'Button 1', // 기본값 설정
  buttonText2 = 'Button 2', // 기본값 설정
  onButtonClick,
  onButtonClick1,
  onButtonClick2,
  $padding,
  disabled = false,
}) => {
  return (
    <FooterContainer $padding={$padding}>
      {type === 'button' &&
        (disabled ? (
          // blocked function
          <BaseBtnInactive>{buttonText}</BaseBtnInactive>
        ) : (
          <BaseBtn onClick={onButtonClick}>{buttonText}</BaseBtn>
        ))}
      {/* just gray button can function */}
      {type === 'inactiveButton' && (
        <BaseBtnInactive onClick={onButtonClick}>{buttonText}</BaseBtnInactive>
      )}
      {type === 'buttonGroup' && (
        <BtnGroup>
          <BaseBtn onClick={onButtonClick1}>{buttonText1}</BaseBtn>
          <BaseBtnInactive onClick={onButtonClick2}>
            {buttonText2}
          </BaseBtnInactive>
        </BtnGroup>
      )}
    </FooterContainer>
  );
};

export default Footer;
