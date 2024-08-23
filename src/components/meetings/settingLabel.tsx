'use client';

import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
`;

const Label = styled.h1`
  font-size: var(--font-size-lg);
  font-weight: var(--font-semi-bold);
  color: var(--text);
`;

interface SettingLabelProps {
  text: string;
}

const SettingLabel: React.FC<SettingLabelProps> = ({ text }) => (
  <Container>
    <Label>{text}</Label>
  </Container>
);

export default SettingLabel;
