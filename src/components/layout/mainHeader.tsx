'use client';

import { useEffect, useState } from 'react';

import { Portal, useDisclosure } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import HamburgerBtn from '../common/hamburgerBtn';

import HeaderDrawer from './headerDrawer';

import ChatIcon from '@/components/svg/chat';
import SearchIcon from '@/components/svg/search';

const HeaderContainer = styled.header`
  background-color: var(--background);
  position: fixed;
  z-index: 1000;
  width: inherit;
  box-shadow: 0px 5px 5px var(--shadow);
  padding: 0 1rem;
`;

const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Campus = styled.select`
color: var(--gray500)
  padding: 0.4rem 2rem 0.4rem 0rem;
  margin-left: 1.5rem;
  border: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--font-size-lg);
  font-weight: var(--font-semi-bold);
`;

const Chat = styled.div`
  margin-right: 0.4rem;
`;

const MenuButton = styled.button<{ selected: boolean }>`
  padding: 0.6rem;
  border: none;
  border-bottom: 0.4rem solid
    ${(props) => (props.selected ? 'var(--purple200)' : 'transparent')};
  font-weight: ${(props) =>
    props.selected ? 'var(--font-semi-bold)' : 'var(--font-regular)'};
  transition: border-bottom-color 0.5s ease-out;
`;

const PortalButtonWrapper = styled.div`
  position: fixed;
  top: 1.4rem;
  left: 1rem;
  z-index: 2000;
`;

const MainHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMenu, setSelectedMenu] = useState<string>('teamOrder');
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    const menu = searchParams.get('menu');
    if (menu) {
      setSelectedMenu(menu);
    }
  }, [searchParams]);

  const handleChatButtonClick = () => {
    router.push('/chat');
  };

  const handleSearchButtonClick = () => {
    router.push(`/search/${selectedMenu}`);
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    router.push(`/?menu=${menu}`);
  };

  return (
    <>
      <HeaderContainer>
        <UpperContainer>
          <HeaderDrawer onToggle={onToggle} $isOpen={isOpen} />
          <Campus name="" id="">
            <option value="first">1 캠퍼스</option>
            <option value="second">2 캠퍼스</option>
          </Campus>
          <Chat onClick={handleChatButtonClick}>
            <ChatIcon color="var(--gray500)" width={24} height={24} />
          </Chat>
          <button onClick={handleSearchButtonClick}>
            <SearchIcon color="var(--gray500)" width={24} height={24} />
          </button>
        </UpperContainer>
        <div>
          <MenuButton
            selected={selectedMenu === 'teamOrder'}
            onClick={() => handleMenuClick('teamOrder')}
          >
            모집 중
          </MenuButton>
          <MenuButton
            selected={selectedMenu === 'restaurant'}
            onClick={() => handleMenuClick('restaurant')}
          >
            맛집 탐색
          </MenuButton>
        </div>
      </HeaderContainer>
      <Portal>
        <PortalButtonWrapper>
          <HamburgerBtn onToggle={onToggle} $isOpen={isOpen} />
        </PortalButtonWrapper>
      </Portal>
    </>
  );
};

export default MainHeader;
