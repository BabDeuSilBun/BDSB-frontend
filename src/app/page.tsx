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

  const initialPageParam = 0;
  const selectedSort = 'deadline';

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['restaurantsList', selectedSort],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({
        pageParam,
        sortCriteria: selectedSort,
      }),
    initialPageParam,
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
