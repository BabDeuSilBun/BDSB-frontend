import { Divider, Skeleton } from '@chakra-ui/react';
import styled from 'styled-components';

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  gap: 0.5rem;
`;

const FlexItem = styled.div`
  flex: 1;
`;

const PointSkeleton = () => {
  return (
    <>
      <Flexbox>
        <Skeleton width="30px" height="15px" mr="3" />
        <div>
          <Skeleton width="100px" height="22px" />
          <Skeleton mt="3" width="120px" height="18px" />
        </div>
        <FlexItem />
        <Skeleton width="100px" height="22px" />
      </Flexbox>
      <Divider />
    </>
  );
};

export default PointSkeleton;
