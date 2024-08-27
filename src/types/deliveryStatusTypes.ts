export type DeliveryStatusType =
  | '주문접수'
  | '배달시작'
  | '배달거의완료'
  | '배달완료';

export interface DeliveryStatusMockData {
  status: DeliveryStatusType;
  arrivalTime: string;
  remainingTime: number;
}
