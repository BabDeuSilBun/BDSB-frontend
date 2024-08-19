// others
export interface Image {
  imageId: number;
  url: string;
  sequence?: number;
  isRepresentative?: boolean;
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
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort?: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
  };
  last: boolean;
  totalPages: number;
}

export interface GetListParams {
  schoolId?: string;
  sortCriteria?: string | null;
  page?: number;
  size?: number;
  foodCategoryFilter?: string;
  searchMenu?: string;
  schoolName?: string;
  majorName?: string;
}
