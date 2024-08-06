'use client';

import { MeetingSummary } from '@/types/meeting';
import TeamOrderItem from '@/components/listItems/teamOrderItem';
import ImminentOrderItem from '@/components/listItems/imminentOrderItem';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';

const getTemOrderList = async () => {
  const response = await axios.get('api/users/meetings');
  return response.data;
};

const Container = styled.section<{ additional?: string }>`
  padding: 1rem;
  padding-right: ${(props) => props.additional || '1rem'};
  padding-bottom: ${(props) => props.additional || '1rem'};
`;

// 터치 스크롤 구현 필요
const CardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const TeamOrderList = () => {
  const { data, error } = useQuery<MeetingSummary[]>({
    queryKey: ['temOrderList'],
    queryFn: getTemOrderList,
  });

  const imminentItems = data
    ?.sort(
      (a, b) =>
        new Date(a.paymentAvailableDt).getTime() -
        new Date(b.paymentAvailableDt).getTime(),
    )
    .slice(0, 4);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Container additional="0">
        <h3 className="bold xl">임박한 모임</h3>
        <CardContainer>
          {imminentItems?.map((item) => (
            <ImminentOrderItem key={item.meetingId} item={item} />
          ))}
        </CardContainer>
      </Container>
      <Divider />
      <Container>
        <h3 className="bold xl">모임 모아보기</h3>
        {data?.map((item, index) => (
          <div key={item.meetingId}>
            <TeamOrderItem item={item} />
            {index < data.length - 1 && <Divider />}
          </div>
        ))}
      </Container>
    </>
  );
};

export default TeamOrderList;
