import Image from 'next/image';

import styled from 'styled-components';

import MeetingInfo from '@/components/meetings/meetingInfo';
import MeetingStatus from '@/components/meetings/meetingStatus';
import { MeetingType } from '@/types/coreTypes';

interface teamOrderProps {
  meeting: MeetingType;
  headCountData: { currentHeadCount: number } | null;
  remainingTime: string;
}

const ImageWrapper = styled.div`
  width: 90vw;
  height: 15rem;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  position: relative;
  background-color: var(--gray200);
  margin: 0 auto;
`;

const TeamOrderDetails = ({
  meeting,
  headCountData,
  remainingTime,
}: teamOrderProps) => (
  <>
    <ImageWrapper>
      {meeting.storeImage && (
        <Image
          src={meeting.storeImage[0].url}
          alt={'가게 이미지'}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      )}
    </ImageWrapper>

    <MeetingStatus
      headCountData={headCountData || null}
      meeting={meeting}
      remainingTime={remainingTime}
    />
    <MeetingInfo meeting={meeting} />
  </>
);

export default TeamOrderDetails;
