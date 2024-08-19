import { MeetingsResponse, MeetingType } from '@/types/coreTypes';

export const meetings: MeetingType[] = [
  {
    meetingId: 1,
    storeId: 1,
    storeName: '맛있는 피자 집',
    images: [
      {
        imageId: 301,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '30분~45분',
    purchaseType: '각자 식사',
    participantMax: 10,
    paymentAvailableAt: '2024-08-15T09:23:00',
    deliveryFeeRange: '300원~1,500원',
    participantMin: 2,
    isEarlyPaymentAvailable: true, // true: 바로 주문; false: 예약 주문
    deliveryAddress: {
      deliveredPostal: '12345',
      deliveredStreetAddress: '서울시 강남구 테헤란로 123',
      deliveredDetailAddress: '12층 1201호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 백범로 35',
      metDetailAddress: 'BD대학교 본관 앞',
    },
    deliveredAt: '2024-08-15T09:30:00',
    status: '대기 중',
    category: '피자',
    description:
      '컴퓨터공학과 학생들이 모여 함께 피자를 즐기고 싶은 모임입니다. 피자를 좋아하는 누구나 환영합니다!',
  },
  {
    meetingId: 2,
    storeId: 2,
    storeName: '스시 마스터',
    images: [
      {
        imageId: 302,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '20분~40분',
    purchaseType: '함께 식사',
    participantMax: 8,
    paymentAvailableAt: '2024-08-15T14:48:00',
    deliveryFeeRange: '500원~2,000원',
    participantMin: 3,
    isEarlyPaymentAvailable: false,
    deliveryAddress: {
      deliveredPostal: '54321',
      deliveredStreetAddress: '서울시 중구 명동 1길 2',
      deliveredDetailAddress: '3층 305호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 상암로 76',
      metDetailAddress: 'BD대학교 도서관',
    },
    deliveredAt: '2024-08-15T14:50:00',
    status: '대기 중',
    category: '일식',
    description:
      '일식을 좋아하는 모든 학과 학생들을 환영합니다. 특히 일본어학과 학생들이 모여서 이야기하며 스시를 즐기는 시간을 가질 예정입니다.',
  },
  {
    meetingId: 3,
    storeId: 3,
    storeName: '한식의 정석',
    images: [
      {
        imageId: 303,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '35분~50분',
    purchaseType: '각자 식사',
    participantMax: 12,
    paymentAvailableAt: '2024-08-15T18:36:00',
    deliveryFeeRange: '300원~1,750원',
    participantMin: 4,
    isEarlyPaymentAvailable: true,
    deliveryAddress: {
      deliveredPostal: '67890',
      deliveredStreetAddress: '서울시 서초구 반포대로 101',
      deliveredDetailAddress: '2층 203호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 와우산로 66',
      metDetailAddress: 'BD대학교 후문',
    },
    deliveredAt: '2024-08-15T18:35:00',
    status: '대기 중',
    category: '찜·탕·찌개',
    description:
      '한국 음식을 사랑하는 외국어학과 학생들을 환영합니다. 한국 문화와 음식을 좋아하는 모든 이들을 초대합니다.',
  },
  {
    meetingId: 4,
    storeId: 4,
    storeName: '베이커리 하우스',
    images: [
      {
        imageId: 304,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '25분~40분',
    purchaseType: '함께 식사',
    participantMax: 6,
    paymentAvailableAt: '2024-08-15T08:28:00',
    deliveryFeeRange: '400원~1,250원',
    participantMin: 2,
    isEarlyPaymentAvailable: false,
    deliveryAddress: {
      deliveredPostal: '23456',
      deliveredStreetAddress: '서울시 송파구 올림픽로 45',
      deliveredDetailAddress: '1층 110호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 월드컵북로 96',
      metDetailAddress: 'BD대학교 정문',
    },
    deliveredAt: '2024-08-15T08:25:00',
    status: '대기 중',
    category: '카페·디저트',
    description:
      '디저트를 좋아하는 예술학과 학생들을 위한 모임입니다. 아침부터 달콤한 베이커리를 즐기고 싶은 분들 환영합니다!',
  },
  {
    meetingId: 5,
    storeId: 5,
    storeName: '패스트푸드 천국',
    images: [
      {
        imageId: 305,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '20분~45분',
    purchaseType: '각자 식사',
    participantMax: 15,
    paymentAvailableAt: '2024-08-15T12:15:00',
    deliveryFeeRange: '135원~1,000원',
    participantMin: 5,
    isEarlyPaymentAvailable: true,
    deliveryAddress: {
      deliveredPostal: '34567',
      deliveredStreetAddress: '서울시 강서구 화곡로 80',
      deliveredDetailAddress: '1층 120호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 백범로 35',
      metDetailAddress: 'BD대학교 중앙광장',
    },
    deliveredAt: '2024-08-15T12:45:00',
    status: '대기 중',
    category: '패스트푸드',
    description:
      '바쁜 공대생들을 위한 패스트푸드 모임입니다. 간편하게 끼니를 해결하고 싶은 모든 이들을 환영합니다.',
  },
  {
    meetingId: 6,
    storeId: 6,
    storeName: '중국집 대왕',
    images: [
      {
        imageId: 306,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '30분~40분',
    purchaseType: '함께 식사',
    participantMax: 10,
    paymentAvailableAt: '2024-08-15T10:10:00',
    deliveryFeeRange: '300원~1,500원',
    participantMin: 2,
    isEarlyPaymentAvailable: true,
    deliveryAddress: {
      deliveredPostal: '45678',
      deliveredStreetAddress: '서울시 강남구 논현로 111',
      deliveredDetailAddress: '2층 208호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 상암로 76',
      metDetailAddress: 'BD대학교 도서관 앞',
    },
    deliveredAt: '2024-08-15T10:30:00',
    status: '대기 중',
    category: '중식',
    description:
      '중화요리를 사랑하는 국제학부 학생들을 환영합니다. 중국 문화를 함께 나누고 싶은 모든 이들을 초대합니다.',
  },
  {
    meetingId: 7,
    storeId: 7,
    storeName: '해산물 왕국',
    images: [
      {
        imageId: 307,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '40~60분',
    purchaseType: '각자 식사',
    participantMax: 12,
    paymentAvailableAt: '2024-08-15T15:00:00',
    deliveryFeeRange: '334원~2,000원',
    participantMin: 6,
    isEarlyPaymentAvailable: false,
    deliveryAddress: {
      deliveredPostal: '56789',
      deliveredStreetAddress: '서울시 마포구 성산동 200',
      deliveredDetailAddress: '3층 305호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 백범로 35',
      metDetailAddress: 'BD대학교 본관 앞',
    },
    deliveredAt: '2024-08-15T15:50:00',
    status: '대기 중',
    category: '돈까스·회·일식',
    description:
      '해산물을 좋아하는 해양학과 학생들을 위한 모임입니다. 신선한 해산물을 즐기고 싶은 모든 분들 환영합니다.',
  },
  {
    meetingId: 8,
    storeId: 8,
    storeName: '떡볶이 명가',
    images: [
      {
        imageId: 308,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '20분~40분',
    purchaseType: '함께 식사',
    participantMax: 8,
    paymentAvailableAt: '2024-08-15T12:50:00',
    deliveryFeeRange: '250원~1,000원',
    participantMin: 2,
    isEarlyPaymentAvailable: true,
    deliveryAddress: {
      deliveredPostal: '67890',
      deliveredStreetAddress: '서울시 관악구 봉천로 123',
      deliveredDetailAddress: '1층 105호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 와우산로 66',
      metDetailAddress: 'BD대학교 후문',
    },
    deliveredAt: '2024-08-15T12:25:00',
    status: '대기 중',
    category: '분식',
    description:
      '분식을 좋아하는 모든 학과 학생들을 환영합니다. 특히 사회학과 학생들이 함께 모여 떡볶이를 즐길 예정입니다.',
  },
  {
    meetingId: 9,
    storeId: 9,
    storeName: '퓨전 한식',
    images: [
      {
        imageId: 309,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '30분~35분',
    purchaseType: '각자 식사',
    participantMax: 14,
    paymentAvailableAt: '2024-08-15T14:00:00',
    deliveryFeeRange: '250원~1,750원',
    participantMin: 2,
    isEarlyPaymentAvailable: false,
    deliveryAddress: {
      deliveredPostal: '78901',
      deliveredStreetAddress: '서울시 동작구 노량진로 200',
      deliveredDetailAddress: '2층 205호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 백범로 35',
      metDetailAddress: 'BD대학교 중앙광장',
    },
    deliveredAt: '2024-08-15T14:30:00',
    status: '대기 중',
    category: '찜·탕·찌개',
    description:
      '퓨전 한식을 좋아하는 언어학과 학생들을 환영합니다. 다양한 음식을 경험하고 싶은 모든 이들을 초대합니다.',
  },
  {
    meetingId: 10,
    storeId: 10,
    storeName: '브런치 카페',
    images: [
      {
        imageId: 310,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '20분~30분',
    purchaseType: '함께 식사',
    participantMax: 6,
    paymentAvailableAt: '2024-08-15T09:40:00',
    deliveryFeeRange: '334원~1,000원',
    participantMin: 2,
    isEarlyPaymentAvailable: true,
    deliveryAddress: {
      deliveredPostal: '89012',
      deliveredStreetAddress: '서울시 영등포구 당산로 150',
      deliveredDetailAddress: '1층 101호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 상암로 76',
      metDetailAddress: 'BD대학교 도서관',
    },
    deliveredAt: '2024-08-15T09:30:00',
    status: '대기 중',
    category: '카페·디저트',
    description:
      '아침형 인간들을 위한 브런치 모임입니다. 특히 경영학과 학생들이 모여 함께 아침을 시작합니다.',
  },
  {
    meetingId: 11,
    storeId: 11,
    storeName: '아메리칸 BBQ',
    images: [
      {
        imageId: 311,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '45분~50분',
    purchaseType: '각자 식사',
    participantMax: 10,
    paymentAvailableAt: '2024-08-15T11:00:00',
    deliveryFeeRange: '500원~2,500원',
    participantMin: 2,
    isEarlyPaymentAvailable: false,
    deliveryAddress: {
      deliveredPostal: '90123',
      deliveredStreetAddress: '서울시 성북구 보문로 88',
      deliveredDetailAddress: '2층 201호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 월드컵북로 96',
      metDetailAddress: 'BD대학교 정문',
    },
    deliveredAt: '2024-08-15T11:45:00',
    status: '대기 중',
    category: '고기·구이',
    description:
      '고기를 좋아하는 체육학과 학생들을 환영합니다. 바비큐를 즐기고 싶은 모든 분들 함께 해요!',
  },
  {
    meetingId: 12,
    storeId: 12,
    storeName: '프랑스 레스토랑',
    images: [
      {
        imageId: 312,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '50분~60분',
    purchaseType: '함께 식사',
    participantMax: 8,
    paymentAvailableAt: '2024-08-15T18:30:00',
    deliveryFeeRange: '750원~3,000원',
    participantMin: 2,
    isEarlyPaymentAvailable: true,
    deliveryAddress: {
      deliveredPostal: '01234',
      deliveredStreetAddress: '서울시 강북구 수유로 123',
      deliveredDetailAddress: '3층 305호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 백범로 35',
      metDetailAddress: 'BD대학교 본관 앞',
    },
    deliveredAt: '2024-08-15T18:50:00',
    status: '대기 중',
    category: '기타',
    description:
      '프랑스 문화를 좋아하는 외국어학과 학생들을 위한 모임입니다. 프랑스 음식을 경험하고 싶은 분들 환영합니다.',
  },
  {
    meetingId: 13,
    storeId: 13,
    storeName: '비건 카페',
    images: [
      {
        imageId: 313,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '30분~50분',
    purchaseType: '각자 식사',
    participantMax: 10,
    paymentAvailableAt: '2024-08-15T13:00:00',
    deliveryFeeRange: '300원~1,500원',
    participantMin: 2,
    isEarlyPaymentAvailable: false,
    deliveryAddress: {
      deliveredPostal: '12340',
      deliveredStreetAddress: '서울시 구로구 디지털로 123',
      deliveredDetailAddress: '2층 202호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 상암로 76',
      metDetailAddress: 'BD대학교 도서관',
    },
    deliveredAt: '2024-08-15T13:30:00',
    status: '대기 중',
    category: '카페·디저트',
    description:
      '비건 식단을 지향하는 환경공학과 학생들을 환영합니다. 건강한 라이프스타일을 지향하는 모든 이들을 초대합니다.',
  },
  {
    meetingId: 14,
    storeId: 14,
    storeName: '디저트 카페',
    images: [
      {
        imageId: 314,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '25분~60분',
    purchaseType: '함께 식사',
    participantMax: 12,
    paymentAvailableAt: '2024-08-15T15:30:00',
    deliveryFeeRange: '250원~1,500원',
    participantMin: 2,
    isEarlyPaymentAvailable: true,
    deliveryAddress: {
      deliveredPostal: '23450',
      deliveredStreetAddress: '서울시 강동구 성내로 45',
      deliveredDetailAddress: '1층 103호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 백범로 35',
      metDetailAddress: 'BD대학교 중앙광장',
    },
    deliveredAt: '2024-08-15T15:25:00',
    status: '대기 중',
    category: '카페·디저트',
    description:
      '디저트를 사랑하는 문예창작학과 학생들을 환영합니다. 달콤한 시간을 보내고 싶은 모든 분들 환영합니다.',
  },
  {
    meetingId: 15,
    storeId: 15,
    storeName: '갈비집',
    images: [
      {
        imageId: 315,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '50분~75분',
    purchaseType: '각자 식사',
    participantMax: 10,
    paymentAvailableAt: '2024-08-15T19:20:00',
    deliveryFeeRange: '500원~2,500원',
    participantMin: 2,
    isEarlyPaymentAvailable: false,
    deliveryAddress: {
      deliveredPostal: '34560',
      deliveredStreetAddress: '서울시 서초구 서초대로 99',
      deliveredDetailAddress: '3층 305호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 백범로 35',
      metDetailAddress: 'BD대학교 후문',
    },
    deliveredAt: '2024-08-15T19:50:00',
    status: '대기 중',
    category: '고기·구이',
    description:
      '고기를 좋아하는 모든 학과 학생들을 환영합니다. 특히 기계공학과 학생들이 모여 함께 고기를 즐길 예정입니다.',
  },
  {
    meetingId: 16,
    storeId: 16,
    storeName: '파스타 하우스',
    images: [
      {
        imageId: 316,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    deliveryTimeRange: '30분~50분',
    purchaseType: '각자 식사',
    participantMax: 10,
    paymentAvailableAt: '2024-08-15T15:00:00',
    deliveryFeeRange: '300원~1,500원',
    participantMin: 2,
    isEarlyPaymentAvailable: false,
    deliveryAddress: {
      deliveredPostal: '12340',
      deliveredStreetAddress: '서울시 구로구 디지털로 123',
      deliveredDetailAddress: '2층 202호',
    },
    metAddress: {
      metPostal: '03995',
      metStreetAddress: '서울시 마포구 상암로 76',
      metDetailAddress: 'BD대학교 도서관',
    },
    deliveredAt: '2024-08-15T13:30:00',
    status: '대기 중',
    category: '기타',
    description:
      '파스타를 좋아하는 모든 학과 학생들을 환영합니다. 특히 문학과 학생들이 함께 파스타를 즐기며 이야기를 나눌 예정입니다.',
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
