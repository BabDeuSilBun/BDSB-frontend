export type DeliveryStatusType =
  | '주문접수'
  | '배달시작'
  | '배달거의완료'
  | '배달완료';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface DeliveryStatusMockData {
  orderStatus: DeliveryStatusType;
  arrivalTime: string;
  remainingTime: number;
  restaurantPosition: LatLng;
  deliveryPosition: LatLng;
  riderPosition?: LatLng;
}
