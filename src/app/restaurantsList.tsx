'use client';

import { useQuery } from '@tanstack/react-query';
// import styled from 'styled-components';
import { RestaurantSummary } from '@/types/restaurant';
import BigRestarantsItem from '@/components/listItems/bigRestarantItem';
import RestaurantsItem from '@/components/listItems/restaurantsItem';
import CategoryItem from '@/components/listItems/categoryItem';
import { getRestaurantsList } from '@/services/restaurantService';

function RestarantsList() {
  const { data, isLoading, error } = useQuery<RestaurantSummary[]>({
    queryKey: ['restaurantsList'],
    queryFn: getRestaurantsList,
  });

  if (isLoading) return <p>데이터를 로딩 중입니다...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <CategoryItem />
      <select name="" id="">
        <option value="">기본 순</option>
        <option value="">최소주문금액 낮은 순</option>
      </select>
      {data ? (
        data.map((item) => <BigRestarantsItem item={item} key={item.storeId} />)
      ) : (
        <div>주문 가능한 가게가 없습니다.</div>
      )}
      {data ? (
        data.map((item) => <RestaurantsItem item={item} key={item.storeId} />)
      ) : (
        <div>주문 가능한 가게가 없습니다.</div>
      )}
    </div>
  );
}

export default RestarantsList;
