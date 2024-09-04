'use client';

import styled from 'styled-components';

const DescriptionWrapper = styled.div`
  width: 100%;
  text-align: end;
`;

const WordCount = styled.small`
  color: var(--gray400);
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--gray300);
  resize: vertical;
`;

interface TextAreaProps {
  placeholder: string;
  charLimit?: number;
  value: string;
  onValueChange: (newValue: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  charLimit = 100,
  value,
  onValueChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    onValueChange(inputText.slice(0, charLimit));
  };

  return (
    <DescriptionWrapper>
      <StyledTextarea
        placeholder={placeholder}
        rows={4}
        value={value}
        onChange={handleChange}
        aria-label="Setting Description"
        aria-describedby="word-count"
        className="global-textarea"
      />
      <WordCount id="word-count">
        {charLimit - value.length} / {charLimit} 자 남음
      </WordCount>
    </DescriptionWrapper>
  );
};

export default TextArea;
