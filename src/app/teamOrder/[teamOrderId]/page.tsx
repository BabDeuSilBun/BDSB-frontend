'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Divider, Badge } from '@chakra-ui/react';
import GroupIcon from '@/components/svg/group';
import Image from 'next/image';
import { formatCurrency } from '@/utils/currencyFormatter';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

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
  width: 81.67vw;
  height: 21vh;
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
  padding: var(--spacing-sm);
  background-color: var(--background);
  gap: var(--spacing-xs);
`;

const Text = styled.span`
  font-size: var(--font-size-xs); /* 12px */
  font-weight: var(--font-regular);
  color: var(--text);
`;

const VerticalDivider = styled(Divider)`
  height: auto;
  width: calc(21px / 16);
  background-color: var(--gray300);
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

const TeamOrderPage = () => {
  const [timeLeft, setTimeLeft] = useState('00:00:00');
 
  useEffect(() => {
    const countdown = () => {
      // Simulate countdown logic here, updating timeLeft
      // For simplicity, we're just setting a static value
      setTimeLeft('01:23:45');
    };

    countdown();

    const interval = setInterval(countdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <HeaderContainer>
        <Header 
          buttonLeft="back" 
          iconSize={18}
          text="교촌치킨 00동 1호점"
        />
      </HeaderContainer>
      <ImageContainer>
        <ImageWrapper>
          <TitleImage
            src="https://via.placeholder.com/300x200"
            alt="Example Image"
            layout="fill"
            sizes="50vw"
            priority="true"
          />
        </ImageWrapper>
      </ImageContainer>
      <InfoContainer>
        <GroupIcon color="var(--primary)" width={18} height={18} />
        <Text>2/5 (최소 3명)</Text>
        <VerticalDivider orientation="vertical" />
        <Badge
          sx={{
            backgroundColor: 'var(--primary)',
            color: '#fff',
            padding: '0.3rem var(--spacing-sm)',
            borderRadius: 'var(--border-radius-lg)',
            fontWeight: 'var(--font-regular)',
          }}
        >
          각자 식사
        </Badge>
        <VerticalDivider orientation="vertical" />
        <TimerIcon src="/timer.svg" alt="Timer Icon" width={18} height={18} />
        <CountdownTimer>{timeLeft}</CountdownTimer>
      </InfoContainer>
      <Footer type="button" buttonText="모임 참여하기" />
    </div>
  );
};

export default TeamOrderPage;