'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getMenuInfo } from '@/services/menuService';
import { getMenuList } from '@/services/menuService';
import Loading from '@/app/loading';
import Header from '@/components/layout/header';
import Carousel from '@/components/carousel/carousel';
import CallButton from '@/components/customButton/callButton';
import InfoButton from '@/components/customButton/infoButton';
import InfoBox from '@/components/common/infoBox';
import MenuItem from '@/components/listItems/menuItem';
import Footer from '@/components/layout/footer';
import Modal from '@/components/common/modal';
import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';
import { formatCurrency } from '@/utils/currencyFormatter';

const HeaderContainer = styled.div`
  width: 100vw;
  margin: 0 auto;
  header {
    background-color: transparent;
    box-shadow: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: var(--spacing-sm);
`;

const Title = styled.h1`
  font-size: var(--font-size-xl);
  color: var(--text);
  font-weight: var(--font-semi-bold);
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: var(--spacing-xs) var(--spacing-xs);
  background-color: var(--background);
`;

const InfoRow = styled.div`
  display: flex;
  padding: var(--spacing-xs);
  align-items: flex-start;
  justify-content: space-between;
  font-size: var(--font-size-xs); /* 12px */
`;
const InfoTitle = styled.div`
  flex-basis: 25%;
  font-weight: var(--font-semi-bold);
  text-align: left;
  padding-left: 0;
  color: var(--gray400);
`;

const InfoDescription = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 75%;
  word-wrap: break-word;
  padding-left: 0;
  text-align: left;
  margin-left: var(--spacing-xs);
  color: var(--text);
`;

const InfoBoxWrapper = styled.div`
  justify-content: center;
  padding-top: 0.1rem;
  padding-left: var(--spacing-xs);
`;

const MenuItemContainer = styled.div`
  padding-bottom: 6.875rem;
`;

const StorePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { storeId } = useParams();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<{
    menuId: number;
    name: string;
    description: string;
    imageUrl: string;
  } | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // Fetch store information
  const {
    data: store,
    isLoading: isLoadingStore,
    isError: isErrorStore,
  } = useQuery({
    queryKey: ['storeInfo', storeId],
    queryFn: () => getRestaurantInfo(Number(storeId)),
  });

  // Fetch menu list with pagination
  const {
    data: menus,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingMenus,
    isError: isErrorMenus,
  } = useInfiniteQuery({
    queryKey: ['menuList', storeId],
    queryFn: ({ pageParam = 0 }) =>
      getMenuList({ storeId: Number(storeId), page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable?.pageNumber + 1;
    },
  });

  useEffect(() => {
    if (isFetchingNextPage) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    // Initialize IntersectionObserver
    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    // Observe the last element
    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    // Cleanup function to unobserve the last element
    return () => {
      if (observer.current && lastElementRef.current) {
        observer.current.unobserve(lastElementRef.current);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  // Fetch Menu Information on Modal Open
  const { data: selectedMenuInfo, isLoading: isLoadingMenuInfo } = useQuery({
    queryKey: ['menuInfo', selectedMenu?.menuId],
    queryFn: () => getMenuInfo(Number(storeId), Number(selectedMenu.menuId)),
    enabled: !!selectedMenu?.menuId, // Only fetch when menuId is available
  });

  // Modal and context handling
  const openModal = (
    modalName: string,
    menuItem?: { name: string; description: string; imageUrl: string },
  ) => {
    setActiveModal(modalName);
    if (menuItem) {
      setSelectedMenu(menuItem);
    } else {
      setSelectedMenu(null);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedMenu(null);
  };

  const handleInfoButtonClick = () => {
    setActiveModal('infoModal');
  };

  useEffect(() => {
    const contextParam = searchParams.get('context');
    setContext(contextParam);
  }, [searchParams]);

  if (isLoadingStore || isLoadingMenus) {
    return <Loading />;
  }

  if (isErrorStore) {
    return <p>Error loading restaurant data</p>;
  }

  if (isErrorMenus) {
    return <p>Error loading menu data</p>;
  }

  return (
    <div>
      <HeaderContainer>
        <Header
          buttonLeft="back"
          buttonRight="home"
          buttonRightSecondary="cart"
          iconColor="white"
        />
      </HeaderContainer>
      <Carousel images={store.images} />
      <TitleContainer>
        <Title>{store.name}</Title>
      </TitleContainer>
      <ButtonContainer>
        <CallButton phoneNumber={store.phoneNumber || 'N/A'} />
        <InfoButton onClick={handleInfoButtonClick} />
      </ButtonContainer>
      <Divider
        orientation="horizontal"
        sx={{
          borderWidth: '1px',
          borderColor: 'var(--gray100)',
        }}
      />
      <InfoContainer>
        <InfoRow>
          <InfoTitle>배달비</InfoTitle>
          <InfoDescription>
            {formatCurrency(store.deliveryPrice)}
          </InfoDescription>
        </InfoRow>
        <InfoRow>
          <InfoTitle>배달 시간</InfoTitle>
          <InfoDescription>
            {store.deliveryTimeRange}
            <InfoBoxWrapper>
              <InfoBox
                textItems={[
                  {
                    text: '평균 도착 시간으로, 실제 도착 시간과 차이가 생길 수 있어요.',
                    $textStyle: 'CenteredText',
                  },
                ]}
                width="10rem"
                showIcon={true}
              />
            </InfoBoxWrapper>
          </InfoDescription>
        </InfoRow>
        <InfoRow>
          <InfoTitle>최소주문금액</InfoTitle>
          <InfoDescription>
            {formatCurrency(store.minPurchasePrice)}
          </InfoDescription>
        </InfoRow>
      </InfoContainer>
      <Divider
        sx={{
          borderWidth: '5px',
          borderColor: 'var(--gray100)',
        }}
      />

      {/* Context-specific code */}
      <div>
        {context === 'leaderBefore' && (
          <div>
            <MenuItemContainer>
              {menus.pages.map((page, pageIndex) =>
                page.content.map((menuItem, index) => (
                  <div
                    key={menuItem.menuId}
                    ref={
                      pageIndex === menus.pages.length - 1 &&
                      index === page.content.length - 1 &&
                      hasNextPage
                        ? lastElementRef
                        : null
                    }
                  >
                    <MenuItem
                      menuName={menuItem.name}
                      price={menuItem.price}
                      imageUrl={menuItem.image}
                      hasDivider={index !== page.content.length - 1}
                      onClick={() => openModal('startModal', menuItem)}
                    />
                  </div>
                )),
              )}
            </MenuItemContainer>
            <Footer type="button" buttonText="모임 만들기" />
          </div>
        )}

        {context === 'leaderAfter' && (
          <div>
            <MenuItemContainer>
              {menus.pages.map((page, pageIndex) =>
                page.content.map((menuItem, index) => (
                  <div
                    key={menuItem.menuId}
                    ref={
                      pageIndex === menus.pages.length - 1 &&
                      index === page.content.length - 1 &&
                      hasNextPage
                        ? lastElementRef
                        : null
                    }
                  >
                    <MenuItem
                      menuName={menuItem.name}
                      price={menuItem.price}
                      imageUrl={menuItem.image}
                      hasDivider={index !== page.content.length - 1}
                      onClick={() => openModal('leaderOder', menuItem)}
                    />
                  </div>
                )),
              )}
            </MenuItemContainer>
            <Footer type="button" buttonText="모임 만들기" />
          </div>
        )}

        {context === 'participant' && (
          <div>
            <MenuItemContainer>
              {menus.pages.map((page, pageIndex) =>
                page.content.map((menuItem, index) => (
                  <div
                    key={menuItem.menuId}
                    ref={
                      pageIndex === menus.pages.length - 1 &&
                      index === page.content.length - 1 &&
                      hasNextPage
                        ? lastElementRef
                        : null
                    }
                  >
                    <MenuItem
                      menuName={menuItem.name}
                      price={menuItem.price}
                      imageUrl={menuItem.image}
                      hasDivider={index !== page.content.length - 1}
                      onClick={() => openModal('participantOder', menuItem)}
                    />
                  </div>
                )),
              )}
            </MenuItemContainer>
            <Footer type="button" buttonText="장바구니로 이동" />
          </div>
        )}
      </div>

      {/* Modal handling */}
      {activeModal === 'infoModal' && (
        <Modal
          type="info"
          title1={store.name}
          description={store.description}
          address1={store.address.streetAddress}
          address2={store.address.detailAddress}
          openTime={store.openTime}
          closeTime={store.closeTime}
          dayOfWeek={store.dayOfWeek}
          buttonText="닫기"
          onButtonClick3={closeModal}
          onClose={closeModal}
        />
      )}

      {activeModal === 'startModal' && selectedMenu && (
        <Modal
          type="image"
          imageUrl={selectedMenu.image}
          title1={selectedMenu.name}
          description={selectedMenu.description}
          buttonText1="모임 만들기"
          buttonText2="닫기"
          onButtonClick1={() => console.log('Start team order')}
          onButtonClick2={closeModal}
          onClose={closeModal}
        />
      )}

      {activeModal === 'leaderOrder' && (
        <Modal
          type="image"
          imageUrl={selectedMenu.image}
          title1={selectedMenu.name}
          description={selectedMenu.description}
          buttonText1="공통메뉴"
          buttonText2="개별메뉴"
          onButtonClick1={() => console.log('Team menu')}
          onButtonClick2={() => console.log('Individual menu')}
          onClose={closeModal}
        />
      )}

      {activeModal === 'participantOrder' && (
        <Modal
          type="image"
          imageUrl={selectedMenu.image}
          title1={selectedMenu.name}
          description={selectedMenu.description}
          buttonText1="개별메뉴"
          buttonText2="닫기"
          onButtonClick1={() => console.log('Participant order')}
          onButtonClick2={closeModal}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default StorePage;
