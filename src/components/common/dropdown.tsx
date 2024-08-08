'use client';

import { useEffect } from 'react';

import styled from 'styled-components';

interface DropdownOption {
  id: number;
  name: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  selectedValue: number | null;
  onSelect: (value: number | null) => void;
  placeholder: string;
  isOpen: boolean;
  onToggle: () => void;
}

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  flex-wrap: nowrap;
  width: 20rem; /* 320px */

  @media (max-width: var(--breakpoint-mobile-max)) {
    width: 90%;
  }

  @media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max)) {
    width: 18rem;
  }

  @media (min-width: var(--breakpoint-desktop)) {
    width: 20rem;
  }
`;

const SmallDropdownContainer = styled(DropdownContainer)`
  width: 9rem; /* Half the width of the default dropdown */

  @media (max-width: var(--breakpoint-mobile-max)) {
    width: 45%;
  }

  @media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max)) {
    width: 9rem;
  }

  @media (min-width: var(--breakpoint-desktop)) {
    width: 10rem;
  }
`;

const DropdownToggle = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: ${({ selected }) => (selected ? '500' : '400')};
  color: ${({ selected }) => (selected ? 'var(--primary)' : 'var(--gray400)')};
  border: solid
    ${({ selected }) =>
      selected ? '2px var(--primary)' : '1.5px var(--gray200)'};
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  background-color: var(--background);
  transition:
    color 0.3s ease,
    border-color 0.3s ease;

  @media (max-width: var(--breakpoint-mobile-max)) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  @media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max)) {
    padding: 0.45rem 0.9rem;
    font-size: 0.95rem;
  }
`;

const SmallDropdownToggle = styled(DropdownToggle)`
  padding: 0.25rem 0.5rem;
  font-size: var(--font-size-xs);
  border: none;

  @media (max-width: var(--breakpoint-mobile-max)) {
    padding: 0.2rem 0.4rem;
    font-size: var(--font-size-xxs);
  }

  @media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max)) {
    padding: 0.22rem 0.45rem;
    font-size: var(--font-size-xs);
  }
`;

const Arrow = styled.span<{ isOpen: boolean; selected: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  background: ${({ selected }) =>
    selected
      ? "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%236f6cf6'%3E%3Cpath d='M480-376q-5 0-10-1.5t-9-5.5L284-568q-7-7-7-18t7-18q7-7 18-7t18 7l160 160 160-160q7-7 18-7t18 7q7 7 7 18t-7 18L500-383q-4 4-9 5.5t-10 1.5Z'/%3E%3C/svg%3E\") no-repeat center"
      : "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%23757880'%3E%3Cpath d='M480-376q-5 0-10-1.5t-9-5.5L284-568q-7-7-7-18t7-18q7-7 18-7t18 7l160 160 160-160q7-7 18-7t18 7q7 7 7 18t-7 18L500-383q-4 4-9 5.5t-10 1.5Z'/%3E%3C/svg%3E\") no-repeat center"};
  background-size: contain;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 105%;
  left: 0;
  right: 0;
  border-radius: var(--border-radius-lg);
  border: 1.5px solid var(--gray200);
  background-color: var(--background);
  z-index: 1000;
  padding: 0.5rem 0;
  transition: 0.3s ease;
`;

const SmallDropdownMenu = styled(DropdownMenu)`
  border: none;
`;

const DropdownItem = styled.div<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ selected }) => (selected ? 'var(--primary)' : 'var(--gray400)')};

  &:hover {
    background-color: var(--gray100);
  }
`;

const SmallDropdownItem = styled(DropdownItem)`
  padding: 0.25rem 0.5rem;
  font-size: var(--font-size-xs);
`;

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
  isOpen,
  onToggle,
}) => {
  const handleSelect = (value: number | null) => {
    onSelect(value);
    onToggle();
  };

  return (
    <DropdownContainer>
      <DropdownToggle selected={!!selectedValue} onClick={onToggle}>
        {selectedValue
          ? options.find((option) => option.id === selectedValue)?.name
          : placeholder}
        <Arrow selected={!!selectedValue} isOpen={isOpen} />
      </DropdownToggle>
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option.id}
              selected={selectedValue === option.id}
              onClick={() => handleSelect(option.id)}
            >
              {option.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

const SmallCustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  isOpen,
  onToggle,
}) => {
  useEffect(() => {
    if (selectedValue === null && options.length > 0) {
      onSelect(options[0].id); // Set the first option as selected by default
    }
  }, [selectedValue, options, onSelect]);

  const handleSelect = (value: number | null) => {
    onSelect(value);
    onToggle();
  };

  return (
    <SmallDropdownContainer>
      <SmallDropdownToggle selected={!!selectedValue} onClick={onToggle}>
        {selectedValue
          ? options.find((option) => option.id === selectedValue)?.name
          : options[0].name}{' '}
        {/* Show the first option's name instead of placeholder */}
        <Arrow selected={!!selectedValue} isOpen={isOpen} />
      </SmallDropdownToggle>
      {isOpen && (
        <SmallDropdownMenu>
          {options.map((option) => (
            <SmallDropdownItem
              key={option.id}
              selected={selectedValue === option.id}
              onClick={() => handleSelect(option.id)}
            >
              {option.name}
            </SmallDropdownItem>
          ))}
        </SmallDropdownMenu>
      )}
    </SmallDropdownContainer>
  );
};

export { CustomDropdown, SmallCustomDropdown };
