'use client';

import Image from 'next/image';
import styled from 'styled-components';
import HamburgerIcon from '../svg/hamburger';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: var(--background);
  align-items: center;
  position: fixed;
  z-index: 1000;
  height: 48px;
  width: inherit;
  box-sizing: border-box;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  padding: 1.5rem;
`;

const Button = styled.div``;

interface HeaderProps {
  buttonLeft?: string;
  text?: string;
  buttonRight?: string;
}

const Header: React.FC<HeaderProps> = ({ buttonLeft, text, buttonRight }) => {
  let left = buttonLeft;
  let right = buttonRight;

  return (
    <HeaderContainer>
      <Button>
        <HamburgerIcon color="var(--primary)" width={18} height={18} />
      </Button>
      <h1>{text}</h1>
      <Button>
        <HamburgerIcon color="var(--primary)" width={18} height={18} />
      </Button>
    </HeaderContainer>
  );
};

export default Header;
