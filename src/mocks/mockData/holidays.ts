import { Holiday, HolidaysResponse } from '@/types/coreTypes';

const holidays: { [key: number]: Holiday[] } = {
  1: [
    {
      dayOfWeek: '월요일',
      holidayId: 101,
    },
  ],
  2: [
    {
      dayOfWeek: '일요일',
      holidayId: 102,
    },
  ],
  3: [
    {
      dayOfWeek: '월요일',
      holidayId: 103,
    },
  ],
  4: [
    {
      dayOfWeek: '일요일',
      holidayId: 104,
    },
  ],
  5: [
    {
      dayOfWeek: '월요일',
      holidayId: 105,
    },
  ],
  6: [
    {
      dayOfWeek: '일요일',
      holidayId: 106,
    },
  ],
  7: [
    {
      dayOfWeek: '월요일',
      holidayId: 107,
    },
  ],
  8: [
    {
      dayOfWeek: '일요일',
      holidayId: 108,
    },
  ],
  9: [
    {
      dayOfWeek: '월요일',
      holidayId: 109,
    },
  ],
  10: [
    {
      dayOfWeek: '일요일',
      holidayId: 110,
    },
  ],
  11: [
    {
      dayOfWeek: '월요일',
      holidayId: 111,
    },
  ],
  12: [
    {
      dayOfWeek: '일요일',
      holidayId: 112,
    },
  ],
  13: [
    {
      dayOfWeek: '월요일',
      holidayId: 113,
    },
  ],
  14: [
    {
      dayOfWeek: '일요일',
      holidayId: 114,
    },
  ],
  15: [
    {
      dayOfWeek: '월요일',
      holidayId: 115,
    },
  ],
  16: [
    {
      dayOfWeek: '일요일',
      holidayId: 116,
    },
  ],
  17: [
    {
      dayOfWeek: '월요일',
      holidayId: 117,
    },
  ],
  18: [
    {
      dayOfWeek: '일요일',
      holidayId: 118,
    },
  ],
  19: [
    {
      dayOfWeek: '월요일',
      holidayId: 119,
    },
  ],
  20: [
    {
      dayOfWeek: '일요일',
      holidayId: 120,
    },
  ],
};

export default holidays;

const pageSize = 5;

const createHolidayPages = (
  holidayList: Holiday[],
  page: number,
  size: number = pageSize,
): HolidaysResponse => {
  const totalElements = holidayList.length;
  const totalPages = Math.ceil(totalElements / size);
  const startIndex = page * size;
  const endIndex = startIndex + size;
  const content = holidayList.slice(startIndex, endIndex);
  const first = page === 0;
  const last = page === totalPages - 1;
  const numberOfElements = content.length;

  return {
    content,
    totalElements,
    totalPages,
    size,
    number: page,
    sort: {
      empty: false,
      sorted: false,
      unsorted: true,
    },
    first,
    last,
    numberOfElements,
    pageable: {
      offset: startIndex,
      pageNumber: page,
      pageSize: size,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      paged: true,
      unpaged: false,
    },
    empty: content.length === 0,
  };
};

// Specific storeId pagination function
export const getPaginatedHolidays = (
  storeId: number,
  page: number = 0,
  size: number = pageSize,
): HolidaysResponse => {
  const holidayList = holidays[storeId] || [];
  return createHolidayPages(holidayList, page, size);
};

// Usage example
// const storeId = 1;
// const paginatedHolidays = getPaginatedHolidays(storeId, 1);
