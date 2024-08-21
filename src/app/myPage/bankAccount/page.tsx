'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { validateBankAccount } from '@/utils/validateBankAccount';
import { BANK_INFO } from '@/constant/bankInfo';
import { useDisclosure } from '@chakra-ui/react';

import BankForm from './bankForm';
import BankDrawer from './bankDrawer';

const BankAccount = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [bankAccount, setBankAccount] = useState<number | undefined>(undefined);
  const [owner, setOwner] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBankSelect = (value: string) => {
    setSelectedBank(value);
    onClose();
  };

  useEffect(() => {
    if (selectedBank && owner.trim() && bankAccount !== undefined) {
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
    try {
      await axios.post(`/api/users/account`, {
        owner: owner.trim(),
        bankAccount: bankAccount?.toString(),
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
      <BankForm
        bankAccount={bankAccount}
        owner={owner}
        onAccountChange={setBankAccount}
        onOwnerChange={setOwner}
        onBankBtnClick={onOpen}
        selectedBank={selectedBank}
      />
      <BankDrawer
        isOpen={isOpen}
        onClose={onClose}
        selectedBank={selectedBank}
        onBankSelect={handleBankSelect}
      />
      <Footer
        type="button"
        buttonText="변경하기"
        onButtonClick={isActive ? onClickSubmitBtn : undefined}
        disabled={!isActive}
      />
    </>
  );
};

export default BankAccount;
