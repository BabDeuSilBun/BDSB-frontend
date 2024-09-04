'use client';

import { useSearchParams } from 'next/navigation';

import RestaurantsList from './restaurantsList';
import TeamOrderList from './teamOrderList';

type Params = 'teamOrder' | 'restaurant';

const ClientComponent = () => {
  const searchParams = useSearchParams();
  const params: Params = (searchParams.get('menu') as Params) || 'teamOrder';

  return params === 'teamOrder' ? <TeamOrderList /> : <RestaurantsList />;
};

export default ClientComponent;
