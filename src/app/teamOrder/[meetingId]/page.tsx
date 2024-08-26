'use client';

import { useEffect, useRef, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Loading from '@/app/loading';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import MainImage from '@/components/meetings/mainImage';
import MeetingInfo from '@/components/meetings/meetingInfo';
import MeetingStatus from '@/components/meetings/meetingStatus';
import TeamPurchaseItems from '@/components/meetings/teamPurchaseItems';
import useRemainingTime from '@/hook/useRemainingTime';
import {
  getIndividualPurchaseInfo,
  getIndividualPurchaseList,
} from '@/services/individualPurchaseService';
import { getRestaurantInfo } from '@/services/restaurantService';
import {
  getCurrentHeadCount,
  getTeamOrderInfo,
} from '@/services/teamOrderService';
import {
  getTeamPurchaseInfo,
  getTeamPurchaseList,
} from '@/services/teamPurchaseService';
import Container from '@/styles/container';
import { IndividualPurchaseType, TeamPurchaseType } from '@/types/coreTypes';
import { formatCurrency } from '@/utils/currencyFormatter';

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

  // Refs for IntersectionObserver and last element
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // Fetching meeting information
  const {
    data: meeting,
    isLoading: isLoadingMeeting,
    isError: isErrorMeeting,
  } = useQuery({
    queryKey: ['meetingInfo', meetingId],
    queryFn: () => getTeamOrderInfo(Number(meetingId)),
  });

  // Fetching head count data
  const { data: headCountData } = useQuery<{
    currentHeadCount: number;
  }>({
    queryKey: ['headCount', meetingId],
    queryFn: () => getCurrentHeadCount(Number(meetingId)),
  });

  const { time: remainingTime } = useRemainingTime(
    meeting?.paymentAvailableAt || '',
  );

  // Fetching team purchases with infinite scrolling
  const {
    data: teamPurchases,
    fetchNextPage: fetchNextTeamPage,
    hasNextPage: hasNextTeamPage,
    isFetchingNextPage: isFetchingNextTeamPage,
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

  // Fetching individual purchases with infinite scrolling
  const {
    data: individualPurchases,
    fetchNextPage: fetchNextIndividualPage,
    hasNextPage: hasNextIndividualPage,
    isFetchingNextPage: isFetchingNextIndividualPage,
    isLoading: isLoadingIndividualPurchases,
  } = useInfiniteQuery({
    queryKey: ['individualPurchaseList', meetingId],
    queryFn: ({ pageParam = 0 }) =>
      getIndividualPurchaseList({
        meetingId: Number(meetingId),
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const nextPageNumber = lastPage.pageable?.pageNumber ?? -1;
      return lastPage.last ? undefined : nextPageNumber + 1;
    },
    initialPageParam: 0,
  });

  // Handle infinite scrolling for team purchases
  useEffect(() => {
    if (isFetchingNextTeamPage) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextTeamPage) {
        fetchNextTeamPage();
      }
    };

    // Initialize IntersectionObserver for team purchases
    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    const currentLastElementRef = lastElementRef.current;

    // Observe the last element for team purchases
    if (currentLastElementRef) {
      observer.current.observe(currentLastElementRef);
    }

    // Cleanup function to unobserve the last element for team purchases
    return () => {
      if (observer.current && currentLastElementRef) {
        observer.current.unobserve(currentLastElementRef);
      }
    };
  }, [isFetchingNextTeamPage, hasNextTeamPage, fetchNextTeamPage]);

  // Handle infinite scrolling for individual purchases
  useEffect(() => {
    if (isFetchingNextIndividualPage) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextIndividualPage) {
        fetchNextIndividualPage();
      }
    };

    // Initialize IntersectionObserver for individual purchases
    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    const currentLastElementRef = lastElementRef.current;

    // Observe the last element for individual purchases
    if (currentLastElementRef) {
      observer.current.observe(currentLastElementRef);
    }

    // Cleanup function to unobserve the last element for individual purchases
    return () => {
      if (observer.current && currentLastElementRef) {
        observer.current.unobserve(currentLastElementRef);
      }
    };
  }, [
    isFetchingNextIndividualPage,
    hasNextIndividualPage,
    fetchNextIndividualPage,
  ]);

  // Fetch details of team purchases
  useQuery({
    queryKey: [
      'teamPurchaseInfo',
      meetingId,
      teamPurchase?.items[0]?.purchaseId,
    ],
    queryFn: () =>
      getTeamPurchaseInfo(
        Number(meetingId),
        Number(teamPurchase?.items[0]?.purchaseId),
      ),
    enabled: !!teamPurchase?.items?.length,
  });

  // Fetch details of individual purchases
  useQuery({
    queryKey: [
      'individualPurchaseInfo',
      meetingId,
      individualPurchase?.items[0]?.purchaseId,
    ],
    queryFn: () =>
      getIndividualPurchaseInfo(
        Number(meetingId),
        Number(individualPurchase?.items[0]?.purchaseId),
      ),
    enabled: !!individualPurchase?.items?.length,
  });

  // Fetch store information
  const { data: storeInfo } = useQuery({
    queryKey: ['storeInfo', meeting?.storeId],
    queryFn: () => getRestaurantInfo(Number(meeting?.storeId)),
    enabled: !!meeting?.storeId,
  });

  // Calculate total fees and remaining amount
  const totalTeamFee =
    teamPurchases?.pages.reduce((sum, page) => {
      return (
        sum +
        page.content.reduce((pageSum, purchase) => {
          return pageSum + purchase.totalFee;
        }, 0)
      );
    }, 0) || 0;

  const totalIndividualFee =
    individualPurchases?.pages.reduce((sum, page) => {
      return (
        sum +
        page.content.reduce((pageSum, purchase) => {
          return pageSum + purchase.totalFee;
        }, 0)
      );
    }, 0) || 0;

  const totalFee = totalTeamFee + totalIndividualFee;

  const minPurchasePrice = storeInfo?.minPurchasePrice ?? 0;
  const remainingAmount = minPurchasePrice - totalFee;

  // Handle click to redirect to restaurant page
  const handleClick = () => {
    if (meeting) {
      router.push(
        `/restaurants/${meeting.storeId}?context=participant&meetingId=${meetingId}`,
      );
    }
  };

  if (
    isLoadingMeeting ||
    isLoadingTeamPurchases ||
    isLoadingIndividualPurchases
  )
    return <Loading />;
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
          <TeamPurchaseItems teamPurchases={teamPurchases || { pages: [] }} />
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
