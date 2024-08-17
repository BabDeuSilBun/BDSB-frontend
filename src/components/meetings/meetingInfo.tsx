import styled from 'styled-components';
import InfoBox from '@/components/common/infoBox';

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
  font-size: var(--font-size-sm);
`;

const InfoTitle = styled.div`
  flex-basis: 20%;
  font-weight: var(--font-semi-bold);
  text-align: right;
  color: var(--gray400);
`;

const InfoDescription = styled.div`
  display: flex;
  flex-basis: 75%;
  word-wrap: break-word;
  text-align: justify;
  padding: 0 var(--font-size-md);
  color: var(--text);
`;

const InfoBoxWrapper = styled.div`
  justify-content: center;
  padding-top: 0.2rem;
  padding-left: var(--spacing-xs);
`;

interface MeetingInfoProps {
  meeting: any;
}

const MeetingInfo: React.FC<MeetingInfoProps> = ({ meeting }) => (
  <InfoContainer>
    <InfoRow>
      <InfoTitle aria-hidden="true">배달 시기</InfoTitle>
      <InfoDescription aria-label={`Delivery time: ${meeting.isEarlyPaymentAvailable ? '바로 주문' : '예약 주문'}`}>
        {meeting.isEarlyPaymentAvailable ? '바로 주문' : '예약 주문'}
        <InfoBoxWrapper>
          <InfoBox
            textItems={[
              {
                text: meeting.isEarlyPaymentAvailable
                  ? '최대 모집 인원이 다 차는 즉시 주문합니다.'
                  : '주문 대기 시간에 맞춰서 진행합니다.',
                $textStyle: 'withIcon',
              },
            ]}
            width="8.8rem"
            showIcon={true}
          />
        </InfoBoxWrapper>
      </InfoDescription>
    </InfoRow>
    <InfoRow>
      <InfoTitle aria-hidden="true">모임 장소</InfoTitle>
      <InfoDescription aria-label={`Meeting location: ${meeting.metAddress.metStreetAddress} ${meeting.metAddress.metDetailAddress}`}>
        {`${meeting.metAddress.metStreetAddress} ${meeting.metAddress.metDetailAddress}`}
      </InfoDescription>
    </InfoRow>
    <InfoRow>
      <InfoTitle aria-hidden="true">배송비</InfoTitle>
      <InfoDescription aria-label={`Delivery fee: ${meeting.deliveryFeeRange}`}>
        {meeting.deliveryFeeRange}
      </InfoDescription>
    </InfoRow>
    <InfoRow>
      <InfoTitle aria-hidden="true">추가 설명</InfoTitle>
      <InfoDescription aria-label={`Additional info: ${meeting.description}`}>
        {meeting.description}
      </InfoDescription>
    </InfoRow>
  </InfoContainer>
);

export default MeetingInfo;