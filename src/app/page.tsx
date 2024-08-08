import MainHeader from '@/components/layout/mainHeader';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTeamOrderList } from '@/services/teamOrderService';
import { getRestaurantsList } from '@/services/restaurantService';
import ClientComponent from './clientComponent';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['teamOrderList'],
    queryFn: getTeamOrderList,
  });

  await queryClient.prefetchQuery({
    queryKey: ['restaurantsList'],
    queryFn: getRestaurantsList,
  });

  return (
    <>
      <MainHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientComponent />
      </HydrationBoundary>
    </>
  );
}
