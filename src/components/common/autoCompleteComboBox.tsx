import { useState, useEffect } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 10rem; /* 최대 높이, 스크롤 영역 */
  overflow-y: auto; /* 스크롤 가능하게 */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1000; /* 입력 필드 위에 표시되도록 */
  margin-top: 0.5rem;
  padding: 0;
  list-style: none;
`;

const SuggestionItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface AutoCompleteComboBoxProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  placeholder?: string;
  onSelect: (id: number) => void;
  suggestions?: { id: number; display: string }[] | [];
}

const AutoCompleteComboBox: React.FC<AutoCompleteComboBoxProps> = ({
  inputValue,
  setInputValue,
  placeholder = '검색어를 입력하세요',
  onSelect,
  suggestions = [],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsDropdownOpen(suggestions.length > 0);
  }, [suggestions]);

  const handleSelectSuggestion = (id: number) => {
    setInputValue('');
    setIsDropdownOpen(false);
    onSelect(id);
  };

  return (
    <DropdownContainer>
      <InputField
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      {isDropdownOpen && (
        <SuggestionsList>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion.id}
              onClick={() => handleSelectSuggestion(suggestion.id)}
            >
              {suggestion.display}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </DropdownContainer>
  );
};

export default AutoCompleteComboBox;
