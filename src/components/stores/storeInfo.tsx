import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';

import InfoBox from '@/components/common/infoBox';
import { formatCurrency } from '@/utils/currencyFormatter';
import CallButton from '@/components/stores/callButton';
import InfoButton from '@/components/stores/infoButton';
import { RestaurantType } from '@/types/coreTypes';

interface StoreInfoProps {
  store: RestaurantType;
  onInfoButtonClick: () => void;
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: var(--spacing-xs) var(--spacing-xs);
`;

const InfoRow = styled.div`
  display: flex;
  padding: var(--spacing-xs);
  align-items: flex-start;
  justify-content: space-between;
  font-size: var(--font-size-sm); /* 14px */
`;

const InfoTitle = styled.div`
  flex-basis: 25%;
  font-weight: var(--font-semi-bold);
  text-align: left;
  padding-left: 0;
  color: var(--gray400);
`;

const InfoDescription = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 75%;
  word-wrap: break-word;
  padding-left: 0;
  text-align: left;
  margin-left: var(--spacing-xs);
  color: var(--text);
`;

const InfoBoxWrapper = styled.div`
  justify-content: center;
  padding-top: 0.2rem;
  padding-left: var(--spacing-xs);
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: var(--spacing-sm);
`;

const Title = styled.h1`
  font-size: var(--font-size-xl);
  color: var(--text);
  font-weight: var(--font-semi-bold);
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm) 0;
`;

const StoreInfo: React.FC<StoreInfoProps> = ({ store, onInfoButtonClick }) => {
  return (
    <>
      <TitleContainer>
        <Title>{store.name}</Title>
      </TitleContainer>
      <ButtonContainer>
        <CallButton phoneNumber={store.phoneNumber || 'N/A'} />
        <InfoButton onClick={onInfoButtonClick} />
      </ButtonContainer>
      <Divider
        orientation="horizontal"
        sx={{
          borderWidth: '1px',
          borderColor: 'var(--gray100)',
        }}
      />
      <InfoContainer>
        <InfoRow>
          <InfoTitle>배달비</InfoTitle>
          <InfoDescription>
            {formatCurrency(store.deliveryPrice)}
          </InfoDescription>
        </InfoRow>
        <InfoRow>
          <InfoTitle>배달 시간</InfoTitle>
          <InfoDescription>
            {store.deliveryTimeRange}
            <InfoBoxWrapper>
              <InfoBox
                textItems={[
                  {
                    text: '평균 도착 시간으로, 실제 도착 시간과 차이가 생길 수 있어요.',
                    $textStyle: 'withIcon',
                    id: '1',
                  },
                ]}
                width="9rem"
                showIcon
              />
            </InfoBoxWrapper>
          </InfoDescription>
        </InfoRow>
        <InfoRow>
          <InfoTitle>최소주문금액</InfoTitle>
          <InfoDescription>
            {formatCurrency(store.minPurchasePrice)}
          </InfoDescription>
        </InfoRow>
      </InfoContainer>
      <Divider
        sx={{
          borderWidth: '5px',
          borderColor: 'var(--gray100)',
        }}
      />
    </>
  );
};

export default StoreInfo;
