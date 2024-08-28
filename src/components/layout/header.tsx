'use client';

import { useRouter } from 'next/navigation';

import { Portal, useDisclosure } from '@chakra-ui/react';
import styled from 'styled-components';

import HeaderDrawer from './headerDrawer';
import HamburgerBtn from '../common/hamburgerBtn';

import ArrowLeft from '@/components/svg/arrowLeft';
import CartIcon from '@/components/svg/cart';
import ExitIcon from '@/components/svg/exit';
import HomeIcon from '@/components/svg/home';

const Icons = {
  back: (color: string) => <ArrowLeft color={color} />,
  home: (color: string) => <HomeIcon color={color} />,
  exit: (color: string) => <ExitIcon color={color} />,
  cart: (color: string) => <CartIcon color={color} />,
};

const HeaderContainer = styled.header<{ $isTransparent: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: ${({ $isTransparent }) =>
    $isTransparent ? 'transparent' : 'var(--background)'};
  align-items: center;
  position: fixed;
  z-index: 1000;
  height: 60px;
  width: 100%;
  box-shadow: ${({ $isTransparent }) =>
    $isTransparent ? 'none' : '0px 5px 5px var(--shadow)'};
  padding: 1.5rem;
`;

const Flex = styled.div<{ $side: 'left' | 'center' | 'right' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 50px;
  justify-content: ${({ $side }) =>
    $side === 'center'
      ? 'center'
      : $side === 'left'
        ? 'flex-start'
        : 'flex-end'};
  flex: ${({ $side }) => ($side === 'center' ? 1 : 0)};

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

const CartQuantityCircle = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

const CartIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

interface HeaderProps {
  buttonLeft?: 'hamburger' | 'back';
  buttonRight?: 'home' | 'exit';
  buttonRightSecondary?: 'cart';
  iconColor?: string;
  text?: string;
  onBack?: () => void;
  onExit?: () => void;
  isPostcodeOpen?: boolean;
  onClosePostcodeModal?: () => void;
  $isTransparent?: boolean;
  $cartQuantity?: number;
  meetingId?: string;
  storeId?: string;
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
  isPostcodeOpen = false,
  onClosePostcodeModal,
  $isTransparent = false,
  $cartQuantity = 0,
  meetingId,
  storeId,
}) => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  const handleLeftButtonClick = () => {
    if (isPostcodeOpen && onClosePostcodeModal) {
      onClosePostcodeModal();
    } else if (buttonLeft === 'back') {
      if (onBack) {
        onBack();
      } else {
        router.back();
      }
    }
  };

  const handleRightButtonClick = () => {
    if (isPostcodeOpen && onClosePostcodeModal) {
      onClosePostcodeModal();
    } else if (buttonRight === 'home') {
      router.push('/');
    } else if (buttonRight === 'exit' && onExit) {
      onExit();
    }
  };

  const handleRightSecondaryButtonClick = () => {
    if (buttonRightSecondary === 'cart') {
      if (meetingId && storeId) {
        router.push(`/cart/${meetingId}?storeId=${storeId}`);
      } else {
        router.push('/cart');
      }
    }
  };

  return (
    <>
      <HeaderContainer $isTransparent={$isTransparent}>
        <HeaderDrawer onToggle={onToggle} $isOpen={isOpen} />
        <Flex $side="left">
          {buttonLeft && buttonLeft !== 'hamburger' && (
            <button type="button" onClick={handleLeftButtonClick}>
              {Icons[buttonLeft](iconColor)}
            </button>
          )}
        </Flex>
        <Flex $side="center">
          <h1>{text}</h1>
        </Flex>
        <Flex $side="right">
          {buttonRight && (
            <button type="button" onClick={handleRightButtonClick}>
              {Icons[buttonRight](iconColor)}
            </button>
          )}
          {buttonRightSecondary && (
            <CartIconContainer>
              <button type="button" onClick={handleRightSecondaryButtonClick}>
                {Icons[buttonRightSecondary](iconColor)}
              </button>
              {$cartQuantity > 0 && (
                <CartQuantityCircle>
                  {Math.round($cartQuantity)}
                </CartQuantityCircle>
              )}
            </CartIconContainer>
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
