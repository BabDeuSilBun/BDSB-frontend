import { Response } from './types';

export interface SchoolType {
  id: number;
  name: string;
  campus: string;
}

export interface SchoolsResponse extends Response {
  content: SchoolType[];
}
