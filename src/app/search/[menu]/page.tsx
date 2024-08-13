'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter, useParams } from 'next/navigation';
import BackIcon from '@/components/svg/arrowLeft';
import SearchIcon from '@/components/svg/search';
import RecentKeywords from '../recentKeywords';
import RestaurantSearchResults from '../restaurantSearchResults';
import TeamOrderSearchResults from '../teamOrderSearchResults';

interface keyInterface {
  id: number;
  text: string;
}

const HeaderContainer = styled.header`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  background-color: var(--background);
  align-items: center;
  position: fixed;
  z-index: 1000;
  height: 60px;
  width: inherit;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  padding: 1rem;
`;

const Input = styled.input`
  padding: 0.4rem !important;
`;

const ListContainer = styled.section`
  margin-top: 70px;
  padding: 1rem;
`;

const Search = () => {
  const params = useParams();
  const router = useRouter();
  const menu = params.menu as string;
  const [value, setValue] = useState<string>('');
  const [isValue, setIsValue] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<keyInterface[]>([]);

  useEffect(() => {
    const savedKeywords = localStorage.getItem('keywords');
    if (savedKeywords) {
      setKeywords(JSON.parse(savedKeywords));
    }
  }, []);

  const handleBackButtonClick = () => {
    router.push('/');
  };

  const handleSearchButtonClick = () => {
    if (value) {
      const newKeyword = {
        id: Date.now(),
        text: value,
      };

      const updatedKeywords = keywords.some((keyword) => keyword.text === value)
        ? keywords.map((keyword) =>
            keyword.text === value ? newKeyword : keyword,
          )
        : [newKeyword, ...keywords];

      setIsValue(true);
      setKeywords(updatedKeywords);
      localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
      router.push(`/search/${menu}?q=${value}`);
    }
  };

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsValue(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchButtonClick();
    }
  };

  return (
    <>
      <HeaderContainer>
        <button type="button" onClick={handleBackButtonClick}>
          <BackIcon color="var(--gray500)" width={20} height={20} />
        </button>
        <Input
          type="search"
          value={value}
          placeholder="이름, 설명, 카테고리 검색"
          onChange={handleValue}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={handleSearchButtonClick}>
          <SearchIcon color="var(--gray500)" width={24} height={24} />
        </button>
      </HeaderContainer>
      <ListContainer>
        {isValue ? (
          menu === 'restaurants' ? (
            <RestaurantSearchResults value={value} />
          ) : menu === 'teamOrders' ? (
            <TeamOrderSearchResults value={value} />
          ) : null
        ) : (
          <RecentKeywords
            menu={menu}
            keywords={keywords}
            setKeywords={setKeywords}
            setValue={setValue}
            setIsValue={setIsValue}
          />
        )}
      </ListContainer>
    </>
  );
};

export default Search;
