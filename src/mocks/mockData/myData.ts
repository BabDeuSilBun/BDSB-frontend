import { EvaluateType, MyDataType } from '@/types/myDataTypes';

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
