import Header from '@/components/layout/header';
import Tabs from '@/components/layout/tabs';
import RestaurantsList from './restaurantsList';
import TeamOrderList from './teamOrderList';
import axios from 'axios';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query';

const getTemOrderList = async () => {
  try {
    const response = await axios.get('http://www.test.com/api/meetings');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const getRestaurantsList = async () => {
  try {
    const response = await axios.get('http://www.test.com/api/restaurants');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default async function Home() {
  const params = 'temOrder';
  const queryClient = new QueryClient();

  if (params === 'temOrder') {
    await queryClient.prefetchQuery({
      queryKey: ['temOrderList'],
      queryFn: getTemOrderList,
    });
  } else {
    await queryClient.prefetchQuery({
      queryKey: ['restaurantsList'],
      queryFn: getRestaurantsList,
    });
  }

  return (
    <>
      {/* <Header /> <Tabs />*/}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {params === 'temOrder' ? <TeamOrderList /> : <RestaurantsList />}
      </HydrationBoundary>
    </>
  );
}
