'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import UpdateAddress from './updateAddress';

import Footer from '@/components/layout/footer';
import { postNewAddress } from '@/services/myDataService';
import { getMyData } from '@/services/myDataService';
import Container from '@/styles/container';

const ContainerBox = styled(Container)`
  padding: 1rem;
`;

const CurrentAddressContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: var(--font-size-sm);
    line-height: 0.6rem;
  }

  h2 {
    font-size: var(--font-size-md);
    font-weight: var(--font-semi-bold);
    margin-bottom: 0.5rem;
  }

  h2:last-child {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const CurrentAddress = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [streetAddress, setStreetAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [postal, setPostal] = useState('');
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
    enabled: true,
  });

  useEffect(() => {
    if (!!streetAddress && !!detailAddress) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [streetAddress, detailAddress]);

  const onClickSubmitBtn = async () => {
    try {
      console.log(postal, streetAddress, detailAddress);
      await postNewAddress(postal, streetAddress, detailAddress);
      alert('배송지가 변경되었습니다.');
      router.push('/myPage');
    } catch (error) {
      console.error('Error during update address:', error);
    }
  };

  return (
    <>
      <ContainerBox>
        <CurrentAddressContainer>
          <h2>기본 배송지</h2>
          {isError ? (
            <p>저장된 주소지가 없습니다.</p>
          ) : isLoading ? (
            <p>주소를 불러오는 중..</p>
          ) : (
            <>
              <p>{data?.address.streetAddress}</p>
              <p>{data?.address.detailAddress}</p>
            </>
          )}
          <h2>새로운 배송지</h2>
        </CurrentAddressContainer>
        <UpdateAddress
          streetAddress={streetAddress}
          detailAddress={detailAddress}
          setStreetAddress={setStreetAddress}
          setDetailAddress={setDetailAddress}
          setPostal={setPostal}
        />
      </ContainerBox>
      <Footer
        type="button"
        buttonText="변경 완료"
        onButtonClick={isButtonActive ? onClickSubmitBtn : undefined}
        disabled={!isButtonActive}
      />
    </>
  );
};

export default CurrentAddress;
