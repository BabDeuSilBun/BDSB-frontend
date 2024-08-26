'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Loading from '@/app/loading';
import Amount from '@/components/cart/amount';
import CartItems from '@/components/cart/cartItems';
import StoreInfo from '@/components/cart/storeInfo';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { getMenuInfo } from '@/services/menuService';
import { getMyData } from '@/services/myDataService';
import { preparePayment, verifyPayment } from '@/services/paymentService';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getTeamOrderInfo } from '@/services/teamOrderService';
import { CartItem, useCartStore } from '@/state/cartStore';
import { useOrderStore } from '@/state/orderStore';
import Container from '@/styles/container';
import { formatCurrency } from '@/utils/currencyFormatter';
import { paymentFormatter } from '@/utils/paymentFormatter';

const CustomContainer = styled(Container)`
  margin-top: 60px;
  padding: var(--spacing-sm);
  background-color: var(--gray100);
`;

const CartPage = () => {
  // State hooks for data management
  const router = useRouter();
  const searchParams = useSearchParams();
  const { meetingId: meetingIdParam } = useParams();
  const storeId = parseInt(searchParams.get('storeId') || '', 10);
  const context = searchParams.get('context');
  const { cartItems, updateQuantity } = useCartStore();
  const {
    formData: { minHeadcount },
  } = useOrderStore();
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [minTeamPurchaseDiscount, setMinTeamPurchaseDiscount] = useState(0);
  const [point, setPoint] = useState(0);

  // Convert meetingId to a number
  const meetingId = Array.isArray(meetingIdParam)
    ? parseInt(meetingIdParam[0], 10)
    : parseInt(meetingIdParam, 10);

  // Fetch meeting data to get storeId
  const {
    data: meeting,
    isLoading: isLoadingMeeting,
    isError: isErrorMeeting,
  } = useQuery({
    queryKey: ['meetingInfo', meetingId],
    queryFn: () => getTeamOrderInfo(Number(meetingId)),
    enabled: !isNaN(meetingId),
  });

  // Fetch store information
  const {
    data: store,
    isLoading: isLoadingStore,
    isError: isErrorStore,
  } = useQuery({
    queryKey: ['storeInfo', meeting?.storeId],
    queryFn: () => getRestaurantInfo(Number(meeting?.storeId)),
    enabled: !!meeting?.storeId,
  });

  // Fetch menu information for each item in the cart
  const menuQueries = useQueries({
    queries: cartItems.map((item) => ({
      queryKey: ['menuInfo', item.storeId, item.menuId],
      queryFn: () => getMenuInfo(Number(item.storeId), Number(item.menuId)),
      enabled: !!item.menuId,
    })),
  });

  // Fetch user data to get available points
  const {
    data: myData,
    isLoading: isLoadingMyData,
    isError: isErrorMyData,
  } = useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  // Get delivery address
  const deliveredAddress = useOrderStore(
    (state) => state.formData.deliveredAddress,
  );

  const location =
    deliveredAddress.streetAddress || deliveredAddress.detailAddress
      ? `${deliveredAddress.streetAddress} ${deliveredAddress.detailAddress}`
      : '배송지 정보 없음';

  // Calculate totals when cart items or other dependencies change
  const menuDataArray = menuQueries.map((query) => query.data);
  const isMenuLoading = menuQueries.some((query) => query.isLoading);

  useEffect(() => {
    if (isMenuLoading) return;

    const newPurchaseAmount = cartItems.reduce((total, item) => {
      const menuData = menuDataArray.find(
        (menuData) => menuData?.menuId === item.menuId,
      );
      return total + (menuData?.price || 0) * item.quantity;
    }, 0);

    setPurchaseAmount(paymentFormatter(newPurchaseAmount));

    const teamPurchaseTotal = cartItems.reduce((total, item) => {
      if (item.type === 'team') {
        const menuData = menuDataArray.find(
          (menuData) => menuData?.menuId === item.menuId,
        );
        return total + (menuData?.price || 0) * item.quantity;
      }
      return total;
    }, 0);

    setMinTeamPurchaseDiscount(
      paymentFormatter(teamPurchaseTotal / minHeadcount) * (minHeadcount - 1),
    );

    if (myData) {
      setPoint(myData.point);
    }
  }, [cartItems, menuDataArray, minHeadcount, myData, isMenuLoading]);

  const deliveryPrice = store?.deliveryPrice || 0;
  const maxDeliveryFee = paymentFormatter(deliveryPrice / minHeadcount);

  const totalPrice = paymentFormatter(
    purchaseAmount + maxDeliveryFee - minTeamPurchaseDiscount - point,
  );

  // Split cart items by types
  const splitCartItemsByType = (cartItems: CartItem[]) => {
    const individualItems = cartItems.filter(
      (item) => item.type === 'individual',
    );
    const teamItems = cartItems.filter((item) => item.type === 'team');

    return { individualItems, teamItems };
  };

  // PortOne SDK initialization
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.onload = () => {
      window.IMP.init('imp51248204'); // Should be updated to match PortOne merchant key
    };
    document.body.appendChild(script);
  }, []);

  // Portone payment by mock data
  // 1. 백엔드로 결제요청 API 보냄 -> 백엔드에서 결제 관련 정보 보내줌
  const preparePaymentMutation = useMutation({
    mutationFn: () =>
      preparePayment(meetingId, `kakaopay.TC0ONETIME`, 'card', point),
    onSuccess: (paymentData) => {
      // 2. 프론트엔드에서 백엔드로부터 받은 정보를 바탕으로 결제 진행 (결제 완료 후 포트원uid 발급됨)
      handlePayment(
        paymentData.transactionId,
        paymentData.name,
        paymentData.price,
      );
    },
    onError: (error) => {
      console.error('Payment preparation failed', error);
      alert('Payment preparation failed.');
    },
  });

  // 3. 프론트엔드에서 백엔드로 결제완료 API 요청 -> 백엔드로 결제 시 발급받은 포트원uid 보내줌
  const verifyPaymentMutation = useMutation({
    mutationFn: ({
      meetingId,
      transactionId,
      portoneUid,
    }: {
      meetingId: number;
      transactionId: string;
      portoneUid: string;
    }) => verifyPayment(meetingId, transactionId, portoneUid),
    onSuccess: (verifyResponse) => {
      // 4. 백엔드에서 포트원uid로 결제 정보 조회 -> 올바르게 되었는지 프론트로 보내줌
      if (verifyResponse.success) {
        // 5. 결제 올바르게 되었으면 다음 단계 진행
        router.push(
          `/paymentSuccess/${meetingId}?storeId=${storeId}&context=${context}`,
        );
      } else {
        // 결제 올바르게 안되었으면 다시 요청
        alert('Payment verification failed.');
      }
    },
    onError: (error) => {
      console.error('Payment verification failed', error);
      alert('Payment verification failed.');
    },
  });

  // 2. 프론트엔드에서 백엔드로부터 받은 정보를 바탕으로 결제 진행 (결제 완료 후 포트원uid 발급됨)
  const handlePayment = async (
    transactionId: string,
    name: string,
    price: number,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const IMP = window.IMP;
      IMP.request_pay(
        {
          pg: 'kakaopay.TC0ONETIME', // PG code for the test environment
          pay_method: 'card',
          merchant_uid: transactionId,
          name: name,
          amount: price,
          m_redirect_url: `${window.location.origin}/paymentSuccess/${meetingId}?storeId=${storeId}&context=${context}`,
        },
        (rsp) => {
          if (rsp.success) {
            resolve();
            // 3. 프론트엔드에서 백엔드로 결제완료 API 요청 -> 백엔드로 결제 시 발급받은 포트원uid 보내줌
            verifyPaymentMutation.mutate({
              meetingId,
              transactionId,
              portoneUid: rsp.imp_uid,
            });
          } else {
            reject(new Error(rsp.error_msg));
          }
        },
      );
    });
  };

  // Workflow start: User submits the order and payment process begins
  const handleSubmit = async (
    meetingId: number,
    individualItems: CartItem[],
    teamItems: CartItem[],
  ) => {
    try {
      // Handle individual purchases submission
      if (individualItems.length > 0) {
        const individualPayload = individualItems.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        }));

        console.log('Submitting individual purchases:', individualPayload);

        await fetch(`/api/users/meetings/${meetingId}/individual-purchases`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(individualPayload),
        });
      }

      // Handle team purchases submission
      if (teamItems.length > 0) {
        const teamPayload = teamItems.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        }));

        console.log('Submitting team purchases:', teamPayload);

        await fetch(`/api/users/meetings/${meetingId}/team-purchases`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(teamPayload),
        });
      }

      // 1. 백엔드로 결제요청 API 보냄 -> 백엔드에서 결제 관련 정보 보내줌
      preparePaymentMutation.mutate();
    } catch (error) {
      console.error('Failed to submit purchases:', error);
      alert('Order submission failed.');
    }
  };

  // // Real API
  // // 1. 백엔드로 결제요청 API 보냄 -> 백엔드에서 결제 관련 정보 보내줌
  // const preparePaymentMutation = useMutation({
  //   mutationFn: () => axios.post(`/api/users/meetings/${meetingId}/purchases/payment`, {
  //     pg: `kakaopay.TC0ONETIME`,
  //     payMethod: 'card',
  //     point
  //   }).then(res => res.data),
  //   onSuccess: (paymentData) => {
  //     // 2. 프론트엔드에서 백엔드로부터 받은 정보를 바탕으로 결제 진행 (결제 완료 후 포트원uid 발급됨)
  //     handlePayment(paymentData.transactionId, paymentData.name, paymentData.price);
  //   },
  //   onError: (error) => {
  //     console.error("Payment preparation failed", error);
  //     alert("Payment preparation failed.");
  //   },
  // });

  //   // 3. 프론트엔드에서 백엔드로 결제완료 API 요청 -> 백엔드로 결제 시 발급받은 포트원uid 보내줌
  // const verifyPaymentMutation = useMutation({
  //   mutationFn: ({ meetingId, transactionId, portoneUid }) =>
  //     axios.post(`/api/users/meetings/${meetingId}/purchases/payment/done`, {
  //       transactionId,
  //       portoneUid
  //     }).then(res => res.data),
  //   onSuccess: (verifyResponse) => {
  //     // 4. 백엔드에서 포트원uid로 결제 정보 조회 -> 올바르게 되었는지 프론트로 보내줌
  //     if (verifyResponse.success) {
  //       // 5. 결제 올바르게 되었으면 다음 단계 진행
  //       router.push(`/paymentSuccess/${meetingId}?storeId=${storeId}&context=${context}`);
  //     } else {
  //       // 결제 올바르게 안되었으면 다시 요청
  //       alert('Payment verification failed.');
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Payment verification failed", error);
  //     alert("Payment verification failed.");
  //   },
  // });

  // Determine footer button text based on context
  const footerButtonText =
    context === 'leaderAfter'
      ? `${formatCurrency(totalPrice)} 주문하고 모임 완성하기`
      : context === 'participant'
        ? `${formatCurrency(totalPrice)} 주문하고 모임 참여하기`
        : '';

  if (
    isLoadingMeeting ||
    isLoadingStore ||
    isLoadingMyData ||
    menuQueries.some((query) => query.isLoading)
  ) {
    return <Loading />;
  }

  if (
    isErrorMeeting ||
    isErrorStore ||
    isErrorMyData ||
    menuQueries.some((query) => query.isError)
  ) {
    return <p>Error loading data</p>;
  }

  return (
    <>
      <Header buttonLeft="back" buttonRight="home" text="장바구니" />
      <CustomContainer>
        <StoreInfo
          storeName={store.name}
          deliveryTime={store.deliveryTimeRange}
          location={location}
          onClick={() => {
            const meetingId = meeting?.meetingId;
            if (storeId && meetingId) {
              router.push(
                `/restaurants/${storeId}?context=leaderAfter&meetingId=${meetingId}`,
              );
            } else {
              console.error('storeId or meetingId is missing');
            }
          }}
        />
        {cartItems.map((item: CartItem, index: number) => {
          const menuData = menuQueries.find(
            (query) => query.data?.menuId === item.menuId,
          )?.data;
          return (
            <CartItems
              key={item.menuId}
              menuName={menuData?.name || 'Unknown'}
              price={menuData?.price || 0}
              imageUrl={menuData?.image || ''}
              badgeText={item.type === 'individual' ? '개별메뉴' : '공동메뉴'}
              quantity={item.quantity}
              storeId={Number(item.storeId)}
              meetingId={meetingId}
              showAddButton={index === cartItems.length - 1}
              onQuantityChange={(newQuantity) =>
                updateQuantity(item.menuId, item.storeId, newQuantity)
              }
            />
          );
        })}
      </CustomContainer>
      <Amount
        orderAmount={purchaseAmount}
        maxDeliveryFee={maxDeliveryFee}
        minTeamPurchaseDiscount={minTeamPurchaseDiscount}
        availablePoints={point}
        totalPrice={totalPrice}
      />
      <Footer
        type="button"
        buttonText={footerButtonText}
        onButtonClick={() => {
          const { individualItems, teamItems } =
            splitCartItemsByType(cartItems);
          handleSubmit(Number(meetingId), individualItems, teamItems);
        }}
      />
    </>
  );
};

export default CartPage;
