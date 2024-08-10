'use client';

import { Button } from '@chakra-ui/react';
import PhoneIcon from '@/components/svg/phone';

export default function CallButton({ phoneNumber }) {
  return (
    <Button
      as="a" // Use the button as an anchor tag
      href={`tel:${phoneNumber}`} // Tel link with the phone number
      variant="outline"
      fontSize="var(--font-size-md)"
      fontWeight="var(--font-regular)"
      leftIcon={<PhoneIcon width={20} height={20} />}
      aria-label="Call"
      color="black"
      borderColor="var(--gray300)"
      _hover={{
        bg: 'var(--gray100)',
        color: 'black',
      }}
      _active={{
        bg: 'var(--gray100)',
        color: 'black',
      }}
      sx={{
        padding: 'var(--spacing-xs) var(--spacing-lg) var(--spacing-xs) var(--spacing-md)',
        borderWidth: '1.3px',
      }}
    >
      전화
    </Button>
  );
}
