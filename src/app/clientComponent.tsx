'use client';

import { useSearchParams } from 'next/navigation';
import TeamOrderList from './teamOrderList';
import RestaurantsList from './restaurantsList';

type Params = 'teamOrder' | 'restaurant';

const ClientComponent = () => {
  const searchParams = useSearchParams();
  const params: Params = searchParams.get('menu');

  return (
    <>{params === 'teamOrder' ? <TeamOrderList /> : <RestaurantsList />}</>
  );
};

export default ClientComponent;
