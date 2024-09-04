'use client';

import Cookies from 'js-cookie';
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
  const { cartQuantity, addToCart, clearCart, cartItems } = useCartStore();

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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const handleAddToCart = async (type: 'individual' | 'team') => {
    if (!selectedMenu) return;

    try {
      // Retrieve the JWT token from cookies
      const token = Cookies.get('jwtToken');

      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      const meetingId = searchParams.get('meetingId');
      const payload = {
        menuId: selectedMenu.menuId,
        quantity: 1, // Adjust the quantity as needed
      };

      const apiUrl =
        type === 'individual'
          ? `${backendUrl}api/users/meetings/${meetingId}/individual-purchases`
          : `${backendUrl}api/users/meetings/${meetingId}/team-purchases`;

      console.log(`Submitting ${type} purchase to URL: ${apiUrl}`, payload);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type');

      // Check if the response is an error or not JSON
      if (!response.ok) {
        // Try to get the error message or response text
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(
            errorData.message ||
              `Failed to submit the order. Status: ${response.status}`,
          );
        } else {
          const errorText = await response.text();
          console.error(`Unexpected response format: ${errorText}`);
          throw new Error(
            `Unexpected response format. Status: ${response.status}. Response text: ${errorText}`,
          );
        }
      }

      // Parse the JSON response if the content type is JSON
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Response data:', data);
      }

      // Add item to cart state
      const data = await response.json();
      const purchaseId = data.purchaseId;

      addToCart({
        menuId: selectedMenu.menuId,
        quantity: 1,
        storeId: String(storeId),
        type,
        purchaseId,
        meetingId: Number(meetingId),
      });

      console.log('Successfully submitted purchase and added to cart.');

      // Close modal after successful submission
      closeModal();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to submit purchase:', error.message);
        alert(`Failed to submit purchase: ${error.message}`);
      } else {
        console.error('An unknown error occurred');
        alert('An unknown error occurred. Please try again.');
      }
    }
  };

  const deleteCartItems = async () => {
    try {
      const token = Cookies.get('jwtToken');

      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      // Loop through each cart item and call the appropriate DELETE API
      for (const item of cartItems) {
        const apiUrl =
          item.type === 'individual'
            ? `${backendUrl}api/users/individual-purchases/${item.purchaseId}`
            : `${backendUrl}api/users/team-purchases/${item.purchaseId}`;

        console.log(`Deleting item with purchaseId ${item.purchaseId}`);

        const response = await fetch(apiUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to delete item with purchaseId ${item.purchaseId}: ${errorText}`,
          );
        }

        console.log(
          `Successfully deleted item with purchaseId ${item.purchaseId}`,
        );
      }
    } catch (error) {
      console.error('Failed to delete cart items:', error);
    }
  };

  const onBack = async () => {
    await deleteCartItems();
    clearCart();
    router.back();
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
          onBack={onBack}
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
          onButtonClick1={
            context === 'participant'
              ? async () => {
                  await deleteCartItems();
                  closeModal();
                }
              : onModalClick1
          }
          onButtonClick2={
            context === 'leaderafter'
              ? async () => {
                  await deleteCartItems();
                  closeModal();
                }
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
