'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getMenusForStore } from '@/services/menuService';
import { MenuType } from '@/types/coreTypes';
import Loading from '@/app/loading';
import Header from '@/components/layout/header';
import Carousel from '@/components/carousel/carousel';
import CallButton from '@/components/customButton/callButton';
import InfoButton from '@/components/customButton/infoButton';
import InfoBox from '@/components/infoBox/infoBox';
import MenuItem from '@/components/listItems/menuItem';
import Footer from '@/components/layout/footer';
import Modal from '@/components/common/modal';
import styled from 'styled-components';
import BackIconWhite from '@/components/svg/arrowLeftWhite';
import HomeIconWhite from '@/components/svg/homeWhite';
import CartIconWhite from '@/components/svg/cartWhite';
import { Divider } from '@chakra-ui/react';
import { formatCurrency } from '@/utils/currencyFormatter';

const HeaderContainer = styled.div`
  width: 100vw;
  margin: 0 auto;
  header {
    background-color: transparent;
    box-shadow: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: var(--spacing-sm) 0 0 0;
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

const InfoContainer = styled.div`
  width: 100%;
  margin: var(--spacing-xs) var(--spacing-xs);
  background-color: var(--background);
  position: relative;
`;

const InfoRow = styled.div`
  display: flex;
  padding: var(--spacing-xs);
`;

const InfoTitle = styled.div`
  width: 8.5rem;
  font-size: var(--font-size-xs);
  font-weight: var(--font-semi-bold);
  color: var(--gray400);
`;

const InfoDescription = styled.div`
  font-size: var(--font-size-xs);
  font-weight: var(--font-regular);
  color: var(--text);
  margin-left: -3rem;
`;

const InfoBoxContainer = styled.div`
  position: absolute;
  top: 44px;
  left: 145px;
  z-index: 10;
`;

const MenuItemContainer = styled.div`
  padding-bottom: 110px;
`;

const StorePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { storeId } = useParams();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<{
    name: string;
    description: string;
    imageUrl: string;
  } | null>(null);
  
  const {
    data: store,
    isLoading: isLoadingStore,
    isError: isErrorStore,
  } = useQuery({
    queryKey: ['storeInfo', storeId],
    queryFn: () => getRestaurantInfo(Number(storeId)),
  });
  
  const {
    data: menus,
    isLoading: isLoadingMenus,
    isError: isErrorMenus,
  } = useQuery({
    queryKey: ['storeMenus', storeId],
    queryFn: () => getMenusForStore(Number(storeId)),
  });
  
  const openModal = (
    modalName: string,
    menuItem?: { name: string; description: string; imageUrl: string },
  ) => {
    setActiveModal(modalName);
    if (menuItem) {
      setSelectedMenu(menuItem);
    } else {
      setSelectedMenu(null);
    }
  };
  
  const closeModal = () => {
    setActiveModal(null);
    setSelectedMenu(null);
  };
  
  const handleInfoButtonClick = () => {
    setActiveModal('infoModal');
  };
  
  useEffect(() => {
    const contextParam = searchParams.get('context');
    setContext(contextParam);
  }, [searchParams]);

  if (isLoadingStore || isLoadingMenus) {
    return <Loading />;
  }
  
  if (isErrorStore) {
    return <p>Error loading restaurant data</p>;
  }
  
  if (isErrorMenus) {
    return <p>Error loading menu data</p>;
  }
  
  return (
    <div>
      <HeaderContainer>
        <Header 
          buttonLeft="back" 
          buttonRight="home" 
          buttonRightSecondary="cart"
          iconColor="white"
          iconSize={24}
        />
      </HeaderContainer>
      <Carousel images={store.images} />
      <TitleContainer>
          <Title>{store.name}</Title>
      </TitleContainer>
      <ButtonContainer>
        <CallButton phoneNumber={store.phoneNumber || 'N/A'} />
        <InfoButton onClick={handleInfoButtonClick} />
      </ButtonContainer>
      <Divider 
        orientation="horizontal" 
        sx={{ 
          borderWidth: '1px',
          borderColor: 'var(--gray100)'
        }} 
      />
      <InfoContainer>
        <InfoRow>
          <InfoTitle>배달비</InfoTitle>
          <InfoDescription>{formatCurrency(store.deliveryPrice)}</InfoDescription>
        </InfoRow>
        <InfoRow>
          <InfoTitle>배달 시간</InfoTitle>
          <InfoDescription>{store.deliveryTime}</InfoDescription>
        </InfoRow>
        <InfoBoxContainer>
          <InfoBox
            textItems={[
              { 
                text: '평균 도착 시간으로, 실제 도착 시간과 차이가 생길 수 있어요.', 
                $textStyle: 'CenteredText',
              }
            ]}
            width="163px"
          />
        </InfoBoxContainer>
        <InfoRow>
          <InfoTitle>최소주문금액</InfoTitle>
          <InfoDescription>{formatCurrency(store.minPurchasePrice)}</InfoDescription>
        </InfoRow>
      </InfoContainer>
      <Divider 
        sx={{ 
          borderWidth: '5px',
          borderColor: 'var(--gray100)'
        }} 
      />

      {/* Context-specific code */}
      <div>
        {context === 'leaderBefore' && (
          <div>
            {menus?.content.map((menuItem, index) => (
              <MenuItem
                key={menuItem.menuId}
                menuName={menuItem.name}
                price={menuItem.price}
                imageUrl={menuItem.image}
                hasDivider={index !== menus.content.length - 1}
                onClick={() => openModal('startModal', menuItem)}
              />
            ))}
            <Footer type="button" buttonText="모임 만들기" />
          </div>
        )}

        {context === 'leaderAfter' && (
          <div>
            {menus?.content.map((menuItem, index) => (
              <MenuItem
                key={menuItem.menuId}
                menuName={menuItem.name}
                price={menuItem.price}
                imageUrl={menuItem.image}
                hasDivider={index !== menus.content.length - 1}
                onClick={() => openModal('leaderOder', menuItem)}
              />
            ))}
            <Footer type="button" buttonText="모임 만들기" />
          </div>
        )}

        {context === 'participant' && (
          <div>
            {menus?.content.map((menuItem, index) => (
              <MenuItem
                key={menuItem.menuId}
                menuName={menuItem.name}
                price={menuItem.price}
                imageUrl={menuItem.image}
                hasDivider={index !== menus.content.length - 1}
                onClick={() => openModal('participantOder', menuItem)}
              />
            ))}
            <Footer type="button" buttonText="장바구니로 이동" />
          </div>
        )}
      </div>

      {/* Modal handling */}
      {activeModal === 'infoModal' && (
        <Modal
          type="info"
          title1={store.name}
          description={store.description}
          address1={store.address.streetAddress}
          address2={store.address.detailAddress}
          openTime={store.openTime}
          closeTime={store.closeTime}
          dayOfWeek={store.dayOfWeek}
          buttonText="닫기"
          onButtonClick3={closeModal}
        />
      )}

      {activeModal === 'startModal' && selectedMenu && (
        <Modal
          type="image"
          imageUrl={selectedMenu?.image}
          title1={selectedMenu.name}
          description={selectedMenu.description}
          buttonText1="모임 만들기"
          buttonText2="닫기"
          onButtonClick1={() => console.log('Start team order')}
          onButtonClick2={closeModal}
        />
      )}

      {activeModal === 'leaderOder' && (
        <Modal
          type="image"
          imageUrl={selectedMenu?.image}
          title1={selectedMenu?.name}
          description={selectedMenu?.description}
          buttonText1="공통메뉴"
          buttonText2="개별메뉴"
          onButtonClick1={() => console.log('Team menu')}
          onButtonClick2={() => console.log('Individual menu')}
        />
      )}

      {activeModal === 'participantOder' && (
        <Modal
          type="image"
          imageUrl={selectedMenu?.image}
          title1={selectedMenu?.name}
          description={selectedMenu?.description}
          buttonText1="개별메뉴"
          buttonText2="닫기"
          onButtonClick1={() => console.log('Participant order')}
          onButtonClick2={closeModal}
        />
      )}
    </div>
  );
};

export default StorePage;
