'use client';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

const ListContainer = styled.ul`
  margin: 6rem 1rem;
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
`;

const ListButton = styled.div.attrs({
  className: 'icon',
})`
  word-spacing: 3px;
  padding: 1rem;
  margin: -1rem;
`;

const InquiryMethod = () => {
  const router = useRouter();

  return (
    <ListContainer>
      <ListItem as="a" href="mailto:help@bdsb.com">
        <p>메일 문의</p>
        <ListButton>{'>'}</ListButton>
      </ListItem>
      <ListItem as="a" href="tel:16000101">
        <p>전화 문의</p>
        <ListButton>{'>'}</ListButton>
      </ListItem>
      <ListItem
        $isLast
        onClick={() => router.push('/inquiry/forum/?type=contact')}
      >
        <p>게시판 문의</p>
        <ListButton>{'>'}</ListButton>
      </ListItem>
    </ListContainer>
  );
};

export default InquiryMethod;
