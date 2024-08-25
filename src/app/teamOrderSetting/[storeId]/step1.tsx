'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRestaurantInfo } from '@/services/restaurantService';
import { getMyData } from '@/services/myDataService';
import { RestaurantType } from '@/types/coreTypes';
import { MyDataType } from '@/types/myDataTypes';
import { useOrderStore } from '@/state/orderStore';
import SettingImage from '@/components/meetings/settingImage';
import SettingLabel from '@/components/meetings/settingLabel';
import SettingAddress from '@/components/meetings/settingAddress';
import TimeInput from '@/components/common/timeInput';
import { CustomDropdown } from '@/components/common/dropdown';
import InfoBox from '@/components/common/infoBox';
import ErrorMessage from '@/components/meetings/errorMessage';
import DefaultAddress from '@/components/meetings/defaultAddress';
import { Address as DaumPostcodeAddress } from 'react-daum-postcode';
import { StoredAddress } from '@/state/orderStore';

interface Step1Props {
  isPostcodeOpen: boolean;
  setIsPostcodeOpen: (open: boolean) => void;
}

const Step1: FC<Step1Props> = ({ isPostcodeOpen, setIsPostcodeOpen }) => {
  // Store and state hooks
  const {
    formData,
    setPurchaseType,
    setOrderType,
    setIsEarlyPaymentAvailable,
    setDeliveredAddress,
    isUsingDefaultAddress,
    setIsUsingDefaultAddress,
    setMetAddress,
    setTime,
    setPaymentAvailableAt,
    setButtonActive,
    setStoreId,
  } = useOrderStore();

  const { purchaseType, orderType, metAddress, time } = formData;
  const { deliveredAddress } = formData;
  const [error, setError] = useState<string | null>(null);
  const [defaultAddress, setDefaultAddress] = useState<
    MyDataType['address'] | null
  >(null);

  const { storeId } = useParams();

  // Dropdown options
  const optionsPurchaseType = [
    { id: 'together', name: '함께 식사', value: '함께 식사' },
    { id: 'individual', name: '각자 식사', value: '각자 식사' },
  ];

  const optionsOrderType = [
    { id: 'instant', name: '바로 주문', value: '바로 주문' },
    { id: 'reservation', name: '예약 주문', value: '예약 주문' },
  ];

  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const handleToggleDropdown1 = () => {
    setIsDropdownOpen1((prev) => !prev);
  };

  const handleToggleDropdown2 = () => {
    setIsDropdownOpen2((prev) => !prev);
  };

  // Fetching data
  useEffect(() => {
    setStoreId(Number(storeId));
  }, [storeId, setStoreId]);

  const { data: store } = useQuery<RestaurantType>({
    queryKey: ['storeInfo', storeId],
    queryFn: () => getRestaurantInfo(Number(storeId)),
    enabled: !!storeId,
  });

  const { data: myData, isLoading } = useQuery<MyDataType, Error>({
    queryKey: ['myData'],
    queryFn: getMyData,
    enabled: isUsingDefaultAddress,
  });

  useEffect(() => {
    if (myData?.address && isUsingDefaultAddress) {
      setDefaultAddress(myData.address);
      setDeliveredAddress({
        postal: myData.address.postal,
        streetAddress: myData.address.streetAddress,
        detailAddress: myData.address.detailAddress,
      });
    }
  }, [myData, isUsingDefaultAddress, setDefaultAddress, setDeliveredAddress]);

  const handleAddressChange = (addressData: DaumPostcodeAddress) => {
    const formattedAddress: StoredAddress = {
      postal: addressData.zonecode,
      streetAddress: `${addressData.address}${
        addressData.bname ? `, ${addressData.bname}` : ''
      }${addressData.buildingName ? `, ${addressData.buildingName}` : ''}`,
      detailAddress: '',
    };

    setDeliveredAddress(formattedAddress);

    const updatedMetAddress: StoredAddress = {
      ...formData.metAddress,
      postal: formattedAddress.postal,
      streetAddress: formattedAddress.streetAddress,
      detailAddress: formData.metAddress.detailAddress,
    };
  
    setMetAddress(updatedMetAddress);
  
    setIsUsingDefaultAddress(false);
  };

  const handleChangeAddress = () => {
    setDeliveredAddress({ postal: '', streetAddress: '', detailAddress: '' });
    setIsUsingDefaultAddress(false);
  };

  // Time validation functions
  const validateTime = (formattedTime: string) => {
    if (store?.openTime && store?.closeTime) {
      const [selectedHour, selectedMinute] = formattedTime
        .split(':')
        .map(Number);
      const [openHour, openMinute] = store.openTime.split(':').map(Number);
      const [closeHour, closeMinute] = store.closeTime.split(':').map(Number);

      const selectedTimeInMinutes = selectedHour * 60 + selectedMinute;
      const openTimeInMinutes = openHour * 60 + openMinute;
      const closeTimeInMinutes = closeHour * 60 + closeMinute;

      if (
        selectedTimeInMinutes < openTimeInMinutes ||
        selectedTimeInMinutes > closeTimeInMinutes
      ) {
        setError(
          `영업 시간은 ${store.openTime}부터 ${store.closeTime}까지입니다.\n이 시간 내로 선택해주세요.`,
        );
        setButtonActive(false);
      } else {
        setError(null);
      }
    }
  };

  const debouncedValidateTime = useMemo(
    () => debounce(validateTime, 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store],
  );

  // Event handlers
  const handleSelectPurchaseType = (value: string | null) => {
    if (value !== null) {
      setPurchaseType(value);
    }
  };

  const handleSelectOrderType = (value: string | null) => {
    if (value !== null) {
      setOrderType(value);
      const isEarlyPayment = value === '바로 주문';
      setIsEarlyPaymentAvailable(isEarlyPayment);
    }
  };

  const handleTimeChange = (
    newTime: Partial<{ amPm: string; hour: string; minute: string }>,
  ) => {
    const updatedTime = {
      ...time,
      ...newTime,
    };

    let { hour } = updatedTime;
    const { minute } = updatedTime;

    if (updatedTime.amPm === '오후' && hour !== '12') {
      hour = (parseInt(hour, 10) + 12).toString().padStart(2, '0');
    }

    const formattedTime = `${hour}:${minute}`;
    setTime(updatedTime);

    setPaymentAvailableAt(updatedTime);

    if (store?.openTime && store?.closeTime) {
      const [openHour, openMinute] = store.openTime.split(':').map(Number);
      const [closeHour, closeMinute] = store.closeTime.split(':').map(Number);

      const selectedTimeInMinutes =
        parseInt(hour, 10) * 60 + parseInt(minute, 10);
      const openTimeInMinutes = openHour * 60 + openMinute;
      const closeTimeInMinutes = closeHour * 60 + closeMinute;

      if (
        selectedTimeInMinutes < openTimeInMinutes ||
        selectedTimeInMinutes > closeTimeInMinutes
      ) {
        setError(
          `영업 시간은 ${store.openTime}부터 ${store.closeTime}까지입니다.\n이 시간 내로 선택해주세요.`,
        );
        setButtonActive(false);
        return;
      }
      setError(null);
    }

    debouncedValidateTime(formattedTime);
  };

  // Effects
  useEffect(() => {
    if (orderType !== null) {
      setIsEarlyPaymentAvailable(orderType === '바로 주문');
    }
  }, [orderType, setIsEarlyPaymentAvailable]);

  useEffect(() => {
    if (deliveredAddress.streetAddress && deliveredAddress.postal) {
      setMetAddress({
        ...metAddress,
        streetAddress: deliveredAddress.streetAddress,
        postal: deliveredAddress.postal,
      });
    }
  }, [deliveredAddress, setMetAddress]);

  useEffect(() => {
    if (time.hour && time.minute) {
      setPaymentAvailableAt(time);
    }
  }, [time, setPaymentAvailableAt]);

  useEffect(() => {
    const isActive =
      !!purchaseType &&
      !!orderType &&
      !!metAddress.streetAddress &&
      !!time.hour &&
      !!time.minute &&
      !error &&
      (isUsingDefaultAddress || !!formData.deliveredAddress.streetAddress);
    setButtonActive(isActive);
  }, [
    purchaseType,
    orderType,
    metAddress,
    time.hour,
    time.minute,
    formData.deliveredAddress,
    error,
    isUsingDefaultAddress,
    setButtonActive,
  ]);

  return (
    <>
      <SettingImage
        title="팀 주문 시작"
        subTitle="팀 주문에 함께 할 모임원들을 초대해요"
      />
      <SettingLabel text="팀 주문 방식" />
      <CustomDropdown
        options={optionsPurchaseType}
        selectedValue={purchaseType}
        onSelect={handleSelectPurchaseType}
        isOpen={isDropdownOpen1}
        onToggle={handleToggleDropdown1}
        placeholder="식사 방식 선택"
      />
      <InfoBox
        textItems={[
          {
            text: '함께 식사:',
            $textStyle: 'Title',
            sameRow: true,
            id: 'together-meal-title',
          },
          {
            text: '다 같이 한 장소에서 수령하여 함께 식사해요.',
            $textStyle: 'Description',
            id: 'together-meal-description',
          },
          {
            text: '각자 식사:',
            $textStyle: 'Title',
            sameRow: true,
            id: 'individual-meal-title',
          },
          {
            text: '각자 설정한 주소로 수령하여 편하게 식사해요.',
            $textStyle: 'Description',
            id: 'individual-meal-description',
          },
        ]}
        showIcon={false}
      />
      <CustomDropdown
        options={optionsOrderType}
        selectedValue={orderType}
        onSelect={handleSelectOrderType}
        isOpen={isDropdownOpen2}
        onToggle={handleToggleDropdown2}
        placeholder="주문 방식 선택"
      />
      <InfoBox
        textItems={[
          {
            text: '바로 주문:',
            $textStyle: 'Title',
            sameRow: true,
            id: 'instant-order-title',
          },
          {
            text: '최대 모집 인원이 모일 시 바로 주문합니다.',
            $textStyle: 'Description',
            id: 'instant-order-description',
          },
          {
            text: '예약 주문:',
            $textStyle: 'Title',
            sameRow: true,
            id: 'reservation-order-title',
          },
          {
            text: '주문 대기 시간에 맞춰 주문합니다.',
            $textStyle: 'Description',
            id: 'reservation-order-description',
          },
        ]}
        showIcon={false}
      />
      <SettingLabel text="수령 장소" />
      {isLoading ? (
        <p>기본 주소 불러오는 중입니다...</p>
      ) : isUsingDefaultAddress && defaultAddress ? (
        <DefaultAddress
          streetAddress={defaultAddress?.streetAddress || ''}
          detailAddress={defaultAddress?.detailAddress || ''}
          onChangeAddress={handleChangeAddress}
        />
      ) : (
        <SettingAddress
          isPostcodeOpen={isPostcodeOpen}
          setIsPostcodeOpen={setIsPostcodeOpen}
          onAddressChange={handleAddressChange}
        />
      )}
      <SettingLabel text="모임 장소" />
      <input
        type="text"
        placeholder="모임 장소"
        value={metAddress.detailAddress || ''}
        onChange={(e) =>
          setMetAddress({ ...metAddress, detailAddress: e.target.value })
        }
      />
      <SettingLabel text="주문 대기 최대 기한" />
      <TimeInput onTimeChange={handleTimeChange} time={time} />
      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default Step1;
