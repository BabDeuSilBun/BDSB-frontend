import { SchoolsResponse, SchoolType } from '@/types/authTypes';

export const schools: SchoolType[] = [
  {
    id: 1,
    name: '서울대학교',
    campus: '관악캠퍼스',
  },
  {
    id: 2,
    name: '서울여자대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 3,
    name: '서울과학기술대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 4,
    name: '서강대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 5,
    name: '서울시립대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 6,
    name: '서경대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 7,
    name: '서일대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 8,
    name: '서원대학교',
    campus: '충북캠퍼스',
  },
  {
    id: 9,
    name: '서울한영대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 10,
    name: '서남대학교',
    campus: '전북캠퍼스',
  },
  {
    id: 11,
    name: '서산대학교',
    campus: '충남캠퍼스',
  },
  {
    id: 12,
    name: '서울사이버대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 13,
    name: '서호대학교',
    campus: '경기캠퍼스',
  },
  {
    id: 14,
    name: '서해대학교',
    campus: '전남캠퍼스',
  },
  {
    id: 15,
    name: '서울디지털대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 16,
    name: '서울미디어대학원대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 17,
    name: '서울예술대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 18,
    name: '서울벤처대학원대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 19,
    name: '서울교통대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 20,
    name: '성균관대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 21,
    name: '성균관대학교',
    campus: '자연과학캠퍼스',
  },
];

const pageSize = 10;
const totalPages = Math.ceil(schools.length / pageSize);

export const paginatedSchools: SchoolsResponse[] = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize; // 현재 페이지의 시작 인덱스
    const end = start + pageSize; // 현재 페이지의 끝 인덱스

    return {
      content: schools.slice(start, end), // 현재 페이지에 해당하는 데이터
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
