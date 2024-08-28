'use client';

import Image from 'next/image';

import styled from 'styled-components';

const MeetingInfoWrapper = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;

  span {
    color: var(--gray400);
    font-size: var(--font-size-xs);
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  width: 42px;
  height: 42px;
  background: var(--primary);
  position: relative;
`;

const EvaluateBox = styled.div`
  margin: 2rem 0rem;
  font-size: var(--font-size-lg);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h2 {
    font-weight: var(--font-semi-bold);
    margin-bottom: 1.2rem;
  }
`;

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;

  &:before {
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
    border: 2px solid var(--gray300);
    border-radius: 0.35rem;
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(1%, -50%);
    display: block;
    opacity: 0;
    height: 1.25rem;
    width: 1.25rem;
    background-image: url('/check.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-color: var(--primary);
    border-radius: 0.35rem;
  }
`;

const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${CheckboxWrapper}:after {
    opacity: 1;
  }
`;

const StyledP = styled.p`
  margin-left: 0.5rem;
`;

export const MeetingInfo = ({
  imageSrc,
  content,
}: {
  imageSrc: string;
  content: string;
}) => (
  <MeetingInfoWrapper>
    <ImageWrapper>
      <Image
        src={imageSrc}
        alt="Meeting Image"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </ImageWrapper>
    <div>
      <span>모임 내역</span>
      <p>{content}</p>
    </div>
  </MeetingInfoWrapper>
);

const LabelWithInput = ({
  option,
  handleChange,
  checked,
}: {
  option: { id: number; label: string };
  handleChange: (id: number) => void;
  checked: boolean;
}) => (
  <>
    <StyledLabel htmlFor={option.label}>
      <StyledInput
        type="checkbox"
        id={option.label}
        value={option.id}
        onChange={() => handleChange(option.id)}
        checked={checked}
        aria-label={option.label}
      />
      <CheckboxWrapper />
      <StyledP>{option.label}</StyledP>
    </StyledLabel>
  </>
);

export const EvaluateSection = ({
  title,
  options,
  selectedOptions,
  handleChange,
}: {
  title: string;
  options: { id: number; label: string }[];
  selectedOptions: { id: number; label: string }[];
  handleChange: (id: number) => void;
}) => {
  const selectedOptionIds = selectedOptions.map((option) => option.id);

  return (
    <EvaluateBox>
      <h2>{title}</h2>
      {options.map((option) => (
        <LabelWithInput
          key={option.id}
          option={option}
          handleChange={handleChange}
          checked={selectedOptionIds.includes(option.id)}
        />
      ))}
    </EvaluateBox>
  );
};
