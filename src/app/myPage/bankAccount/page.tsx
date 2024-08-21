'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { BANK_INFO } from '@/constant/bankInfo';
import { validateBankAccount } from '@/utils/validateBankAccount';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Container from '@/styles/container';
import styled from 'styled-components';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import BankImages from './bankImages';

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

const BankAccount = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isActive, setIsActive] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>('');
  const [bankAccount, setBankAccount] = useState<number | undefined>(undefined);
  const [owner, setOwner] = useState('');

  const handleBankSelect = (value: string) => {
    setSelectedBank(value);
    onClose();
  };

  useEffect(() => {
    if (selectedBank && owner && bankAccount !== undefined) {
      const accountString = bankAccount.toString();
      const validated = validateBankAccount({
        codes:
          BANK_INFO.find((option) => option.value === selectedBank)?.code || [],
        accountNumber: accountString,
      });
      setIsActive(validated);
    }
  }, [selectedBank, bankAccount, owner]);

  const onClickSubmitBtn = async () => {
    const ownerName = owner.trim();
    const bankAccountString = bankAccount?.toString();
    try {
      console.log(ownerName, bankAccountString, selectedBank);
      // 나중에 httpCredential로 바꿔야 함
      await axios.post(`/api/users/account`, {
        owner: ownerName,
        bankAccount: bankAccountString,
        selectedBank,
      });
      alert('계좌 번호가 변경되었습니다.');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <>
      <Header buttonLeft="back" text="환불 계좌 변경" />
      <ContainerSection>
        <input
          type="number"
          value={bankAccount !== undefined ? bankAccount : ''}
          onChange={(e) => {
            const { value } = e.target;
            setBankAccount(value ? Number(value) : undefined);
          }}
          placeholder="계좌번호를 입력하세요"
        />
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="예금주 명을 입력하세요"
        />
        <BankBtn onClick={onOpen}>
          {selectedBank
            ? BANK_INFO.find((option) => option.value === selectedBank)?.name
            : '은행을 선택하세요'}
        </BankBtn>
      </ContainerSection>
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
                  value={option.value}
                  checked={selectedBank === option.value}
                  onChange={() => handleBankSelect(option.value)}
                />
                {option.name}
              </BankItem>
            ))}
          </DrawerForm>
        </DrawerContent>
      </Drawer>
      <Footer
        type="button"
        buttonText="변경하기"
        onButtonClick={!isActive ? undefined : onClickSubmitBtn}
        disabled={!isActive ? true : undefined}
      />
    </>
  );
};

export default BankAccount;
