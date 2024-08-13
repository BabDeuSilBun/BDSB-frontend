'use client';

import styled from 'styled-components';
import ExitIcon from '@/components/svg/exit';
import { useRouter } from 'next/navigation';

interface keyInterface {
  id: number;
  text: string;
}

interface RecentKeywordsProps {
  menu: string;
  keywords: keyInterface[];
  setKeywords: React.Dispatch<React.SetStateAction<keyInterface[]>>;
  setValue: (keyword: string) => void;
  setIsValue: (value: boolean) => void;
}

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

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
  margin-top: 1.5rem;
`;

const Keyword = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const RecentKeywords: React.FC<RecentKeywordsProps> = ({
  menu,
  keywords,
  setKeywords,
  setValue,
  setIsValue,
}) => {
  const router = useRouter();

  const handleRemoveKeyword = (id: number) => {
    const nextKeyword = keywords.filter((keyword) => keyword.id !== id);
    setKeywords(nextKeyword);
    localStorage.setItem('keywords', JSON.stringify(nextKeyword));
  };

  const handleClearKeywords = () => {
    setKeywords([]);
    localStorage.removeItem('keywords');
    setIsValue(false);
  };

  const handleSearchButtonClick = (k: keyInterface) => {
    setIsValue(true);
    setValue(k.text);
    router.push(`/search/${menu}?q=${k.text}`);
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
              <p onClick={() => handleSearchButtonClick(k)}>{k.text}</p>
              <button onClick={() => handleRemoveKeyword(k.id)}>
                <ExitIcon color="var(--gray300)" width={18} height={18} />
              </button>
            </Keyword>
          ))
        ) : (
          <p>{`새로운 ${menu === 'teamOrder' ? '모임을' : '가게를'} 찾아보세요.`}</p>
        )}
      </List>
    </>
  );
};

export default RecentKeywords;
