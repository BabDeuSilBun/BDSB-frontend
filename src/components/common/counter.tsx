'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
import DeleteIcon from '@/components/svg/delete';

const CounterContainer = styled(HStack)`
  width: auto;
  border: 1px solid var(--gray300);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
`;

interface CounterProps {
  value: number;
  minValue?: number;
  onValueChange: (newValue: number) => void;
  disableDecrementCondition?: (value: number) => boolean;
}

const Counter: React.FC<CounterProps> = ({
  value,
  minValue = 0,
  onValueChange,
  disableDecrementCondition = (value) => value <= minValue,
}) => {
  const { getInputProps, getIncrementButtonProps } = useNumberInput({
    step: 1,
    value: value,
    min: minValue,
    onChange: (valString, valNumber) => onValueChange(valNumber),
  });

  const inc = getIncrementButtonProps();
  
  const handleDecrement = () => {
    if (value > minValue) {
      onValueChange(value - 1);
    }
  };

  const inputProps = getInputProps();

  return (
    <CounterContainer spacing={0}>
      <Button
        size="sm"
        onClick={handleDecrement}
        disabled={disableDecrementCondition(value)}
        sx={{
          bg: "transparent",
          margin: "0 !important",
          padding: "0 !important",
          width: "40px !important",
          height: "40px !important",
          color: disableDecrementCondition(value) ? "var(--gray300)" : "var(--text)",
          fontSize: "var(--font-size-xxl)",
          fontWeight: "var(--font-regular)",
          borderRadius: "0",
          cursor: disableDecrementCondition(value) ? "not-allowed" : "pointer",
          _hover: { 
            bg: disableDecrementCondition(value) ? "transparent" : "var(--gray200)", 
          },
          _disabled: { 
            bg: "transparent", 
            color: "var(--gray300)", 
            cursor: "not-allowed" 
          },
        }}
      >
        {value === 1 ? (
          <DeleteIcon color="var(--gray300)" width={24} height={24} />
        ) : (
          '-'
        )}
      </Button>

      <Input
        {...inputProps}
        size="sm"
        variant="unstyled"
        sx={{
          margin: "0 !important",
          padding: "0 !important",
          width: "45px !important",
          height: "40px !important",
          boxSizing: "border-box !important",
          textAlign: "center",
          fontSize: "var(--font-size-md) !important",
          fontWeight: "var(--font-regular) !important",
          color: "var(--text)",
          borderTop: "none !important",
          borderBottom: "none !important",
          borderLeft: "1px solid var(--gray300) !important",
          borderRight: "1px solid var(--gray300) !important",
          borderRadius: "0 !important",
          _focus: { 
            fontWeight:"var(--font-semi-bold) !important",
            margin: "0 !important",
            padding: "0 !important"
          },
        }}
      />

      <Button
        {...inc}
        size="sm"
        sx={{
          margin: "0 !important",
          padding: "0 !important",
          width: "40px !important",
          height: "40px !important",
          bg: "transparent",
          color: "var(--text)",
          fontSize: "var(--font-size-xxl)",
          fontWeight: "var(--font-regular)",
          borderRadius: "0",
          _hover: { bg: "var(--gray200)" },
        }}
      >
        +
      </Button>
    </CounterContainer>
  );
};

export default Counter;
