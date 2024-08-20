import { Address } from './types';

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
