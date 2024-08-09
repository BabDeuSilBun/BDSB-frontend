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

export interface RestaurantsResponse {
  content: RestaurantSummary[];
  pageable: {
    pageNumber: number;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
  code: string;
  message: string;
}

export interface GetRestaurantsListParams {
  pageParam?: number;
  campusFilter?: string;
  sortCriteria?: string | null;
  foodCategoryFilter?: string;
  searchMenu?: string;
}
