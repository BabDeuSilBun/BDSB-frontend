'use client';

import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import ChatIcon from '@/components/svg/chat';
import SearchIcon from '@/components/svg/search';
import HamburgerIcon from '@/components/svg/hamburger';

const HeaderContainer = styled.header`
  background-color: var(--background);
  position: fixed;
  z-index: 1000;
  width: inherit;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  padding: 0.4rem 1rem 0 1rem;
`;

const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Campus = styled.select`
color: var(--gray500)
  padding: 0.4rem;
  padding-right: 2rem;
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
  margin-top: 0.3rem;
  padding: 0.6rem;
  border: none;
  border-bottom: 0.4rem solid
    ${(props) => (props.selected ? 'var(--purple200)' : 'transparent')};
  transition: border-bottom-color 0.5s ease-out;
`;

const MainHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMenu, setSelectedMenu] = useState<string>('teamOrder');

  useEffect(() => {
    const menu = searchParams.get('menu');
    if (menu) {
      setSelectedMenu(menu);
    }
  }, [searchParams]);

  const handleToggleButtonClick = () => {
    console.log('Hamburger button clicked');
  };

  const handleChatButtonClick = () => {
    router.push('/chat');
  };

  const handleSearchButtonClick = () => {
    console.log('Search button clicked');
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    router.push(`/?menu=${menu}`);
  };

  return (
    <HeaderContainer>
      <UpperContainer>
        <button onClick={handleToggleButtonClick}>
          <HamburgerIcon color="var(--gray500)" width={24} height={24} />
        </button>
        <Campus name="" id="">
          <option value="first">
            1 캠퍼스1 캠퍼스1 캠퍼스1 캠퍼스1 캠퍼스
          </option>
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
  );
};

export default MainHeader;
