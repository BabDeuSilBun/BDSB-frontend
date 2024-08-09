import { MeetingDetail } from '@/types/meeting';
import { RestarantDetail } from '@/types/restaurant';

export const stores: RestarantDetail[] = [
  {
    storeId: 1,
    entrepreneur_id: 101,
    name: '맛있는 피자 집',
    image: [
      {
        imageId: 201,
        url: 'https://avatars.githubusercontent.com/u/14985020?s=200&v=4',
      },
    ],
    description:
      '신선한 재료로 만든 정통 피자를 제공합니다. 다양한 토핑과 사이드 메뉴가 준비되어 있습니다.',
    minOrderPrice: 15000,
    deliveryTime: '30분',
    deliveryPrice: 3000,
    postal: '12345',
    streetAddress: '서울시 강남구 테헤란로 123',
    detailAddress: '12층 1201호',
    phoneNumber: '02-1234-5678',
    openTime: '11:00',
    closeTime: '22:00',
  },
  {
    storeId: 2,
    entrepreneur_id: 102,
    name: '건강한 샐러드 카페',
    image: [
      {
        imageId: 202,
        url: 'https://avatars.githubusercontent.com/u/14985020?s=200&v=4',
      },
    ],
    description:
      '신선한 채소와 다양한 드레싱으로 만든 샐러드를 제공합니다. 건강한 식사를 원하시는 분들에게 추천합니다.',
    minOrderPrice: 10000,
    deliveryTime: '20분',
    deliveryPrice: 2500,
    postal: '67890',
    streetAddress: '서울시 종로구 종로 45',
    detailAddress: '3층 305호',
    phoneNumber: '02-9876-5432',
    openTime: '09:00',
    closeTime: '21:00',
  },
];

export const meetings: MeetingDetail[] = [
  {
    meetingId: 1,
    leaderId: 101,
    storeId: 1,
    storeName: '푸라닭',
    orderType: '각자 식사',
    participantMin: 2,
    participantMax: 10,
    isEarlyPaymentAvailable: true,
    paymentAvailableDt: '2024-08-06T10:00:00',
    deliveredAt: '2024-08-06T10:00:00',
    deliveredPostal: '12345',
    deliveredStreetAddress: '서울시 강남구 테헤란로 123',
    deliveredDetailAddress: '12층 1201호',
    meetedPostal: '12345',
    meetedStreetAddress: '서울시 강남구 테헤란로 123',
    meetedDetailAddress: '12층 1201호',
    status: '확정',
    createdAt: '2024-08-06T09:00:00',
    updatedAt: '2024-08-06T09:00:00',
  },
  {
    meetingId: 2,
    leaderId: 102,
    storeId: 2,
    storeName: '교촌 치킨',
    orderType: '함께 식사',
    participantMin: 1,
    participantMax: 6,
    isEarlyPaymentAvailable: false,
    paymentAvailableDt: '2024-08-06T12:00:00',
    deliveredAt: '2024-08-06T12:00:00',
    deliveredPostal: '67890',
    deliveredStreetAddress: '서울시 종로구 종로 45',
    deliveredDetailAddress: '3층 305호',
    meetedPostal: '67890',
    meetedStreetAddress: '서울시 종로구 종로 45',
    meetedDetailAddress: '3층 305호',
    status: '대기 중',
    createdAt: '2024-08-06T11:00:00',
    updatedAt: '2024-08-06T11:00:00',
  },
];
