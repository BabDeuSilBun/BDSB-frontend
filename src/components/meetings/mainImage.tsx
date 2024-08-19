import styled from 'styled-components';
import Image from 'next/image';

const ImageContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const ImageWrapper = styled.div`
  width: 90vw;
  height: 25vh;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  position: relative;
  background-color: var(--gray200);
`;

interface MainImageProps {
  src: string;
  alt: string;
}

const MainImage: React.FC<MainImageProps> = ({ src, alt }) => (
  <ImageContainer>
    <ImageWrapper>
      <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} priority />
    </ImageWrapper>
  </ImageContainer>
);

export default MainImage;
