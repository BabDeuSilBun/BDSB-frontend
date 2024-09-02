'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { Divider } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import Header from '@/components/layout/header';
import GroupIcon from '@/components/svg/group';
import { getUserProfile } from '@/services/myDataService';
import { getMyData, getMyEvaluates } from '@/services/myDataService';
import { BaseBtnInactive } from '@/styles/button';
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
  margin: 1rem;
  align-items: center;
  gap: 1rem;
  font-size: var(--font-size-sm);

  p {
    font-weight: var(--font-semi-bold);
    min-width: 75px;
  }
`;

const Nickname = styled.h1`
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-lg);
`;

const EvaluateContainer = styled.section.attrs({ className: 'icon' })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-lg);

  h3 {
    font-weight: var(--font-semi-bold);
  }

  button {
    padding: 1rem;
    margin: -1rem;
  }
`;

const ListContainer = styled.ul`
  margin: 1rem;
  overflow: hidden;
`;

const ListItem = styled.li`
  display: flex;
  padding: 1rem 0;
  align-items: start;
  gap: 0.3rem;

  div {
    background: var(--gray100);
    padding: 1rem;
    margin-left: 0.7rem;
    border-radius: 0 var(--border-radius-md) var(--border-radius-md)
      var(--border-radius-md);
  }
`;

const Profile = () => {
  const router = useRouter();
  const params = useParams();
  const userID = params.userId as string;

  useEffect(() => {
    if (!userID || isNaN(Number(userID))) {
      router.push('/404');
    }
  }, [userID, router]);

  const {
    data: myData,
    isLoading: isMyDataLoading,
    isError: isMyDataError,
  } = useQuery({
    queryKey: ['MyData'],
    queryFn: getMyData,
  });

  const isMyProfile = myData?.userId === Number(userID);

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useQuery({
    queryKey: ['userData', userID],
    queryFn: () => getUserProfile(userID),
    enabled: !isMyProfile, // 내 프로필이 아닐 때만 실행
  });

  const activeData = isMyProfile ? myData : userData;
  const activeDataLoading = isMyProfile ? isMyDataLoading : isUserDataLoading;
  const activeDataError = isMyProfile ? isMyDataError : isUserDataError;

  const { data: evaluates, isLoading: evaluatesLoading } = useQuery({
    queryKey: ['MyEvaluates'],
    queryFn: getMyEvaluates,
    enabled: isMyProfile, // 내 프로필 일때만 실행
  });

  const positiveEvaluates = evaluates?.positiveEvaluate;

  return (
    <>
      <Header buttonLeft="back" text="프로필" />
      <Container>
        <Flexbox>
          <ImageWrapper>
            {activeData && activeData.image && activeData.image !== 'null' && (
              <Image
                src={activeData.image}
                alt="Profile Image"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            )}
          </ImageWrapper>
          <Nickname>
            {activeDataError
              ? '닉네임 없음'
              : activeDataLoading
                ? '불러오는 중'
                : activeData && activeData.nickname}
          </Nickname>
        </Flexbox>
        <Flexbox>
          <GroupIcon color="var(--purple200)" />
          <p>완료 모임 수</p>
          <span>{activeData ? activeData.meetingCount : 0}</span>
        </Flexbox>
        <Flexbox>
          <Image
            src="./department.svg"
            alt="map pin icon"
            width="18"
            height="18"
            priority
          />
          <p>소속 학과</p>
          <span>
            {activeDataError
              ? '학부 데이터 없음'
              : activeDataLoading
                ? '불러오는 중'
                : activeData && activeData.major}
          </span>
        </Flexbox>
        {isMyProfile && (
          <Flexbox>
            <BaseBtnInactive onClick={() => router.push(`/myPage/edit`)}>
              프로필수정
            </BaseBtnInactive>
          </Flexbox>
        )}

        <Divider />

        <ListContainer>
          <EvaluateContainer>
            <h3>평가 배지</h3>
            {isMyProfile && (
              <button onClick={() => router.push('/myPage/evaluate')}>
                {'>'}
              </button>
            )}
          </EvaluateContainer>
          {evaluatesLoading ||
          (isMyProfile ? isMyDataLoading : isUserDataLoading)
            ? // 스켈레톤 UI 적용
              Array.from({ length: 4 }).map((_, index) => (
                <ListItem key={index}>
                  <GroupIcon color="var(--gray400)" />
                  <p>{0}</p>
                  <Skeleton width={200} height={54} />
                </ListItem>
              ))
            : (
                (isMyProfile
                  ? positiveEvaluates
                  : userData?.positiveEvaluate) || []
              ).map((item, index) => (
                <ListItem key={index}>
                  <GroupIcon color="var(--gray400)" />
                  <p>{item.count}</p>
                  <div>{item.content}</div>
                </ListItem>
              ))}
        </ListContainer>
      </Container>
    </>
  );
};

export default Profile;
