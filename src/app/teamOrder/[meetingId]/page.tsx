'use client';

import { useParams, useRouter } from 'next/navigation';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import RemainingAmount from './remainingAmount';
import TeamOrderDetails from './teamOrderDetails';

import Loading from '@/app/loading';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import TeamPurchaseItems from '@/components/meetings/teamPurchaseItems';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import useRemainingTime from '@/hook/useRemainingTime';
import { getIndividualPurchaseList } from '@/services/individualPurchaseService';
import { getRestaurantInfo } from '@/services/restaurantService';
import {
  getCurrentHeadCount,
  getTeamOrderInfo,
} from '@/services/teamOrderService';
import { getTeamPurchaseList } from '@/services/teamPurchaseService';
import Container from '@/styles/container';
import PaddingBox from '@/styles/paddingBox';

const TeamOrderPage = () => {
  const { meetingId } = useParams();
  const router = useRouter();

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
      if (!lastPage || !lastPage.items) {
        // lastPage 또는 lastPage.items가 undefined일 경우 undefined 반환
        return undefined;
      }

      return lastPage.items.last
        ? undefined
        : lastPage.items.pageable.pageNumber + 1;
    },
    initialPageParam: 0,
  });

  const lasElementRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage: hasNextTeamPage,
    isFetchingNextPage: isFetchingNextTeamPage,
    fetchNextPage: fetchNextTeamPage,
  });

  // Fetching individual purchases
  const { data: individualPurchases, isLoading: isLoadingIndividualPurchases } =
    useQuery({
      queryKey: ['imminentTeamOrders', meetingId],
      queryFn: () =>
        getIndividualPurchaseList({
          page: 0,
          size: 1,
          meetingId: Number(meetingId),
        }),
    });

  // Fetching individual purchases with infinite scrolling
  // const {
  //   data: individualPurchases,
  //   fetchNextPage: fetchNextIndividualPage,
  //   hasNextPage: hasNextIndividualPage,
  //   isFetchingNextPage: isFetchingNextIndividualPage,
  //   isLoading: isLoadingIndividualPurchases,
  // } = useInfiniteQuery({
  //   queryKey: ['individualPurchaseList', meetingId],
  //   queryFn: ({ pageParam = 0 }) =>
  //     getIndividualPurchaseList({
  //       meetingId: Number(meetingId),
  //       page: pageParam,
  //       size: 1,
  //     }),
  //   getNextPageParam: (lastPage) => {
  //     const nextPageNumber = lastPage.items.pageable?.pageNumber ?? -1;
  //     return lastPage.items.last ? undefined : nextPageNumber + 1;
  //   },
  //   initialPageParam: 0,
  // });

  // Fetch store information
  const { data: storeInfo } = useQuery({
    queryKey: ['storeInfo', meeting?.storeId],
    queryFn: () => getRestaurantInfo(Number(meeting?.storeId)),
    enabled: !!meeting,
  });

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

  if (isErrorMeeting)
    return (
      <PaddingBox>팀 주문 정보를 불러오는 데 문제가 발생했습니다.</PaddingBox>
    );

  return (
    <>
      <Header buttonLeft="back" text={meeting?.storeName} />
      {meeting && (
        <Container>
          <TeamOrderDetails
            meeting={meeting}
            headCountData={headCountData || null}
            remainingTime={remainingTime}
          />

          {teamPurchases && meeting?.purchaseType === 'DINING_TOGETHER' && (
            <TeamPurchaseItems
              teamPurchases={teamPurchases}
              lastElementRef={lasElementRef}
            />
          )}
          {storeInfo && teamPurchases && individualPurchases && (
            <RemainingAmount
              storeInfo={storeInfo}
              teamPurchases={teamPurchases}
              individualPurchases={individualPurchases}
            />
          )}
        </Container>
      )}

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
