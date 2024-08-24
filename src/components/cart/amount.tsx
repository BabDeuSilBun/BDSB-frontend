import styled from 'styled-components';
import InfoBox from '@/components/common/infoBox';
import { formatCurrency } from '@/utils/currencyFormatter';

interface AmountProps {
  orderAmount: number;
  maxDeliveryFee: number;
  minCommonMenuDiscount: number;
  availablePoints: number;
  totalPrice: number;
}

const Container = styled.div`
  background-color: var(--background);
  margin: var(--spacing-sm) 0;
  padding-bottom: 70px;
`;

const MenuTypeTitle = styled.h2`
  color: var(--text);
  font-size: var(--font-size-md);
  font-weight: var(--font-semi-bold);
  text-align: left;
  padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm);
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.08rem;
`;

const MenuItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--background);
`;

const MenuItemName = styled.div`
  font-size: var(--font-size-md);
  color: var(--text);
  font-weight: var(--font-regular);
  text-align: left;
`;

const MenuItemPrice = styled.div`
  font-size: var(--font-size-md);
  color: var(--text);
  font-weight: var(--font-regular);
  text-align: right;
`;

const InfoboxWrapper = styled.div`
  padding: var(--spacing-sm);
`;

const TotalTitle = styled.h1`
  color: var(--text);
  font-size: var(--font-size-lg);
  font-weight: var(--font-semi-bold);
  text-align: left;
`;

const TotalPrice = styled.div`
  font-size: var(--font-size-xl);
  color: var(--text);
  font-weight: var(--font-semi-bold);
  text-align: right;
`;

const Description = styled.p`
  font-size: var(--font-size-xs);
  color: var(--gray400);
  font-weight: var(--font-regular);
  text-align: justify;
  padding: var(--spacing-sm);
`;

const Amount: React.FC<AmountProps> = ({
  orderAmount,
  maxDeliveryFee,
  minCommonMenuDiscount,
  availablePoints,
  totalPrice,
}) => (
  <Container>
    <MenuTypeTitle>결제 예상 금액</MenuTypeTitle>
    <MenuContainer>
      <MenuItemRow>
        <MenuItemName>주문 금액</MenuItemName>
        <MenuItemPrice>{formatCurrency(orderAmount)}</MenuItemPrice>
      </MenuItemRow>
      <MenuItemRow>
        <MenuItemName>최대 배송비</MenuItemName>
        <MenuItemPrice>{formatCurrency(maxDeliveryFee)}</MenuItemPrice>
      </MenuItemRow>
      <MenuItemRow>
        <MenuItemName>공통 메뉴 최소 할인</MenuItemName>
        <MenuItemPrice>{formatCurrency(minCommonMenuDiscount)}</MenuItemPrice>
      </MenuItemRow>
      <MenuItemRow>
        <MenuItemName>사용 사능한 포인트</MenuItemName>
        <MenuItemPrice>{formatCurrency(availablePoints)}</MenuItemPrice>
      </MenuItemRow>
    </MenuContainer>
    <InfoboxWrapper>
      <InfoBox
        textItems={[
          { id: 1, text: '자세한 계산방법이 궁금해요!', $textStyle: 'Title' },
          {
            id: 2,
            text: '최대 배송비: 총 배송비 ÷ 최소 모집 인원 수',
            $textStyle: 'Description',
          },
          {
            id: 3,
            text: '공통 메뉴 최소 할인: 공통 메뉴 음식 가격 ÷ 최소 모집 인원 수 x',
            $textStyle: 'Description',
          },
          {
            id: 4,
            text: '본인을 제외한 최소 모집 인원 수',
            $textStyle: 'Description',
          },
        ]}
        showIcon={false}
      />
    </InfoboxWrapper>
    <MenuItemRow>
      <TotalTitle>총 결제 예상 금액</TotalTitle>
      <TotalPrice>{formatCurrency(totalPrice)}</TotalPrice>
    </MenuItemRow>
    <Description>
      (주)밥드실분은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 따라서
      (주)밥드실분은 상품, 거래 정보 및 거래에 대하여 책임을 지지 않습니다.
    </Description>
  </Container>
);

export default Amount;
