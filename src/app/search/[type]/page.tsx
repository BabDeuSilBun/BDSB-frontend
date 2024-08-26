'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import styled from 'styled-components';

import RecentKeywords from '../recentKeywords';
import RestaurantSearchResults from '../restaurantSearchResults';
import TeamOrderSearchResults from '../teamOrderSearchResults';

import BackIcon from '@/components/svg/arrowLeft';
import SearchIcon from '@/components/svg/search';

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
  padding: 1rem;
`;

const Input = styled.input`
  padding: 0.4rem !important;
`;

const TypeSelector = styled.div`
  width: 100vw;
  position: fixed;
  top: 60px;
  left: 0;
  padding-left: 1rem;
  z-index: 1400;
  background-color: var(--background);
  box-shadow: 0px 5px 5px var(--shadow);
`;

const TypeButton = styled.button<{ selected: boolean }>`
  padding: 0.6rem;
  border: none;
  border-bottom: 0.4rem solid
    ${(props) => (props.selected ? 'var(--purple200)' : 'transparent')};
  font-weight: ${(props) =>
    props.selected ? 'var(--font-semi-bold)' : 'var(--font-regular)'};
  transition: border-bottom-color 0.5s ease-out;
`;

const Search = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = params.type as string;
  const [value, setValue] = useState<string>('');
  const [isValue, setIsValue] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<keyInterface[]>([]);

  useEffect(() => {
    const savedKeywords = localStorage.getItem('keywords');
    if (savedKeywords) {
      setKeywords(JSON.parse(savedKeywords));
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setValue(query);
      setIsValue(true);
    }
  }, [searchParams]);

  const handleBackButtonClick = () => {
    router.push('/', { scroll: false });
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
      router.replace(`/search/${type}?q=${value}`, { scroll: false });
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

  const handleTypeClick = (selected: string) => {
    router.replace(`/search/${selected}?q=${value}`, { scroll: false });
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
      {isValue ? (
        <>
          <TypeSelector>
            <TypeButton
              selected={type === 'teamOrder'}
              onClick={() => handleTypeClick('teamOrder')}
            >
              모집 중
            </TypeButton>
            <TypeButton
              selected={type === 'restaurant'}
              onClick={() => handleTypeClick('restaurant')}
            >
              맛집 탐색
            </TypeButton>
          </TypeSelector>
          {type === 'restaurant' ? (
            <RestaurantSearchResults />
          ) : type === 'teamOrder' ? (
            <TeamOrderSearchResults />
          ) : null}
        </>
      ) : (
        <RecentKeywords />
      )}
    </>
  );
};

export default Search;
