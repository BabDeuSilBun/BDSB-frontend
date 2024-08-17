'use client';

import styled from 'styled-components';
import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';

const CounterContainer = styled(HStack)`
  width: 100%;
`;

const Counter = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 10,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <CounterContainer>
      <Button
        size="sm"
        {...dec}
        sx={{
          bg: "var(--primary)",
          color: "var(--background)",
          fontSize: "var(--font-size-md)",
          _hover: { bg: "var(--purple500)" },
        }}
      >
        -
      </Button>
      <Input
        {...input}
        size="sm"
        variant="outline"
        sx={{
          textAlign: "center",
          fontSize: "var(--font-size-md)",
          color: "var(--text)",
          border: "1px solid var(--gray200)",
          _focus: { boxShadow: "0 0 0 1px var(--primary)" },
          placeholderTextColor: "var(--gray300)",
        }}
      />
      <Button
        {...inc}
        size="sm"
        sx={{
          bg: "var(--primary)",
          color: "var(--background)",
          fontSize: "var(--font-size-md)",
          _hover: { bg: "var(--purple500)" },
        }}
      >
        +
      </Button>
    </CounterContainer>
  );
};

export default Counter;
