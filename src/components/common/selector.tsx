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
  width: 180px;
`;

const DropdownToggle = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: ${({ selected }) => (selected ? 'var(--primary)' : 'var(--text)')};
  border: 1.5px solid
    ${({ selected }) => (selected ? 'var(--primary)' : 'var(--gray200)')};
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  background-color: var(--background);
  transition:
    color 0.3s ease,
    border-color 0.3s ease;
`;

const Arrow = styled.span<{ selected: boolean }>`
  border: solid
    ${({ selected }) => (selected ? 'var(--primary)' : 'var(--text)')};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: translateY(-2px) rotate(45deg);
  transition: border-color 0.3s ease;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  right: 0;
  border-radius: var(--border-radius-lg);
  border: 1.5px solid var(--gray200);
  background-color: var(--background);
  z-index: 1000;
  padding: var(--spacing-xs);
  transition: 0.3s ease;
`;

const DropdownItem = styled.div<{ selected: boolean }>`
  padding: var(--spacing-xs);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: ${({ selected }) => (selected ? 'var(--primary)' : 'var(--text)')};

  &:hover {
    background-color: var(--gray100);
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
        <Arrow selected={!!selectedValue} />
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
          <DropdownItem
            selected={selectedValue === null}
            onClick={() => handleSelect(null)}
          >
            All
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default CustomDropdown;
