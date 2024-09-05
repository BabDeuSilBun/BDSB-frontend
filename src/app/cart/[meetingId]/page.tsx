'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useMemo, useState } from 'react';

import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Loading from '@/app/loading';
import Amount from '@/components/cart/amount';
import CartItems from '@/components/cart/cartItems';
import StoreInfo from '@/components/cart/storeInfo';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getMenuList } from '@/services/menuService';
import { getMyData } from '@/services/myDataService';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getTeamOrderInfo } from '@/services/teamOrderService';
import { getTeamPurchaseList } from '@/services/teamPurchaseService';
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
  // const [purchaseId, setPurchaseId] = useState<number | null>(null);

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

  // Fetch team purchases with JWT token
  console.log('Fetching team purchases for meetingId:', meetingId);
  const {
    data: teamPurchases,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['teamPurchaseList', meetingId],
    queryFn: ({ pageParam = 0 }) =>
      getTeamPurchaseList({
        meetingId: Number(meetingId),
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage?.items?.last
        ? undefined
        : lastPage?.items?.pageable?.pageNumber + 1,
    initialPageParam: 0,
  });

  const lastElementRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // Combine team purchases into the cart if in 'participant' context
  const combinedCartItems = useMemo(() => {
    return context === 'participant'
      ? [
          ...cartItems.filter((item) => item.type === 'individual'), // Include individual items
          ...(teamPurchases?.pages.flatMap((page) =>
            page.items.content.map((item) => ({
              menuId: item.menuId,
              quantity: item.quantity,
              type: 'team',
              storeId,
            })),
          ) || []), // Include team purchases
        ]
      : cartItems;
  }, [context, cartItems, teamPurchases, meeting?.storeId, storeId]);

  // Calculate totals when cart items or other dependencies change
  useEffect(() => {
    if (isLoadingMenus) return;

    const menuDataArray = menus?.pages.flatMap((page) => page.content) || [];

    const newPurchaseAmount = combinedCartItems.reduce((total, item) => {
      const menuData = menuDataArray.find(
        (menuData) => menuData.menuId === item.menuId,
      );
      return total + (menuData?.price || 0) * item.quantity;
    }, 0);

    setPurchaseAmount(paymentFormatter(newPurchaseAmount));

    const teamPurchaseTotal = combinedCartItems.reduce((total, item) => {
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
  }, [combinedCartItems, menus, minHeadcount, myData, isLoadingMenus]);

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
    context === 'participant'
      ? `${meeting?.deliveryAddress?.deliveryStreetAddress || ''} ${meeting?.deliveryAddress?.deliveryDetailAddress || ''}`
      : `${deliveredAddress?.streetAddress || deliveredAddress?.detailAddress || '배송지 정보 없음'}`;

  // PortOne SDK initialization
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://cdn.iamport.kr/v1/iamport.js';
  //   script.onload = () => {
  //     window.IMP.init('imp51248204'); // Should be updated to match PortOne merchant key
  //   };
  //   document.body.appendChild(script);
  // }, []);

  // Portone payment by mock data
  // 1. 백엔드로 결제요청 API 보냄 -> 백엔드에서 결제 관련 정보 보내줌
  // const preparePaymentMutation = useMutation({
  //   mutationFn: () =>
  //     preparePayment(meetingId, `kakaopay.TC0ONETIME`, 'card', point),
  //   onSuccess: (paymentData) => {
  //     // 2. 프론트엔드에서 백엔드로부터 받은 정보를 바탕으로 결제 진행 (결제 완료 후 포트원uid 발급됨)
  //     handlePayment(
  //       paymentData.transactionId,
  //       paymentData.name,
  //       paymentData.price,
  //     );
  //   },
  //   onError: (error) => {
  //     console.error('Payment preparation failed', error);
  //     alert('Payment preparation failed.');
  //   },
  // });

  // 3. 프론트엔드에서 백엔드로 결제완료 API 요청 -> 백엔드로 결제 시 발급받은 포트원uid 보내줌
  // const verifyPaymentMutation = useMutation({
  //   mutationFn: ({
  //     meetingId,
  //     transactionId,
  //     portoneUid,
  //   }: {
  //     meetingId: number;
  //     transactionId: string;
  //     portoneUid: string;
  //   }) => verifyPayment(meetingId, transactionId, portoneUid),
  //   onSuccess: (verifyResponse) => {
  // 4. 백엔드에서 포트원uid로 결제 정보 조회 -> 올바르게 되었는지 프론트로 보내줌
  //     if (verifyResponse.success) {
  //       // 5. 결제 올바르게 되었으면 다음 단계 진행
  //       router.push(
  //         `/paymentSuccess/${meetingId}?storeId=${storeId}&context=${context}`,
  //       );
  //     } else {
  //       // 결제 올바르게 안되었으면 다시 요청
  //       alert('Payment verification failed.');
  //     }
  //   },
  //   onError: (error) => {
  //     console.error('Payment verification failed', error);
  //     alert('Payment verification failed.');
  //   },
  // });

  // 2. 프론트엔드에서 백엔드로부터 받은 정보를 바탕으로 결제 진행 (결제 완료 후 포트원uid 발급됨)
  // const handlePayment = async (
  //   transactionId: string,
  //   name: string,
  //   price: number,
  // ): Promise<void> => {
  //   return new Promise((resolve, reject) => {
  //     const IMP = window.IMP;
  //     IMP.request_pay(
  //       {
  //         pg: 'kakaopay.TC0ONETIME', // PG code for the test environment
  //         pay_method: 'card',
  //         merchant_uid: transactionId,
  //         name: name,
  //         amount: price,
  //         m_redirect_url: `${window.location.origin}/paymentSuccess/${meetingId}?storeId=${storeId}&context=${context}`,
  //       },
  //       (rsp) => {
  //         if (rsp.success) {
  //           resolve();
  //           // 3. 프론트엔드에서 백엔드로 결제완료 API 요청 -> 백엔드로 결제 시 발급받은 포트원uid 보내줌
  //           verifyPaymentMutation.mutate({
  //             meetingId,
  //             transactionId,
  //             portoneUid: rsp.imp_uid,
  //           });
  //         } else {
  //           reject(new Error(rsp.error_msg));
  //         }
  //       },
  //     );
  //   });
  // };

  // Workflow start: User submits the order and payment process begins

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (
    meetingId: number,
    individualItems: CartItem[],
    teamItems: CartItem[],
  ) => {
    try {
      // Retrieve the JWT token from cookies
      const token = Cookies.get('jwtToken');

      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      console.log('Submitting for meetingId:', meetingId);
      console.log('Individual items:', individualItems);
      console.log('Team items:', teamItems);

      // Helper function to handle the API response
      const handleResponse = async (response: Response) => {
        console.log('API response status:', response.status);
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            console.error('Error response data:', errorData);
            throw new Error(
              errorData.message || 'Error occurred during submission.',
            );
          } else {
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            throw new Error(`Unexpected response: ${errorText}`);
          }
        }

        if (contentType && contentType.includes('application/json')) {
          return await response.json();
        }
        return null;
      };

      // Submit individual items to the server
      if (individualItems.length > 0) {
        for (const item of individualItems) {
          const payload = {
            menuId: item.menuId,
            quantity: item.quantity,
          };

          console.log('Individual Item Payload:', payload);

          const response = await fetch(
            `${backendUrl}api/users/meetings/${meetingId}/individual-purchases`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(payload),
            },
          );

          await handleResponse(response);
        }
      }

      // Submit team items to the server
      if (teamItems.length > 0) {
        for (const item of teamItems) {
          const payload = {
            menuId: item.menuId,
            quantity: item.quantity,
          };

          console.log('Team Item Payload:', payload);

          const response = await fetch(
            `${backendUrl}api/users/meetings/${meetingId}/team-purchases`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(payload),
            },
          );

          await handleResponse(response);
        }
      }

      // Redirect or update the UI after successful submission
      console.log('Successfully submitted all purchases.');
      router.push(
        `/paymentSuccess/${meetingId}?storeId=${storeId}&context=${context}`,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Handle known error
        console.error('Failed to submit purchases:', error.message);
        alert(`Order submission failed: ${error.message}`);
      } else {
        // Handle unknown error type
        console.error('An unknown error occurred:', error);
        alert('An unknown error occurred. Please try again.');
      }
    }
  };

  // 1. 백엔드로 결제요청 API 보냄 -> 백엔드에서 결제 관련 정보 보내줌
  //     preparePaymentMutation.mutate();
  //   } catch (error) {
  //     console.error('Failed to submit purchases:', error);
  //     alert('Order submission failed.');
  //   }
  // };

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
        {combinedCartItems.map((item, index) => {
          const menuDataArray =
            menus?.pages?.flatMap((page) => page.content) || [];
          const menuData = menuDataArray.find(
            (menu) => menu.menuId === item.menuId,
          );

          const isLastItem = index === combinedCartItems.length - 1;

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
                updateQuantity(item.menuId, String(storeId), newQuantity)
              }
              lastElementRef={isLastItem ? lastElementRef : undefined}
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
