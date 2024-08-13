import { RestaurantsResponse, RestaurantType } from '@/types/coreTypes';

export const stores: RestaurantType[] = [
  {
    storeId: 1,
    entrepreneur_id: 101,
    name: '맛있는 피자 집',
    image: [
      {
        imageId: 201,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description:
      '신선한 재료로 만든 정통 피자를 제공합니다. 다양한 토핑과 사이드 메뉴가 준비되어 있습니다.',
    minPurchasePrice: 15000,
    deliveryTime: '30분~45분',
    deliveryPrice: 3000,
    address: {
      postal: '12345',
      streetAddress: '서울시 강남구 테헤란로 123',
      detailAddress: '12층 1201호',
    },
    phoneNumber: '02-1234-5678',
    openTime: '11:00',
    closeTime: '22:00',
    category: '피자',
  },
  {
    storeId: 2,
    entrepreneur_id: 102,
    name: '스시 마스터',
    image: [
      {
        imageId: 202,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description:
      '정통 일본식 스시와 사시미를 제공합니다. 신선한 재료와 정성이 담긴 요리.',
    minPurchasePrice: 20000,
    deliveryTime: '20분~40분',
    deliveryPrice: 4000,
    address: {
      postal: '54321',
      streetAddress: '서울시 중구 명동 1길 2',
      detailAddress: '3층 305호',
    },
    phoneNumber: '02-2345-6789',
    openTime: '10:00',
    closeTime: '21:00',
    category: '일식',
  },
  {
    storeId: 3,
    entrepreneur_id: 103,
    name: '한식의 정석',
    image: [
      {
        imageId: 203,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '전통 한식을 현대적으로 재해석한 메뉴를 제공합니다.',
    minPurchasePrice: 18000,
    deliveryTime: '35분~50분',
    deliveryPrice: 3500,
    address: {
      postal: '67890',
      streetAddress: '서울시 서초구 반포대로 101',
      detailAddress: '2층 203호',
    },
    phoneNumber: '02-3456-7890',
    openTime: '09:00',
    closeTime: '22:00',
    category: '찜·탕·찌개',
  },
  {
    storeId: 4,
    entrepreneur_id: 104,
    name: '베이커리 하우스',
    image: [
      {
        imageId: 204,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description:
      '다양한 빵과 디저트를 제공합니다. 아침 식사와 간식으로 좋은 선택.',
    minPurchasePrice: 8000,
    deliveryTime: '25분~40분',
    deliveryPrice: 2500,
    address: {
      postal: '23456',
      streetAddress: '서울시 송파구 올림픽로 45',
      detailAddress: '1층 110호',
    },
    phoneNumber: '02-4567-8901',
    openTime: '07:00',
    closeTime: '19:00',
    category: '카페·디저트',
  },
  {
    storeId: 5,
    entrepreneur_id: 105,
    name: '패스트푸드 천국',
    image: [
      {
        imageId: 205,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '버거와 프라이, 음료를 제공하는 패스트푸드 레스토랑.',
    minPurchasePrice: 10000,
    deliveryTime: '20분~45분',
    deliveryPrice: 2000,
    address: {
      postal: '34567',
      streetAddress: '서울시 강서구 화곡로 80',
      detailAddress: '1층 120호',
    },
    phoneNumber: '02-5678-9012',
    openTime: '10:00',
    closeTime: '22:00',
    category: '패스트푸드',
  },
  {
    storeId: 6,
    entrepreneur_id: 106,
    name: '중국집 대왕',
    image: [
      {
        imageId: 206,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '중국 전통 요리를 현대적으로 변형하여 제공합니다.',
    minPurchasePrice: 15000,
    deliveryTime: '30분~40분',
    deliveryPrice: 3000,
    address: {
      postal: '45678',
      streetAddress: '서울시 강남구 논현로 111',
      detailAddress: '2층 208호',
    },
    phoneNumber: '02-6789-0123',
    openTime: '11:00',
    closeTime: '23:00',
    category: '중식',
  },
  {
    storeId: 7,
    entrepreneur_id: 107,
    name: '해산물 왕국',
    image: [
      {
        imageId: 207,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description:
      '신선한 해산물 요리를 제공합니다. 해산물 애호가를 위한 최고의 선택.',
    minPurchasePrice: 25000,
    deliveryTime: '40분~60분',
    deliveryPrice: 4000,
    address: {
      postal: '56789',
      streetAddress: '서울시 마포구 성산동 200',
      detailAddress: '3층 305호',
    },
    phoneNumber: '02-7890-1234',
    openTime: '10:00',
    closeTime: '22:00',
    category: '돈까스·회·일식',
  },
  {
    storeId: 8,
    entrepreneur_id: 108,
    name: '떡볶이 명가',
    image: [
      {
        imageId: 208,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '매콤한 떡볶이와 다양한 길거리 음식을 제공합니다.',
    minPurchasePrice: 10000,
    deliveryTime: '20분~40분',
    deliveryPrice: 2000,
    address: {
      postal: '67890',
      streetAddress: '서울시 관악구 봉천로 123',
      detailAddress: '1층 105호',
    },
    phoneNumber: '02-8901-2345',
    openTime: '11:00',
    closeTime: '21:00',
    category: '분식',
  },
  {
    storeId: 9,
    entrepreneur_id: 109,
    name: '파스타 하우스',
    image: [
      {
        imageId: 209,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '다양한 종류의 파스타를 제공합니다.',
    minPurchasePrice: 15000,
    deliveryTime: '30분~50분',
    deliveryPrice: 3000,
    address: {
      postal: '45670',
      streetAddress: '서울시 중구 퇴계로 222',
      detailAddress: '2층 205호',
    },
    phoneNumber: '02-6789-0123',
    openTime: '11:00',
    closeTime: '22:00',
    category: '기타',
  },
  {
    storeId: 10,
    entrepreneur_id: 110,
    name: '브런치 카페',
    image: [
      {
        imageId: 210,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '다양한 브런치 메뉴와 커피를 제공합니다.',
    minPurchasePrice: 12000,
    deliveryTime: '20분~30분',
    deliveryPrice: 2000,
    address: {
      postal: '89012',
      streetAddress: '서울시 영등포구 당산로 150',
      detailAddress: '1층 101호',
    },
    phoneNumber: '02-0123-4567',
    openTime: '08:00',
    closeTime: '20:00',
    category: '카페·디저트',
  },
  {
    storeId: 11,
    entrepreneur_id: 111,
    name: '아메리칸 BBQ',
    image: [
      {
        imageId: 211,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '진정한 미국식 바비큐를 경험하세요.',
    minPurchasePrice: 25000,
    deliveryTime: '45분~50분',
    deliveryPrice: 5000,
    address: {
      postal: '90123',
      streetAddress: '서울시 성북구 보문로 88',
      detailAddress: '2층 201호',
    },
    phoneNumber: '02-1234-5678',
    openTime: '10:00',
    closeTime: '23:00',
    category: '고기·구이',
  },
  {
    storeId: 12,
    entrepreneur_id: 112,
    name: '프랑스 레스토랑',
    image: [
      {
        imageId: 212,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '정통 프랑스 요리를 제공합니다.',
    minPurchasePrice: 30000,
    deliveryTime: '50분~60분',
    deliveryPrice: 6000,
    address: {
      postal: '01234',
      streetAddress: '서울시 강북구 수유로 123',
      detailAddress: '3층 305호',
    },
    phoneNumber: '02-2345-6789',
    openTime: '12:00',
    closeTime: '22:00',
    category: '기타',
  },
  {
    storeId: 13,
    entrepreneur_id: 113,
    name: '비건 카페',
    image: [
      {
        imageId: 213,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '비건 및 채식 메뉴를 제공합니다.',
    minPurchasePrice: 15000,
    deliveryTime: '30분~50분',
    deliveryPrice: 3000,
    address: {
      postal: '12340',
      streetAddress: '서울시 구로구 디지털로 123',
      detailAddress: '2층 202호',
    },
    phoneNumber: '02-3456-7890',
    openTime: '09:00',
    closeTime: '21:00',
    category: '카페·디저트',
  },
  {
    storeId: 14,
    entrepreneur_id: 114,
    name: '디저트 카페',
    image: [
      {
        imageId: 214,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '다양한 디저트와 음료를 제공합니다.',
    minPurchasePrice: 10000,
    deliveryTime: '25분~60분',
    deliveryPrice: 2500,
    address: {
      postal: '23450',
      streetAddress: '서울시 강동구 성내로 45',
      detailAddress: '1층 103호',
    },
    phoneNumber: '02-4567-8901',
    openTime: '10:00',
    closeTime: '22:00',
    category: '카페·디저트',
  },
  {
    storeId: 15,
    entrepreneur_id: 115,
    name: '갈비집',
    image: [
      {
        imageId: 215,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '정통 한우 갈비를 제공합니다.',
    minPurchasePrice: 30000,
    deliveryTime: '50분~75분',
    deliveryPrice: 5000,
    address: {
      postal: '34560',
      streetAddress: '서울시 서초구 서초대로 99',
      detailAddress: '3층 305호',
    },
    phoneNumber: '02-5678-9012',
    openTime: '11:00',
    closeTime: '23:00',
    category: '고기·구이',
  },
  {
    storeId: 16,
    entrepreneur_id: 116,
    name: '퓨전 한식',
    image: [
      {
        imageId: 216,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '한식을 퓨전 스타일로 재해석한 요리들을 제공합니다.',
    minPurchasePrice: 20000,
    deliveryTime: '30분~35분',
    deliveryPrice: 3500,
    address: {
      postal: '78901',
      streetAddress: '서울시 동작구 노량진로 200',
      detailAddress: '2층 205호',
    },
    phoneNumber: '02-9012-3456',
    openTime: '10:00',
    closeTime: '22:00',
    category: '찜·탕·찌개',
  },
  {
    storeId: 17,
    entrepreneur_id: 117,
    name: '커리 전문점',
    image: [
      {
        imageId: 217,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '인도 및 일본식 커리를 제공합니다.',
    minPurchasePrice: 16000,
    deliveryTime: '35분~50분',
    deliveryPrice: 3500,
    address: {
      postal: '56780',
      streetAddress: '서울시 용산구 이태원로 88',
      detailAddress: '1층 101호',
    },
    phoneNumber: '02-7890-1234',
    openTime: '10:00',
    closeTime: '22:00',
    category: '기타',
  },
  {
    storeId: 18,
    entrepreneur_id: 118,
    name: '아시아 요리',
    image: [
      {
        imageId: 218,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '동남아시아의 다양한 요리를 제공합니다.',
    minPurchasePrice: 17000,
    deliveryTime: '40분~60분',
    deliveryPrice: 4000,
    address: {
      postal: '67891',
      streetAddress: '서울시 강북구 번동 100',
      detailAddress: '2층 205호',
    },
    phoneNumber: '02-8901-2345',
    openTime: '10:00',
    closeTime: '22:00',
    category: '아시안',
  },
  {
    storeId: 19,
    entrepreneur_id: 119,
    name: '스테이크 하우스',
    image: [
      {
        imageId: 219,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '프리미엄 스테이크와 사이드 메뉴를 제공합니다.',
    minPurchasePrice: 25000,
    deliveryTime: '45분~75분',
    deliveryPrice: 5000,
    address: {
      postal: '78912',
      streetAddress: '서울시 노원구 공릉로 123',
      detailAddress: '3층 305호',
    },
    phoneNumber: '02-9012-3456',
    openTime: '11:00',
    closeTime: '23:00',
    category: '고기·구이',
  },
  {
    storeId: 20,
    entrepreneur_id: 120,
    name: '샐러드 바',
    image: [
      {
        imageId: 220,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '다양한 샐러드와 건강식을 제공합니다.',
    minPurchasePrice: 12000,
    deliveryTime: '20분~40분',
    deliveryPrice: 2000,
    address: {
      postal: '89013',
      streetAddress: '서울시 성동구 왕십리로 45',
      detailAddress: '2층 208호',
    },
    phoneNumber: '02-0123-4567',
    openTime: '09:00',
    closeTime: '21:00',
    category: '기타',
  },
];

const pageSize = 10;
const totalPages = Math.ceil(stores.length / pageSize);

export const paginatedStores: RestaurantsResponse[] = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize; // 현재 페이지의 시작 인덱스
    const end = start + pageSize; // 현재 페이지의 끝 인덱스
    const content = stores.slice(start, end);
    const isLastPage = index === totalPages - 1;

    return {
      content, // 현재 페이지에 해당하는 데이터
      pageable: {
        pageNumber: index, // 현재 페이지 번호
        pageSize, // 페이지당 데이터 개수
        sort: {
          empty: true, // 정렬 정보는 없는 경우이므로 true
          unsorted: true, // 정렬이 되어 있지 않으므로 true
          sorted: false, // 정렬되지 않은 경우이므로 false
        },
      },
      last: isLastPage, // 마지막 페이지 여부
      totalPages, // 전체 페이지 수
      size: pageSize, // 페이지당 데이터 개수
      first: index === 0, // 첫 페이지 여부
    };
  },
);
