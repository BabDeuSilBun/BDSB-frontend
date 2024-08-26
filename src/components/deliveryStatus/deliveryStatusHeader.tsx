'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import ExitIcon from '@/components/svg/exit';
import RefreshIcon from '@/components/svg/refresh';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  align-items: center;
  position: fixed;
  z-index: 1000;
  height: 60px;
  width: 100%;
  padding: 1.5rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DeliveryStatusHeader = () => {
  const router = useRouter();

  const handleExitClick = () => {
    router.push('/');
  };

  const handleRefreshClick = () => {
    router.refresh();
  };

  return (
    <HeaderContainer>
      <Flex>
        <button type="button" onClick={handleExitClick}>
          <ExitIcon />
        </button>
      </Flex>
      <Flex>
        <button type="button" onClick={handleRefreshClick}>
          <RefreshIcon />
        </button>
      </Flex>
    </HeaderContainer>
  );
};

export default DeliveryStatusHeader;
