'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Divider } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/react';

import { getMyData, getMyEvaluates } from '@/services/myDataService';
import { BaseBtnInactive } from '@/styles/button';
import Container from '@/styles/container';
import GroupIcon from '@/components/svg/group';
import Header from '@/components/layout/header';

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

const MyPage = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['MyData'],
    queryFn: getMyData,
  });

  const {
    data: evaluates,
    isLoading: evaluatesLoading,
    isError: evaluatesError,
  } = useQuery({
    queryKey: ['MyEvaluates'],
    queryFn: getMyEvaluates,
  });

  const positiveEvaluates = evaluates?.positiveEvaluate;

  return (
    <>
      <Header buttonLeft="back" text="프로필" />
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
          <Nickname>
            {isError
              ? '닉네임 없음'
              : isLoading
                ? '불러오는 중'
                : data && data.nickname}
          </Nickname>
        </Flexbox>
        <Flexbox>
          <GroupIcon color="var(--purple200)" />
          <p>완료 모임 수</p>
          <span>{data ? data.meetingCount : 0}</span>
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
            {isError
              ? '학부 데이터 없음'
              : isLoading
                ? '불러오는 중'
                : data && data.major}
          </span>
        </Flexbox>
        <Flexbox>
          <BaseBtnInactive
            onClick={() => router.push(`/${data?.nickname.trim()}`)}
          >
            프로필수정
          </BaseBtnInactive>
        </Flexbox>

        <Divider />

        <ListContainer>
          <EvaluateContainer>
            <h3>평가 배지</h3>
            <button onClick={() => router.push('/myPage/evaluate')}>
              {'>'}
            </button>
          </EvaluateContainer>
          {evaluatesLoading
            ? // 목록에 스켈레톤 적용
              Array.from({ length: 4 }).map((_, index) => (
                <ListItem key={index}>
                  <GroupIcon color="var(--gray400)" />
                  <p>{0}</p>
                  <Skeleton width={200} height={54} />
                </ListItem>
              ))
            : positiveEvaluates &&
              positiveEvaluates.map((item, index) => (
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

export default MyPage;
