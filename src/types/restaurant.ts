import { Image } from './types';

export interface RestaurantSummary {
  storeId: number;
  name: string;
  image: Image[];
  deliveryTime: string;
  deliveryPrice: number;
  minOrderPrice: number;
}

interface MenuItem {
  name: string;
  description: string;
  imageUrl: string;
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
  closeDay: string;
  menuItems: MenuItem[];
}

export interface RestaurantsResponse {
  content: RestaurantSummary[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
}

export interface GetRestaurantsListParams {
  pageParam?: number;
  campusFilter?: string;
  sortCriteria?: string | null;
  foodCategoryFilter?: string;
  searchMenu?: string;
}
