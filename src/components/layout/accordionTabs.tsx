'use client';

import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { useParams, useRouter } from 'next/navigation';

import { RESTAURANT_CATEGORIES, RestaurantCategory } from '@/constant/category';

const Container = styled.div.attrs({ className: 'scroll-x' })`
  display: flex;
  background-color: var(--background);
  position: fixed;
  top: 60px;
  z-index: 1000;
  width: inherit;
  box-shadow: 0px 5px 5px var(--shadow);
  padding: 0.3rem 1rem 0 1rem;
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
  const menuRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const cat = decodeURIComponent(params.category as RestaurantCategory);
    if (cat) {
      setSelectedMenu(cat);
    }
  }, [params]);

  useEffect(() => {
    if (selectedMenu && menuRefs.current[selectedMenu]) {
      menuRefs.current[selectedMenu]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedMenu]);

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
          ref={(el) => {
            if (el) {
              menuRefs.current[category] = el;
            }
          }}
        >
          {category}
        </MenuButton>
      ))}
    </Container>
  );
};

export default AccordionTabs;
