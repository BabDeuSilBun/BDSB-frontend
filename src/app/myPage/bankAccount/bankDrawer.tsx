import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import styled from 'styled-components';
import { BANK_INFO } from '@/constant/bankInfo';

import BankImages from './bankImages';

interface BankDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBank: string | null;
  onBankSelect: (value: string) => void;
}

const DrawerForm = styled.form`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-radius: var(--border-radius-lg);
`;

const BankItem = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--gray100);
  padding: 1rem;
  margin: 0.5rem;
  border-radius: var(--border-radius-default);
  font-size: var(--font-size-xs);
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
      <DrawerContent>
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
