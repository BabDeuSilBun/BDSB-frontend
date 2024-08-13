import { Skeleton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

const BigRestaurantSkeleton = () => {
  return (
    <>
      <Skeleton height="140px" m="4" mb="0" borderTopRadius="lg" />
      <Box
        padding="3"
        mx="4"
        boxShadow="lg"
        bg="white"
        borderBottomRadius="lg"
      >
        <Skeleton mt="2" height="20px" />
        <Skeleton mt="2" height="16px" />
      </Box>
    </>
  );
};

export default BigRestaurantSkeleton;
