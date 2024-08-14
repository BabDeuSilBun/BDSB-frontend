'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';
import { formatCurrency } from '@/utils/currencyFormatter';

const HeaderContainer = styled.div`
  width: 100vw;
  margin: 0 auto;
`;

const TeamOrderPage = () => {
  return (
    <div>
      <HeaderContainer>
        <Header 
          buttonLeft="back" 
          iconSize={24}
          text="교촌치킨 00동 1호점"
        />
      </HeaderContainer>
    </div>
  );
};

export default TeamOrderPage;