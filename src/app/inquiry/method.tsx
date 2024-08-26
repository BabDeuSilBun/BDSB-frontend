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

const ListButton = styled.button.attrs({
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
      <ListItem>
        <p>메일 문의</p>
        <ListButton as="a" href="mailto:help@bdsb.com">
          {'>'}
        </ListButton>
      </ListItem>
      <ListItem>
        <p>전화 문의</p>
        <ListButton as="a" href="tel:16000101">
          {'>'}
        </ListButton>
      </ListItem>
      <ListItem $isLast>
        <p>게시판 문의</p>
        <ListButton onClick={() => router.push('/inquiry/forum/?type=contant')}>
          {'>'}
        </ListButton>
      </ListItem>
    </ListContainer>
  );
};

export default InquiryMethod;
