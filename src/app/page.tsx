import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import ClientComponent from './clientComponent';

import MainHeader from '@/components/layout/mainHeader';
import { getRestaurantsList } from '@/services/restaurantService';
import { getTeamOrderList } from '@/services/teamOrderService';

export default async function Home() {
  const queryClient = new QueryClient();
  const initialPageParam = 0;
  const selectedRestaurantsCriteria = `delivery-fee`;
  const selectedMeetingCriteria = 'deadline';

  await queryClient.prefetchQuery({
    queryKey: ['imminentTeamOrders', selectedMeetingCriteria],
    queryFn: () =>
      getTeamOrderList({
        page: 0,
        size: 4,
        sortCriteria: selectedMeetingCriteria,
      }),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['teamOrderList', selectedMeetingCriteria],
    queryFn: ({ pageParam = 0 }) =>
      getTeamOrderList({
        page: pageParam,
        sortCriteria: selectedMeetingCriteria,
      }),
    initialPageParam,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['restaurantsList', selectedRestaurantsCriteria],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({
        page: pageParam,
        sortCriteria: selectedRestaurantsCriteria,
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
