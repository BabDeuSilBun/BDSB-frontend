import {
  EvaluateType,
  MyDataType,
  PointsResponse,
  PointType,
} from '@/types/myDataTypes';

export const myData: MyDataType = {
  userId: 1,
  email: 'bdsb@gmail.com',
  name: '밥친구',
  nickname: '오끼먹는 김말이',
  phoneNumber: '01012345678',
  backAccount: {
    bank: '',
    accountNumber: '',
    accountOwner: '',
  },
  point: 2500,
  address: {
    postal: '16427',
    streetAddress: '경기 서울시 나랑로 밥먹을까길 11',
    detailAddress: '학생회관 앞',
  },
  image: 'https://via.placeholder.com/50x50',
  meetingCount: 10,
  school: '식신대학교',
  campus: '서울캠퍼스',
  major: '호텔조리학과',
  isBanned: false,
};

export const evaluates: EvaluateType = {
  positiveEvaluate: [
    { content: '소통이 잘 돼요', count: 10 },
    { content: '같이 먹기 즐거워요', count: 3 },
    { content: '시간 약속을 잘 지켜요', count: 4 },
    { content: '응답이 빨라요', count: 1 },
  ],
  negativeEvaluate: [
    { content: '연락을 잘 안받아요', count: 1 },
    { content: '시간 약속을 안 지켜요', count: 1 },
    { content: '같이 먹기 불편해요', count: 0 },
  ],
};

const pointsDetails: PointType[] = [
  {
    createdAt: '2024-07-19T06:36:00',
    store: '교촌치킨',
    type: '적립',
    content: '차액 적립',
    amount: 2000,
  },
  {
    createdAt: '2024-07-20T06:40:00',
    store: '아마스빈',
    type: '사용',
    content: '결제 시 사용',
    amount: 1000,
  },
  {
    createdAt: '2024-07-20T08:40:00',
    store: '아마스빈',
    type: '적립',
    content: '모임 취소 환급',
    amount: 1000,
  },
];

const pageSize = 10;
const totalPages = Math.ceil(pointsDetails.length / pageSize);

export const paginatedPoints: PointsResponse[] = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize;
    const end = start + pageSize;
    const content = pointsDetails.slice(start, end);
    const isLastPage = index === totalPages - 1;

    return {
      content,
      pageable: {
        pageNumber: index,
        pageSize,
        sort: {
          empty: true,
          unsorted: true,
          sorted: false,
        },
      },
      last: isLastPage,
      totalPages,
      size: pageSize,
      first: index === 0,
    };
  },
);
