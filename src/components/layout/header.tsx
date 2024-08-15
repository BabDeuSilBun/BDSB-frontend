'use client';

import { Portal, useDisclosure } from '@chakra-ui/react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import HamburgerBtn from '../common/hamburgerBtn';
import HeaderDrawer from './headerDrawer';
import ArrowLeft from '@/components/svg/arrowLeft';
import HomeIcon from '@/components/svg/home';
import ExitIcon from '@/components/svg/exit';
import CartIcon from '@/components/svg/cart';

const Icons = {
  back: (color: string) => <ArrowLeft color={color} />,
  home: (color: string) => <HomeIcon color={color} />,
  exit: (color: string) => <ExitIcon color={color} />,
  cart: (color: string) => <CartIcon color={color} />,
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: var(--background);
  align-items: center;
  position: fixed;
  z-index: 1000;
  height: 60px;
  width: 100%;
  box-shadow: 0px 5px 5px var(--shadow);
  padding: 1.5rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-semi-bold);
  color: var(--text);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const LeftBtnContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const PortalButtonWrapper = styled.div`
  position: fixed;
  top: 1.4rem;
  left: 1rem;
  z-index: 2000;
`;

interface HeaderProps {
  buttonLeft?: 'hamburger' | 'back';
  buttonRight?: 'home' | 'exit';
  buttonRightSecondary?: 'cart';
  iconColor?: string;
  text?: string;
  onExit?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  buttonLeft,
  buttonRight,
  buttonRightSecondary,
  iconColor = 'var(--text)',
  text,
  onExit,
}) => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  const handleLeftButtonClick = () => {
    if (buttonLeft === 'back') {
      router.back();
    }
  };

  const handleRightButtonClick = () => {
    if (buttonRight === 'home') {
      router.push('/');
    } else if (buttonRight === 'exit' && onExit) {
      onExit();
    }
  };

  const handleRightSecondaryButtonClick = () => {
    if (buttonRightSecondary === 'cart') {
      router.push('/cart');
    }
  };

  return (
    <>
      <HeaderContainer>
        <HeaderDrawer onToggle={onToggle} $isOpen={isOpen} />
        {buttonLeft && buttonLeft !== 'hamburger' && (
          <button type="button" onClick={handleLeftButtonClick}>
            {Icons[buttonLeft](iconColor)}
          </button>
        )}
        <Title>{text}</Title>
        <LeftBtnContainer>
          {buttonRight && (
            <button type="button" onClick={handleRightButtonClick}>
              {Icons[buttonRight](iconColor)}
            </button>
          )}
          {buttonRightSecondary && (
            <button type="button" onClick={handleRightSecondaryButtonClick}>
              {Icons[buttonRightSecondary](iconColor)}
            </button>
          )}
        </LeftBtnContainer>
      </HeaderContainer>
      {buttonLeft === 'hamburger' && (
        <Portal>
          <PortalButtonWrapper>
            <HamburgerBtn onToggle={onToggle} $isOpen={isOpen} />
          </PortalButtonWrapper>
        </Portal>
      )}
    </>
  );
};

export default Header;
