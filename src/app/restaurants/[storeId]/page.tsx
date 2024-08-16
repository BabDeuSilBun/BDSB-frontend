'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getMenuInfo, getMenuList } from '@/services/menuService';
import Loading from '@/app/loading';
import Header from '@/components/layout/header';
import Carousel from '@/components/stores/carousel';
import StoreInfo from '@/components/stores/storeInfo';
import MenuItem from '@/components/listItems/menuItem';
import Footer from '@/components/layout/footer';
import Modal from '@/components/common/modal';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100vw;
  margin: 0 auto;
  header {
    background-color: transparent;
    box-shadow: none;
  }
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
    image: string;
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

  // Handle infinite scrolling
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

  // Fetch selected menu information when modal is opened
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
      <StoreInfo 
        store={store} 
        onInfoButtonClick={() => setActiveModal('infoModal')} 
      />

      {/* Context-specific code */}
      {['leaderBefore', 'leaderAfter', 'participant'].includes(context) && (
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
                    onClick={() => openModal(context + 'Order', menuItem)}
                  />
                </div>
              )),
            )}
          </MenuItemContainer>
          <Footer
            type="button"
            buttonText={
              context === 'participant'
                ? '장바구니로 이동'
                : '모임 만들기'
            }
          />
        </div>
      )}

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

      {activeModal && selectedMenu && (
        <Modal
          type="image"
          imageUrl={selectedMenu.image}
          title1={selectedMenu.name}
          description={selectedMenu.description}
          context={context}
          onButtonClick1={() => console.log('Button 1 clicked')}
          onButtonClick2={closeModal}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default StorePage;