// others
export interface ImageType {
  imageId: number;
  url: string;
  sequence?: number;
  isRepresentative?: boolean;
}

export interface ImageArrayType {
  imageId: number;
  url: string;
  sequence: number;
}

export interface Address {
  postal: string;
  streetAddress: string;
  detailAddress: string;
}

export interface ItemType {
  purchaseId: number;
  menuId: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

// Response interface for paginated data
export interface Response {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export interface GetListParams {
  schoolId?: number | null;
  sortCriteria?: string | null;
  page?: number;
  size?: number;
  foodCategoryFilter?: number;
  searchMenu?: string;
  schoolName?: string;
  majorName?: string;
}

export interface ProfileType {
  nickname: string;
  image: string;
  major: string;
  meetingCount: number;
  positiveEvaluate: {
    content: string;
    count: number;
  }[];
}
