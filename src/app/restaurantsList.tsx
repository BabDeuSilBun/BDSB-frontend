import RestarantsOrderItem from '@/components/listItems/restarantsOrderItem';
import { RestarantSummary } from '@/types/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';
import BigRestarantsItem from '@/components/listItems/bigRestarantsItem';
import CategoryItem from '@/components/listItems/categoryItem';

const getRestarantsList = async () => {
  const response = await axios.get('api/users/meetings');
  return response.data;
};

export default function RestarantsList() {
  return (
    <div>
      <CategoryItem />
    </div>
  );
}
