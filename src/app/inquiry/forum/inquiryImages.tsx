'use client';

import { Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import styled from 'styled-components';

import { ImageType } from '@/types/types';

const ImageWrapper = styled.div`
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background: var(--gray200);
  position: relative;
  width: 100px;
  height: 100px;
`;

interface InquiryImagesProps {
  images: ImageType[];
  isLoading: boolean;
  isError: boolean;
}

const InquiryImages: React.FC<InquiryImagesProps> = ({
  images,
  isLoading,
  isError,
}) => {
  if (isError) {
    return (
      <>
        <ImageWrapper>no Image</ImageWrapper>
        <ImageWrapper>no Image</ImageWrapper>
        <ImageWrapper>no Image</ImageWrapper>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <ImageWrapper>
          <Skeleton w="100px" h="100px" />
        </ImageWrapper>
        <ImageWrapper>
          <Skeleton w="100px" h="100px" />
        </ImageWrapper>
        <ImageWrapper>
          <Skeleton w="100px" h="100px" />
        </ImageWrapper>
      </>
    );
  }

  return (
    <>
      {images.map((item: ImageType) => (
        <ImageWrapper key={item.imageId}>
          <Image
            src={item.url}
            alt={`${item.sequence}번 째 이미지`}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </ImageWrapper>
      ))}
    </>
  );
};

export default InquiryImages;
