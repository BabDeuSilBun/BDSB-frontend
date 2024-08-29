'use client';

import { useEffect, useState } from 'react';

import UpdateAddress from '@/app/myPage/edit/address/updateAddress';
import { useSignUpStore } from '@/state/authStore';

const Step5Address = () => {
  const { address, setAddress, isButtonActive, setButtonActive } =
    useSignUpStore();
  const [streetAddress, setStreetAddress] = useState(address.streetAddress);
  const [detailAddress, setDetailAddress] = useState(address.detailAddress);
  const [postal, setPostal] = useState(address.postal);

  useEffect(() => {
    if (!!streetAddress && !!detailAddress.trim()) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streetAddress, detailAddress]);

  useEffect(() => {
    if (
      isButtonActive &&
      !!streetAddress &&
      !!detailAddress.trim() &&
      !!postal
    ) {
      setAddress?.({
        ...address,
        streetAddress,
        detailAddress: detailAddress.trim(),
        postal,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isButtonActive, streetAddress, detailAddress, postal]);

  const handleStreetAddressChange = (newStreetAddress: string) => {
    setStreetAddress(newStreetAddress);
  };

  const handleDetailAddressChange = (newDetailAddress: string) => {
    setDetailAddress(newDetailAddress);
  };

  const handlePostalChange = (newPostal: string) => {
    setPostal(newPostal);
  };

  return (
    <UpdateAddress
      streetAddress={streetAddress}
      detailAddress={detailAddress}
      setStreetAddress={handleStreetAddressChange}
      setDetailAddress={handleDetailAddressChange}
      setPostal={handlePostalChange}
    />
  );
};

export default Step5Address;
