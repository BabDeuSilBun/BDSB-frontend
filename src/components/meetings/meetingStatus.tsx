import styled from 'styled-components';
import { Badge, Divider } from '@chakra-ui/react';
import Image from 'next/image';

import GroupIcon from '@/components/svg/group';
import { MeetingType } from '@/types/coreTypes';

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-sm) var(--spacing-md) 0;
  background-color: var(--background);
  gap: var(--spacing-xs);
  width: 100%;
`;

const Text = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-regular);
  color: var(--text);
`;

const CountdownTimer = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-regular);
  color: var(--text);
`;

const TimerIcon = styled(Image)`
  width: 18px;
  height: 18px;
`;

interface MeetingStatusProps {
  headCountData: { currentHeadCount: number } | null;
  meeting?: MeetingType;
  remainingTime: string;
}

const MeetingStatus: React.FC<MeetingStatusProps> = ({
  headCountData,
  meeting,
  remainingTime,
}) => (
  <StatusContainer>
    <GroupIcon
      color="var(--primary)"
      width={18}
      height={18}
      aria-hidden="true"
    />
    <Text aria-label="Current and maximum participants">
      {`${headCountData?.currentHeadCount}/${meeting?.participantMax} (최소 ${meeting?.participantMin}명)`}
    </Text>
    <Divider
      orientation="vertical"
      sx={{ height: '1.3125rem', backgroundColor: 'var(--gray300)' }}
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
      aria-label={`Purchase type: ${meeting?.purchaseType}`}
    >
      {meeting?.purchaseType}
    </Badge>
    <Divider
      orientation="vertical"
      sx={{ height: '1.3125rem', backgroundColor: 'var(--gray300)' }}
    />
    <TimerIcon src="/timer.svg" alt="Timer Icon" width={18} height={18} />
    <CountdownTimer aria-label={`Time remaining: ${remainingTime}`}>
      {remainingTime}
    </CountdownTimer>
  </StatusContainer>
);

export default MeetingStatus;
