'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Header from '@/components/layout/header';
import { getMyData } from '@/services/myDataService';
import { RoundBtnFilled } from '@/styles/button';
import Container from '@/styles/container';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
  width: 48px;
  height: 48px;
  background: var(--primary);
  position: relative;
`;

const Flexbox = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const CenterContainer = styled.div`
  flex: 1;
`;

const Nickname = styled.h1`
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-lg);
`;

const AddressButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: var(--font-size-sm);
`;

const ListContainer = styled.ul`
  border: 0.1rem solid var(--gray200);
  border-radius: var(--border-radius-lg);
  margin: 1rem;
  overflow: hidden;
`;

const ListItem = styled.li<{ $isLast?: boolean }>`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  border-bottom: ${(props) =>
    props.$isLast ? '' : '0.1rem solid var(--gray200)'};
`;

const ListButton = styled.button.attrs({
  className: 'icon',
})`
  word-spacing: 3px;
  padding: 1rem;
  margin: -1rem;
`;

const MyPage = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  return (
    <>
      <Header buttonLeft="hamburger" text="마이페이지" buttonRight="home" />
      <Container>
        <Flexbox>
          <ImageWrapper>
            {data && (
              <Image
                src={data.image}
                alt="My Profile Image"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            )}
          </ImageWrapper>
          <CenterContainer>
            <Nickname>
              {isError
                ? '닉네임 없음'
                : isLoading
                  ? '불러오는 중'
                  : data && data.nickname}
            </Nickname>
            <AddressButton onClick={() => router.push('/myPage/edit/address')}>
              <Image
                src="./map-pin.svg"
                alt="map pin icon"
                width="18"
                height="18"
                priority
              />
              <p>주소관리</p>
            </AddressButton>
          </CenterContainer>
          <RoundBtnFilled onClick={() => router.push(`/${data?.userId}`)}>
            프로필보기
          </RoundBtnFilled>
        </Flexbox>
        <ListContainer>
          <ListItem>
            <p>내 포인트</p>
            <ListButton
              onClick={() => router.push('/myPage/points')}
            >{`${data ? data.point : '0'}P >`}</ListButton>
          </ListItem>
          {/* <ListItem>
            <p>앱 테마</p>
            <ListButton onClick={() => router.push('/')}>
              {'>'}
            </ListButton>
          </ListItem> */}
          <ListItem>
            <p>환불 계좌 입력</p>
            <ListButton onClick={() => router.push('/myPage/edit/bankAccount')}>
              {'>'}
            </ListButton>
          </ListItem>
          <ListItem $isLast>
            <p>문의 게시판</p>
            <ListButton onClick={() => router.push('/inquiry')}>
              {'>'}
            </ListButton>
          </ListItem>
        </ListContainer>
      </Container>
    </>
  );
};

export default MyPage;
