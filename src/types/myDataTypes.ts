import { Address, Response } from './types';

export interface MyDataType {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  bankAccount?: {
    bank?: string | null;
    accountNumber?: string | null;
    accountOwner?: string | null;
  };
  point: number;
  address: Address;
  image: string;
  meetingCount: number;
  school: string;
  campus: string;
  major: string;
  isBanned: boolean;
}

export interface CampusType {
  schoolId: number;
  school: string;
  campus: string;
}

export interface EvaluateType {
  positiveEvaluate: {
    content: string;
    count: number;
  }[];
  negativeEvaluate: {
    content: string;
    count: number;
  }[];
}

export interface PointType {
  createdAt: string;
  store: string;
  type: string;
  content: string;
  amount: number;
}

export interface InquiryType {
  inquiryId: number;
  title: string;
  content: string;
  answer?: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export interface PointsResponse extends Response {
  content: PointType[];
}

export interface InquiryResponse extends Response {
  content: InquiryType[];
}

export interface CampusResponse extends Response {
  content: CampusType[];
}
