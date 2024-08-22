'use client';

import { useState, useEffect } from 'react';
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

const AddPicBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  border: 2px dashed var(--gray300);
  border-radius: var(--border-radius-md);
`;

interface Prop {
  setIsActive: (isButtonActive: boolean) => void;
}

const InquiryContact = ({ setIsActive }: Prop) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (title.trim() && content.trim()) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [setIsActive, title, content]);

  return (
    <>
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
          <AddPicBtn>
            <Image
              src="/camera.svg"
              alt="add pictures"
              width="36"
              height="36"
            />
            <p>{`${0}/3`}</p>
          </AddPicBtn>
          <SettingDescription
            placeholder="문의 내용을 남겨주세요"
            charLimit={1000}
            value={content}
            onValueChange={setContent}
          />
        </ContentContainer>
      </Container>
    </>
  );
};

export default InquiryContact;
