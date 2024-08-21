import { Address, Response } from './types';

export interface MyDataType {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  backAccount: {
    bank: string;
    accountNumber: string;
    accountOwner: string;
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

export interface PointsResponse extends Response {
  content: PointType[];
}
