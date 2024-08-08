import Header from '@/components/layout/header';
// import Tabs from '@/components/layout/tabs';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getTeamOrderList } from '@/services/teamOrderService';
import { getRestaurantsList } from '@/services/restaurantService';

import TeamOrderList from './teamOrderList';
import RestaurantsList from './restaurantsList';

type Params = 'teamOrder' | 'restaurant';

export default async function Home() {
  const params: Params = 'teamOrder';
  const queryClient = new QueryClient();

  if (params === 'teamOrder') {
    await queryClient.prefetchQuery({
      queryKey: ['teamOrderList'],
      queryFn: getTeamOrderList,
    });
  } else if (params === 'restaurant') {
    await queryClient.prefetchQuery({
      queryKey: ['restaurantsList'],
      queryFn: getRestaurantsList,
    });
  } else {
    throw new Error(`Unexpected value for params: ${params}`);
  }
  return (
    <>
      <Header buttonLeft="hamburger" text="Header Text" buttonRight="home" />
      {/* <Tabs />*/}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {params === 'teamOrder' ? <TeamOrderList /> : <RestaurantsList />}
      </HydrationBoundary>
    </>
  );
}
