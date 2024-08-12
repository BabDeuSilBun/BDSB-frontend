import Header from '@/components/layout/header';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getRestaurantsList } from '@/services/restaurantService';
import SortedList from './sortedList';

export default async function Home() {
  const queryClient = new QueryClient();
  const initialPageParam = 0;
  const selectedSort = 'deadline';
  const category = '치킨';

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['sortedList', selectedSort, category],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({
        page: pageParam,
        sortCriteria: selectedSort,
        foodCategoryFilter: category,
      }),
    initialPageParam,
  });

  return (
    <>
      <Header buttonLeft="hamburger" buttonRight="home" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SortedList />
      </HydrationBoundary>
    </>
  );
}
