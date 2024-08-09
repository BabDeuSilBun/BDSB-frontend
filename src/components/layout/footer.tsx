'use client';

import styled from 'styled-components';
import { BaseBtn, BaseBtnInactive, BtnGroup } from '@/styles/button';

const FooterContainer = styled.footer`
  width: 360px;
  max-width: 360px;
  position: absolute;
  bottom: 100px;
  z-index: 1000;
`;

const Child = styled.div`
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: var(--background);
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  padding: 1.5rem;
  position: fixed;
`;

interface FooterProps {
  type: 'button' | 'inactiveButton' | 'buttonGroup';
  buttonText?: string;
  buttonText1?: string;
  buttonText2?: string;
  onButtonClick?: () => void;
  onButtonClick1?: () => void;
  onButtonClick2?: () => void;
}

const Footer: React.FC<FooterProps> = ({
  type,
  buttonText,
  buttonText1,
  buttonText2,
  onButtonClick,
  onButtonClick1,
  onButtonClick2,
}) => {
  return (
    <FooterContainer>
      <Child>
        {type === 'button' && (
          <BaseBtn onClick={onButtonClick}>{buttonText}</BaseBtn>
        )}
        {type === 'inactiveButton' && (
          <BaseBtnInactive>{buttonText}</BaseBtnInactive>
        )}
        {type === 'buttonGroup' && (
          <BtnGroup>
            <BaseBtn onClick={onButtonClick1}>{buttonText1}</BaseBtn>
            <BaseBtnInactive onClick={onButtonClick2}>
              {buttonText2}
            </BaseBtnInactive>
          </BtnGroup>
        )}
      </Child>
    </FooterContainer>
  );
};

export default Footer;
