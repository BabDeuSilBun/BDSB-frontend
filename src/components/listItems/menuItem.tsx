'use client';

import { Divider } from '@chakra-ui/react';
import styled from 'styled-components';

import { formatCurrency } from '@/utils/currencyFormatter';

interface MenuItemProps {
  menuName: string;
  price: number;
  imageUrl: string;
  // eslint-disable-next-line react/require-default-props
  hasDivider?: boolean;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

const MenuListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.3125rem; /* 101px */
  background-color: var(--background);
  padding: var(--spacing-sm) var(--spacing-sm) 0;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const MenuName = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-semi-bold);
  color: var(--text);
  margin: 0;
`;

const Price = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-regular);
  color: var(--text);
  margin: 0;
`;

const ImageWrapper = styled.div`
  width: 5.25rem;
  height: 4.25rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function MenuItem({
  menuName,
  price,
  imageUrl,
  hasDivider = true,
  onClick,
}: MenuItemProps) {
  return (
    <>
      <MenuListWrapper onClick={onClick}>
        <TextWrapper>
          <MenuName>{menuName}</MenuName>
          <Price>{formatCurrency(price)}</Price>
        </TextWrapper>
        <ImageWrapper>
          <MenuImage src={imageUrl} alt={menuName} />
        </ImageWrapper>
      </MenuListWrapper>
      {hasDivider && (
        <Divider
          orientation="horizontal"
          sx={{
            borderWidth: '1px',
            borderColor: 'var(--gray200)',
          }}
        />
      )}
    </>
  );
}
