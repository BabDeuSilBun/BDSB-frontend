'use client';

import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  margin-bottom: var(--spacing-sm);
`;

const Title = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: var(--font-semi-bold);
  color: var(--primary);
  margin-bottom: var(--spacing-xs);
`;

const SubTitle = styled.h2`
  font-size: var(--font-size-sm);
  font-weight: var(--font-semi-bold);
  color: var(--text);
  margin-bottom: var(--spacing-sm);
`;

const ImageWrapper = styled.div`
  width: auto;
  height: auto;
  overflow: hidden;
  position: relative;
  background-color: transparent;
`;

interface SettingImageProps {
  title: string;
  subTitle: string;
}

const SettingImage: React.FC<SettingImageProps> = ({ title, subTitle }) => (
  <Container>
    <Title>{title}</Title>
    <SubTitle>{subTitle}</SubTitle>
    <ImageWrapper>
      <Image
        src="/settingImage.png"
        alt="Team Order Setting"
        width={195}
        height={111}
        priority
        style={{ width: '100%', height: 'auto' }}
      />
    </ImageWrapper>
  </Container>
);

export default SettingImage;
