import { MeetingType, RestaurantType } from '@/types/coreTypes';

export function applyFiltersAndSorting(
  content: (RestaurantType | MeetingType)[],
  filters: {
    size?: number;
    searchMenu?: string;
  },
  sortCriteria?: string,
) {
  let filteredContent = content;

  if (filters.searchMenu) {
    const searchTerms = filters.searchMenu
      .split(' ')
      .map((term) => term.trim())
      .filter((term) => term);

    filteredContent = filteredContent.filter((item) => {
      if ('name' in item) {
        // item이 RestaurantType인 경우
        const matchesName = searchTerms.some((term) =>
          item.name.includes(term),
        );

        const matchesDescription = item.description
          ? searchTerms.some((term) => item.description?.includes(term))
          : false;

        return matchesName || matchesDescription;
      }

      // item이 MeetingType인 경우
      return searchTerms.some((term) => item.storeName.includes(term));
    });
  }

  if (sortCriteria) {
    filteredContent.sort((a, b) => {
      if ('name' in a) {
        // item이 RestaurantType인 경우
        const restaurantA = a as RestaurantType;
        const restaurantB = b as RestaurantType;

        switch (sortCriteria) {
          case 'deadline':
            return restaurantA.deliveryTime.localeCompare(
              restaurantB.deliveryTime,
            );
          case 'delivery-fee':
            return restaurantA.deliveryPrice - restaurantB.deliveryPrice;
          case 'min-price':
            return restaurantA.minPurchasePrice - restaurantB.minPurchasePrice;
          case 'delivery-time':
            return restaurantA.deliveryTime.localeCompare(
              restaurantB.deliveryTime,
            );
          default:
            return 0; // 기본 정렬
        }
      } else {
        // item이 MeetingType인 경우
        const meetingA = a as MeetingType;
        const meetingB = b as MeetingType;

        if (sortCriteria === 'deadline') {
          return meetingA.paymentAvailableDt.localeCompare(
            meetingB.paymentAvailableDt,
          );
        }
        return 0; // 'deadline' 외의 정렬 기준은 적용하지 않음
      }
    });
  }

  if (filters.size) {
    filteredContent = filteredContent.slice(0, filters.size);
  }

  return filteredContent;
}
