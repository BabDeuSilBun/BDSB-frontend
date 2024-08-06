import styled from 'styled-components';
import { BaseBtn, BaseBtnInactive, BtnGroup } from '@/styles/button';

const FooterContainer = styled.footer`
  width: 360px;
  height: 100px;
  background-color: var(--background);
  box-shadow: 0px 4px 8px var(--shadow);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
`;

interface FooterProps {
  type: 'button' | 'inactiveButton' | 'buttonGroup';
  buttonText?: string;
  buttonText1?: string;
  buttonText2?: string;
}

const Footer: React.FC<FooterProps> = ({ type, buttonText, buttonText1, buttonText2 }) => {
  return (
    <FooterContainer>
      {type === 'button' && <BaseBtn>{buttonText}</BaseBtn>}
      {type === 'inactiveButton' && <BaseBtnInactive>{buttonText}</BaseBtnInactive>}
      {type === 'buttonGroup' && (
        <BtnGroup>
          <BaseBtn>{buttonText1}</BaseBtn>
          <BaseBtnInactive>{buttonText2}</BaseBtnInactive>
        </BtnGroup>
      )}
    </FooterContainer>
  );
};

export default Footer;
