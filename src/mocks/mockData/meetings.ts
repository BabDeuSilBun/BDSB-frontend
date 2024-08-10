import { MeetingsResponse, MeetingType } from '@/types/coreTypes';

export const meetings: MeetingType[] = [
  {
    meetingId: 1,
    storeId: 1,
    storeName: '푸라닭',
    image: [
      {
        imageId: 301,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '각자 식사',
    participantMax: 10,
    paymentAvailableDt: '2024-08-06T10:00:00',
    deliveryFee: '300원 ~ 3000원',
    participantMin: 2,
    isEarlyPaymentAvailable: true,
    deliveryAddress: {
      deliveredPostal: '12345',
      deliveredStreetAddress: '서울시 강남구 테헤란로 123',
      deliveredDetailAddress: '12층 1201호',
    },
    metAddress: {
      metPostal: '12345',
      metStreetAddress: '서울시 강남구 테헤란로 123',
      metDetailAddress: '12층 1201호',
    },
    deliveredAt: '2024-08-06T10:00:00',
    status: '확정',
  },
  {
    meetingId: 2,
    storeId: 2,
    storeName: '굽네치킨',
    image: [
      {
        imageId: 302,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '함께 식사',
    participantMax: 8,
    paymentAvailableDt: '2024-08-07T12:00:00',
    deliveryFee: '1000원 ~ 2500원',
    isEarlyPaymentAvailable: true,
    deliveredAt: '2024-08-07T13:00:00',
    status: '대기 중',
  },
  {
    meetingId: 3,
    storeId: 3,
    storeName: '피자헛',
    image: [
      {
        imageId: 303,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '각자 식사',
    participantMax: 6,
    paymentAvailableDt: '2024-08-08T14:00:00',
    deliveryFee: '500원 ~ 3500원',
    metAddress: {
      metPostal: '67890',
      metStreetAddress: '서울시 마포구 독막로 5',
      metDetailAddress: 'B1층',
    },
    deliveredAt: '2024-08-08T15:00:00',
    status: '확정',
  },
  {
    meetingId: 4,
    storeId: 4,
    storeName: '버거킹',
    image: [
      {
        imageId: 304,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '함께 식사',
    participantMax: 5,
    paymentAvailableDt: '2024-08-09T16:00:00',
    deliveryFee: '200원 ~ 4000원',
    participantMin: 3,
    isEarlyPaymentAvailable: false,
    deliveredAt: '2024-08-09T17:00:00',
    status: '취소됨',
  },
  {
    meetingId: 5,
    storeId: 5,
    storeName: '맘스터치',
    image: [
      {
        imageId: 305,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '각자 식사',
    participantMax: 12,
    paymentAvailableDt: '2024-08-10T18:00:00',
    deliveryFee: '200원 ~ 2000원',
    deliveredAt: '2024-08-10T19:00:00',
    status: '대기 중',
  },
  {
    meetingId: 6,
    storeId: 6,
    storeName: '네네치킨',
    image: [
      {
        imageId: 306,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '함께 식사',
    participantMax: 7,
    paymentAvailableDt: '2024-08-11T20:00:00',
    deliveryFee: '1200원 ~ 3000원',
    isEarlyPaymentAvailable: true,
    metAddress: {
      metPostal: '54321',
      metStreetAddress: '서울시 서초구 서초대로 12',
      metDetailAddress: '1층 로비',
    },
    deliveredAt: '2024-08-11T21:00:00',
    status: '확정',
  },
  {
    meetingId: 7,
    storeId: 7,
    storeName: 'BBQ치킨',
    image: [
      {
        imageId: 307,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '각자 식사',
    participantMax: 15,
    paymentAvailableDt: '2024-08-12T22:00:00',
    deliveryFee: '500원 ~ 2500원',
    participantMin: 5,
    deliveredAt: '2024-08-12T23:00:00',
    status: '확정',
  },
  {
    meetingId: 8,
    storeId: 8,
    storeName: '도미노피자',
    image: [
      {
        imageId: 308,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '함께 식사',
    participantMax: 10,
    paymentAvailableDt: '2024-08-13T10:00:00',
    deliveryFee: '1000원 ~ 3500원',
    isEarlyPaymentAvailable: false,
    metAddress: {
      metPostal: '67890',
      metStreetAddress: '서울시 용산구 청파로 15',
      metDetailAddress: '3층 회의실',
    },
    deliveredAt: '2024-08-13T11:00:00',
    status: '취소됨',
  },
  {
    meetingId: 9,
    storeId: 9,
    storeName: 'BHC치킨',
    image: [
      {
        imageId: 309,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '각자 식사',
    participantMax: 9,
    paymentAvailableDt: '2024-08-14T12:00:00',
    deliveryFee: '1000원 ~ 3000원',
    isEarlyPaymentAvailable: true,
    deliveredAt: '2024-08-14T13:00:00',
    status: '대기 중',
  },
  {
    meetingId: 10,
    storeId: 10,
    storeName: '맥도날드',
    image: [
      {
        imageId: 310,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '함께 식사',
    participantMax: 6,
    paymentAvailableDt: '2024-08-15T14:00:00',
    deliveryFee: '200원 ~ 1500원',
    deliveredAt: '2024-08-15T15:00:00',
    status: '확정',
  },
  {
    meetingId: 11,
    storeId: 11,
    storeName: 'KFC',
    image: [
      {
        imageId: 311,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '각자 식사',
    participantMax: 8,
    paymentAvailableDt: '2024-08-16T16:00:00',
    deliveryFee: '400원 ~ 5000원',
    participantMin: 4,
    metAddress: {
      metPostal: '54321',
      metStreetAddress: '서울시 종로구 종로 10',
      metDetailAddress: '지하 1층',
    },
    deliveredAt: '2024-08-16T17:00:00',
    status: '대기 중',
  },
  {
    meetingId: 12,
    storeId: 12,
    storeName: '서브웨이',
    image: [
      {
        imageId: 312,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '함께 식사',
    participantMax: 5,
    paymentAvailableDt: '2024-08-17T18:00:00',
    deliveryFee: '200원 ~ 4500원',
    isEarlyPaymentAvailable: false,
    deliveredAt: '2024-08-17T19:00:00',
    status: '확정',
  },
  {
    meetingId: 13,
    storeId: 13,
    storeName: '롯데리아',
    image: [
      {
        imageId: 313,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '각자 식사',
    participantMax: 7,
    paymentAvailableDt: '2024-08-18T20:00:00',
    deliveryFee: '700원 ~ 3500원',
    participantMin: 3,
    metAddress: {
      metPostal: '67890',
      metStreetAddress: '서울시 은평구 진관동 5',
      metDetailAddress: '4층 오피스',
    },
    deliveredAt: '2024-08-18T21:00:00',
    status: '취소됨',
  },
  {
    meetingId: 14,
    storeId: 14,
    storeName: '신전떡볶이',
    image: [
      {
        imageId: 314,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '함께 식사',
    participantMax: 10,
    paymentAvailableDt: '2024-08-19T10:00:00',
    deliveryFee: '300원 ~ 6000원 ',
    isEarlyPaymentAvailable: true,
    metAddress: {
      metPostal: '54321',
      metStreetAddress: '서울시 송파구 석촌호수로 5',
      metDetailAddress: '1층',
    },
    deliveredAt: '2024-08-19T11:00:00',
    status: '확정',
  },
  {
    meetingId: 15,
    storeId: 15,
    storeName: '바르다김선생',
    image: [
      {
        imageId: 315,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    purchaseType: '각자 식사',
    participantMax: 8,
    paymentAvailableDt: '2024-08-20T12:00:00',
    deliveryFee: '250원 ~ 4000원',
    participantMin: 5,
    deliveredAt: '2024-08-20T13:00:00',
    status: '확정',
  },
];

const pageSize = 10;
const totalPages = Math.ceil(meetings.length / pageSize);

export const paginatedMeetings: MeetingsResponse[] = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize; // 현재 페이지의 시작 인덱스
    const end = start + pageSize; // 현재 페이지의 끝 인덱스

    return {
      content: meetings.slice(start, end), // 현재 페이지에 해당하는 데이터
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
