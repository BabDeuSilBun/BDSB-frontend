import { apiClient } from './apiClient';

import { PaymentDoneResponse, PaymentResponse } from '@/types/paymentTypes';

const PAYMENT_PREPARE_API_URL =
  '/api/users/meetings/{meetingId}/purchases/payment';
const PAYMENT_DONE_API_URL =
  '/api/users/meetings/{meetingId}/purchases/payment/done';

// Function to prepare the payment
export const preparePayment = async (
  meetingId: number,
  pg: string,
  payMethod: string,
  point: number,
): Promise<PaymentResponse> => {
  try {
    const url = PAYMENT_PREPARE_API_URL.replace(
      '{meetingId}',
      meetingId.toString(),
    );
    const response = await apiClient.post<PaymentResponse>(url, {
      pg,
      payMethod,
      point,
    });
    return response.data;
  } catch (error) {
    console.error('Error preparing payment:', error);
    throw new Error(
      '결제를 준비하는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};

// Function to verify the payment after it is completed
export const verifyPayment = async (
  meetingId: number,
  transactionId: string,
  portoneUid: string,
): Promise<PaymentDoneResponse> => {
  try {
    const url = PAYMENT_DONE_API_URL.replace(
      '{meetingId}',
      meetingId.toString(),
    );
    const response = await apiClient.post<PaymentDoneResponse>(url, {
      transactionId,
      portoneUid,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw new Error(
      '결제 검증에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
  }
};
