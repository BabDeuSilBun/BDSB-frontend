'use client';

import styled from 'styled-components';
import Counter from '@/components/common/counter';

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
`;

const CounterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface SettingHeadcountProps {
  text: string;
  value: number;
  onValueChange: (newValue: number) => void;
}

const SettingHeadcount: React.FC<SettingHeadcountProps> = ({
  text,
  value,
  onValueChange,
}) => (
  <Container>
    <Label>{text}</Label>
    <CounterWrapper>
      <Counter
        value={value}
        minValue={1}
        onValueChange={onValueChange}
        disableDecrementCondition={(val) => val <= 1}
      />
    </CounterWrapper>
  </Container>
);

export default SettingHeadcount;
