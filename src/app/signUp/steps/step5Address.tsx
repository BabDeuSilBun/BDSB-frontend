'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { useSignUpStore } from '@/state/authStore';
import styled from 'styled-components';
import SearchIcon from '@/components/svg/search';

const Caption = styled.p`
  font-size: var(--font-size-xs);
  color: var(--gray400);
`;

const Flex = styled.div`
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

const AddressBtn = styled.button`
  width: 100%;
  padding: var(--spacing-sm);
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

const Step5Address = () => {
  const { address, setAddress, setButtonActive } = useSignUpStore();
  const { streetAddress, detailAddress } = address;

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  // 버튼 활성화 여부 설정
  useEffect(() => {
    setButtonActive(!!streetAddress && !!detailAddress);
  }, [setButtonActive, address]);

  // 주소 검색 완료 핸들러
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

    if (setAddress) {
      setAddress({
        streetAddress: fullAddress, // 도로명 주소
        postal: data.zonecode, // 우편번호
        detailAddress: '', // 상세 주소는 초기화
      });
    }

    // 주소가 선택되면 모달 닫기
    setIsPostcodeOpen(false);
  };

  const onChangeDetailAddress = (e: ChangeEvent<HTMLInputElement>) => {
    if (setAddress) setAddress({ ...address, detailAddress: e.target.value });
  };

  return (
    <div>
      <Flex>
        <Wrapper onClick={() => setIsPostcodeOpen(true)}>
          <AddressBtn>{streetAddress || '우편번호 검색'}</AddressBtn>
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

export default Step5Address;
