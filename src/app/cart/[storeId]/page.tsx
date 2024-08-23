'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
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
   const router = useRouter();
   const { storeId } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [menuTotalPrice, setMenuTotalPrice] = useState(19000); 

  const {
    formData: { maxIndividualDeliveryFee },
  } = useOrderStore();

  // Fetch store data
  const {
    data: store,
    isLoading: isLoadingStore,
    isError: isErrorStore,
  } = useQuery({
    queryKey: ['storeInfo', storeId],
    queryFn: () => getRestaurantInfo(Number(storeId)),
  });

  const deliveredAddress = useOrderStore((state) => state.formData.deliveredAddress);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    setMenuTotalPrice(19000 * newQuantity);
  };

  const handleAddItem = () => {
    router.push(`/restaurants/${storeId}?context=leaderAfter`);
  };
  
  if (isLoadingStore) {
    return <Loading />;
  }

  if (isErrorStore) {
    return <p>Error loading restaurant data</p>;
  }

  const location = deliveredAddress.streetAddress || deliveredAddress.detailAddress
    ? `${deliveredAddress.streetAddress} ${deliveredAddress.detailAddress}`
    : '배송지 정보 없음';

  const orderAmount = 60000;
  const maxDeliveryFee = 5000;
  const minCommonMenuDiscount = 3000;
  const availablePoints = 2000;
  const totalPrice = orderAmount + maxDeliveryFee - minCommonMenuDiscount - availablePoints;

  return (
    <>
      <Header buttonLeft="back" buttonRight="home" text="장바구니" />
      <CustomContainer>
        <StoreInfo 
          storeName={store.name}
          deliveryTime={store.deliveryTimeRange}
          location={location}
          onClick={() => router.push(`/restaurants/${storeId}?context=leaderAfter`)}
        />
        <CartItem
          menuName="교촌오리지날(한마리)"
          price={19000}
          imageUrl="https://via.placeholder.com/150"
          badgeText="공동 메뉴"
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onAddItem={handleAddItem}
        />
      </CustomContainer>
      <Amount
        orderAmount={orderAmount}
        maxDeliveryFee={maxIndividualDeliveryFee}
        minCommonMenuDiscount={minCommonMenuDiscount}
        availablePoints={availablePoints}
        totalPrice={totalPrice}
      />
      <Footer
        type="button"
        buttonText="36,500원 주문하고 모임 완성하기"
      />
    </>
  );
};

export default CartPage;
