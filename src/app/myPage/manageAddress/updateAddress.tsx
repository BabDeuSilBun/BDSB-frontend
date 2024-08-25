'use client';

import { useState } from 'react';

import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import styled from 'styled-components';

import SearchIcon from '@/components/svg/search';

const Flex = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translate(0, -50%);
`;

const Caption = styled.p`
  font-size: var(--font-size-xs);
  color: var(--gray400);
`;

const AddressBtn = styled.button`
  width: 100%;
  padding: var(--spacing-sm);
  padding-right: 2.5rem;
  font-size: var(--font-size-md);
  color: var(--gray300);
  background-color: var(--background);
  border: 1px solid var(--gray200);
  border-radius: var(--border-radius-md);
  box-shadow: none;
  outline: none;
  transition: border-color 0.2s;
  text-align: left;
`;

const PostcodeWrapper = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

interface UpdateAddressProps {
  streetAddress: string;
  detailAddress: string;

  setStreetAddress: (address: string) => void;
  setDetailAddress: (address: string) => void;
  setPostal: (postal: string) => void;
}

const UpdateAddress = ({
  streetAddress,
  detailAddress,
  setStreetAddress,
  setDetailAddress,
  setPostal,
}: UpdateAddressProps) => {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setStreetAddress(fullAddress);
    setDetailAddress('');
    setPostal(data.zonecode);
    setIsPostcodeOpen(false);
  };

  const openPostcodeSearch = () => {
    setIsPostcodeOpen(true);
  };

  return (
    <>
      <Flex>
        <Wrapper onClick={openPostcodeSearch} aria-label="주소 검색">
          <AddressBtn>{streetAddress || '우편번호 검색'}</AddressBtn>
          <IconWrapper>
            <SearchIcon color="var(--gray300)" />
          </IconWrapper>
        </Wrapper>
        <input
          type="text"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          placeholder="상세 주소"
          aria-label="상세 주소"
        />
        <Caption>
          해당 캠퍼스와 배송 수령지의 거리에 따라 주문이 거절될 수 있으니 적절한
          위치로 설정해주세요.
        </Caption>
      </Flex>
      {isPostcodeOpen && (
        <PostcodeWrapper>
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            style={{ width: '100%', height: '100%' }}
          />
        </PostcodeWrapper>
      )}
    </>
  );
};

export default UpdateAddress;
