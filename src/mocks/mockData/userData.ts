import { ProfileType } from '@/types/types';

export const userData: ProfileType = {
  nickname: '나는 네 친구',
  image: 'https://via.placeholder.com/50x50',
  major: '식품영양학과',
  meetingCount: 15,
  positiveEvaluate: [
    { content: '소통이 잘 돼요', count: 5 },
    { content: '같이 먹기 즐거워요', count: 2 },
    { content: '시간 약속을 잘 지켜요', count: 7 },
    { content: '응답이 빨라요', count: 0 },
  ],
};
