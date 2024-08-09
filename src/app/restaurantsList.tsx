'use client';

import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';
import { RestaurantSummary } from '@/types/restaurant';
import { useState } from 'react';

import { SmallCustomDropdown } from '@/components/common/dropdown';
import BigRestarantsItem from '@/components/listItems/bigRestarantItem';
import RestaurantsItem from '@/components/listItems/restaurantsItem';
import CategoryItem from '@/components/listItems/categoryItem';

import { getRestaurantsList } from '@/services/restaurantService';

const ListContainer = styled.section`
  margin: 124px 0 20px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

const options = [
  { id: 1, name: '주문이 임박한 순' },
  { id: 2, name: '배달비가 낮은 순' },
  { id: 3, name: '최소주문금액이 낮은 순' },
  { id: 4, name: '배송시간이 짧은 순' },
];

function RestarantsList() {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useQuery<RestaurantSummary[]>({
    queryKey: ['restaurantsList'],
    queryFn: getRestaurantsList,
  });

  if (isLoading) return <p>데이터를 로딩 중입니다...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSelect = (value: number | null) => {
    setSelectedValue(value);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ListContainer>
      <CategoryItem />
      <DropDownWrapper>
        <SmallCustomDropdown
          options={options}
          selectedValue={selectedValue}
          onSelect={handleSelect}
          isOpen={isOpen}
          onToggle={handleToggle}
        />
      </DropDownWrapper>
      {data ? (
        data.map((item) => <BigRestarantsItem item={item} key={item.storeId} />)
      ) : (
        <div>주문 가능한 가게가 없습니다.</div>
      )}
      {data ? (
        data.map((item, index) => (
          <div key={item.storeId}>
            <RestaurantsItem item={item} />
            {index < data.length - 1 && <Divider />}
          </div>
        ))
      ) : (
        <div>주문 가능한 가게가 없습니다.</div>
      )}
    </ListContainer>
  );
}

export default RestarantsList;
