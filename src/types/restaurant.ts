import { Image } from './types';

export interface RestaurantSummary {
  storeId: number;
  name: string;
  image: Image[];
  deliveryTime: string;
  deliveryPrice: number;
  minOrderPrice: number;
}

export interface RestarantDetail extends RestaurantSummary {
  entrepreneur_id: number;
  description: string;
  postal: string;
  streetAddress: string;
  detailAddress: string;
  phoneNumber: string;
  openTime: string;
  closeTime: string;
}

export interface PaginatedRestaurants {
  content: RestaurantSummary[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface GetRestaurantsListParams {
  pageParam?: number;
  campusFilter?: string;
  sortCriteria?: string | null;
  foodCategoryFilter?: string;
  searchMenu?: string;
}
