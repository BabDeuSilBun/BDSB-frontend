import { Image } from './types';

export interface Address {
  postal: string;
  streetAddress: string;
  detailAddress: string;
}

interface DeliveryAddress {
  deliveredPostal: string;
  deliveredStreetAddress: string;
  deliveredDetailAddress: string;
}

interface MetAddress {
  metPostal: string;
  metStreetAddress: string;
  metDetailAddress: string;
}

export interface MenuType {
  menuId: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface RestaurantType {
  storeId: number;
  name: string;
  image: Image[];
  deliveryTime: string;
  deliveryPrice: number;
  minPurchasePrice: number;
  description?: string; // optional field for detail field
  entrepreneur_id?: number; // optional field for detail field
  address?: Address; // optional field for detail field
  phoneNumber?: string; // optional field for detail field
  openTime?: string; // optional field for detail field
  closeTime?: string; // optional field for detail field
}

export interface MeetingType {
  meetingId: number;
  storeId: number;
  image: Image[];
  storeName: string;
  purchaseType: string;
  participantMax: number;
  paymentAvailableAt: string;
  deliveryFee: string;
  participantMin?: number; // optional field for detail field
  isEarlyPaymentAvailable?: boolean; // optional field for detail field
  deliveryAddress?: DeliveryAddress; // optional field for detail field
  metAddress?: MetAddress; // optional field for detail field
  deliveredAt?: string; // optional field for detail field
  status?: string; // optional field for detail field
}

interface Response {
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
}

export interface RestaurantsResponse extends Response {
  content: RestaurantType[];
}

export interface MeetingsResponse extends Response {
  content: MeetingType[];
}

export interface GetListParams {
  schoolId?: string;
  sortCriteria?: string | null;
  page?: number;
  size?: number;
  foodCategoryFilter?: string;
  searchMenu?: string;
}
