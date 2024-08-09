'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation'; // Import useParams
import Modal from '@/components/common/modal';
import { useQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import Loading from '@/app/loading';

const RestaurantPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { restaurantId } = useParams();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<{
    name: string;
    description: string;
    imageUrl: string;
  } | null>(null);

  const {
    data: restaurantData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurantInfo', restaurantId],
    queryFn: () => getRestaurantInfo(Number(restaurantId)),
  });

  useEffect(() => {
    const contextParam = searchParams.get('context');
    setContext(contextParam);
  }, [searchParams]);

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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error loading restaurant data</p>;
  }

  return (
    <div>
      {restaurantData && (
        <>
          {/* {context === 'leaderBefore' && ( */}
          {/* <> */}
          <div>
            <button type="button" onClick={() => openModal('infoModal')}>
              Show Restaurant Info
            </button>
          </div>
          {restaurantData.menuItems.map((menuItem) => (
            <div>
              <button
                key={menuItem.id}
                type="button"
                onClick={() => openModal('startModal', menuItem)}
              >
                {menuItem.name}
              </button>
            </div>
          ))}
          {/* </> */}
          {/* )} */}

          {/* {context === 'leaderAfter' && ( */}
          <div>
            {restaurantData.menuItems.map((menuItem) => (
              <div key={menuItem.id}>
                <button
                  type="button"
                  onClick={() => openModal('leaderOder', menuItem)}
                >
                  Leader Add {menuItem.name}
                </button>
              </div>
            ))}
          </div>
          {/* )} */}

          {/* {context === 'participant' && ( */}
          <div>
            {restaurantData.menuItems.map((menuItem) => (
              <div key={menuItem.name}>
                <button
                  type="button"
                  onClick={() => openModal('participantOder', menuItem)}
                >
                  Participant Add {menuItem.name}
                </button>
              </div>
            ))}
          </div>
          {/* )} */}

          {activeModal === 'infoModal' && (
            <Modal
              type="info"
              title1={restaurantData.name}
              description={restaurantData.description}
              address1={restaurantData.streetAddress}
              address2={restaurantData.detailAddress}
              openTime={restaurantData.openTime}
              closeTime={restaurantData.closeTime}
              closeDay={restaurantData.closeDay}
              buttonText="닫기"
              onButtonClick3={closeModal}
            />
          )}

          {activeModal === 'startModal' && selectedMenu && (
            <Modal
              type="image"
              title1={selectedMenu.name}
              description={selectedMenu.description}
              imageUrl={selectedMenu.imageUrl}
              buttonText1="모임 만들기"
              buttonText2="닫기"
              onButtonClick1={() => console.log('Start team order')}
              onButtonClick2={closeModal}
            />
          )}

          {activeModal === 'leaderOder' && (
            <Modal
              type="image"
              title1={selectedMenu?.name}
              description={selectedMenu?.description}
              imageUrl={selectedMenu?.imageUrl}
              buttonText1="공통메뉴"
              buttonText2="개별메뉴"
              onButtonClick1={() => console.log('Leader order')}
              onButtonClick2={closeModal}
            />
          )}

          {activeModal === 'participantOder' && (
            <Modal
              type="image"
              title1={selectedMenu?.name}
              description={selectedMenu?.description}
              imageUrl={selectedMenu?.imageUrl}
              buttonText1="개별메뉴"
              buttonText2="닫기"
              onButtonClick1={() => console.log('Participant order')}
              onButtonClick2={closeModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantPage;
