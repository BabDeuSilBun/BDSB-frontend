import { useEffect, useRef, useState } from 'react';

import InquirySkeleton from '@/components/listItems/skeletons/inquirySkeleton';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getInquiries, getInquiryDetail } from '@/services/myDataService';
import styled from 'styled-components';

import TriggerButton from './triggerButton';
import InquiryDetail from '../../../components/listItems/inquiryItem';

const Container = styled.div`
  text-align: left;
`;

const InquiryHistory = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(
    null,
  );

  const {
    data: ListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['InquiryList'],
    queryFn: ({ pageParam = 0 }) => getInquiries({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
  });

  const {
    data: DetailData,
    isLoading: LoadDetailData,
    error: ErrorDetailData,
  } = useQuery({
    queryKey: ['InquiryDetail', selectedInquiryId],
    queryFn: () => {
      if (selectedInquiryId === null) {
        return Promise.reject(new Error('Inquiry ID is null'));
      }
      return getInquiryDetail(selectedInquiryId);
    },
    enabled: selectedInquiryId !== null,
  });

  console.log(ListData, DetailData);

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
        <p>설문 내역을 불러오지 못했습니다.</p>
      ) : ListData && ListData.pages.length > 0 ? (
        <>
          {ListData.pages.map((page) =>
            page.content.map((item) => (
              <div key={item.inquiryId}>
                <TriggerButton
                  isSelected={selectedInquiryId === item.inquiryId}
                  onClick={() => handleItemClick(item.inquiryId)}
                  inquiry={item}
                />
                {selectedInquiryId === item.inquiryId && (
                  <InquiryDetail
                    detailData={DetailData}
                    isLoading={LoadDetailData}
                    error={ErrorDetailData}
                  />
                )}
              </div>
            )),
          )}
        </>
      ) : (
        <div>주문 가능한 가게가 없습니다.</div>
      )}
    </Container>
  );
};

export default InquiryHistory;
