'use client';

import { useRouter } from 'next/navigation';
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
  width: 40px;
  height: 40px;
  margin-bottom: 0.8rem;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
`;

const CategoryName = styled.p`
  font-size: var(--font-size-xs);
`;

function CategoryItem() {
  const cat = null;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/restaurants/category=${cat}`);
  };

  return (
    <Container>
      {Object.keys(RESTAURANT_CATEGORIES).map((category) => (
        <Wrapper key={category} onClick={handleClick}>
          <ImageWrapper>
            <Image
              src={RESTAURANT_CATEGORIES[category as RestaurantCategory]}
              alt={category}
              width="40"
              height="40"
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
