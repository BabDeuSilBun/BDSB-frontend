'use client';

import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import styled from 'styled-components';
import SettingDescription from '@/components/meetings/settingDescription';
import Image from 'next/image';

const Container = styled.div`
  text-align: left;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: var(--font-size-sm);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: var(--font-size-xs);
`;

const AddPicBtn = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  border: 2px dashed var(--gray300);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  margin-right: 0.5rem;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

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

interface Prop {
  setIsActive: (isButtonActive: boolean) => void;
  onFormDataChange: (formData: FormData) => void;
}

const InquiryContact = ({ setIsActive, onFormDataChange }: Prop) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  useEffect(() => {
    if (title.trim() && content.trim()) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    selectedImages.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    onFormDataChange(formData);
  }, [title, content, selectedImages, setIsActive, onFormDataChange]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...files].slice(0, 3));
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <div>
        <p>휴일을 제외하고 하루 이내에 답변 드립니다.</p>
        <p>답변이 오지 않으면 스팸 메일함을 확인해주세요.</p>
      </div>

      <ContentContainer>
        <span>문의 제목</span>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </ContentContainer>

      <ContentContainer>
        <span>문의 내용</span>
        <Flex>
          <AddPicBtn htmlFor="imageUpload">
            <Image
              src="/camera.svg"
              alt="add pictures"
              width="36"
              height="36"
            />
            <p>{`${selectedImages.length}/3`}</p>
          </AddPicBtn>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

          <ImagePreviewContainer>
            {selectedImages.map((image, index) => (
              <ImageWrapper key={index}>
                <ImagePreview
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                />
                <DeleteButton onClick={() => handleRemoveImage(index)}>
                  <Image
                    src={'/remove.svg'}
                    width="20"
                    height="20"
                    alt="remove"
                  />
                </DeleteButton>
              </ImageWrapper>
            ))}
          </ImagePreviewContainer>
        </Flex>

        <SettingDescription
          placeholder="문의 내용을 남겨주세요"
          charLimit={1000}
          value={content}
          onValueChange={setContent}
        />
      </ContentContainer>
    </Container>
  );
};

export default InquiryContact;
