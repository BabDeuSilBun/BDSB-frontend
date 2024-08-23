import { Box, Skeleton } from '@chakra-ui/react';

const ImminentOrderSkeleton = () => {
  return (
    <Box width="192px" my="4" mr="4">
      <Skeleton height="92px" borderTopRadius="lg" />
      <Skeleton
        width="192px"
        height="36px"
        startColor="gray.300"
        endColor="gray.400"
      />
      <Box padding="2" boxShadow="lg" bg="white" borderBottomRadius="lg">
        <Skeleton height="20px" />
      </Box>
    </Box>
  );
};

export default ImminentOrderSkeleton;
