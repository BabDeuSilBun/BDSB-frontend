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

export interface CommonType {
  storeId: number;
  image: string;
  deliveryTimeRange: string;
  category: string;
}

export interface RestaurantType extends CommonType {
  name: string;
  images: Image[]; 
  deliveryPrice: number;
  minPurchasePrice: number;
  description?: string; // optional field for detail field
  entrepreneur_id?: number; // optional field for detail field
  address?: Address; // optional field for detail field
  phoneNumber?: string; // optional field for detail field
  openTime?: string; // optional field for detail field
  closeTime?: string; // optional field for detail field
  dayOfWeek?: string; // optional field for detail field
}

export interface MeetingType extends CommonType {
  meetingId: number;
  storeName: string;
  purchaseType: string;
  participantMax: number;
  paymentAvailableAt: string;
  deliveryFeeRange: string;
  participantMin?: number;
  isEarlyPaymentAvailable?: boolean;
  deliveryAddress?: DeliveryAddress;
  metAddress?: MetAddress;
  deliveredAt?: string;
  status?: string;
  remarks?: string;
}

export interface MenuType extends CommonType {
  menuId: number;
  storeId: number;
  name: string;
  description: string;
  price: number;
}

interface Response {
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort?: {
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

export interface MenusResponse extends Response {
  content: MenuType[];
  storeId: number;
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
