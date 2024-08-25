'use client';

import { Button } from '@chakra-ui/react';

import InfoIcon from '@/components/svg/info';

interface InfoButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outline"
      fontSize="var(--font-size-md)"
      fontWeight="var(--font-regular)"
      leftIcon={<InfoIcon width={20} height={20} />}
      aria-label="Info"
      color="--text"
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
        padding: '0.3rem var(--spacing-lg) 0.3rem var(--spacing-md)',
        borderWidth: '1.3px',
      }}
      onClick={onClick}
    >
      정보
    </Button>
  );
};

export default InfoButton;
