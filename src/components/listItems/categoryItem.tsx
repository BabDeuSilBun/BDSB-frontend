'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { RESTAURANT_CATEGORIES, RestaurantCategory } from '@/constant/category';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 0 auto;
  padding: 1.5rem;
  white-space: nowrap;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ImageWrapper = styled.div`
  width: 42px;
  height: 42px;
  margin-bottom: 0.5rem;
  position: relative;
  background-color: var(--gray200);
  border-radius: 50%;
`;

const CategoryName = styled.p.attrs({ className: 'xs' })``;

function CategoryItem() {
  return (
    <Container>
      {Object.keys(RESTAURANT_CATEGORIES).map((category) => (
        <Wrapper key={category}>
          <ImageWrapper>
            <Image
              src={RESTAURANT_CATEGORIES[category as RestaurantCategory]}
              alt={category}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </ImageWrapper>
          <CategoryName>{category}</CategoryName>
        </Wrapper>
      ))}
    </Container>
  );
}

export default CategoryItem;
