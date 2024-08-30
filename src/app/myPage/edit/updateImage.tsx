'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import styled from 'styled-components';

import { updateUserProfile } from '@/services/myDataService';
import { HalfBtnLight, HalfBtnPurple } from '@/styles/button';

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
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ModalImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  width: 150px;
  height: 150px;
  background: var(--primary);
  cursor: pointer;
  position: relative;
`;

const CameraBtnWrapper = styled.div`
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

const Circle = styled.div`
  border-radius: 50%;
  border: 3px solid white;
  aspect-ratio: 1/1;
  display: flex;
  padding: 1rem;
`;

interface Props {
  image: string | undefined;
}

const UpdateImage = ({ image }: Props) => {
  const initialImage = image === 'null' || !image ? null : image;
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (initialImage) setCurrentImage(initialImage);
  }, [initialImage]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (imageFile) {
      try {
        await updateUserProfile({ image: imageFile });
        onClose();
      } catch (error) {
        console.error('프로필 이미지 업데이트 중 오류 발생:', error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await updateUserProfile({ image: '' });
      setCurrentImage(null);
      setImageFile(null);
      onClose();
    } catch (error) {
      console.error('프로필 이미지 삭제 중 오류 발생:', error);
    }
  };

  return (
    <>
      <div>
        <ImageWrapper onClick={onOpen}>
          {initialImage && !!currentImage && (
            <Image
              src={initialImage}
              alt="My Profile Image"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          )}
          {currentImage && (
            <Image
              src={currentImage}
              alt="My Profile Image"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          )}
        </ImageWrapper>
        <CameraBtnWrapper>
          <Image
            src="/whiteCamera.svg"
            alt="프로필 이미지 변경"
            width={15}
            height={15}
            priority
          />
        </CameraBtnWrapper>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="center" flex="1" gap="2" mt="2rem">
              <ModalImageWrapper
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt="My Profile Image"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                ) : (
                  <Circle>
                    <Image
                      src="/whiteCamera.svg"
                      alt="프로필 이미지 변경"
                      width={50}
                      height={50}
                      priority
                    />
                  </Circle>
                )}
              </ModalImageWrapper>
              <HiddenFileInput
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex justify="center" flex="1" gap="2" mt="1rem">
              <HalfBtnPurple onClick={handleDelete}>삭제하기</HalfBtnPurple>
              <HalfBtnLight onClick={handleSave}>저장하기</HalfBtnLight>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateImage;
