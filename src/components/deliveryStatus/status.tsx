'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Badge, Button, Text } from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Loading from '@/app/loading';
import Map from '@/components/deliveryStatus/map';
import OrderDetails from '@/components/deliveryStatus/orderDetails';
import { simulateDeliveryStatus } from '@/mocks/mockData/deliveryStatus';
import { getPostIndividualPurchaseList } from '@/services/postIndividualPurchaseService';
import { getPostTeamPurchaseList } from '@/services/postTeamPurchaseService';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getTeamOrderInfo } from '@/services/teamOrderService';
import { DeliveryStatusMockData } from '@/types/deliveryStatusTypes';

const StatusContainer = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: ${({ $isOpen }) => ($isOpen ? 'auto' : '17.5rem')};
  background-color: var(--background);
  padding: var(--spacing-sm) var(--spacing-md);
  box-shadow: 0px 5px 5px var(--shadow);
  border-radius: 0 0 30px 30px;
  justify-content: space-between;
  position: relative;
  transition: height 0.3s ease;
`;

const StatusInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: var(--spacing-xs);
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 0.1rem;
  height: 90px;
`;

const Title = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-semi-bold);
  color: var(--text);
  margin-right: var(--spacing-xl);
  margin-bottom: var(--spacing-sm);
`;

const Description = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-regular);
  word-break: keep-all;
  white-space: normal;
  overflow-wrap: break-word;
  color: var(--text);
  margin-right: var(--spacing-xl);
`;

const StatusBar = styled.div`
  position: relative;
  height: 9px;
  width: 100%;
  background-color: var(--purple100);
  border-radius: var(--border-radius-default);
  overflow: hidden;
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
`;

const StatusDot = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 9px;
  height: 9px;
  background-color: var(--purple400);
  border-radius: 50%;
  z-index: 1000;
`;

const StartDot = styled(StatusDot)`
  left: 0%;
`;

const MiddleDot = styled(StatusDot)`
  left: 50%;
  transform: translate(-50%, -50%);
`;

const EndDot = styled(StatusDot)`
  right: 0%;
`;

const StatusProgress = styled.div<{ $progress: number }>`
  position: absolute;
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background-color: var(--purple300);
  border-radius: var(--border-radius-default);
`;

const StatusSteps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: var(--spacing-xs);
`;

const StatusStepsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const StatusStepsContainerLeft = styled(StatusStepsContainer)`
  align-items: flex-start;
`;

const StatusStepsContainerRight = styled(StatusStepsContainer)`
  align-items: flex-end;
`;

const StatusIconContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  height: 3rem;
`;

const StatusIconContainerLeft = styled(StatusIconContainer)`
  align-items: flex-start;
`;

const StatusIconContainerRight = styled(StatusIconContainer)`
  align-items: flex-end;
`;

const StatusIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusDescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrivalTime = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-regular);
  color: var(--text);
  margin-top: var(--spacing-xs);
`;

const StatusTitle = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-regular);
  color: var(--text);
`;

const OrderDetailsContainer = styled.div<{ $isOpen: boolean }>`
  z-index: 1000;
  position: relative;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  max-height: ${({ $isOpen }) => ($isOpen ? '100%' : '0')};
  transition:
    opacity 0.3s ease,
    max-height 0.3s ease;
`;

interface StatusProps {
  status: '주문접수' | '배달시작' | '배달거의완료' | '배달완료';
  arrivalTime: string;
}

const Status: React.FC<StatusProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { meetingId: meetingIdParam } = useParams();
  const [statusData, setStatusData] = useState<DeliveryStatusMockData | null>(
    null,
  );

  // Convert meetingId to a number
  const meetingId = Array.isArray(meetingIdParam)
    ? parseInt(meetingIdParam[0], 10)
    : parseInt(meetingIdParam, 10);

  // Use mock delivery status data
  useEffect(() => {
    simulateDeliveryStatus((data) => {
      setStatusData(data);
    });
  }, []);

  // Fetch the post team purchase data with infinite scroll
  const {
    data: teamPurchaseData,
    fetchNextPage: fetchNextPage1,
    hasNextPage: hasNextPage1,
    isFetchingNextPage: isFetchingNextPage1,
    isLoading: isLoadingPostTeamPurchases1,
  } = useInfiniteQuery({
    queryKey: ['postTeamPurchases', meetingId],
    queryFn: ({ pageParam = 0 }) =>
      getPostTeamPurchaseList({
        meetingId,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const nextPageNumber = lastPage.pageable?.pageNumber ?? -1;
      return lastPage.last ? undefined : nextPageNumber + 1;
    },
    initialPageParam: 0,
  });

  // Fetch the post individual purchase data with infinite scroll
  const {
    data: individualPurchaseData,
    fetchNextPage: fetchNextPage2,
    hasNextPage: hasNextPage2,
    isFetchingNextPage: isFetchingNextPage2,
    isLoading: isLoadingPostIndividualPurchases2,
  } = useInfiniteQuery({
    queryKey: ['postIndividualPurchases', meetingId],
    queryFn: ({ pageParam = 0 }) =>
      getPostIndividualPurchaseList({
        meetingId,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const nextPageNumber = lastPage.pageable?.pageNumber ?? -1;
      return lastPage.last ? undefined : nextPageNumber + 1;
    },
    initialPageParam: 0,
  });

  // Fetch meeting data to get storeId
  const { data: meeting, isLoading: isLoadingMeeting } = useQuery({
    queryKey: ['meetingInfo', meetingId],
    queryFn: () => getTeamOrderInfo(Number(meetingId)),
    enabled: !isNaN(meetingId),
  });

  // Fetch store information
  const { data: store, isLoading: isLoadingStore } = useQuery({
    queryKey: ['storeInfo', meeting?.storeId],
    queryFn: () => getRestaurantInfo(Number(meeting?.storeId)),
    enabled: !!meeting?.storeId,
  });

  if (
    isLoadingPostTeamPurchases1 ||
    isLoadingPostIndividualPurchases2 ||
    isLoadingMeeting ||
    isLoadingStore
  )
    return <Loading />;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!statusData) {
    return null;
  }

  const { orderStatus, arrivalTime, remainingTime } = statusData;

  // // Function to calculate remaining time (real calculation, commented out for simulation function)
  // const calculateRemainingTime = (arrivalTime: string): number => {
  //   const [period, time] = arrivalTime.split(' ');
  //   const [hours, minutes] = time.split(':').map(Number);

  //   const arrivalDate = new Date();
  //   arrivalDate.setHours(period === '오후' ? hours + 12 : hours);
  //   arrivalDate.setMinutes(minutes);
  //   arrivalDate.setSeconds(0);

  //   const currentTime = new Date();
  //   const diffMs = arrivalDate.getTime() - currentTime.getTime();
  //   const diffMins = Math.max(Math.round(diffMs / 60000), 0);

  //   return diffMins;
  // };

  // const remainingTime = calculateRemainingTime(arrivalTime);

  const statusDetails = {
    주문접수: {
      title: '맛있게 만들고 있어요',
      description: '맛있게 드실 수 있도록 사장님께서 메뉴를 조리하고 있어요',
      progress: 0,
      showCookingIcon: true,
      showRiderIcon: false,
    },
    배달시작: {
      title: '배달을 시작했어요',
      description: '라이더님이 안전하게 배달 중이에요',
      progress: 50,
      showCookingIcon: false,
      showRiderIcon: true,
    },
    배달거의완료: {
      title: '거의 다 왔어요',
      description: '라이더님이 안전하게 배달 중이에요',
      progress: 90,
      showCookingIcon: false,
      showRiderIcon: false,
    },
    배달완료: {
      title: '배달이 완료 됐습니다',
      description: '바로 드시면 제일 맛있어요',
      progress: 100,
      showCookingIcon: false,
      showRiderIcon: false,
    },
  };

  const { title, description, progress, showCookingIcon, showRiderIcon } =
    statusDetails[orderStatus];

  return (
    <>
      <StatusContainer $isOpen={isOpen}>
        <StatusInfo>
          <Info>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Info>
          <Badge
            sx={{
              width: '70px',
              padding: 'var(--spacing-xs)',
              margin: 'none',
              flexShrink: '0',
              borderRadius: 'var(--border-radius-md)',
              backgroundColor: 'var(--primary)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <div>남은시간</div>
            <Text
              fontSize="var(--font-size-lg)"
              fontWeight="var(--font-semi-bold)"
            >
              {remainingTime}분
            </Text>
          </Badge>
        </StatusInfo>

        <StatusSteps>
          <StatusIconContainerLeft>
            {showCookingIcon && (
              <StatusIconWrapper>
                <Image
                  src="/cooking.svg"
                  alt="Cooking"
                  width="18"
                  height="18"
                />
              </StatusIconWrapper>
            )}
          </StatusIconContainerLeft>

          <StatusIconContainer>
            {showRiderIcon && (
              <StatusIconWrapper>
                <Image src="/rider.svg" alt="Rider" width="24" height="24" />
              </StatusIconWrapper>
            )}
          </StatusIconContainer>

          <StatusIconContainerRight>
            <StatusDescriptionWrapper>
              <ArrivalTime>
                {arrivalTime}
                <br />
                도착예정
              </ArrivalTime>
            </StatusDescriptionWrapper>
          </StatusIconContainerRight>
        </StatusSteps>

        <StatusBar>
          <StartDot />
          <MiddleDot />
          <EndDot />
          <StatusProgress $progress={progress} />
        </StatusBar>

        <StatusSteps>
          <StatusStepsContainerLeft>
            <StatusTitle>주문접수</StatusTitle>
          </StatusStepsContainerLeft>
          <StatusStepsContainer>
            <StatusTitle>배달시작</StatusTitle>
          </StatusStepsContainer>
          <StatusStepsContainerRight>
            <StatusTitle>배달완료</StatusTitle>
          </StatusStepsContainerRight>
        </StatusSteps>

        <Button
          rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          variant="outline"
          onClick={handleToggle}
          sx={{
            marginTop: 'var(--spacing-xs)',
            width: '100%',
            height: '3rem',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-regular)',
            color: 'var(--text)',
            _hover: {
              backgroundColor: 'transparent',
            },
            _active: {
              backgroundColor: 'transparent',
            },
            _focus: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          {isOpen ? '주문정보 닫기' : '주문정보 열기'}
        </Button>
        {isOpen && (
          <OrderDetailsContainer $isOpen={isOpen}>
            {teamPurchaseData?.pages.map((page, pageIndex) => (
              <OrderDetails
                key={pageIndex}
                storeName={store.name}
                info1Description={
                  meeting?.isEarlyPaymentAvailable ? '바로 주문' : '예약 주문'
                }
                info2Description={meeting?.purchaseType || ''}
                info3Description="서울 특별시 한국대학교 땡땡구 33번길 12"
                purchaseType1="공통메뉴"
                menuItems1={page.content}
                fetchNextPage1={fetchNextPage1}
                hasNextPage1={hasNextPage1 || false}
                isFetchingNextPage1={isFetchingNextPage1}
                purchaseType2="개별메뉴"
                menuItems2={
                  individualPurchaseData?.pages[pageIndex]?.content || []
                }
                fetchNextPage2={fetchNextPage2}
                hasNextPage2={hasNextPage2 || false}
                isFetchingNextPage2={isFetchingNextPage2}
              />
            ))}
            {(isFetchingNextPage1 || isFetchingNextPage2) && <Loading />}
          </OrderDetailsContainer>
        )}
      </StatusContainer>

      {!isOpen && (
        <Map
          orderStatus={orderStatus}
          deliveryPosition={statusData.deliveryPosition}
          restaurantPosition={statusData.restaurantPosition}
          riderPosition={statusData.riderPosition}
        />
      )}
    </>
  );
};

export default Status;
