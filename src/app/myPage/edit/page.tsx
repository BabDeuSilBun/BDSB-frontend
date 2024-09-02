'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import UpdateImage from './updateImage';

import Header from '@/components/layout/header';
import { getMyData } from '@/services/myDataService';
import Container from '@/styles/container';

const ListContainer = styled.ul`
  margin: 1rem;
  border: 0.1rem solid var(--gray200);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
`;

const Caption = styled.p`
  font-size: var(--font-size-xs);
  color: var(--gray400);
  padding-left: 1rem;

  a {
    font-weight: var(--font-semi-bold);
    border-bottom: 1px solid var(--gray300);
  }
`;

const ListItem = styled.li.attrs({
  className: 'icon',
})<{ $isLast?: boolean }>`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  border-bottom: ${(props) =>
    props.$isLast ? '' : '0.1rem solid var(--gray200)'};

  p {
    font-weight: var(--font-semi-bold);
  }
`;

const ImageContainer = styled.section`
  position: relative;
  margin: 2rem auto;
  width: fit-content;
`;

const ListButton = styled.div.attrs({
  className: 'icon',
})`
  word-spacing: 3px;
  padding: 1rem;
  margin: -1rem;
`;

const EditUserInfo = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['myData'] });
  }, [queryClient]);

  return (
    <>
      <Header text="내 정보 수정" buttonLeft="back" />
      <Container>
        <ImageContainer>
          <UpdateImage image={data?.image} />
        </ImageContainer>

        <ListContainer>
          <ListItem onClick={() => router.push('/myPage/edit/nickname')}>
            <p>닉네임</p>
            <ListButton>
              {`${data ? data.nickname : '불러오는 중..'} >`}
            </ListButton>
          </ListItem>
          <ListItem>
            <p>이름</p>
            <span>{data ? data.name : '불러오는 중..'}</span>
          </ListItem>
          <ListItem>
            <p>이메일</p>
            <span>{data ? data.email : '불러오는 중..'}</span>
          </ListItem>
          <ListItem>
            <p>소속 캠퍼스</p>
            <span>
              {data ? `${data.school} ${data.campus}` : '불러오는 중..'}
            </span>
          </ListItem>
          <ListItem>
            <p>소속 학과</p>
            <span>{data ? data.major : '불러오는 중..'}</span>
          </ListItem>
          <ListItem onClick={() => router.push('/myPage/edit/password')}>
            <p>비밀번호 변경</p>
            <ListButton>{'>'}</ListButton>
          </ListItem>
          <ListItem
            $isLast
            onClick={() => router.push('/myPage/edit/phoneNumber')}
          >
            <p>휴대전화 번호 변경</p>
            <ListButton>{'>'}</ListButton>
          </ListItem>
        </ListContainer>
        <Caption>
          수정 불가능한 정보의 경우 <Link href={'/inquiry'}>문의하기</Link>를
          이용해주세요.
        </Caption>
      </Container>
    </>
  );
};

export default EditUserInfo;
