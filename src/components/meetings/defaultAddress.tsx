'use client';

import styled from 'styled-components';

import { RoundBtnFilled } from '@/styles/button';

interface DefaultAddressProps {
  streetAddress: string;
  detailAddress: string;
  onChangeAddress?: () => void;
}

const AddressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const AddressText = styled.p`
  color: var(--text);
  font-size: var(--font-size-md);
  margin: --spacing-xs 0;
  word-break: keep-all;
  white-space: normal;
  overflow-wrap: break-word;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DefaultAddress: React.FC<DefaultAddressProps> = ({
  streetAddress,
  detailAddress,
  onChangeAddress,
}) => {
  return (
    <AddressContainer>
      <AddressText>{streetAddress}</AddressText>
      <AddressText>{detailAddress}</AddressText>
      <ButtonContainer>
        <RoundBtnFilled onClick={onChangeAddress}>변경하기</RoundBtnFilled>
      </ButtonContainer>
    </AddressContainer>
  );
};

export default DefaultAddress;
