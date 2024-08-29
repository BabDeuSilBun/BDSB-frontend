'use client';

import { useState } from 'react';

import Image from 'next/image';

import styled from 'styled-components';

import { updateUserProfile } from '@/services/myDataService';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  background: var(--primary);
  position: relative;
`;

const ImageChangerWrapper = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
  width: 24px;
  height: 24px;
  background: var(--gray300);
  border: 3px solid white;
  position: absolute;
  bottom: 0px;
  right: 0px;
  box-sizing: content-box;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

interface Props {
  image: string | undefined;
}

const UpdateImage = ({ image }: Props) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(image);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      try {
        if (!imageFile) return;

        const response = await updateUserProfile({
          image: file,
        });

        if (response && response.success) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setCurrentImage(reader.result as string); // 업로드된 이미지를 미리보기로 표시
          };
          reader.readAsDataURL(file);
        } else {
          console.error('프로필 이미지 업데이트 실패:', response.message);
        }
      } catch (error) {
        console.error('Error during updating profile image:', error);
      }
    }
  };

  return (
    <>
      <ImageWrapper>
        {currentImage ? (
          <Image
            src={currentImage}
            alt="My Profile Image"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          image && (
            <Image
              src={image}
              alt="My Profile Image"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          )
        )}
      </ImageWrapper>
      <ImageChangerWrapper>
        <Image
          src="/whiteCamera.svg"
          alt="프로필 이미지 변경"
          width={15}
          height={15}
          priority
        />
        <HiddenFileInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </ImageChangerWrapper>
    </>
  );
};

export default UpdateImage;
