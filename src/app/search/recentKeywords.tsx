'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import styled from 'styled-components';

import ExitIcon from '@/components/svg/exit';

interface keyInterface {
  id: number;
  text: string;
}

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 70px;
  padding: 1rem;

  h1 {
    font-weight: var(--font-semi-bold);
    font-size: var(--font-size-xl);
  }

  button {
    font-size: var(--font-size-sm);
    color: var(--gray300);
  }
`;

const List = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
`;

const Keyword = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const RecentKeywords: React.FC = () => {
  const router = useRouter();
  const { type } = useParams();
  const [keywords, setKeywords] = useState<keyInterface[]>([]);

  useEffect(() => {
    const savedKeywords = localStorage.getItem('keywords');
    if (savedKeywords) {
      setKeywords(JSON.parse(savedKeywords));
    }
  }, []);

  const handleRemoveKeyword = (id: number) => {
    const nextKeyword = keywords.filter((keyword) => keyword.id !== id);
    setKeywords(nextKeyword);
    localStorage.setItem('keywords', JSON.stringify(nextKeyword));
  };

  const handleClearKeywords = () => {
    setKeywords([]);
    localStorage.removeItem('keywords');
  };

  const handleSearchButtonClick = (k: keyInterface) => {
    router.push(`/search/${type}?q=${k.text}`);
  };

  return (
    <>
      <FlexBox>
        <h1>최근 검색어</h1>
        <button onClick={handleClearKeywords}>전체 삭제</button>
      </FlexBox>

      <List>
        {keywords.length ? (
          keywords.map((k) => (
            <Keyword key={k.id}>
              <button onClick={() => handleSearchButtonClick(k)}>
                {k.text}
              </button>
              <button onClick={() => handleRemoveKeyword(k.id)}>
                <ExitIcon color="var(--gray300)" width={18} height={18} />
              </button>
            </Keyword>
          ))
        ) : (
          <p>새로운 {type === 'teamOrder' ? '모임을' : '가게를'} 찾아보세요.</p>
        )}
      </List>
    </>
  );
};

export default RecentKeywords;
