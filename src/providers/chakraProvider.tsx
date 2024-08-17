'use client';

import React from 'react'; // React를 명시적으로 import
import { ChakraProvider as Chakra } from '@chakra-ui/react';
import theme from '@/styles/theme';

function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <Chakra theme={theme}>{children}</Chakra>;
}

export default ChakraProvider;
