import { Image, ItemType, Response, Address } from './types';

// Address interfaces
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

// Common interface for shared fields across different types
export interface CommonType {
  storeId: number;
  images: Image[];
  deliveryTimeRange: string;
  category: string;
}

// Restaurant type definition
export interface RestaurantType extends CommonType {
  name: string;
  deliveryPrice: number;
  minPurchasePrice: number;
  description?: string;
  entrepreneur_id?: number;
  address?: Address;
  phoneNumber?: string;
  openTime: string;
  closeTime: string;
  dayOfWeek?: string;
}

// Meeting type definition
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

// Menu type definition
export interface MenuType {
  menuId: number;
  storeId: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

// Team menu type definition
export interface TeamMenuType {
  teamPurchaseId: number;
  meetingId: number;
  storeId: number;
  totalFee: number;
  items: ItemType[];
}

// Individual order type definition
export interface IndividualOrderType {
  individualPurchaseId: number;
  meetingId: number;
  storeId: number;
  totalFee: number;
  items: ItemType[];
}

export interface IndividualOrderItems extends Response {
  content: ItemType[];
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
  content: TeamMenuType[];
}

export interface IndividualOrdersResponse extends Response {
  content: IndividualOrderType[];
}
