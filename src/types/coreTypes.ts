import { Image, ItemType } from './types';

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
  images: Image[];
  deliveryTimeRange: string;
  category: string;
}

export interface RestaurantType extends CommonType {
  name: string;
  deliveryPrice: number;
  minPurchasePrice: number;
  description?: string;
  entrepreneur_id?: number;
  address?: Address;
  phoneNumber?: string;
  openTime?: string;
  closeTime?: string;
  dayOfWeek?: string;
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
  description?: string;
}

export interface MenuType extends CommonType {
  menuId: number;
  storeId: number;
  name: string;
  description: string;
  price: number;
}

export interface TeamMenuItemsResponse extends Response {
  content: ItemType[];
}

export interface TeamMenuType extends CommonType {
  meetingId: number;
  teamPurchaseId: number;
  totalFee: number;
  items: TeamMenuItemsResponse;
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

export interface TeamMenusResponse extends Response {
  content: TeamMenuType[]
  meetingId: number;
}

export interface GetListParams {
  schoolId?: string;
  sortCriteria?: string | null;
  page?: number;
  size?: number;
  foodCategoryFilter?: string;
  searchMenu?: string;
}
