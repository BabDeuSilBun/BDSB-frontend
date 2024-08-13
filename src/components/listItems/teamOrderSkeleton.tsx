import { Skeleton, Box } from '@chakra-ui/react';
import styled from 'styled-components';

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexItem = styled.div`
  flex: 1;
`;

const TeamOrderSkeleton = () => {
  return (
    <Flexbox>
      <Skeleton width="80px" height="96px" my="4" mr="3" borderRadius="lg" />
      <FlexItem>
        <Flexbox>
          <Skeleton mt="4" width="100px" height="16px" />
          <Skeleton mt="4" width="80px" height="16px" />
        </Flexbox>
        <Skeleton mt="2" width="140px" height="20px" />
        <Skeleton mt="2" width="100px" height="16px" />
        <Flexbox>
          <Skeleton mt="2" width="100px" height="16px" />
          <Skeleton mt="2" width="80px" height="16px" />
        </Flexbox>
      </FlexItem>
    </Flexbox>
  );
};

export default TeamOrderSkeleton;
