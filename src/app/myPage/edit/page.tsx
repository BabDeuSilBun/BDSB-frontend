'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
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

const ListButton = styled.button.attrs({
  className: 'icon',
})`
  word-spacing: 3px;
  padding: 1rem;
  margin: -1rem;
`;

const EditUserInfo = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  return (
    <>
      <Header text="내 정보 수정" buttonLeft="back" />
      <Container>
        <ImageContainer>
          <UpdateImage image={data?.image} />
        </ImageContainer>

        <ListContainer>
          <ListItem>
            <p>닉네임</p>
            <ListButton onClick={() => router.push('/myPage/edit/nickname')}>
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
          <ListItem>
            <p>비밀번호 변경</p>
            <ListButton onClick={() => router.push('/myPage/edit/password')}>
              {'>'}
            </ListButton>
          </ListItem>
          <ListItem $isLast>
            <p>휴대전화 번호 변경</p>
            <ListButton onClick={() => router.push('/myPage/edit/phoneNumber')}>
              {'>'}
            </ListButton>
          </ListItem>
        </ListContainer>
      </Container>
    </>
  );
};

export default EditUserInfo;
