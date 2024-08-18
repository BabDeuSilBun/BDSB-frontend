'use client';

import { useState } from 'react';
import SettingLabel from '@/components/meetings/settingLabel';
import SettingHeadcount from '@/components/meetings/settingHeadcount';
import DeliveryFees from '@/components/meetings/deliveryFee';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 var(--spacing-md) 6rem;
  margin-top: 60px;
`;

const Step2 = () => {
  return (
    <Container>
      <SettingLabel text="인원 제한" />
      <SettingHeadcount
        text ="본인 포함 최소 인원"
      />
      <SettingHeadcount
        text ="본인 포함 최대 인원"
      />
      <SettingLabel text="추가 설명" />
      <textarea 
        placeholder="모임원의 조건이나 본인 소개 등 추가적으로 당부할 말이 있다면 자유롭게 적어주세요." 
        rows="4" 
      />
      <DeliveryFees />
    </Container>
  );
};

export default Step2;