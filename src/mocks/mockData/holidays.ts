import { Holiday } from '@/types/coreTypes';

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
): { content: Holiday[]; totalPages: number } => {
  const totalPages = Math.ceil(holidayList.length / pageSize);
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const content = holidayList.slice(startIndex, endIndex);

  return {
    content,
    totalPages,
  };
};

// Specific storeId pagination function
export const getPaginatedHolidays = (
  storeId: number,
  page: number = 0,
): { content: Holiday[]; totalPages: number } => {
  const holidayList = holidays[storeId] || [];
  return createHolidayPages(holidayList, page);
};

// Usage example
// const storeId = 1;
// const paginatedHolidays = getPaginatedHolidays(storeId, 1);
