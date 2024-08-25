import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import ClientComponent from './clientComponent';

import MainHeader from '@/components/layout/mainHeader';
import { getTeamOrderList } from '@/services/teamOrderService';
import { getRestaurantsList } from '@/services/restaurantService';

export default async function Home() {
  const queryClient = new QueryClient();
  const initialPageParam = 0;
  const selectedSort = 'deadline';

  await queryClient.prefetchQuery({
    queryKey: ['imminentTeamOrders', selectedSort],
    queryFn: () =>
      getTeamOrderList({ page: 0, size: 4, sortCriteria: selectedSort }),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['teamOrderList', selectedSort],
    queryFn: ({ pageParam = 0 }) =>
      getTeamOrderList({
        page: pageParam,
        sortCriteria: selectedSort,
      }),
    initialPageParam,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['restaurantsList', selectedSort],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({
        page: pageParam,
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
