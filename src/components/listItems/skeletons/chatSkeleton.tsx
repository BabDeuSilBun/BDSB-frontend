import { Box, Divider, Skeleton } from '@chakra-ui/react';

const ChatSkeleton = () => {
  return (
    <>
      <Box m="1rem">
        <Skeleton width="60%" height="20px" mb="3" />
        <Skeleton width="80%" height="18px" />
      </Box>
      <Divider />
    </>
  );
};

export default ChatSkeleton;
