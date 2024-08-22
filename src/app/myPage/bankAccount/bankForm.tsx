'use client';

import styled from 'styled-components';
import { BANK_INFO } from '@/constant/bankInfo';
import Container from '@/styles/container';

interface BankFormProps {
  bankAccount: number | undefined;
  owner: string;
  onAccountChange: (value: number | undefined) => void;
  onOwnerChange: (value: string) => void;
  onBankBtnClick: () => void;
  selectedBank: string | null;
}

const ContainerSection = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

const BankBtn = styled.button`
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

const BankForm = ({
  bankAccount,
  owner,
  onAccountChange,
  onOwnerChange,
  onBankBtnClick,
  selectedBank,
}: BankFormProps) => {
  return (
    <ContainerSection>
      <input
        type="number"
        id="bankAccount"
        aria-label="계좌번호 입력"
        value={bankAccount !== undefined ? bankAccount : ''}
        onChange={(e) => {
          const { value } = e.target;
          onAccountChange(value ? Number(value) : undefined);
        }}
        placeholder="계좌번호를 입력하세요"
      />
      <input
        type="text"
        id="owner"
        aria-label="예금주 입력"
        value={owner}
        onChange={(e) => onOwnerChange(e.target.value)}
        placeholder="예금주 명을 입력하세요"
      />
      <BankBtn aria-label="은행 선택" onClick={onBankBtnClick}>
        {selectedBank
          ? BANK_INFO.find((option) => option.value === selectedBank)?.name
          : '은행을 선택하세요'}
      </BankBtn>
    </ContainerSection>
  );
};

export default BankForm;
