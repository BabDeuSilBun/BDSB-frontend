'use client';

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

const SettingAddress = () => {
  const { address, setAddress } = useSignUpStore();

  return (
    <div>
      <Flex>
        <Wrapper>
          <AddressBtn>우편번호 검색</AddressBtn>
          <IconWrapper>
            <SearchIcon color="var(--gray300)" />
          </IconWrapper>
        </Wrapper>
        <input
          type="text"
          value={address?.detailAddress || ''}
          onChange={(e) =>
            setAddress &&
            setAddress({ ...address, detailAddress: e.target.value })
          }
          placeholder="상세 주소"
        />
        <Caption>
          해당 캠퍼스와 배송 수령지의 거리에 따라 주문이 거절될 수 있으니 적절한
          위치로 설정해주세요.
        </Caption>
      </Flex>
    </div>
  );
};

export default SettingAddress;
