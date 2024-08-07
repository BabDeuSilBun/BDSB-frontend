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
  let params = 'store';
  const queryClient = new QueryClient();

  if (params === 'teamOrder') {
    await queryClient.prefetchQuery({
      queryKey: ['teamOrderList'],
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        {params === 'teamOrder' ? <TeamOrderList /> : <RestaurantsList />}
      </HydrationBoundary>
    </>
  );
}