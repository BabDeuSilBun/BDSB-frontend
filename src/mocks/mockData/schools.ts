import { SchoolsResponse, SchoolType } from '@/types/authTypes';
import { CampusResponse, CampusType } from '@/types/myDataTypes';

const schools: SchoolType[] = [
  {
    id: 1,
    name: '식신대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 2,
    name: '서울대학교',
    campus: '관악캠퍼스',
  },
  {
    id: 3,
    name: '서울여자대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 4,
    name: '서울과학기술대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 5,
    name: '서강대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 6,
    name: '서울시립대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 7,
    name: '서경대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 8,
    name: '서일대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 9,
    name: '서원대학교',
    campus: '충북캠퍼스',
  },
  {
    id: 10,
    name: '서울한영대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 11,
    name: '서남대학교',
    campus: '전북캠퍼스',
  },
  {
    id: 12,
    name: '서산대학교',
    campus: '충남캠퍼스',
  },
  {
    id: 13,
    name: '서울사이버대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 14,
    name: '서호대학교',
    campus: '경기캠퍼스',
  },
  {
    id: 15,
    name: '서해대학교',
    campus: '전남캠퍼스',
  },
  {
    id: 16,
    name: '서울디지털대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 17,
    name: '서울미디어대학원대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 18,
    name: '서울예술대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 19,
    name: '서울벤처대학원대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 20,
    name: '서울교통대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 21,
    name: '성균관대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 22,
    name: '성균관대학교',
    campus: '자연과학캠퍼스',
  },
  {
    id: 23,
    name: '연세대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 24,
    name: '연세대학교',
    campus: '미래캠퍼스',
  },
  {
    id: 25,
    name: '홍익대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 26,
    name: '홍익대학교',
    campus: '세종캠퍼스',
  },
  {
    id: 27,
    name: '이화여자대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 28,
    name: '중앙대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 29,
    name: '한국외국어대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 30,
    name: '한양대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 31,
    name: '경희대학교',
    campus: '서울캠퍼스',
  },
  {
    id: 32,
    name: '건국대학교',
    campus: '서울캠퍼스',
  },
];

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

const campuses: CampusType[] = [
  {
    schoolId: 1,
    school: '식신대학교',
    campus: '서울캠퍼스',
  },
  {
    schoolId: 2,
    school: '식신대학교',
    campus: '인천캠퍼스',
  },
  {
    schoolId: 3,
    school: '식신대학교',
    campus: '서산캠퍼스',
  },
  {
    schoolId: 4,
    school: '식신대학교',
    campus: '천안캠퍼스',
  },
  {
    schoolId: 5,
    school: '식신대학교',
    campus: '평택캠퍼스',
  },
  {
    schoolId: 6,
    school: '식신대학교',
    campus: '수원캠퍼스',
  },
  {
    schoolId: 7,
    school: '식신대학교',
    campus: '일산캠퍼스',
  },
  {
    schoolId: 8,
    school: '식신대학교',
    campus: '여수캠퍼스',
  },
  {
    schoolId: 9,
    school: '식신대학교',
    campus: '제주캠퍼스',
  },
  {
    schoolId: 10,
    school: '식신대학교',
    campus: '익산캠퍼스',
  },
  {
    schoolId: 11,
    school: '식신대학교',
    campus: '마산캠퍼스',
  },
  {
    schoolId: 12,
    school: '식신대학교',
    campus: '울산캠퍼스',
  },
  {
    schoolId: 13,
    school: '식신대학교',
    campus: '창원캠퍼스',
  },
  {
    schoolId: 14,
    school: '식신대학교',
    campus: '김해캠퍼스',
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

export const paginatedSchools: SchoolsResponse[] = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize;
    const end = start + pageSize;
    const content = schools.slice(start, end);
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
      totalElements: schools.length,
      empty: content.length === 0,
    };
  },
);

export const paginatedCampuses: CampusResponse[] = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize;
    const end = start + pageSize;
    const content = campuses.slice(start, end);
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
      totalElements: campuses.length,
      empty: content.length === 0,
    };
  },
);
