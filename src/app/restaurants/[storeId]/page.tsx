'use client';

import { useEffect, useRef, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Loading from '@/app/loading';
import Modal from '@/components/common/modal';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import MenuItem from '@/components/listItems/menuItem';
import Carousel from '@/components/stores/carousel';
import StoreInfo from '@/components/stores/storeInfo';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getHolidays } from '@/services/holidayService';
import { getMenuInfo, getMenuList } from '@/services/menuService';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getStoreImages } from '@/services/storeImageService';
import { useCartStore } from '@/state/cartStore';

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

  // Fetch store images with pagination
  const {
    data: storeImages,
    fetchNextPage: fetchNextImagesPage,
    hasNextPage: hasNextImagesPage,
    isFetchingNextPage: isFetchingNextImagesPage,
    isLoading: isLoadingImages,
    isError: isErrorImages,
  } = useInfiniteQuery({
    queryKey: ['storeImages', storeId],
    queryFn: ({ pageParam = 0 }) =>
      getStoreImages({ storeId: Number(storeId), page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPageNumber = lastPage.pageable?.pageNumber ?? -1;
      return lastPage.last ? undefined : nextPageNumber + 1;
    },
    initialPageParam: 0,
  });

  const lastImageRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage: hasNextImagesPage,
    isFetchingNextPage: isFetchingNextImagesPage,
    fetchNextPage: fetchNextImagesPage,
  });

  // Fetch holiday data with pagination
  const {
    data: holidaysData,
    fetchNextPage: fetchNextHolidaysPage,
    hasNextPage: hasNextHolidaysPage,
    isFetchingNextPage: isFetchingNextHolidaysPage,
    isLoading: isLoadingHolidays,
    isError: isErrorHolidays,
  } = useInfiniteQuery({
    queryKey: ['holidays', storeId],
    queryFn: ({ pageParam = 0 }) =>
      getHolidays({ storeId: Number(storeId), page: pageParam, size: 10 }),
    getNextPageParam: (lastPage) => {
      const nextPageNumber = lastPage.pageable?.pageNumber ?? -1;
      return lastPage.last ? undefined : nextPageNumber + 1;
    },
    initialPageParam: 0,
  });

  // Attach infinite scroll observer to the last holiday element
  const lastHolidayElementRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage: hasNextHolidaysPage,
    isFetchingNextPage: isFetchingNextHolidaysPage,
    fetchNextPage: fetchNextHolidaysPage,
  });

  const allHolidays = holidaysData?.pages.flatMap((page) => page.content) || [];
  const dayOfWeekString = allHolidays
    .map((holiday) => holiday.dayOfWeek)
    .join(', ');

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
  console.log('Menus Data:', menus);

  // Handle infinite scrolling
  const lastElementRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // Fetch selected menu information when modal is opened
  useQuery({
    queryKey: ['menuInfo', storeId, selectedMenu?.menuId],
    queryFn: () => getMenuInfo(Number(storeId), Number(selectedMenu?.menuId)),
    enabled: !!selectedMenu?.menuId,
  });

  // Function to handle adding items to the cart
  const handleAddToCart = (type: 'individual' | 'team') => {
    if (selectedMenu) {
      addToCart({
        menuId: selectedMenu.menuId,
        quantity: 1,
        storeId: String(storeId),
        type,
        purchaseId: 0,
        meetingId: 0,
      });
      closeModal();
    }
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
    if (context === 'leaderbefore') {
      router.push(`/teamOrderSetting/${storeId}`);
    } else if (context === 'leaderafter' || context === 'participant') {
      const meetingId = searchParams.get('meetingId') || 'temporary-meeting-id'; // Use temporary meetingId if not available
      if (!meetingId) {
        console.error('No meetingId found');
      } else {
        router.push(`/cart/${meetingId}?storeId=${storeId}&context=${context}`);
      }
    }
  };

  const onModalClick1 = () => {
    if (context === 'leaderbefore') {
      router.push(`/teamOrderSetting/${storeId}`);
    } else if (context === 'leaderafter') {
      handleAddToCart('team');
    } else if (context === 'participant') {
      handleAddToCart('individual');
    }
  };

  useEffect(() => {
    const contextParam = searchParams.get('context');
    setContext(contextParam ? contextParam.toLowerCase() : null);
    console.log('Context:', contextParam);
  }, [searchParams]);

  if (
    isLoadingStore ||
    isLoadingMenus ||
    isLoadingImages ||
    isLoadingHolidays
  ) {
    return <Loading />;
  }

  if (isErrorStore || isErrorImages || isErrorHolidays) {
    return <p>Error loading restaurant, images, or holidays data</p>;
  }

  if (isErrorMenus) {
    console.error('Error fetching menu data:', isErrorMenus);
    return <p>Error loading menu data</p>;
  }

  return (
    <div>
      <HeaderContainer>
        <Header
          buttonLeft="back"
          buttonRight="home"
          buttonRightSecondary="cart"
          $cartQuantity={Math.round(cartQuantity)}
          iconColor={isHeaderTransparent ? 'white' : 'black'}
          $isTransparent={isHeaderTransparent}
          meetingId={searchParams.get('meetingId') || undefined}
          storeId={String(storeId)}
        />
      </HeaderContainer>
      <Carousel
        images={storeImages?.pages.flatMap((page) => page.content) || []}
        ref={carouselRef}
        lastElementRef={lastImageRef}
      />
      <StoreInfo store={store} onInfoButtonClick={handleInfoButtonClick} />

      {/* Context-specific code */}
      {context &&
        ['leaderbefore', 'leaderafter', 'participant'].includes(context) && (
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
                context === 'participant' || context === 'leaderafter'
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
          dayOfWeek={dayOfWeekString || ''}
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
            context === 'leaderbefore' ||
            context === 'leaderafter' ||
            context === 'participant'
              ? context
              : undefined
          }
          onButtonClick1={onModalClick1}
          onButtonClick2={
            context === 'leaderafter'
              ? () => handleAddToCart('individual')
              : closeModal
          }
          onClose={closeModal}
        />
      )}

      {hasNextHolidaysPage && (
        <div ref={lastHolidayElementRef} style={{ height: '1px' }} />
      )}
    </div>
  );
};

export default StorePage;
