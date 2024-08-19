'use client';

import Header from '@/components/layout/header';
import styled from 'styled-components';
import Image from 'next/image';

const ImageWrapper = styled.div``;

const MyPage = () => {
  return (
    <>
      <Header buttonLeft="hamburger" text="마이페이지" buttonRight="home" />
      <div>
        <ImageWrapper>
          <Image
            src={image}
            alt="My Profile Image"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </ImageWrapper>
        <div>
          <h1>{nickname}</h1>
          <button>
            <Image
              src="./fee.svg"
              alt="Delivery Fee"
              width="18"
              height="18"
              priority
            />
            <p>주소관리</p>
          </button>
        </div> 
        <button>프로필보기</button>
      </div>
    </>
  );
};

export default MyPage;
