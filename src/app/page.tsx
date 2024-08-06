import Header from '@/components/layout/header';
import Tabs from '@/components/layout/tabs';
import RestaurantsList from './restaurantsList';
import TeamOrderList from './teamOrderList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTeamOrderList } from '@/services/teamOrderService';
import { getRestaurantsList } from '@/services/restaurantService';

export default async function Home() {
  const params = 'temOrder';
  const queryClient = new QueryClient();

  if (params === 'temOrder') {
    await queryClient.prefetchQuery({
      queryKey: ['temOrderList'],
      queryFn: getTeamOrderList,
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
      {/* <HydrationBoundary state={dehydrate(queryClient)}>
        {params === 'temOrder' ? <TeamOrderList /> : <RestaurantsList />}
      </HydrationBoundary> */}
    </>
  );
}
