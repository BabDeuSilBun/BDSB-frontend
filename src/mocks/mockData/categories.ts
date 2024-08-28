import { CategoriesResponse, CategoryType } from '@/types/coreTypes';

export const categories: CategoryType[] = [
  {
    categoryId: 1,
    name: '족발·보쌈',
  },
  {
    categoryId: 2,
    name: '찜·탕·찌개',
  },
  {
    categoryId: 3,
    name: '돈까스·회·일식',
  },
  {
    categoryId: 4,
    name: '피자',
  },
  {
    categoryId: 5,
    name: '고기·구이',
  },
  {
    categoryId: 6,
    name: '치킨',
  },
  {
    categoryId: 7,
    name: '중식',
  },
  {
    categoryId: 8,
    name: '아시안',
  },
  {
    categoryId: 9,
    name: '카페·디저트',
  },
  {
    categoryId: 10,
    name: '패스트푸드',
  },
  {
    categoryId: 11,
    name: '분식',
  },
];

const pageSize = 10;
const totalPages = Math.ceil(categories.length / pageSize);

export const paginatedCategories: CategoriesResponse[] = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize;
    const end = start + pageSize;
    const content = categories.slice(start, end);
    const isLastPage = index === totalPages - 1;

    return {
      content,
      pageable: {
        pageNumber: index,
        pageSize,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
      },
      last: isLastPage,
      totalPages,
      size: pageSize,
      first: index === 0,
    };
  },
);
