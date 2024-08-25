'use client';

import styled from 'styled-components';
import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';

import DeleteIcon from '@/components/svg/delete';

const CounterContainer = styled(HStack)<{ size: 'small' | 'regular' }>`
  width: auto;
  border: 1px solid var(--gray300);
  border-radius: ${({ size }) =>
    size === 'small' ? 'var(--border-radius-md)' : 'var(--border-radius-lg)'};
  overflow: hidden;
`;

interface CounterProps {
  value: number;
  minValue?: number;
  onValueChange: (newValue: number) => void;
  disableDecrementCondition?: (value: number) => boolean;
  size?: 'small' | 'regular';
}

const Counter: React.FC<CounterProps> = ({
  value,
  minValue = 0,
  onValueChange,
  disableDecrementCondition = (currentValue) => currentValue <= minValue,
  size = 'regular',
}) => {
  const { getInputProps, getIncrementButtonProps } = useNumberInput({
    step: 1,
    value,
    min: minValue,
    onChange: (_valString, valNumber) => onValueChange(valNumber),
  });

  const inc = getIncrementButtonProps();

  const handleDecrement = () => {
    if (value > minValue) {
      onValueChange(value - 1);
    }
  };

  const inputProps = getInputProps();

  return (
    <CounterContainer spacing={0} size={size}>
      <Button
        size={size === 'small' ? 'xs' : 'sm'}
        onClick={handleDecrement}
        disabled={disableDecrementCondition(value)}
        sx={{
          bg: 'transparent',
          margin: '0 !important',
          padding: '0 !important',
          width: size === 'small' ? '30px !important' : '40px !important',
          height: size === 'small' ? '30px !important' : '40px !important',
          color: disableDecrementCondition(value)
            ? 'var(--gray300)'
            : 'var(--text)',
          fontSize:
            size === 'small' ? 'var(--font-size-lg)' : 'var(--font-size-xxl)',
          fontWeight: 'var(--font-regular)',
          borderRadius: '0',
          cursor: disableDecrementCondition(value) ? 'not-allowed' : 'pointer',
          _hover: {
            bg: disableDecrementCondition(value)
              ? 'transparent'
              : 'var(--gray200)',
          },
          _disabled: {
            bg: 'transparent',
            color: 'var(--gray300)',
            cursor: 'not-allowed',
          },
        }}
      >
        {value === 1 ? (
          <DeleteIcon
            color="var(--gray300)"
            width={size === 'small' ? 20 : 24}
            height={size === 'small' ? 20 : 24}
          />
        ) : (
          '-'
        )}
      </Button>

      <Input
        size={size === 'small' ? 'xs' : 'sm'}
        variant="unstyled"
        value={inputProps.value}
        onChange={inputProps.onChange}
        sx={{
          margin: '0 !important',
          padding: '0 !important',
          width: size === 'small' ? '35px !important' : '45px !important',
          height: size === 'small' ? '30px !important' : '40px !important',
          boxSizing: 'border-box !important',
          textAlign: 'center',
          fontSize:
            size === 'small'
              ? 'var(--font-size-sm) !important'
              : 'var(--font-size-md) !important',
          fontWeight: 'var(--font-regular) !important',
          color: 'var(--text)',
          borderTop: 'none !important',
          borderBottom: 'none !important',
          borderLeft: '1px solid var(--gray300) !important',
          borderRight: '1px solid var(--gray300) !important',
          borderRadius: '0 !important',
          _focus: {
            fontWeight: 'var(--font-semi-bold) !important',
            margin: '0 !important',
            padding: '0 !important',
          },
        }}
      />

      <Button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inc}
        size={size === 'small' ? 'xs' : 'sm'}
        sx={{
          margin: '0 !important',
          padding: '0 !important',
          width: size === 'small' ? '30px !important' : '40px !important',
          height: size === 'small' ? '30px !important' : '40px !important',
          bg: 'transparent',
          color: 'var(--text)',
          fontSize:
            size === 'small' ? 'var(--font-size-lg)' : 'var(--font-size-xxl)',
          fontWeight: 'var(--font-regular)',
          borderRadius: '0',
          _hover: { bg: 'var(--gray200)' },
        }}
      >
        +
      </Button>
    </CounterContainer>
  );
};

export default Counter;
