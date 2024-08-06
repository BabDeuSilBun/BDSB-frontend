'use client';

import { RESTAURANT_CATEGORIES } from '@/constant/category';
import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  margin: 0 auto;
  padding: 1.5rem;
  white-space: nowrap;
`;

const Wrapper = styled.div`
  flex: 1 1 calc(25% - 1rem);
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

const CategoryItem = () => {
  return (
    <Container>
      {Object.keys(RESTAURANT_CATEGORIES).map((category) => (
        <Wrapper key={category}>
          <ImageWrapper>
            <Image
              src={RESTAURANT_CATEGORIES[category]}
              alt={category}
              layout="fill"
              objectFit="cover"
            />
          </ImageWrapper>
          <CategoryName>{category}</CategoryName>
        </Wrapper>
      ))}
    </Container>
  );
};

export default CategoryItem;
