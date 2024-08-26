'use client';

import Image from 'next/image';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius-md);
`;

interface ImagePreviewProps {
  src: string;
  alt: string;
  onRemove: () => void;
}

const ImagePreviewComponent: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  onRemove,
}) => (
  <ImageWrapper>
    <ImagePreview src={src} alt={alt} />
    <DeleteButton aria-label="이미지 삭제" onClick={onRemove}>
      <Image src="/remove.svg" width="20" height="20" alt="remove" />
    </DeleteButton>
  </ImageWrapper>
);

export default ImagePreviewComponent;
