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

const Flex = styled.div<{ side: 'left' | 'center' | 'right' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 50px;
  justify-content: ${({ side }) =>
    side === 'center' ? 'center' : side === 'left' ? 'flex-start' : 'flex-end'};
  flex: ${({ side }) => (side === 'center' ? 1 : 0)};

  h1 {
    font-size: var(--font-size-md);
    font-weight: var(--font-semi-bold);
    text-align: center;
    flex: 1;
  }
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
  onBack?: () => void;
  onExit?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  buttonLeft,
  buttonRight,
  buttonRightSecondary,
  iconColor = 'var(--text)',
  text,
  onBack,
  onExit = () => {
    router.push('/');
  },
}) => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  const handleLeftButtonClick = () => {
    if (buttonLeft === 'back') {
      onBack ? onBack() : router.back();
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
        <Flex side="left">
          {buttonLeft && buttonLeft !== 'hamburger' && (
            <button type="button" onClick={handleLeftButtonClick}>
              {Icons[buttonLeft](iconColor)}
            </button>
          )}
        </Flex>
        <Flex side="center">{text}</Flex>
        <Flex side="right">
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
        </Flex>
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
