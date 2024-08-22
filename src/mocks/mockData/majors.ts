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
    const start = index * pageSize; // 현재 페이지의 시작 인덱스
    const end = start + pageSize; // 현재 페이지의 끝 인덱스

    return {
      content: majors.slice(start, end), // 현재 페이지에 해당하는 데이터
      pageable: {
        pageNumber: index, // 현재 페이지 번호
        pageSize, // 페이지당 데이터 개수
        sort: {
          empty: true, // 정렬 정보는 없는 경우이므로 true
          unsorted: true, // 정렬이 되어 있지 않으므로 true
          sorted: false, // 정렬되지 않은 경우이므로 false
        },
      },
      last: index === totalPages - 1, // 마지막 페이지 여부
      totalPages, // 전체 페이지 수
      size: pageSize, // 페이지당 데이터 개수
      first: index === 0, // 첫 페이지 여부
    };
  },
);
