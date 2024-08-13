'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter, useParams } from 'next/navigation';
import { RESTAURANT_CATEGORIES, RestaurantCategory } from '@/constant/category';

const Container = styled.div.attrs({ className: 'scroll-x' })`
  display: flex;
  background-color: var(--background);
  position: fixed;
  top: 48px;
  z-index: 1000;
  width: inherit;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  padding: 0.4rem 1rem 0 1rem;
  overflow-x: auto;
`;

const MenuButton = styled.button<{ selected: boolean }>`
  display: flex;
  flex-shrink: 0;
  margin-top: 0.3rem;
  padding: 0.6rem;
  border: none;
  border-bottom: 0.4rem solid
    ${(props) => (props.selected ? 'var(--purple200)' : 'transparent')};
  font-weight: ${(props) =>
    props.selected ? 'var(--font-semi-bold)' : 'var(--font-regular)'};
  transition: border-bottom-color 0.5s ease-out;
`;

const AccordionTabs = () => {
  const router = useRouter();
  const params = useParams();
  const [selectedMenu, setSelectedMenu] = useState<string>('');

  useEffect(() => {
    const cat = decodeURIComponent(params.category as RestaurantCategory);
    if (cat) {
      setSelectedMenu(cat);
    }
  }, [params]);

  const handleTabClick = (category: RestaurantCategory) => {
    setSelectedMenu(category);
    router.push(`/category/${category}`);
  };

  return (
    <Container>
      {Object.keys(RESTAURANT_CATEGORIES).map((category) => (
        <MenuButton
          key={category}
          selected={selectedMenu === category}
          onClick={() => handleTabClick(category as RestaurantCategory)}
        >
          {category}
        </MenuButton>
      ))}
    </Container>
  );
};

export default AccordionTabs;
