'use client';

import { useParams, useSearchParams } from 'next/navigation';
import router from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getTeamOrderInfo } from '@/services/teamOrderService';
import { getRestaurantInfo } from '@/services/restaurantService';
import { useOrderStore } from '@/state/orderStore';
import Loading from '@/app/loading';
import Container from '@/styles/container';
import Header from '@/components/layout/header';
import StoreInfo from '@/components/cart/storeInfo';
import CartItem from '@/components/cart/cartItem';
import Amount from '@/components/cart/amount';
import Footer from '@/components/layout/footer';
import styled from 'styled-components';

const CustomContainer = styled(Container)`
  margin-top: 60px;
  padding: var(--spacing-sm);
  background-color: var(--gray100);
`;

const CartPage = () => {
  // Hooks for navigation and params
  const { meetingId } = useParams();
  const searchParams = useSearchParams();

  // Fetch meeting data to get storeId
  const {
    data: meeting,
    isLoading: isLoadingMeeting,
    isError: isErrorMeeting,
  } = useQuery({
    queryKey: ['meetingInfo', meetingId],
    queryFn: () => getTeamOrderInfo(Number(meetingId)),
  });

  const storeId = searchParams.get('storeId'); // Extract storeId from query params

  const {
    formData: { maxIndividualDeliveryFee },
  } = useOrderStore();

  // Fetch store data based on the storeId from meeting data
  const {
    data: store,
    isLoading: isLoadingStore,
    isError: isErrorStore,
  } = useQuery({
    queryKey: ['storeInfo', meeting?.storeId],
    queryFn: () => getRestaurantInfo(Number(meeting?.storeId)),
    enabled: !!meeting?.storeId,
  })

  const deliveredAddress = useOrderStore(
    (state) => state.formData.deliveredAddress,
  );

  if (isLoadingMeeting || isLoadingStore) {
    return <Loading />;
  }

  if (isErrorMeeting) {
    return <p>Error loading meeting data</p>;
  }

  if (isErrorStore || !store) {
    return <p>Error loading restaurant data</p>;
  }

  const location =
    deliveredAddress.streetAddress || deliveredAddress.detailAddress
      ? `${deliveredAddress.streetAddress} ${deliveredAddress.detailAddress}`
      : '배송지 정보 없음';

  const orderAmount = 60000;
  const maxDeliveryFee = 5000;
  const minCommonMenuDiscount = 3000;
  const availablePoints = 2000;
  const totalPrice =
    orderAmount + maxDeliveryFee - minCommonMenuDiscount - availablePoints;

  return (
    <>
      <Header buttonLeft="back" buttonRight="home" text="장바구니" />
      <CustomContainer>
        <StoreInfo
          storeName={store.name}
          deliveryTime={store.deliveryTimeRange}
          location={location}
          onClick={() =>
            router.push(`/restaurants/${store.id}?context=leaderAfter&meetingId=${meetingId}`)
          }
        />
        <CartItem
          menuName="교촌오리지날(한마리)"
          price={19000}
          imageUrl="https://via.placeholder.com/150"
          badgeText="공동 메뉴"
          quantity={1}
          storeId={String(meeting?.storeId)}
        />
      </CustomContainer>
      <Amount
        orderAmount={orderAmount}
        maxDeliveryFee={maxIndividualDeliveryFee}
        minCommonMenuDiscount={minCommonMenuDiscount}
        availablePoints={availablePoints}
        totalPrice={totalPrice}
      />
      <Footer type="button" buttonText="36,500원 주문하고 모임 완성하기" />
    </>
  );
};

export default CartPage;
