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
import { Address } from 'react-daum-postcode';

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
    setMetAddress,
    setTime,
    setPaymentAvailableAt,
    setButtonActive,
    setStoreId,
  } = useOrderStore();

  const { purchaseType, orderType, metAddress, time } = formData;
  const deliveredAddress = formData.deliveredAddress;
  const [error, setError] = useState<string | null>(null);
  const [showDefaultAddress, setShowDefaultAddress] = useState(true);

  const { storeId } = useParams();

  // Dropdown options
  const options1 = [
    { id: 1, name: '함께 식사', value: '함께 식사' },
    { id: 2, name: '각자 식사', value: '각자 식사' },
  ];

  const options2 = [
    { id: 1, name: '바로 주문', value: '바로 주문' },
    { id: 2, name: '예약 주문', value: '예약 주문' },
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

  const { data, isLoading } = useQuery<MyDataType, Error>({
    queryKey: ['myData'],
    queryFn: getMyData,
  });
  
  useEffect(() => {
    if (data?.address) {
      console.log('Setting deliveredAddress with:', data.address);
      setDeliveredAddress({
        postal: data.address.postal,
        streetAddress: data.address.streetAddress,
        detailAddress: data.address.detailAddress,
      });
    }
  }, [data, setDeliveredAddress]);

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

  const handleAddressChange = (addressData: Address) => {
    const formattedAddress = {
      postal: addressData.zonecode,
      streetAddress: `${addressData.address}${addressData.bname ? `, ${addressData.bname}` : ''}${addressData.buildingName ? `, ${addressData.buildingName}` : ''}`,
      detailAddress: '',
    };

    setDeliveredAddress(formattedAddress);
    
    // @ts-ignore
    setMetAddress((prevAddress: Address) => ({
      ...prevAddress,
      postal: formattedAddress.postal,
      streetAddress: formattedAddress.streetAddress,
      detailAddress: (prevAddress as any).detailAddress,
    }));
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

    setPaymentAvailableAt(new Date(), updatedTime);

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
        setButtonActive(false); // Disable the button if the time is not valid
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
      setPaymentAvailableAt(new Date(), time);
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
      (showDefaultAddress || !!formData.deliveredAddress.streetAddress);
    setButtonActive(isActive);
  }, [
    purchaseType,
    orderType,
    metAddress,
    time.hour,
    time.minute,
    formData.deliveredAddress,
    error,
    showDefaultAddress,
    setButtonActive,
  ]);

  return (
    <>
      <SettingImage />
      <SettingLabel text="팀 주문 방식" />
      <CustomDropdown
        options={options1}
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
            id: 1,
          },
          {
            text: '다 같이 한 장소에서 수령하여 함께 식사해요.',
            $textStyle: 'Description',
            id: 2,
          },
          {
            text: '각자 식사:',
            $textStyle: 'Title',
            sameRow: true,
            id: 3,
          },
          {
            text: '각자 설정한 주소로 수령하여 편하게 식사해요.',
            $textStyle: 'Description',
            id: 4,
          },
        ]}
        showIcon={false}
      />
      <CustomDropdown
        options={options2}
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
            id: 5,
          },
          {
            text: '최대 모집 인원이 모일 시 바로 주문합니다.',
            $textStyle: 'Description',
            id: 6,
          },
          {
            text: '예약 주문:',
            $textStyle: 'Title',
            sameRow: true,
            id: 7,
          },
          {
            text: '주문 대기 시간에 맞춰 주문합니다.',
            $textStyle: 'Description',
            id: 8,
          },
        ]}
        showIcon={false}
      />
      <SettingLabel text="수령 장소" />
      {isLoading ? (
        <p>기본 주소 불러오는 중입니다...</p>
      ) : showDefaultAddress && data?.address?.streetAddress ? (
        <DefaultAddress
          streetAddress={data.address.streetAddress}
          detailAddress={data.address.detailAddress}
          onChangeAddress={() => setShowDefaultAddress(false)}
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
        value={metAddress.detailAddress}
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
