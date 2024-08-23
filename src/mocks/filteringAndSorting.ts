import { MeetingType, RestaurantType } from '@/types/coreTypes';

export function applyFiltersAndSorting(
  content: (RestaurantType | MeetingType)[],
  filters: {
    foodCategoryFilter?: string;
    keyword?: string;
    size?: number;
  },
  sortCriteria?: string,
) {
  let filteredContent = content;

  if (filters.keyword) {
    const searchTerms = filters.keyword
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

  if (filters.foodCategoryFilter) {
    const decodedCategory = decodeURIComponent(filters.foodCategoryFilter);
    filteredContent = filteredContent.filter((item) => {
      return item.category === decodedCategory;
    });
  }
  if (sortCriteria) {
    // 첫 번째 숫자를 추출하는 함수
    const extractFirstNumber = (stringValue: string) => {
      const match = stringValue.match(/(\d+)/);
      return match ? parseInt(match[0], 10) : 0;
    };

    // 두 번째 숫자를 추출하는 함수
    const extractSecondNumber = (stringValue: string) => {
      const matches = stringValue.match(/(\d+)/g);
      return matches && matches.length > 1 ? parseInt(matches[1], 10) : 0;
    };

    // 숫자를 비교하는 함수
    const compareByNumbers = (valueA: string, valueB: string) => {
      const firstNumberDiff =
        extractFirstNumber(valueA) - extractFirstNumber(valueB);
      if (firstNumberDiff !== 0) {
        return firstNumberDiff;
      }
      return extractSecondNumber(valueA) - extractSecondNumber(valueB);
    };

    filteredContent.sort((a, b) => {
      let comparisonResult = 0;

      if ('name' in a && 'name' in b) {
        // RestaurantType
        const restaurantA = a as RestaurantType;
        const restaurantB = b as RestaurantType;

        switch (sortCriteria) {
          case 'delivery-fee':
            comparisonResult =
              restaurantA.deliveryPrice - restaurantB.deliveryPrice;
            break;
          case 'min-price':
            comparisonResult =
              restaurantA.minPurchasePrice - restaurantB.minPurchasePrice;
            break;
          case 'delivery-time':
            comparisonResult = compareByNumbers(
              restaurantA.deliveryTimeRange,
              restaurantB.deliveryTimeRange,
            );
            break;
          default:
            break;
        }
      } else {
        // MeetingType
        const meetingA = a as MeetingType;
        const meetingB = b as MeetingType;

        switch (sortCriteria) {
          case 'deadline':
            comparisonResult = meetingA.paymentAvailableAt.localeCompare(
              meetingB.paymentAvailableAt,
            );
            break;
          case 'delivery-fee':
            comparisonResult = compareByNumbers(
              meetingA.deliveryFeeRange,
              meetingB.deliveryFeeRange,
            );
            break;
          case 'delivery-time':
            comparisonResult = compareByNumbers(
              meetingA.deliveryTimeRange,
              meetingB.deliveryTimeRange,
            );
            break;
          default:
            break;
        }
      }

      return comparisonResult;
    });
  }

  if (filters.size) {
    filteredContent = filteredContent.slice(0, filters.size);
  }

  return filteredContent;
}
