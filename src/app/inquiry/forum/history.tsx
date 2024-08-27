'use client';

import { useState } from 'react';

import { Divider, Flex, useDisclosure } from '@chakra-ui/react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import styled from 'styled-components';

import InquiryImageModal from './inquiryImageModal';
import InquiryImages from './inquiryImages';
import TriggerButton from './triggerButton';

import InquirySkeleton from '@/components/listItems/skeletons/inquirySkeleton';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { apiClientWithCredentials } from '@/services/apiClient';
import { getInquiries, getInquiryImages } from '@/services/myDataService';
import { ImageArrayType } from '@/types/types';
import { formatDateTime } from '@/utils/formateDateTime';

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

const InquiryHistory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(
    null,
  );
  const queryClient = useQueryClient();

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

  // 이미지 삭제를 위한 Mutation
  const deleteImageMutation = useMutation({
    mutationFn: async ({
      inquiryId,
      imageId,
    }: {
      inquiryId: number;
      imageId: number;
    }) => {
      console.log(
        `Deleting image with inquiryId: ${inquiryId} and imageId: ${imageId}`,
      );
      await apiClientWithCredentials.delete(
        `/api/users/inquiries/${inquiryId}/images/${imageId}`,
      );
    },
    onError: (error) => {
      console.error('이미지 삭제 중 오류가 발생했습니다.', error);
    },
    onSuccess: () => {
      console.log('이미지 삭제 성공');
    },
  });

  // 이미지 순서 변경을 위한 Mutation
  const updateImageMutation = useMutation({
    mutationFn: async ({
      inquiryId,
      imageId,
      sequence,
    }: {
      inquiryId: number;
      imageId: number;
      sequence: number;
    }) => {
      console.log(
        `Updating image with inquiryId: ${inquiryId} and imageId: ${imageId}`,
      );
      await apiClientWithCredentials.put(
        `/api/users/inquiries/${inquiryId}/images/${imageId}`,
        {
          sequence,
        },
      );
    },
    onError: (error) => {
      console.error('이미지 순서 변경 중 오류가 발생했습니다.', error);
    },
    onSuccess: () => {
      console.log('이미지 순서 변경 성공');
    },
  });

  const handleModalSave = (editedImages: ImageArrayType[]) => {
    if (!selectedInquiryId) {
      console.error('selectedInquiryId가 null입니다.');
      return;
    }

    images.forEach((originalImage: ImageArrayType) => {
      const editedImage = editedImages.find(
        (img) => img.imageId === originalImage.imageId,
      );

      console.log(`edited:`, editedImage);
      console.log(`original:`, originalImage);

      if (!editedImage) {
        deleteImageMutation.mutate({
          inquiryId: selectedInquiryId,
          imageId: originalImage.imageId,
        });
      } else if (originalImage.sequence !== editedImage.sequence) {
        updateImageMutation.mutate({
          inquiryId: selectedInquiryId,
          imageId: originalImage.imageId,
          sequence: editedImage.sequence,
        });
      }
    });

    if (selectedInquiryId !== null) {
      queryClient.invalidateQueries({
        queryKey: ['InquiryImages', selectedInquiryId],
      });
    }

    onClose();
  };

  const lastElementRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

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
              page.content.map((item, index) => {
                const { formattedFullDate } = formatDateTime(item.updatedAt);

                return (
                  <div
                    key={item.inquiryId}
                    ref={
                      index === page.content.length - 1 ? lastElementRef : null
                    }
                  >
                    <TriggerButton
                      isSelected={selectedInquiryId === item.inquiryId}
                      onClick={() =>
                        setSelectedInquiryId((prev) =>
                          prev === item.inquiryId ? null : item.inquiryId,
                        )
                      }
                      inquiry={item}
                    />

                    {selectedInquiryId === item.inquiryId && (
                      <div>
                        <ContentContainer>
                          <Flex h="4" gap="2" mb="2">
                            <span>문의내용</span>

                            {item.status === 'PENDING' && images && (
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
      </Container>

      {/* 이미지 수정 모달 */}
      {images && (
        <InquiryImageModal
          isOpen={isOpen}
          onClose={onClose}
          images={images}
          onSave={handleModalSave}
        />
      )}
    </>
  );
};

export default InquiryHistory;
