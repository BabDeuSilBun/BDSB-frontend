'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  getTeamOrderInfo,
  getCurrentHeadCount,
} from '@/services/teamOrderService';
import Loading from '@/app/loading';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
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

const TitleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
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

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
`;

const InfoTable = styled.table`
  width: 95%;
  margin: 0 auto;
  border-collapse: collapse;
  table-layout: fixed;
  th,
  td {
    font-size: var(--font-size-sm); /* 14px */
    color: var(--text);
    padding: var(--spacing-xs) var(--spacing-md);
    text-align: justify;
    vertical-align: top;
  }
  th {
    width: 32%;
    font-weight: var(--font-semi-bold);
    text-align: right;
  }
  td {
    word-wrap: break-word;
  }
`;

const MenuTypeTitle = styled.h2`
  color: var(--primary);
  font-size: var(--font-size-lg); /* 20px */
  font-weight: var(--font-semi-bold);
  text-align: left;
  width: 95%;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-sm) var(--spacing-sm);
`;

const MenuContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 120px;
  margin: 0 auto;
`;

const MenuTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th,
  td {
    padding: var(--spacing-xs) var(--spacing-sm);
    vertical-align: top;
  }

  th {
    font-size: var(--font-size-md); /* 16px */
    color: var(--text);
    font-weight: var(--font-semi-bold);
    text-align: left;
    padding-left: var(--spacing-sm);
  }

  td {
    font-size: var(--font-size-md); /* 16px */
    color: var(--text);
    font-weight: var(--font-regular);
    text-align: right;
  }
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
  const { meetingId } = useParams();

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

  if (isLoadingMeeting) {
    return <Loading />;
  }

  if (isErrorMeeting) {
    return <p>Error loading meeting data</p>;
  }

  return (
    <div>
      <HeaderContainer>
        <Header buttonLeft="back" iconSize={18} text="교촌치킨 00동 1호점" />
      </HeaderContainer>
      <ImageContainer>
        <ImageWrapper>
          <TitleImage
            src={meeting.images[0].url}
            alt={meeting.storeName}
            layout="fill"
            sizes="50vw"
            priority="true"
          />
        </ImageWrapper>
      </ImageContainer>
      <InfoContainer>
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
      </InfoContainer>
      <TableContainer>
        <InfoTable>
          <tbody>
            <tr>
              <th>배달 시기</th>
              <td>
                {meeting.isEarlyPaymentAvailable ? '바로 주문' : '예약 주문'}
              </td>
            </tr>
            <tr>
              <th>모임 장소</th>
              <td>
                {meeting.metAddress.metStreetAddress}{' '}
                {meeting.metAddress.metDetailAddress}
              </td>
            </tr>
            <tr>
              <th>배송비</th>
              <td>{meeting.deliveryFeeRange}</td>
            </tr>
            <tr>
              <th>추가 설명</th>
              <td>{meeting.description}</td>
            </tr>
          </tbody>
        </InfoTable>
      </TableContainer>

      {meeting.purchaseType === '함께 식사' && (
        <>
          <MenuTypeTitle>공통 메뉴</MenuTypeTitle>
          <MenuContainer>
            <MenuTable>
              <tbody>
                <tr>
                  <th>마르게리타</th>
                  <td>{formatCurrency(12000)}</td>
                </tr>
                <tr>
                  <th>페퍼로니</th>
                  <td>{formatCurrency(13000)}</td>
                </tr>
                <tr>
                  <th>하와이안</th>
                  <td>{formatCurrency(14000)}</td>
                </tr>
              </tbody>
            </MenuTable>
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
