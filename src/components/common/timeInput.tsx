'use client';

import { FC, useState } from 'react';

import styled from 'styled-components';

import {
  CustomDropdown,
  DropdownItem,
  DropdownToggle,
} from '@/components/common/dropdown';

const CustomDropdownToggle = styled(DropdownToggle)<{
  $selected: boolean;
  onClick: () => void;
}>`
  padding: var(--spacing-xs) var(--spacing-sm);
` as FC<{ $selected: boolean; onClick: () => void }>;

const CustomDropdownItem = styled(DropdownItem)<{
  $selected: boolean;
  onClick: () => void;
}>`
  padding: var(--spacing-xs) var(--spacing-sm);
` as FC<{ $selected: boolean; onClick: () => void }>;

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
  box-sizing: border-box !important;
  padding: var(--spacing-xs) var(--spacing-sm) !important;
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
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const Divider = styled.span`
  font-size: var(--font-size-md);
  font-weight: var(--font-semi-bold);
  color: var(--gray400);
  padding: 0 var(--spacing-xs);
`;

interface TimeInputProps {
  time: {
    amPm: string;
    hour: string;
    minute: string;
  };
  onTimeChange: (
    newTime: Partial<{ amPm: string; hour: string; minute: string }>,
  ) => void;
  validateTime?: (time: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({
  time,
  onTimeChange,
  validateTime,
}) => {
  const { amPm, hour, minute } = time;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const amPmOptions = [
    { name: '오전', value: '오전' },
    { name: '오후', value: '오후' },
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleTimeChange = (
    newTime: Partial<{ amPm: string; hour: string; minute: string }>,
  ) => {
    const updatedTime = {
      ...time,
      ...newTime,
    };
    const formattedTime = `${
      updatedTime.amPm === '오후' && updatedTime.hour !== '12'
        ? (parseInt(updatedTime.hour, 10) + 12).toString().padStart(2, '0')
        : updatedTime.hour
    }:${updatedTime.minute}`;

    onTimeChange(updatedTime);

    if (validateTime) {
      validateTime(formattedTime);
    }
  };

  return (
    <TimeInputContainer>
      <DropdownWrapper>
        <CustomDropdown
          options={amPmOptions}
          selectedValue={amPm}
          onSelect={(value) => handleTimeChange({ amPm: value ?? '오전' })}
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
          onChange={(e) => handleTimeChange({ hour: e.target.value })}
          maxLength={2}
        />
        <Divider>:</Divider>
        <TimeInputField
          type="text"
          value={minute}
          placeholder="00"
          onChange={(e) => handleTimeChange({ minute: e.target.value })}
          maxLength={2}
        />
      </InputGroup>
    </TimeInputContainer>
  );
};

export default TimeInput;
