import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import styled from 'styled-components';

import BankImages from './bankImages';

import { BANK_INFO } from '@/constant/bankInfo';

interface BankDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBank: string | null;
  onBankSelect: (value: string) => void;
}

const DrawerForm = styled.form`
  display: grid;
  margin-bottom: 2rem;
  padding: 1rem;
  grid-template-columns: repeat(3, 1fr);
  border-radius: var(--border-radius-lg);
`;

const Title = styled.h2`
  padding-top: 1rem;
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-lg);
  text-align: center;
`;

const BankItem = styled.label`
  display: flex;
  margin: 0.5rem;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-default);
  font-size: var(--font-size-xs);
  background: var(--gray100);
  cursor: pointer;

  input {
    opacity: 0;
  }
`;

const BankDrawer = ({
  isOpen,
  onClose,
  selectedBank,
  onBankSelect,
}: BankDrawerProps) => {
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent borderTopRadius="3xl">
        <Title>은행 목록</Title>
        <DrawerForm>
          {BANK_INFO.map((option) => (
            <BankItem key={option.id} htmlFor={option.value}>
              <BankImages url={option.url} />
              <input
                type="radio"
                id={option.value}
                name="bank"
                aria-checked={selectedBank === option.value}
                aria-labelledby={`label-${option.value}`}
                value={option.value}
                checked={selectedBank === option.value}
                onChange={() => onBankSelect(option.value)}
              />
              <span id={`label-${option.value}`}>{option.name}</span>
            </BankItem>
          ))}
        </DrawerForm>
      </DrawerContent>
    </Drawer>
  );
};

export default BankDrawer;
