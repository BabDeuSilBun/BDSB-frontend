'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  getTeamOrderInfo,
  getCurrentHeadCount,
} from '@/services/teamOrderService';
import { getTeamMenuList, getTeamMenuInfo } from '@/services/teamMenuService';
import Loading from '@/app/loading';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import InfoBox from '@/components/common/infoBox';
import styled from 'styled-components';
import { Divider, Badge } from '@chakra-ui/react';
import GroupIcon from '@/components/svg/group';
import Image from 'next/image';
import { formatCurrency } from '@/utils/currencyFormatter';
import useRemainingTime from '@/hook/useRemainingTime';

const HeaderContainer = styled.div`
  width: 100vw;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;

const ImageWrapper = styled.div`
  width: 90vw;
  height: 25vh;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  position: relative;
  background-color: var(--gray200);
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 0;
  background-color: var(--background);
  gap: var(--spacing-xs);
  width: 100%;
`;

const Text = styled.span`
  font-size: var(--font-size-xs); /* 12px */
  font-weight: var(--font-regular);
  color: var(--text);
`;

const CountdownTimer = styled.span`
  font-size: var(--font-size-xs); /* 12px */
  font-weight: var(--font-regular);
  color: var(--text);
`;

const TimerIcon = styled(Image)`
  width: 18px;
  height: 18px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: var(--spacing-sm);
`;

const InfoRow = styled.div`
  display: flex;
  padding: var(--spacing-xs) var(--spacing-xs);
  align-items: flex-start;
  justify-content: space-between;
  font-size: var(--font-size-sm); /* 14px */
`;
const InfoTitle = styled.div`
  flex-basis: 20%;
  font-weight: var(--font-semi-bold);
  text-align: right;
  color: var(--gray400);
`;

const InfoDescription = styled.div`
  display: flex;
  flex-basis: 70%;
  word-wrap: break-word;
  text-align: justify;
  padding: 0 var(--font-size-md);
  color: var(--text);
`;

const MenuTypeTitle = styled.h2`
  color: var(--primary);
  font-size: var(--font-size-lg); /* 20px */
  font-weight: var(--font-semi-bold);
  text-align: left;
  width: 95%;
  padding: var(--spacing-md) var(--spacing-sm) var(--spacing-sm);
`;

const InfoBoxWrapper = styled.div`
  justify-content: center;
  padding-top: 0.2rem;
  padding-left: var(--spacing-xs);
`;

const MenuContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding-bottom: 6.875rem;
`;

const MenuItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--background);
`;

const MenuItemName = styled.div`
  font-size: var(--font-size-md); /* 16px */
  color: var(--text);
  font-weight: var(--font-semi-bold);
  text-align: left;
`;

const MenuItemPrice = styled.div`
  font-size: var(--font-size-md); /* 16px */
  color: var(--text);
  font-weight: var(--font-regular);
  text-align: right;
`;

const FooterText = styled.div`
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const { meetingId } = useParams();
  const [selectedTeamMenu, setSelectedTeamMenu] = useState<{
    teamPurchaseId: number;
    purchaseId: number;
    menuId: number;
    name: string;
    image: string;
    description: string;
    price: number;
    quantity: number;
  } | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

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
  } = useQuery({
    queryKey: ['headcount', meetingId],
    queryFn: () => getCurrentHeadCount(Number(meetingId)),
    initialData: { currentHeadCount: 0 },
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

  console.log('meetingId:', meetingId);
  console.log('teamMenus:', teamMenus);

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

  const { data: selectedTeamMenuInfo, isLoading: isLoadingTeamMenuInfo } = useQuery({
    queryKey: ['teamMenuInfo', selectedTeamMenu?.purchaseId],
    queryFn: () => getTeamMenuInfo(Number(meetingId), Number(selectedTeamMenu.purchaseId)),
    enabled: !!selectedTeamMenu?.purchaseId, // Only fetch when teamPurchaseId is available
  });

  if (isLoadingMeeting || isLoadingTeamMenus) {
    return <Loading />;
  }

  if (isErrorMeeting) {
    return <p>Error loading meeting data</p>;
  }

  if (isErrorTeamMenus) {
    return <p>Error loading team menu data</p>;
  }

  return (
    <div>
      <HeaderContainer>
        <Header buttonLeft="back" text="교촌치킨 00동 1호점" />
      </HeaderContainer>
      <ImageContainer>
        <ImageWrapper>
          <Image
            src={meeting.images[0].url}
            alt={meeting.storeName}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </ImageWrapper>
      </ImageContainer>
      <StatusContainer>
        <GroupIcon color="var(--primary)" width={18} height={18} />
        <Text>
          {`${headCountData?.currentHeadCount}/${meeting.participantMax} (최소 ${meeting.participantMin}명)`}
        </Text>
        <Divider
          orientation="vertical"
          sx={{
            height: '1.3125rem',
            backgroundColor: 'var(--gray300)',
          }}
        />
        <Badge
          sx={{
            backgroundColor: 'var(--primary)',
            color: '#fff',
            padding: '0.3rem var(--spacing-sm)',
            borderRadius: 'var(--border-radius-lg)',
            fontWeight: 'var(--font-semi-bold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {meeting.purchaseType}
        </Badge>
        <Divider
          orientation="vertical"
          sx={{
            height: '1.3125rem',
            backgroundColor: 'var(--gray300)',
          }}
        />
        <TimerIcon src="/timer.svg" alt="Timer Icon" width={18} height={18} />
        <CountdownTimer>{remainingTime}</CountdownTimer>
      </StatusContainer>
      <InfoContainer>
        <InfoRow>
          <InfoTitle>배달 시기</InfoTitle>
          <InfoDescription>
            {meeting.isEarlyPaymentAvailable ? '바로 주문' : '예약 주문'}
            <InfoBoxWrapper>
              <InfoBox
                textItems={[
                  {
                    text: meeting.isEarlyPaymentAvailable
                      ? '최대 모집 인원이 다 차는 즉시 주문합니다.'
                      : '주문 대기 시간에 맞춰서 진행합니다.',
                    $textStyle: 'DescriptionOnly',
                  },
                ]}
                width="8.8rem"
                showIcon={true}
              />
            </InfoBoxWrapper>
          </InfoDescription>
        </InfoRow>
        <InfoRow>
          <InfoTitle>모임 장소</InfoTitle>
          <InfoDescription>
            {meeting.metAddress.metStreetAddress}{' '}
            {meeting.metAddress.metDetailAddress}
          </InfoDescription>
        </InfoRow>
        <InfoRow>
          <InfoTitle>배송비</InfoTitle>
          <InfoDescription>{meeting.deliveryFeeRange}</InfoDescription>
        </InfoRow>
        <InfoRow>
          <InfoTitle>추가 설명</InfoTitle>
          <InfoDescription>{meeting.description}</InfoDescription>
        </InfoRow>
      </InfoContainer>

      {meeting.purchaseType === '함께 식사' && (
        <>
        <Divider
        orientation="horizontal"
        sx={{
          borderWidth: '3px',
          borderColor: 'var(--gray100)',
        }}
        />
        <MenuTypeTitle>공통 메뉴</MenuTypeTitle>
        <MenuContainer>
          {teamMenus?.pages?.map((page, pageIndex) => (
            page.content.map((item) => (
              <MenuItemRow key={`${pageIndex}-${item.menuId}`}>
                <MenuItemName>{item.name}</MenuItemName>
                <MenuItemPrice>{formatCurrency(item.price)}</MenuItemPrice>
              </MenuItemRow>
            ))
          ))}
        </MenuContainer>
      </>
    )}

      <FooterText>최소 주문 금액까지 0000원 남았어요!</FooterText>
      <Footer
        type="button"
        buttonText="모임 참여하기"
        padding="3rem 1.5rem 1.5rem"
      />
    </div>
  );
};

export default TeamOrderPage;
