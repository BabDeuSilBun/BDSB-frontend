'use client';

import { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

import InquirySkeleton from '@/components/listItems/skeletons/inquirySkeleton';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getInquiries, getInquiryImages } from '@/services/myDataService';
import { formatDateTime } from '@/utils/formateDateTime';
import styled from 'styled-components';
import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
// import Image from 'next/image';

import TriggerButton from './triggerButton';
import InquiryImages from './inquiryImages';

const Container = styled.div`
  text-align: left;
  margin-top: -1rem;
`;

const ContentContainer = styled.div`
  padding: 1rem;

  span,
  button {
    font-size: var(--font-size-xs);
    color: var(--gray300);
    margin-bottom: 0.2rem;
  }
`;

const AnswerContainer = styled.div`
  background: var(--gray100);
  padding: 1rem;

  span {
    font-size: var(--font-size-xs);
    color: var(--gray300);
  }
`;

const ImagesContainer = styled.ul`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ImageWrapper = styled.div`
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background: var(--gray200);
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100px;
  height: 100px;
`;

const InquiryHistory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(
    null,
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['InquiryList'],
      queryFn: ({ pageParam = 0 }) => getInquiries({ page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
      },
    });

  const {
    data: images,
    isLoading: isImagesLoading,
    isError: isImagesError,
  } = useQuery({
    queryKey: ['InquiryDetail', selectedInquiryId],
    queryFn: () => {
      if (selectedInquiryId === null) {
        return Promise.reject(new Error('Inquiry ID is null'));
      }
      return getInquiryImages(selectedInquiryId);
    },
    enabled: selectedInquiryId !== null,
  });

  // const handleModalExit = () => {
  //   window.location.reload();
  // };

  const handleItemClick = (inquiryId: number) => {
    setSelectedInquiryId((prev) => (prev === inquiryId ? null : inquiryId));
  };

  useEffect(() => {
    if (isFetchingNextPage) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current && lastElementRef.current) {
        observer.current.unobserve(lastElementRef.current);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <>
      <Container>
        {status === 'pending' ? (
          <>
            <InquirySkeleton />
            <InquirySkeleton />
            <InquirySkeleton />
            <InquirySkeleton />
            <InquirySkeleton />
            <InquirySkeleton />
            <InquirySkeleton />
          </>
        ) : status === 'error' ? (
          <p>문의 내역을 불러오지 못했습니다.</p>
        ) : data && data.pages.length > 0 ? (
          <>
            {data.pages.map((page) =>
              page.content.map((item) => {
                const { formattedFullDate } = formatDateTime(item.updatedAt);

                return (
                  <div key={item.inquiryId}>
                    <TriggerButton
                      isSelected={selectedInquiryId === item.inquiryId}
                      onClick={() => handleItemClick(item.inquiryId)}
                      inquiry={item}
                    />

                    {selectedInquiryId === item.inquiryId && (
                      <div>
                        <ContentContainer>
                          <Flex h="4" gap="2" mb="2">
                            <span>문의내용</span>

                            {item.status === 'PENDING' && (
                              <>
                                <Divider orientation="vertical" />
                                <button onClick={onOpen}>수정하기</button>
                              </>
                            )}
                          </Flex>
                          <ImagesContainer>
                            <InquiryImages
                              images={images}
                              isLoading={isImagesLoading}
                              isError={isImagesError}
                            />
                          </ImagesContainer>
                          <div>{item.content}</div>
                        </ContentContainer>

                        {item.status === 'COMPLETED' && (
                          <AnswerContainer>
                            <Flex h="4" gap="2" mb="2">
                              <span>답변내용</span>
                              <Divider orientation="vertical" />
                              <span>{formattedFullDate}</span>
                            </Flex>
                            <div>{item.answer}</div>
                          </AnswerContainer>
                        )}
                      </div>
                    )}
                  </div>
                );
              }),
            )}
          </>
        ) : (
          <div>문의 내역이 없습니다.</div>
        )}
        <div ref={lastElementRef} />
      </Container>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>rmfwkrmfwkrmfkwrmfm</div>
          </ModalBody>
          <ModalFooter>
            <button onClick={onClose}>Close</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InquiryHistory;

// onClick={handleModalContinue}
// onClick={handleModalExit}
