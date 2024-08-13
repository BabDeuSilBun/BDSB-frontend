'use client';

import { Portal, useDisclosure } from '@chakra-ui/react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import HamburgerBtn from '../common/hamburgerBtn';
import HeaderDrawer from './headerDrawer';
import BackIcon from '@/components/svg/arrowLeft';
import HomeIcon from '@/components/svg/home';
import ExitIcon from '@/components/svg/exit';
import CartIcon from '@/components/svg/cart';

const Icons = {
  back: (color: string, size: number) => (
    <BackIcon color={color} width={size} height={size} />
  ),
  home: (color: string, size: number) => (
    <HomeIcon color={color} width={size} height={size} />
  ),
  exit: (color: string, size: number) => (
    <ExitIcon color={color} width={size} height={size} />
  ),
  cart: (color: string, size: number) => (
    <CartIcon color={color} width={size} height={size} />
  ),
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  background-color: var(--background);
  align-items: center;
  position: fixed;
  z-index: 1000;
  height: 60px;
  width: inherit;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  padding: 1.5rem;
`;

const SideContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ side }) => side}: 1.5rem;
  display: flex;
  align-items: center;
`;

const RightButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const PortalButtonWrapper = styled.div`
  position: fixed;
  top: 1.4rem;
  left: 1rem;
  z-index: 2000;
`;

const Title = styled.h1`
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-semi-bold);
  color: var(--text);
`;

interface HeaderProps {
  buttonLeft?: 'hamburger' | 'back' | undefined;
  buttonRight?: 'home' | 'exit' | undefined;
  buttonRightSecondary?: 'cart' | undefined;
  iconColor?: string;
  iconSize?: number;
  text?: string;
  onExit?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  buttonLeft,
  buttonRight,
  buttonRightSecondary,
  iconColor = 'var(--gray500)', // Default color
  iconSize = 24, // Default size
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
        <SideContainer side="left">
          {buttonLeft && (
            <button type="button" onClick={handleLeftButtonClick}>
              {Icons[buttonLeft](iconColor, iconSize)}
            </button>
          )}
        </SideContainer>
        <Title>{text}</Title>
        <SideContainer side="right">
          {buttonRight && (
            <button type="button" onClick={handleRightButtonClick}>
              {Icons[buttonRight](iconColor, iconSize)}
            </button>
          )}
          {buttonRightSecondary && (
            <button type="button" onClick={handleRightSecondaryButtonClick}>
              {Icons[buttonRightSecondary](iconColor, iconSize)}
            </button>
          )}
        </SideContainer>
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
