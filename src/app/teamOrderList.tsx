// teamOrderList.tsx

'use client';

import TeamOrderItem from '@/components/listItems/teamOrderItem';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface TeamOrder {
  meetingId: number;
  storeId: number;
  // 다른 필드들도 여기에 추가
  storeName: string;
  status: string;
}

const getTemOrderList = async () => {
  const response = await axios.get('http://www.test.com/api/meetings');
  return response.data;
};

const TeamOrderList = () => {
  const { data, error, isLoading } = useQuery<TeamOrder[]>({
    queryKey: ['temOrderList'],
    queryFn: getTemOrderList,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.map((item) => <TeamOrderItem key={item.meetingId} item={item} />)}
    </div>
  );
};

export default TeamOrderList;
