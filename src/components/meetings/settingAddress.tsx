'use client';

import { ChangeEvent, FC, useEffect } from 'react';

import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import styled from 'styled-components';

import { useOrderStore } from '@/state/orderStore';
import SearchIcon from '@/components/svg/search';

const Caption = styled.p`
  font-size: var(--font-size-xs);
  color: var(--gray400);
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100vw;
  padding: 0 var(--spacing-md);
`;

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translate(0, -50%);
`;

const AddressBtn = styled.button<{ $hasAddress: boolean }>`
  width: 100%;
  padding: var(--spacing-sm);
  padding-right: 2.5rem;
  font-size: var(--font-size-md);
  color: ${({ $hasAddress }) =>
    $hasAddress ? 'var(--text)' : 'var(--gray300)'};
  background-color: var(--background);
  border: 1px solid var(--gray200);
  border-radius: var(--border-radius-md);
  box-shadow: none;
  outline: none;
  transition: border-color 0.2s;
  text-align: left;
`;

const PostcodeWrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

interface SettingAddressProps {
  isPostcodeOpen: boolean;
  setIsPostcodeOpen: (open: boolean) => void;
  onAddressChange?: (addressData: Address) => void;
}

const SettingAddress: FC<SettingAddressProps> = ({
  isPostcodeOpen,
  setIsPostcodeOpen,
  onAddressChange,
}) => {
  const { formData, setDeliveredAddress, setButtonActive } = useOrderStore();
  const { streetAddress = '', detailAddress = '' } =
    formData?.deliveredAddress || {};

  useEffect(() => {
    setButtonActive(!!streetAddress && !!detailAddress);
  }, [setButtonActive, streetAddress, detailAddress]);

  const handleComplete = (data: Address) => {
    const formattedAddress = {
      streetAddress: data.address,
      postal: data.zonecode,
      detailAddress: '',
    };

    setDeliveredAddress(formattedAddress);

    if (onAddressChange) {
      onAddressChange(data);
    }

    setIsPostcodeOpen(false);
  };

  const onChangeDetailAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setDeliveredAddress({
      ...formData.deliveredAddress,
      detailAddress: e.target.value,
    });
  };

  return (
    <div>
      <Flex>
        <Wrapper onClick={() => setIsPostcodeOpen(true)}>
          <AddressBtn $hasAddress={!!streetAddress}>
            {streetAddress || '우편번호 검색'}
          </AddressBtn>
          <IconWrapper>
            <SearchIcon color="var(--gray300)" />
          </IconWrapper>
        </Wrapper>
        <input
          type="text"
          value={detailAddress}
          onChange={onChangeDetailAddress}
          placeholder="상세 주소"
        />
        <Caption>
          해당 캠퍼스와 배송 수령지의 거리에 따라 주문이 거절될 수 있으니 적절한
          위치로 설정해주세요.
        </Caption>
      </Flex>
      <PostcodeWrapper $isOpen={isPostcodeOpen}>
        <DaumPostcodeEmbed
          onComplete={handleComplete}
          style={{ width: '100%', height: '100%' }}
        />
      </PostcodeWrapper>
    </div>
  );
};

export default SettingAddress;
