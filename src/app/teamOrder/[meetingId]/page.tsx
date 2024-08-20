'use client';

import { useEffect, useRef, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import {
  getCurrentHeadCount,
  getTeamOrderInfo,
} from '@/services/teamOrderService';
import {
  getTeamPurchaseInfo,
  getTeamPurchaseList,
} from '@/services/teamPurchaseService';
import { getIndividualPurchaseInfo } from '@/services/individualPurchaseService';
import { IndividualPurchaseType, TeamPurchaseType } from '@/types/coreTypes';
import Loading from '@/app/loading';
import Container from '@/styles/container';
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
  const [teamPurchase] = useState<TeamPurchaseType | null>(null);
  const [individualPurchase] = useState<IndividualPurchaseType | null>(null);

  // Ref for storing the IntersectionObserver instance
  const observer = useRef<IntersectionObserver | null>(null);

  // Ref to track the last element for infinite scrolling
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // Queries for fetching data
  const {
    data: meeting,
    isLoading: isLoadingMeeting,
    isError: isErrorMeeting,
  } = useQuery({
    queryKey: ['meetingInfo', meetingId],
    queryFn: () => getTeamOrderInfo(Number(meetingId)),
  });

  const handleClick = () => {
    if (meeting) {
      router.push(`/restaurants/${meeting.storeId}?context=participant`);
    }
  };

  const { data: headCountData } = useQuery<{
    currentHeadCount: number;
  }>({
    queryKey: ['headCount', meetingId],
    queryFn: () => getCurrentHeadCount(Number(meetingId)),
  });

  const { time: remainingTime } = useRemainingTime(
    meeting?.paymentAvailableAt || '',
  );

  const {
    data: teamPurchases,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingTeamPurchases,
  } = useInfiniteQuery({
    queryKey: ['teamPurchaseList', meetingId],
    queryFn: ({ pageParam = 0 }) =>
      getTeamPurchaseList({ meetingId: Number(meetingId), page: pageParam }),
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

  useQuery({
    queryKey: [
      'teamPurchaseInfo',
      teamPurchase?.meetingId,
      meetingId,
      teamPurchase?.purchaseId,
    ],
    queryFn: () =>
      getTeamPurchaseInfo(Number(meetingId), Number(teamPurchase?.purchaseId)),
    enabled: !!teamPurchase?.purchaseId,
  });

  useQuery({
    queryKey: [
      'individualPurchaseInfo',
      individualPurchase?.meetingId,
      meetingId,
      individualPurchase?.purchaseId,
    ],
    queryFn: () =>
      getIndividualPurchaseInfo(
        Number(meetingId),
        Number(individualPurchase?.purchaseId),
      ),
    enabled: !!individualPurchase?.purchaseId,
  });

  const { data: storeInfo } = useQuery({
    queryKey: ['storeInfo', meeting?.storeId],
    queryFn: () => getRestaurantInfo(Number(meeting?.storeId)),
    enabled: !!meeting?.storeId,
  });

  // Calculate the remaining amount needed to meet the minimum purchase price
  const totalFee =
    (teamPurchase?.totalFee || 0) + (individualPurchase?.totalFee || 0);
  const minPurchasePrice = storeInfo?.minPurchasePrice ?? 0;
  const remainingAmount = minPurchasePrice - totalFee;

  // Handling loading and error states
  if (isLoadingMeeting || isLoadingTeamPurchases) return <Loading />;
  if (isErrorMeeting) return <p>Error loading meeting data</p>;

  return (
    <>
      <Header buttonLeft="back" text={meeting?.storeName} />
      <Container>
        <MainImage
          src={meeting?.images[0]?.url || '/path/to/placeholder/image.jpg'}
          alt={meeting?.storeName || 'No image available'}
        />
        <MeetingStatus
          headCountData={headCountData || null}
          meeting={meeting}
          remainingTime={remainingTime}
        />
        <MeetingInfo meeting={meeting} />

        {meeting?.purchaseType === '함께 식사' && (
          <TeamOrderItems teamPurchases={teamPurchases || { pages: [] }} />
        )}

        <RemainingAmountText>
          {remainingAmount > 0
            ? `최소 주문 금액까지 ${formatCurrency(remainingAmount)} 남았어요!`
            : '최소 주문 금액이 다 채워졌어요!'}
        </RemainingAmountText>
      </Container>
      <Footer
        type="button"
        buttonText="모임 참여하기"
        $padding="3rem 1.5rem 1.5rem"
        onButtonClick={handleClick}
      />
    </>
  );
};

export default TeamOrderPage;
