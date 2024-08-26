'use client';

import { useState } from 'react';

import styled from 'styled-components';
import { Badge, Button, Text } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Image from 'next/image';

import OrderDetails from '@/components/deliveryStatus/orderDetails';

const StatusContainer = styled.div`
  width: 100%;
  height: 18rem;
  background-color: var(--background);
  padding: var(--spacing-sm);
  box-shadow: 0px 5px 5px var(--shadow);
  border-radius: 0 0 30px 30px;
  justify-content: space-between;
  position: relative;
`;

const StatusInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: var(--spacing-md);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
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

const StatusProgress = styled.div<{ progress: number }>`
  position: absolute;
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
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
  title: string;
  description: string;
  badgeDescription: string;
  progress: number; // progress percentage (0-100)
}

const Status: React.FC<StatusProps> = ({
  title,
  description,
  badgeDescription,
  progress,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <StatusContainer>
        <StatusInfo>
          <Info>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Info>
          <Badge
            sx={{
              width: '90px',
              padding: 'var(--spacing-xs)',
              margin: 'none',
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
              {badgeDescription}분
            </Text>
          </Badge>
        </StatusInfo>

        <StatusSteps>
          <StatusIconContainer>
            <StatusIconWrapper>
              <Image src="/cooking.svg" alt="Cooking" width="18" height="18" />
            </StatusIconWrapper>
          </StatusIconContainer>

          <StatusIconContainer>
            <StatusIconWrapper>
              <Image src="/rider.svg" alt="Rider" width="24" height="24" />
            </StatusIconWrapper>
          </StatusIconContainer>

          <StatusIconContainer>
            <StatusDescriptionWrapper>
              <ArrivalTime>
                오후 5:45
                <br />
                도착예정
              </ArrivalTime>
            </StatusDescriptionWrapper>
          </StatusIconContainer>
        </StatusSteps>

        <StatusBar>
          <StartDot />
          <MiddleDot />
          <EndDot />
          <StatusProgress progress={progress} />
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
            marginTop: 'auto',
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
        <OrderDetailsContainer $isOpen={isOpen}>
          <OrderDetails
            storeName="교촌치킨 00동 1호점"
            info1Description="바로 주문"
            info2Description="함께 식사"
            info3Description="서울 특별시 한국대학교 땡땡구 33번길 12"
            purchaseType1="공통메뉴"
            menuItem1Name="교촌 오리지널 1마리"
            menuItem1Price="38,000원"
            menuItem1Quantity={2}
            purchaseType2="개별메뉴"
            menuItem2Name="후라이드 치킨 날개 & 다리"
            menuItem2Price="19,000원"
            menuItem2Quantity={1}
          />
        </OrderDetailsContainer>
      </StatusContainer>
    </>
  );
};

export default Status;
