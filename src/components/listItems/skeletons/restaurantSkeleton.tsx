import { Box, Skeleton } from '@chakra-ui/react';
import styled from 'styled-components';

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RestaurantSkeleton = () => {
  return (
    <Flexbox>
      <Skeleton
        width="92px"
        height="92px"
        my="4"
        mr="3"
        ml="4"
        borderRadius="lg"
      />
      <Box flex="1">
        <Skeleton mt="4" width="140px" height="20px" />
        <Skeleton mt="2" width="100px" height="16px" />
        <Skeleton mt="2" width="100px" height="16px" />
        <Skeleton mt="2" width="100px" height="16px" />
      </Box>
    </Flexbox>
  );
};

export default RestaurantSkeleton;
