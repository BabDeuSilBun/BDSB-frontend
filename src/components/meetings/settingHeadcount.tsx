'use client';

import styled from 'styled-components';
import SettingLabel from '@/components/meetings/settingLabel'
import Counter from '@/components/common/counter'

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-md);
`;

const Label = styled.h1`
  font-size: var(--font-size-md);
  font-weight: var(--font-regular);
  color: var(--text);
  flex: 1.3; 
`;

const CounterWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

interface SettingHeadcountProps {
  text: string;
}

const SettingHeadcount: React.FC<SettingHeadcountProps> = ({ text }) => (
  <Container>
    <Label>{text}</Label>
    <CounterWrapper>
      <Counter />
    </CounterWrapper>
  </Container>
);

export default SettingHeadcount;
