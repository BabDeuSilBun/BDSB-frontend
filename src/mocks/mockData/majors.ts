import { SchoolsResponse, SchoolType } from '@/types/authTypes';

const majors: SchoolType[] = [
  {
    id: 1,
    name: '컴퓨터공학과',
  },
  {
    id: 2,
    name: '소프트웨어학과',
  },
  {
    id: 3,
    name: '데이터과학과',
  },
  {
    id: 4,
    name: '시각디자인학과',
  },
  {
    id: 5,
    name: '멀티미디어학과',
  },
  {
    id: 6,
    name: '경영학과',
  },
  {
    id: 7,
    name: '경제학과',
  },
  {
    id: 8,
    name: '심리학과',
  },
  {
    id: 9,
    name: '영문학과',
  },
  {
    id: 10,
    name: '국문학과',
  },
  {
    id: 11,
    name: '철학과',
  },
  {
    id: 12,
    name: '법학과',
  },
  {
    id: 13,
    name: '행정학과',
  },
  {
    id: 14,
    name: '정치외교학과',
  },
  {
    id: 15,
    name: '사회학과',
  },
  {
    id: 16,
    name: '신문방송학과',
  },
  {
    id: 17,
    name: '교육학과',
  },
  {
    id: 18,
    name: '화학과',
  },
  {
    id: 19,
    name: '물리학과',
  },
  {
    id: 20,
    name: '수학과',
  },
  {
    id: 21,
    name: '생명과학과',
  },
  {
    id: 22,
    name: '지리학과',
  },
  {
    id: 23,
    name: '기계공학과',
  },
  {
    id: 24,
    name: '전자공학과',
  },
  {
    id: 25,
    name: '건축학과',
  },
  {
    id: 26,
    name: '토목공학과',
  },
  {
    id: 27,
    name: '화학공학과',
  },
  {
    id: 28,
    name: '환경공학과',
  },
  {
    id: 29,
    name: '바이오공학과',
  },
  {
    id: 30,
    name: '의학과',
  },
  {
    id: 31,
    name: '간호학과',
  },
  {
    id: 32,
    name: '약학과',
  },
  {
    id: 33,
    name: '한의학과',
  },
  {
    id: 34,
    name: '수의학과',
  },
  {
    id: 35,
    name: '체육학과',
  },
];

const pageSize = 10;
const totalPages = Math.ceil(majors.length / pageSize);

export const paginatedMajors: SchoolsResponse[] = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize;
    const end = start + pageSize;
    const content = majors.slice(start, end);
    const isLastPage = index === totalPages - 1;

    return {
      content,
      pageable: {
        offset: start,
        pageNumber: index,
        pageSize,
        sort: {
          empty: true,
          unsorted: true,
          sorted: false,
        },
        paged: true,
        unpaged: false,
      },
      last: isLastPage,
      totalPages,
      size: pageSize,
      first: index === 0,
      number: index,
      numberOfElements: content.length,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      totalElements: majors.length,
      empty: content.length === 0,
    };
  },
);
