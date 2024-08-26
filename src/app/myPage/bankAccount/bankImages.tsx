'use client';

import Image from 'next/image';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  overflow: hidden;
  border-radius: 50%;
  background: var(--gray200);
  position: relative;
`;

interface Prop {
  url: string;
}

const BankImages = ({ url }: Prop) => {
  return (
    <ImageWrapper>
      <Image
        src={url}
        alt="Bank Image"
        fill
        sizes="10vw"
        style={{ objectFit: 'cover' }}
        priority
      />
    </ImageWrapper>
  );
};

export default BankImages;
