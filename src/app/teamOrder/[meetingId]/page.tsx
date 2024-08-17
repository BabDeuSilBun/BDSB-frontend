'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getTeamOrderInfo, getCurrentHeadCount } from '@/services/teamOrderService';
import { getTeamMenuList, getTeamMenuInfo } from '@/services/teamMenuService';
import { getIndividualOrderInfo } from '@/services/individualOrderService';
import Loading from '@/app/loading';
import Header from '@/components/layout/header';
import MainImage from '@/components/meetings/mainImage';
import MeetingStatus from '@/components/meetings/meetingStatus';
import MeetingInfo from '@/components/meetings/meetingInfo';
import TeamOrderItems from '@/components/meetings/teamOrderItems';
import Footer from '@/components/layout/footer';
import styled from 'styled-components';
import { formatCurrency } from '@/utils/currencyFormatter';
import useRemainingTime from '@/hook/useRemainingTime';

// Styled components
const RemainingAmountText = styled.div`
  position: fixed;
  bottom: 5rem;
  width: 100%;
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--primary);
  font-weight: var(--font-regular);
  z-index: 1001;
`;

const TeamOrderPage = () => {
  const { meetingId } = useParams();
  const router = useRouter();

  // State for storing team menu and individual order details
  const [teamMenu, setTeamMenu] = useState(null);
  const [individualOrder, setIndividualOrder] = useState(null);

  // Ref for storing the IntersectionObserver instance
  const observer = useRef<IntersectionObserver | null>(null);

  // Ref to track the last element for infinite scrolling
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    router.push(`/restaurants/${meeting.storeId}?context=participant`);
  };

  // Queries for fetching data
  const {
    data: meeting,
    isLoading: isLoadingMeeting,
    isError: isErrorMeeting,
  } = useQuery({
    queryKey: ['meetingInfo', meetingId],
    queryFn: () => getTeamOrderInfo(Number(meetingId)),
  });

  const {
    data: headCountData,
    isLoading: isLoadingHeadcount,
    isError: isErrorHeadcount,
  } = useQuery<{
    currentHeadCount: number;
  }>({
    queryKey: ['headCount', meetingId],
    queryFn: () => getCurrentHeadCount(Number(meetingId)),
  });
  
  const { time: remainingTime, $isCritical } = useRemainingTime(
    meeting?.paymentAvailableAt || '',
  );

  const {
    data: teamMenus,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingTeamMenus,
    isError: isErrorTeamMenus,
  } = useInfiniteQuery({
    queryKey: ['teamMenuList', meetingId],
    queryFn: ({ pageParam = 0 }) =>
      getTeamMenuList({ meetingId: Number(meetingId), page: pageParam }),
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

  const { data: teamMenuInfo, isLoading: isLoadingTeamMenuInfo } =
    useQuery({
      queryKey: ['teamMenuInfo', teamMenu?.purchaseId],
      queryFn: () =>
        getTeamMenuInfo(Number(meetingId), Number(teamMenu.purchaseId)),
      enabled: !!teamMenu?.purchaseId,
    });
  
  const { data: individualOrderInfo, isLoading: isLoadingIndividualOrderInfo } =
  useQuery({
    queryKey: ['individualOrderInfo', individualOrder?.purchaseId],
    queryFn: () =>
      getIndividualOrderInfo(Number(meetingId), Number(individualOrder.purchaseId)),
    enabled: !!individualOrder?.purchaseId,
  });

  const { data: storeInfo, isLoading: isLoadingStoreInfo } = useQuery({
    queryKey: ['storeInfo', meeting?.storeId],
    queryFn: () => getRestaurantInfo(Number(meeting?.storeId)),
    enabled: !!meeting?.storeId,
  });

  // Calculate the remaining amount needed to meet the minimum purchase price
  const totalFee = (teamMenu?.totalFee || 0) + (individualOrder?.totalFee || 0);
  const remainingAmount = storeInfo?.minPurchasePrice - totalFee;

  // Handling loading and error states
  if (isLoadingMeeting || isLoadingTeamMenus) return <Loading />;
  if (isErrorMeeting) return <p>Error loading meeting data</p>;

  return (
    <div>
      <Header buttonLeft="back" text={meeting.storeName} />
      <MainImage src={meeting.images[0].url} alt={meeting.storeName} />
      <MeetingStatus 
        headCountData={headCountData} 
        meeting={meeting} 
        remainingTime={remainingTime} />
      <MeetingInfo meeting={meeting} />

      {meeting.purchaseType === '함께 식사' && (
        <TeamOrderItems teamMenus={teamMenus} /> 
      )}

      <RemainingAmountText>
        {remainingAmount > 0
          ? `최소 주문 금액까지 ${formatCurrency(remainingAmount)} 남았어요!`
          : '최소 주문 금액이 다 채워졌어요!'}
      </RemainingAmountText>
      <Footer
        type="button"
        buttonText="모임 참여하기"
        padding="3rem 1.5rem 1.5rem"
        onButtonClick={handleClick}
      />
    </div>
  );
};

export default TeamOrderPage;
