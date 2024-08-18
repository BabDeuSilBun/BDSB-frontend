'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomDropdown, DropdownToggle, DropdownItem } from '@/components/common/dropdown';

const CustomDropdownToggle = styled(DropdownToggle)`
  padding: var(--spacing-sm) var(--spacing-md);
`;

const CustomDropdownItem = styled(DropdownItem)`
  padding: var(--spacing-xs) var(--spacing-sm);
`;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DropdownWrapper = styled.div`
  flex: 1;
  padding: var(--spacing-xs) var(--spacing-xs) var(--spacing-xs) 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
`;

const TimeInputField = styled.input`
  width: 100%;
  padding: var(--spacing-xs) 0 var(--spacing-xs);
  font-size: var(--font-size-md);
  color: var(--gray500);
  background-color: var(--background);
  border: 1px solid var(--gray200);
  border-radius: var(--border-radius-md);
  box-shadow: none;
  outline: none;
  text-align: center;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--primary);
  }

  &::placeholder {
    color: var(--gray300);
  }
`;

const Divider = styled.span`
  font-size: var(--font-size-md);
  font-weight: var(--font-semi-bold);
  color: var(--gray400);
  padding: 0 var(--spacing-xs);
`;

const TimeInput = () => {
  const [amPm, setAmPm] = useState<string | null>('오전');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const amPmOptions = [
    { id: 1, name: '오전', value: '오전' },
    { id: 2, name: '오후', value: '오후' },
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <TimeInputContainer>
      <DropdownWrapper>
        <CustomDropdown
          options={amPmOptions}
          selectedValue={amPm}
          onSelect={setAmPm}
          isOpen={isDropdownOpen}
          onToggle={handleDropdownToggle}
          placeholder="오전/오후"
          Toggle={CustomDropdownToggle}
          Item={CustomDropdownItem} 
        />
      </DropdownWrapper>
      <InputGroup>
        <TimeInputField
          type="text"
          value={hour}
          placeholder="00"
          onChange={(e) => setHour(e.target.value)}
          maxLength={2}
        />
        <Divider>:</Divider>
        <TimeInputField
          type="text"
          value={minute}
          placeholder="00"
          onChange={(e) => setMinute(e.target.value)}
          maxLength={2}
        />
      </InputGroup>
    </TimeInputContainer>
  );
};

export default TimeInput;
