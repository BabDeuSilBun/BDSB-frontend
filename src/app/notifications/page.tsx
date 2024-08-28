'use client';

import Image from 'next/image';

import styled from 'styled-components';

import Header from '@/components/layout/header';
import Container from '@/styles/container';

const Background = styled.div`
  background: var(--gray100);
  height: 100%;
`;

const Flex = styled.div`
  padding: 1rem;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.3rem;
  display: flex;
  background: white;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
  width: 55px;
  height: 55px;
  background: var(--primary);
  position: relative;
`;

const Content = styled.p`
  font-size: var(--font-size-sm);
  margin-bottom: 0.2rem;
`;
const ExtraContent = styled.span`
  font-size: var(--font-size-xs);
`;

const data = [
  {
    type: 'request',
    image: 'https://via.placeholder.com/150x150',
    content: '밥드실분님, 교촌치킨 모임은 어떠셨나요?',
    extraContent: '여기를 눌러 모임원의 후기를 남겨주세요!',
    createdAt: '2024.08.28',
    updatedAt: '2024.08.29',
  },
  {
    type: 'review',
    image: 'https://via.placeholder.com/150x150',
    content: '챈님이 보낸 교촌치킨 모임의 후기가 도착했어요!',
    extraContent: '여기를 눌러 따듯한 후기를 확인해보세요!',
    createdAt: '2024.08.28',
    updatedAt: '2024.08.29',
  },
  {
    type: 'delivery',
    image: 'https://via.placeholder.com/150x150',
    content: '밥드실분님, 교촌치킨 이 도착했어요.',
    extraContent: '도난 방지를 위해 빠르게 수령해주세요.',
    createdAt: '2024.08.28',
    updatedAt: '2024.08.29',
  },
  {
    type: 'participant',
    image: 'https://via.placeholder.com/150x150',
    content: '밥드실분님, 교촌치킨 모임에 합류하셨어요.',
    extraContent: '선택한 메뉴가 맞는지 한 번 더 확인해주세요.',
    createdAt: '2024.08.28',
    updatedAt: '2024.08.29',
  },
];

const Notifications = () => {
  return (
    <Background>
      <Header text="알림" buttonRight="home" />
      <Container>
        {data &&
          data.map((item, index) => (
            <Flex key={index}>
              <ImageWrapper>
                {item.image && (
                  <Image
                    src={item.image}
                    alt="My Profile Image"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                )}
              </ImageWrapper>
              <div>
                <Content>
                  {/* {isError
                    ? '에러가 발생했습니다.'
                    : isLoading
                      ? '불러오는 중'
                      : item && item.content} */}
                  {item && item.content}
                </Content>
                <ExtraContent>
                  {/* {isError
                    ? '에러가 발생했습니다.'
                    : isLoading
                      ? '불러오는 중'
                      : item && item.extraContent} */}
                  {item && item.extraContent}
                </ExtraContent>
              </div>
            </Flex>
          ))}
      </Container>
    </Background>
  );
};

export default Notifications;
