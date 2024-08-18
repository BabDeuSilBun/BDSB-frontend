'use client';

import React from 'react';
import styled from 'styled-components';

const DescriptionWrapper = styled.div`
  width: 100%;
  text-align: end;
`;

const WordCount = styled.small`
  display: block;
  color: var(--gray400);
`;

interface SettingDescriptionProps {
  placeholder: string;
  charLimit?: number;
  value: string;
  onValueChange: (newValue: string) => void;
}

const SettingDescription: React.FC<SettingDescriptionProps> = ({
  placeholder,
  charLimit = 100,
  value,
  onValueChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    if (inputText.length <= charLimit) {
      onValueChange(inputText);
    } else {
      onValueChange(inputText.slice(0, charLimit));
    }
  };

  return (
    <DescriptionWrapper>
      <textarea
        placeholder={placeholder}
        rows="4"
        value={value}
        onChange={handleChange}
        className="global-textarea"
      />
      <WordCount>{charLimit - value.length} / {charLimit}자 남음</WordCount>
    </DescriptionWrapper>
  );
};

export default SettingDescription;
