export interface MeetingSummary {
  meetingId: number;
  storeId: number;
  storeName: string;
  orderType: string;
  participantMax: number;
  paymentAvailableDt: string;
}

export interface MeetingDetail extends MeetingSummary {
  leaderId: number;
  participantMin: number;
  isEarlyPaymentAvailable: boolean;
  deliveredAt: string;
  deliveredPostal: string;
  deliveredStreetAddress: string;
  deliveredDetailAddress: string;
  meetedPostal: string;
  meetedStreetAddress: string;
  meetedDetailAddress: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
