'use client';

import React, { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import ArrowLeft from '../svg/arrowLeft';
import CartIcon from '../svg/cart';
import HomeIcon from '../svg/home';

const Icons = {
  back: (color: string) => <ArrowLeft color={color} />,
  home: (color: string) => <HomeIcon color={color} />,
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

interface StoreHeaderProps {
  buttonLeft?: 'back';
  buttonRight?: 'home';
  buttonRightSecondary?: 'cart';
  iconColor?: string;
  $cartQuantity?: number;
  $isTransparent?: boolean;
  meetingId?: string;
  storeId?: string;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({
  buttonLeft,
  buttonRight,
  buttonRightSecondary,
  iconColor = 'var(--text)',
  $isTransparent = false,
  $cartQuantity = 0,
  meetingId,
  storeId,
}) => {
  const router = useRouter();

  const handleLeftButtonClick = useCallback(() => {
    if (buttonLeft === 'back') {
      router.back();
    }
  }, [buttonLeft, router]);

  const handleRightButtonClick = () => {
    if (buttonRight === 'home') {
      router.push('/');
    }
  };

  const handleRightSecondaryButtonClick = useCallback(() => {
    if ($cartQuantity > 0) {
      if (meetingId && storeId) {
        router.push(`/cart/${meetingId}?storeId=${storeId}`);
      } else {
        router.push('/cart');
      }
    } else {
      console.log('Cart is empty. No action.');
    }
  }, [$cartQuantity, meetingId, storeId, router]);

  // Dynamically set the icon color based on transparency of the header
  const dynamicIconColor = $isTransparent ? iconColor : 'var(--text)';

  return (
    <HeaderContainer $isTransparent={$isTransparent}>
      <Flex $side="left">
        {buttonLeft && (
          <button type="button" onClick={handleLeftButtonClick}>
            {Icons[buttonLeft](dynamicIconColor)}
          </button>
        )}
      </Flex>
      <Flex $side="center">
        <h1>{/* Title */}</h1>
      </Flex>
      <Flex $side="right">
        {buttonRight && (
          <button type="button" onClick={handleRightButtonClick}>
            {Icons[buttonRight](dynamicIconColor)}
          </button>
        )}
        {buttonRightSecondary && (
          <CartIconContainer>
            <button type="button" onClick={handleRightSecondaryButtonClick}>
              {Icons[buttonRightSecondary](dynamicIconColor)}
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
  );
};

export default StoreHeader;
