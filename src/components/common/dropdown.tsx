'use client';

import { useEffect } from 'react';

import styled from 'styled-components';

interface DropdownOption {
  id: number;
  name: string;
  value: string;
}

interface SmallCustomDropdownProps {
  options: DropdownOption[];
  selectedValue: string | null;
  onSelect: (value: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface CustomDropdownProps extends SmallCustomDropdownProps {
  placeholder: string;
}

const mediaQueries = {
  tablet: `@media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max))`,
  desktop: `@media (min-width: var(--breakpoint-desktop))`,
};

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  flex-wrap: nowrap;
  width: 20rem; /* 320px */
  ${mediaQueries.tablet} {
    width: 25rem; /* 400px on tablets */
  }
  ${mediaQueries.desktop} {
    width: 30rem; /* 480px on desktops */
  }
`;

const SmallDropdownContainer = styled(DropdownContainer)`
  width: 10rem; /* Half the width of the default dropdown */
  ${mediaQueries.tablet} {
    width: 12rem; /* 192px on tablets */
  }
  ${mediaQueries.desktop} {
    width: 15rem; /* 240px on desktops */
  }
`;

const DropdownToggle = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: var(--font-size-md); /* 16px */
  font-weight: ${({ selected }) =>
    selected ? 'var(--font-regular)' : 'var(--font-light)'};
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
  ${mediaQueries.tablet} {
    font-size: var(--font-size-lg); /* 20px on tablet */
    padding: 0.75rem 1.25rem; /* Increased padding on tablets */
  }
  ${mediaQueries.desktop} {
    font-size: var(--font-size-lg); /* 20px on desktops */
    padding: 1rem 1.5rem; /* Increased padding on desktops */
  }
`;

const SmallDropdownToggle = styled(DropdownToggle)`
  padding: 0.25rem 0.5rem;
  font-size: var(--font-size-xs); /* 12px */
  border: none;
  ${mediaQueries.tablet} {
    font-size: var(--font-size-sm); /* 14px on tablets */
    padding: 0.5rem 1rem; /* Increased padding on tablets */
  }
  ${mediaQueries.desktop} {
    font-size: var(--font-size-md); /* 16px on desktops */
    padding: 0.75rem 1.25rem; /* Increased padding on desktops */
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
  ${mediaQueries.tablet} {
    width: 2rem;
    height: 2rem; /* Larger arrow on tablets */
  }
  ${mediaQueries.desktop} {
    width: 2.5rem;
    height: 2.5rem; /* Even larger arrow on desktops */
  }
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
  ${mediaQueries.tablet} {
    padding: 0.75rem 0; /* Increased padding on tablets */
  }
  ${mediaQueries.desktop} {
    padding: 1rem 0; /* Increased padding on desktops */
  }
`;

const SmallDropdownMenu = styled(DropdownMenu)`
  border: none;
  box-shadow: 0px 4px 8px var(--shadow);
`;

const DropdownItem = styled.div<{ selected: boolean }>`
  font-size: var(--font-size-md); /* 16px */
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: ${({ selected }) => (selected ? 'var(--primary)' : 'var(--gray400)')};

  &:hover {
    background-color: var(--gray100);
  }
  ${mediaQueries.tablet} {
    font-size: var(--font-size-lg); /* 20px on tablet */
    padding: 0.75rem 1.25rem; /* Increased padding on tablets */
  }
  ${mediaQueries.desktop} {
    font-size: var(--font-size-lg); /* 20px on desktops */
    padding: 1rem 1.5rem; /* Increased padding on desktops */
  }
`;

const SmallDropdownItem = styled(DropdownItem)`
  font-size: var(--font-size-xs); /* 12px */
  padding: 0.25rem 0.5rem;
  ${mediaQueries.tablet} {
    font-size: var(--font-size-sm); /* 14px on tablets */
    padding: 0.5rem 1rem; /* Increased padding on tablets */
  }
  ${mediaQueries.desktop} {
    font-size: var(--font-size-md); /* 16px on desktops */
    padding: 0.75rem 1.25rem; /* Increased padding on desktops */
  }
`;

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
  isOpen,
  onToggle,
}) => {
  const handleSelect = (value: string | null) => {
    onSelect(value);
    onToggle();
  };

  return (
    <DropdownContainer>
      <DropdownToggle selected={!!selectedValue} onClick={onToggle}>
        {selectedValue
          ? options.find((option) => option.value === selectedValue)?.name
          : placeholder}
        <Arrow selected={!!selectedValue} isOpen={isOpen} />
      </DropdownToggle>
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              selected={selectedValue === option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

const SmallCustomDropdown: React.FC<SmallCustomDropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  isOpen,
  onToggle,
}) => {
  useEffect(() => {
    if (selectedValue === null && options.length > 0) {
      onSelect(options[0]?.value ?? null); // Set the first option as selected by default
    }
  }, [selectedValue, options, onSelect]);

  const handleSelect = (value: string | null) => {
    onSelect(value);
    onToggle();
  };

  return (
    <SmallDropdownContainer>
      <SmallDropdownToggle selected={!!selectedValue} onClick={onToggle}>
        {selectedValue
          ? options.find((option) => option.value === selectedValue)?.name
          : options[0].name}{' '}
        {/* Show the first option's name instead of placeholder */}
        <Arrow selected={!!selectedValue} isOpen={isOpen} />
      </SmallDropdownToggle>
      {isOpen && (
        <SmallDropdownMenu>
          {options.map((option) => (
            <SmallDropdownItem
              key={option.value}
              selected={selectedValue === option.value}
              onClick={() => handleSelect(option.value)}
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
