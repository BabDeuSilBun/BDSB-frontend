import { Box, Divider, Flex, Skeleton } from '@chakra-ui/react';

const InquirySkeleton = () => (
  <>
    <Box p="4">
      <Flex alignItems="center" gap="2">
        <Skeleton width="44px" height="24px" />
        <Skeleton width="100px" height="24px" />
      </Flex>
      <Flex alignItems="center" mt="2">
        <Skeleton width="100px" height="30px" />
        <Flex flex="1" />
        <Skeleton width="24px" height="24px" />
      </Flex>
    </Box>
    <Divider />
  </>
);

export default InquirySkeleton;
