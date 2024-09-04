import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import SortedList from './sortedList';

import AccordionTabs from '@/components/layout/accordionTabs';
import Header from '@/components/layout/header';
import { getRestaurantsList } from '@/services/restaurantService';

export default async function Home() {
  const queryClient = new QueryClient();
  const initialPageParam = 0;
  const selectedSort = 'deadline';
  const categoryId = 6;

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['sortedList', selectedSort, categoryId],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantsList({
        page: pageParam,
        sortCriteria: selectedSort,
        foodCategoryFilter: categoryId,
      }),
    initialPageParam,
  });

  return (
    <>
      <Header
        buttonLeft="hamburger"
        buttonRight="home"
        text="카테고리별 보기"
      />
      <AccordionTabs />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SortedList />
      </HydrationBoundary>
    </>
  );
}
