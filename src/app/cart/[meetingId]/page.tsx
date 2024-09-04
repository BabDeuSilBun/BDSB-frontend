'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Loading from '@/app/loading';
import Amount from '@/components/cart/amount';
import CartItems from '@/components/cart/cartItems';
import StoreInfo from '@/components/cart/storeInfo';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { getMenuList } from '@/services/menuService';
import { getMyData } from '@/services/myDataService';
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
  const context = searchParams.get('context')?.toLowerCase();
  const { cartItems, updateQuantity } = useCartStore();
  const {
    formData: { minHeadcount },
  } = useOrderStore();
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [minTeamPurchaseDiscount, setMinTeamPurchaseDiscount] = useState(0);
  const [point, setPoint] = useState(0);
  const [purchaseId, setPurchaseId] = useState<number | null>(null);

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

  // Fetch menu information for all items in the cart using useInfiniteQuery
  const {
    data: menus,
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
    enabled: !!storeId,
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

  // Calculate totals when cart items or other dependencies change
  useEffect(() => {
    if (isLoadingMenus) return;

    const menuDataArray = menus?.pages.flatMap((page) => page.content) || [];

    const newPurchaseAmount = cartItems.reduce((total, item) => {
      const menuData = menuDataArray.find(
        (menuData) => menuData.menuId === item.menuId,
      );
      return total + (menuData?.price || 0) * item.quantity;
    }, 0);

    setPurchaseAmount(paymentFormatter(newPurchaseAmount));

    const teamPurchaseTotal = cartItems.reduce((total, item) => {
      if (item.type === 'team') {
        const menuData = menuDataArray.find(
          (menuData) => menuData.menuId === item.menuId,
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
  }, [cartItems, menus, minHeadcount, myData, isLoadingMenus]);

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

  // Get delivery address
  const deliveredAddress = useOrderStore(
    (state) => state.formData.deliveredAddress,
  );

  const location =
    deliveredAddress.streetAddress || deliveredAddress.detailAddress
      ? `${deliveredAddress.streetAddress} ${deliveredAddress.detailAddress}`
      : '배송지 정보 없음';

  // Step 1: Create Purchase Record on Backend
  const createPurchaseMutation = useMutation({
    mutationFn: async () => {
      const endpoint =
        cartItems[0].type === 'team'
          ? `/api/users/meetings/team-purchases/${purchaseId}`
          : `/api/users/meetings/individual-purchases/${purchaseId}`;

      const response = await axios.post(endpoint, {
        items: cartItems.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
          type: item.type,
        })),
      });
      return response.data.purchaseId;
    },
    onSuccess: (generatedPurchaseId) => {
      setPurchaseId(generatedPurchaseId);
    },
    onError: (error) => {
      console.error('Failed to create purchase', error);
      alert('Failed to create purchase.');
    },
  });

  useEffect(() => {
    if (!purchaseId && cartItems.length > 0) {
      createPurchaseMutation.mutate();
    }
  }, [purchaseId, cartItems.length]);

  const preparePaymentMutation = useMutation({
    mutationFn: () => {
      if (!purchaseId) {
        throw new Error('Purchase ID is not generated');
      }

      return axios
        .post(
          `/api/users/meetings/${meetingId}/purchases/${purchaseId}/payment`,
          {
            pg: `kakaopay.TC0ONETIME`,
            payMethod: 'CARD',
            point,
          },
        )
        .then((res) => res.data);
    },
    onSuccess: (paymentData) => {
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

  const verifyPaymentMutation = useMutation({
    mutationFn: ({
      meetingId,
      purchaseId,
      transactionId,
      portoneUid,
    }: {
      meetingId: number;
      purchaseId: number;
      transactionId: string;
      portoneUid: string;
    }) =>
      axios
        .post(
          `/api/users/meetings/${meetingId}/purchases/${purchaseId}/payment/done`,
          {
            transactionId,
            portoneUid,
          },
        )
        .then((res) => res.data),
    onSuccess: (verifyResponse) => {
      if (verifyResponse.success) {
        router.push(
          `/paymentSuccess/${verifyResponse.meetingId}?storeId=${storeId}&context=${context}`,
        );
      } else {
        alert('Payment verification failed.');
      }
    },
    onError: (error) => {
      console.error('Payment verification failed', error);
      alert('Payment verification failed.');
    },
  });

  const handlePayment = async (
    transactionId: string,
    name: string,
    price: number,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const IMP = window.IMP;
      IMP.request_pay(
        {
          pg: 'kakaopay.TC0ONETIME',
          pay_method: 'card',
          merchant_uid: transactionId,
          name: name,
          amount: price,
          m_redirect_url: `${window.location.origin}/paymentSuccess/${meetingId}?storeId=${storeId}&context=${context}`,
        },
        (rsp) => {
          if (rsp.success) {
            resolve();
            verifyPaymentMutation.mutate({
              meetingId: Number(meetingId),
              purchaseId: Number(purchaseId),
              transactionId: transactionId,
              portoneUid: rsp.imp_uid,
            });
          } else {
            reject(new Error(rsp.error_msg));
          }
        },
      );
    });
  };

  const handleSubmit = async (
    meetingId: number,
    individualItems: CartItem[],
    teamItems: CartItem[],
  ) => {
    try {
      if (individualItems.length > 0) {
        const individualPayload = individualItems.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        }));

        await fetch(`/api/users/meetings/${meetingId}/individual-purchases`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(individualPayload),
        });
      }

      if (teamItems.length > 0) {
        const teamPayload = teamItems.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        }));

        await fetch(`/api/users/meetings/${meetingId}/team-purchases`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(teamPayload),
        });
      }

      preparePaymentMutation.mutate();
    } catch (error) {
      console.error('Failed to submit purchases:', error);
      alert('Order submission failed.');
    }
  };

  // Determine footer button text based on context
  const footerButtonText =
    context === 'leaderafter'
      ? `${formatCurrency(totalPrice)} 주문하고 모임 완성하기`
      : context === 'participant'
        ? `${formatCurrency(totalPrice)} 주문하고 모임 참여하기`
        : '';

  if (isLoadingMeeting || isLoadingStore || isLoadingMyData || isLoadingMenus) {
    return <Loading />;
  }

  if (isErrorMeeting || isErrorStore || isErrorMyData || isErrorMenus) {
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
                `/restaurants/${storeId}?context=leaderafter&meetingId=${meetingId}`,
              );
            } else {
              console.error('storeId or meetingId is missing');
            }
          }}
        />
        {cartItems.map((item: CartItem, index: number) => {
          const menuDataArray =
            menus?.pages?.flatMap((page) => page.content) || [];
          const menuData = menuDataArray.find(
            (menu) => menu.menuId === item.menuId,
          );

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
