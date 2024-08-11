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
  width: 360px;
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
  margin: var(--spacing-xs) 0;
  background-color: var(--background);
  position: relative;
`;

const InfoRow = styled.div`
  display: flex;
  padding: var(--spacing-xs);
`;

const InfoTitle = styled.div`
  flex: 1;
  font-size: var(--font-size-xs);
  font-weight: var(--font-semi-bold);
  color: var(--gray400);
  text-align: left;
`;

const InfoDescription = styled.div`
  flex: 2;
  font-size: var(--font-size-xs);
  font-weight: var(--font-regular);
  color: var(--text);
  text-align: left;
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
  // const router = useRouter();
  // const searchParams = useSearchParams();
  const { storeId } = useParams();
  // const [activeModal, setActiveModal] = useState<string | null>(null);
  // const [context, setContext] = useState<string | null>(null);
  // const [selectedMenu, setSelectedMenu] = useState<{
  //   name: string;
  //   description: string;
  //   imageUrl: string;
  // } | null>(null);

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

  // useEffect(() => {
  //   const contextParam = searchParams.get('context');
  //   setContext(contextParam);
  // }, [searchParams]);

  // const openModal = (
  //   modalName: string,
  //   menuItem?: { name: string; description: string; imageUrl: string },
  // ) => {
  //   setActiveModal(modalName);
  //   if (menuItem) {
  //     setSelectedMenu(menuItem);
  //   } else {
  //     setSelectedMenu(null);
  //   }
  // };

  // const closeModal = () => {
  //   setActiveModal(null);
  //   setSelectedMenu(null);
  // };

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
      <Carousel />
      <TitleContainer>
          <Title>{store.name}</Title>
      </TitleContainer>
      <ButtonContainer>
        <CallButton phoneNumber={store.phoneNumber || 'N/A'} />
        <InfoButton />
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
        orientation="horizontal" 
        sx={{ 
          borderWidth: '5px',
          borderColor: 'var(--gray100)'
        }} 
      />
      <MenuItemContainer>
        {menus.content.map((menu: MenuType, index: number) => (
          <MenuItem 
            key={menu.menuId}
            menuName={menu.name}
            price={menu.price}
            imageUrl={menu.image}
            hasDivider={index !== menus.content.length - 1}
          />
        ))}
      </MenuItemContainer>
      <Footer type="button" buttonText="모임 만들기" />
    </div>
    // <div>
    //   {restaurantData && (
    //     <>
    //       {/* {context === 'leaderBefore' && ( */}
    //       {/* <> */}
    //       <div>
    //         <InfoButton onClick={() => openModal('infoModal')} />
    //       </div>
    //       {restaurantData.menuItems.map((menuItem) => (
    //         <div>
    //           <button
    //             key={menuItem.id}
    //             type="button"
    //             onClick={() => openModal('startModal', menuItem)}
    //           >
    //             {menuItem.name}
    //           </button>
    //         </div>
    //       ))}
    //       {/* </> */}
    //       {/* )} */}

    //       {/* {context === 'leaderAfter' && ( */}
    //       <div>
    //         {restaurantData.menuItems.map((menuItem) => (
    //           <div key={menuItem.id}>
    //             <button
    //               type="button"
    //               onClick={() => openModal('leaderOder', menuItem)}
    //             >
    //               Leader Add {menuItem.name}
    //             </button>
    //           </div>
    //         ))}
    //       </div>
    //       {/* )} */}

    //       {/* {context === 'participant' && ( */}
    //       <div>
    //         {restaurantData.menuItems.map((menuItem) => (
    //           <div key={menuItem.name}>
    //             <button
    //               type="button"
    //               onClick={() => openModal('participantOder', menuItem)}
    //             >
    //               Participant Add {menuItem.name}
    //             </button>
    //           </div>
    //         ))}
    //       </div>
    //       {/* )} */}

    //       {activeModal === 'infoModal' && (
    //         <Modal
    //           type="info"
    //           title1={restaurantData.name}
    //           description={restaurantData.description}
    //           address1={restaurantData.streetAddress}
    //           address2={restaurantData.detailAddress}
    //           openTime={restaurantData.openTime}
    //           closeTime={restaurantData.closeTime}
    //           closeDay={restaurantData.closeDay}
    //           buttonText="닫기"
    //           onButtonClick3={closeModal}
    //         />
    //       )}

    //       {activeModal === 'startModal' && selectedMenu && (
    //         <Modal
    //           type="image"
    //           title1={selectedMenu.name}
    //           description={selectedMenu.description}
    //           imageUrl={selectedMenu.imageUrl}
    //           buttonText1="모임 만들기"
    //           buttonText2="닫기"
    //           onButtonClick1={() => console.log('Start team order')}
    //           onButtonClick2={closeModal}
    //         />
    //       )}

    //       {activeModal === 'leaderOder' && (
    //         <Modal
    //           type="image"
    //           title1={selectedMenu?.name}
    //           description={selectedMenu?.description}
    //           imageUrl={selectedMenu?.imageUrl}
    //           buttonText1="공통메뉴"
    //           buttonText2="개별메뉴"
    //           onButtonClick1={() => console.log('Leader order')}
    //           onButtonClick2={closeModal}
    //         />
    //       )}

    //       {activeModal === 'participantOder' && (
    //         <Modal
    //           type="image"
    //           title1={selectedMenu?.name}
    //           description={selectedMenu?.description}
    //           imageUrl={selectedMenu?.imageUrl}
    //           buttonText1="개별메뉴"
    //           buttonText2="닫기"
    //           onButtonClick1={() => console.log('Participant order')}
    //           onButtonClick2={closeModal}
    //         />
    //       )}
    //     </>
    //   )}
    // </div>
  );
};

export default StorePage;
