export interface PaymentResponse {
  transactionId: string;
  name: string;
  price: number;
}

export interface PaymentDoneResponse {
  transactionId: string;
  success: boolean;
}
