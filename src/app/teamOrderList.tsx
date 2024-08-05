'use client';

import { MeetingSummary } from '@/types/meeting';
import TeamOrderItem from '@/components/listItems/teamOrderItem';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getTemOrderList = async () => {
  const response = await axios.get('api/users/meetings');
  return response.data;
};

const TeamOrderList = () => {
  const { data, error } = useQuery<MeetingSummary[]>({
    queryKey: ['temOrderList'],
    queryFn: getTemOrderList,
  });

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3 className='bold'>임박한 모임</h3>
      {data?.map((item) => <TeamOrderItem key={item.meetingId} item={item} />)}
    </div>
  );
};

export default TeamOrderList;
