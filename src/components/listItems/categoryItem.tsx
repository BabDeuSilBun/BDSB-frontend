'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  color: var(--text);
`;

function CategoryItem() {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <Container>
      {Object.keys(RESTAURANT_CATEGORIES).map((category) => (
        <Wrapper key={category} onClick={() => handleClick(category)}>
          <ImageWrapper>
            <Image
              src={RESTAURANT_CATEGORIES[category as RestaurantCategory]}
              alt={category}
              fill
              sizes="50vw"
              style={{ objectFit: 'contain' }}
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
