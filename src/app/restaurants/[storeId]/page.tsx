'use client';

import { useEffect, useRef, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getMenuInfo, getMenuList } from '@/services/menuService';
import { useCartStore } from '@/state/cartStore';
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
`;

const MenuItemContainer = styled.div`
  padding-bottom: 120px;
`;

const StorePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { storeId } = useParams();

  const { cartQuantity, addToCart } = useCartStore();

  // State hooks
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<{
    menuId: number;
    name: string;
    description: string;
    image: string;
  } | null>(null);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);

  // Refs for IntersectionObserver
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Effect to handle header transparency based on carousel visibility
  useEffect(() => {
    const checkRef = () => {
      if (carouselRef.current) {
        const handleHeaderIntersect = ([
          entry,
        ]: IntersectionObserverEntry[]) => {
          setIsHeaderTransparent(entry.isIntersecting);
        };

        const headerObserver = new IntersectionObserver(handleHeaderIntersect, {
          threshold: 0.5,
        });

        headerObserver.observe(carouselRef.current);

        return () => {
          headerObserver.disconnect();
        };
      }
      setTimeout(checkRef, 100);
    };

    checkRef();
  }, []);

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
      const nextPageNumber = lastPage.pageable?.pageNumber ?? -1;
      return lastPage.last ? undefined : nextPageNumber + 1;
    },
    initialPageParam: 0,
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

    // Capture the current value of lastElementRef.current
    const currentLastElementRef = lastElementRef.current;

    // Observe the last element
    if (currentLastElementRef) {
      observer.current.observe(currentLastElementRef);
    }

    // Cleanup function to unobserve the last element
    return () => {
      if (observer.current && currentLastElementRef) {
        observer.current.unobserve(currentLastElementRef);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  // Fetch selected menu information when modal is opened
  useQuery({
    queryKey: ['menuInfo', storeId, selectedMenu?.menuId],
    queryFn: () => getMenuInfo(Number(storeId), Number(selectedMenu?.menuId)),
    enabled: !!selectedMenu?.menuId,
  });

  // Function to handle adding items to the cart
  const handleAddToCart = () => {
    addToCart(1);
    closeModal();
  };

  // Modal handlers
  const openModal = (
    modalName: string,
    menuItem?: {
      menuId: number;
      name: string;
      description: string;
      image: string;
    },
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

  const onButtonClick1 = () => {
    if (context === 'leaderBefore') {
      router.push(`/teamOrderSetting/${storeId}`);
    } else if (context === 'leaderAfter' || context === 'participant') {
      const meetingId = searchParams.get('meetingId') || 'temporary-meeting-id'; // Use temporary meetingId if not available
      if (!meetingId) {
        console.error('No meetingId found');
      } else {
        router.push(`/cart/${meetingId}?storeId=${storeId}`);
      }
    }
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
          iconColor={isHeaderTransparent ? 'white' : 'black'}
          $isTransparent={isHeaderTransparent}
        />
      </HeaderContainer>
      <Carousel images={store.images} ref={carouselRef} />
      <StoreInfo store={store} onInfoButtonClick={handleInfoButtonClick} />

      {/* Context-specific code */}
      {context &&
        ['leaderBefore', 'leaderAfter', 'participant'].includes(context) && (
          <div>
            <MenuItemContainer>
              {menus?.pages.map((page, pageIndex) =>
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
                      onClick={() => openModal(`${context}Order`, menuItem)}
                    />
                  </div>
                )),
              )}
            </MenuItemContainer>
            <Footer
              type="button"
              buttonText={
                context === 'participant' || context === 'leaderAfter'
                  ? '장바구니로 이동'
                  : '모임 만들기'
              }
              onButtonClick={onButtonClick1}
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
          context={
            context === 'leaderBefore' ||
            context === 'leaderAfter' ||
            context === 'participant'
              ? context
              : undefined
          }
          onButtonClick1={handleAddToCart} // Call handleAddToCart on "공동메뉴" or "개별메뉴" click
          onButtonClick2={context === 'leaderAfter' ? handleAddToCart : closeModal} // Call handleAddToCart only in 'leaderAfter', otherwise closeModal
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default StorePage;
