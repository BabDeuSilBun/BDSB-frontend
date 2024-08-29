'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Portal, useDisclosure } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import HeaderDrawer from './headerDrawer';
import HamburgerBtn from '../common/hamburgerBtn';

import ChatIcon from '@/components/svg/chat';
import SearchIcon from '@/components/svg/search';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getCampusList, getMyData } from '@/services/myDataService';

const HeaderContainer = styled.header`
  background-color: var(--background);
  position: fixed;
  z-index: 1000;
  width: inherit;
  box-shadow: 0px 5px 5px var(--shadow);
`;

const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const CampusDropdown = styled.div`
  position: relative;
  margin-left: 1.7rem;

  h1 {
    display: inline-block;
    margin-right: 1rem;
  }
`;

const SelectedCampus = styled.div`
  color: var(--gray500);
  padding: 0.4rem 2rem 0.4rem 0;
  border: none;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--font-size-lg);
  font-weight: var(--font-semi-bold);
`;

const CampusList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 9rem;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  background-color: var(--background);
  border: 1px solid var(--gray200);
  list-style: none;
  z-index: 1000;
`;

const CampusItem = styled.li<{ selected: boolean }>`
  padding: 0.4rem;
  background-color: ${({ selected }) =>
    selected ? 'var(--gray100)' : 'transparent'};
  cursor: pointer;

  &:hover {
    background-color: var(--gray100);
  }
`;

const Chat = styled.div`
  margin: -0.5rem 0rem -0.5rem 0rem;
  padding: 0.5rem;
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

const ToggleBtn = styled.button.attrs({
  className: 'icon',
})<{ $isOpen?: boolean }>`
  word-spacing: 3px;
  padding: 1rem;
  margin: -1rem;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(270deg)' : 'rotate(90deg)')};
  border: none;
  background: transparent;
`;

const MainHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMenu, setSelectedMenu] = useState<string>('teamOrder');
  const { isOpen, onToggle } = useDisclosure();
  const [selectedCampus, setSelectedCampus] = useState<string>('');
  const [selectedSchoolId, setSelectedSchoolId] = useState<number>();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['campusList'],
    queryFn: ({ pageParam = 0 }) => getCampusList({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
    enabled: true,
  });

  const { data: myData } = useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  const lastElementRef = useInfiniteScroll<HTMLLIElement>({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    root: dropdownRef.current,
  });

  useEffect(() => {
    if (data && data.pages) {
      const storedSchoolId = localStorage.getItem('selectedSchoolId');

      if (storedSchoolId) {
        const storedCampus = data.pages
          .flatMap((page) => page.content)
          .find((item) => item.schoolId === Number(storedSchoolId));

        if (storedCampus) {
          setSelectedSchoolId(storedCampus.schoolId);
          setSelectedCampus(storedCampus.campus);
        }
      } else if (myData) {
        const defaultCampus = data.pages
          .flatMap((page) => page.content)
          .find((item) => item.campus === myData.campus);

        if (defaultCampus) {
          setSelectedCampus(defaultCampus.campus);
          setSelectedSchoolId(defaultCampus.schoolId);
          if (!isNaN(Number(defaultCampus.schoolId))) {
            localStorage.setItem(
              'selectedSchoolId',
              defaultCampus.schoolId.toString(),
            );
          }
        }
      }
    }
  }, [myData, data]);

  useEffect(() => {
    const menu = searchParams.get('menu');
    if (menu) setSelectedMenu(menu);
  }, [searchParams]);

  const handleChatButtonClick = () => {
    router.push('/chat');
  };

  const handleSearchButtonClick = () => {
    router.push(`/search/${selectedMenu}?campus=${selectedSchoolId}`);
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    router.push(`/?menu=${menu}&campus=${selectedSchoolId}`);
  };

  const handleCampusClick = (campus: string, schoolId: number) => {
    setSelectedCampus(campus);
    setSelectedSchoolId(schoolId);
    if (!isNaN(Number(schoolId))) {
      localStorage.setItem('selectedSchoolId', schoolId.toString());
    }
    setIsDropdownOpen(false);
    router.push(`/?menu=${selectedMenu}&campus=${selectedSchoolId}`);
  };

  return (
    <>
      <HeaderContainer>
        <UpperContainer>
          <HeaderDrawer onToggle={onToggle} $isOpen={isOpen} />
          <CampusDropdown>
            <SelectedCampus onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <h1>{`${myData?.school} ${selectedCampus}` || '캠퍼스 선택'}</h1>
              <ToggleBtn $isOpen={isDropdownOpen}>{'>'}</ToggleBtn>
            </SelectedCampus>
            {isDropdownOpen && (
              <CampusList ref={dropdownRef}>
                {status === 'pending' ? (
                  <CampusItem selected={false}>불러오는 중..</CampusItem>
                ) : status === 'error' ? (
                  <CampusItem selected={false}>
                    Error: {error.message}
                  </CampusItem>
                ) : data && data.pages.length > 0 ? (
                  data.pages.map((page) =>
                    page.content.map((item, index) => (
                      <CampusItem
                        key={index}
                        selected={item.campus === selectedCampus}
                        onClick={() =>
                          handleCampusClick(item.campus, item.schoolId)
                        }
                        ref={
                          index === page.content.length - 1
                            ? lastElementRef
                            : null
                        }
                      >
                        {item.school} {item.campus}
                      </CampusItem>
                    )),
                  )
                ) : (
                  <CampusItem selected={false}>
                    주문 가능한 캠퍼스가 없습니다.
                  </CampusItem>
                )}
              </CampusList>
            )}
          </CampusDropdown>
          <Flex flex="1" />
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
