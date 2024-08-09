export function applyFiltersAndSorting(
  content: any[],
  filters: {
    campusFilter?: string;
    foodCategoryFilter?: string;
    searchMenu?: string;
  },
  sortCriteria?: string,
) {
  let filteredContent = content;

  // 필터링 적용
  if (filters.campusFilter) {
    filteredContent = filteredContent.filter(
      (item) => item.campus === filters.campusFilter,
    );
  }

  if (filters.foodCategoryFilter) {
    filteredContent = filteredContent.filter(
      (item) => item.foodCategory === filters.foodCategoryFilter,
    );
  }

  if (filters.searchMenu) {
    filteredContent = filteredContent.filter((item) =>
      item.menuItems.some(
        (menuItem) =>
          menuItem.name.includes(filters.searchMenu) ||
          menuItem.description.includes(filters.searchMenu),
      ),
    );
  }

  // 정렬 적용
  if (sortCriteria) {
    switch (sortCriteria) {
      case 'deadline':
        filteredContent.sort((a, b) =>
          a.deliveryTime.localeCompare(b.deliveryTime),
        );
        break;
      case 'delivery-fee':
        filteredContent.sort((a, b) => a.deliveryPrice - b.deliveryPrice);
        break;
      case 'min-price':
        filteredContent.sort((a, b) => a.minOrderPrice - b.minOrderPrice);
        break;
      case 'delivery-time':
        filteredContent.sort((a, b) =>
          a.deliveryTime.localeCompare(b.deliveryTime),
        );
        break;
      default:
        break;
    }
  }

  return filteredContent;
}
