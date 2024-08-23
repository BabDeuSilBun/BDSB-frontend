import { Divider, SkeletonText } from '@chakra-ui/react';
import { InquiryType } from '@/types/myDataTypes';
import styled from 'styled-components';
import { formatDateTime } from '@/utils/formateDateTime';

const ContentContainer = styled.div`
  padding: 1rem;
`;

const AnswerContainer = styled.div`
  background: var(--gray100);
  padding: 1rem;

  span {
    font-size: var(--font-size-xs);
    color: var(--gray300);
  }
`;

const InquiryDetail = ({
  detailData,
  isLoading,
  error,
}: {
  detailData: InquiryType;
  isLoading: boolean;
  error: Error | null;
}) => {
  if (error) {
    return <p>데이터를 불러오지 못했습니다.</p>;
  }

  const { formattedFullDate } = formatDateTime(detailData?.updatedAt);

  return (
    <div>
      <Divider />
      <ContentContainer>
        {isLoading ? (
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        ) : (
          detailData?.content
        )}
      </ContentContainer>
      <Divider />
      {detailData && detailData.status === 'COMPLETED' && (
        <AnswerContainer>
          <span>{formattedFullDate || 'yyyy-mm-dd'}</span>
          <div>
            {isLoading ? (
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            ) : (
              detailData?.answer
            )}
          </div>
        </AnswerContainer>
      )}
    </div>
  );
};

export default InquiryDetail;
