import { BtnGroup, HalfBtnLight, HalfBtnPurple } from '@/styles/button';
import { ImageArrayType } from '@/types/types';
import Image from 'next/image';
import {
  Divider,
  Flex,
  Wrap,
  WrapItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const ImageWrapper = styled.div`
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background: var(--gray200);
  position: relative;
  width: 60px;
  height: 60px;
`;

const ToggleBtn = styled.button.attrs({
  className: 'icon',
})<{ disabled: boolean }>`
  word-spacing: 3px;
  padding: 0.5rem;
  margin: -0.3rem;
  border: none;
  background: transparent;
  transform: rotate(90deg);
  color: ${(props) => (props.disabled ? 'var(--gray200)' : 'inherit')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

interface InquiryImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageArrayType[];
  onSave: (editedImages: ImageArrayType[]) => void;
}

const InquiryImageModal: React.FC<InquiryImageModalProps> = ({
  isOpen,
  onClose,
  images,
  onSave,
}) => {
  const [editedImages, setEditedImages] = useState<ImageArrayType[]>([]);

  useEffect(() => {
    setEditedImages(images);
  }, [images]);

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...editedImages];
    const [movedImage] = newImages.splice(index, 1); // 선택한 이미지를 배열에서 제거

    if (direction === 'up') {
      newImages.splice(index - 1, 0, movedImage); // 위로 이동
    } else {
      newImages.splice(index + 1, 0, movedImage); // 아래로 이동
    }

    setEditedImages(newImages); // 변경된 배열을 상태로 설정
  };

  // 이미지를 삭제하는 함수
  const removeImage = (index: number) => {
    const newImages = editedImages.filter((_, i) => i !== index);
    setEditedImages(newImages);
  };

  const handleSave = () => {
    onSave(editedImages); // 수정된 이미지 배열을 부모 컴포넌트에 전달
    onClose(); // 모달 닫기
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent w="330px">
        <ModalHeader>이미지 수정하기</ModalHeader>
        <ModalBody>
          <VStack divider={<Divider />} spacing={4} align="stretch">
            {editedImages &&
              editedImages.map((item: ImageArrayType, index: number) => (
                <Wrap key={item.imageId} justify="space-between">
                  <WrapItem>
                    <ImageWrapper>
                      <Image
                        src={item.url}
                        alt={`${item.sequence}번 째 이미지`}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                    </ImageWrapper>
                  </WrapItem>
                  <WrapItem>
                    <Flex mr="4" h="100%">
                      <button onClick={() => removeImage(index)}>삭제</button>
                    </Flex>

                    <Flex direction="column">
                      <ToggleBtn
                        onClick={() => moveImage(index, 'up')}
                        disabled={index === 0}
                      >
                        {'<'}
                      </ToggleBtn>
                      <ToggleBtn
                        onClick={() => moveImage(index, 'down')}
                        disabled={index === images.length - 1}
                      >
                        {'>'}
                      </ToggleBtn>
                    </Flex>
                  </WrapItem>
                </Wrap>
              ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <BtnGroup>
            <HalfBtnPurple onClick={handleSave}>{'수정하기'}</HalfBtnPurple>
            <HalfBtnLight onClick={onClose}>{'닫기'}</HalfBtnLight>
          </BtnGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InquiryImageModal;
