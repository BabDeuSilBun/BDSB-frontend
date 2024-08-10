import { RestaurantDetail } from '@/types/restaurant';

export const stores: RestaurantDetail[] = [
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
    minOrderPrice: 15000,
    deliveryTime: '30분',
    deliveryPrice: 3000,
    postal: '12345',
    streetAddress: '서울시 강남구 테헤란로 123',
    detailAddress: '12층 1201호',
    phoneNumber: '02-1234-5678',
    openTime: '11:00',
    closeTime: '22:00',
    closeDay: '일요일',
    menuItems: [
      {
        name: '마르게리타 피자',
        description: '토마토와 모짜렐라, 바질을 얹은 피자',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '페퍼로니 피자',
        description: '스파이시한 페퍼로니를 얹은 피자',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '콤비네이션 피자',
        description: '여러가지 재료를 얹은 피자',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '고르곤졸라 피자',
        description: '고르곤졸라 치즈와 꿀을 곁들인 피자',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 2,
    entrepreneur_id: 102,
    name: '건강한 샐러드 카페',
    image: [
      {
        imageId: 202,
        url: 'https://via.placeholder.com/300x200',
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
    closeDay: '일요일',
    menuItems: [
      {
        name: '시저 샐러드',
        description: '로메인과 시저 드레싱을 곁들인 샐러드',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '그릭 샐러드',
        description: '올리브와 페타 치즈를 곁들인 샐러드',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '콥 샐러드',
        description: '다양한 재료를 곁들인 푸짐한 샐러드',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '퀴노아 샐러드',
        description: '퀴노아와 채소를 곁들인 건강한 샐러드',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 3,
    entrepreneur_id: 103,
    name: '스시 플러스',
    image: [
      {
        imageId: 203,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '신선한 해산물과 정갈한 맛을 자랑하는 스시 전문점입니다.',
    minOrderPrice: 20000,
    deliveryTime: '40분',
    deliveryPrice: 4000,
    postal: '13579',
    streetAddress: '서울시 강서구 공항대로 123',
    detailAddress: '5층 503호',
    phoneNumber: '02-3456-7890',
    openTime: '12:00',
    closeTime: '22:00',
    closeDay: '월요일',
    menuItems: [
      {
        name: '모듬 스시',
        description: '다양한 종류의 스시가 포함된 세트',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '연어 스시',
        description: '신선한 연어를 얹은 스시',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '참치 스시',
        description: '고급 참치를 사용한 스시',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '새우 스시',
        description: '탱탱한 새우를 얹은 스시',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 4,
    entrepreneur_id: 104,
    name: '치킨 마스터',
    image: [
      {
        imageId: 204,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description:
      '바삭하고 맛있는 다양한 종류의 치킨을 판매하는 치킨 전문점입니다.',
    minOrderPrice: 18000,
    deliveryTime: '30분',
    deliveryPrice: 2000,
    postal: '24680',
    streetAddress: '서울시 마포구 신촌로 45',
    detailAddress: '2층 203호',
    phoneNumber: '02-6789-0123',
    openTime: '10:00',
    closeTime: '23:00',
    closeDay: '없음',
    menuItems: [
      {
        name: '후라이드 치킨',
        description: '바삭한 후라이드 치킨',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '양념 치킨',
        description: '매콤달콤한 양념 치킨',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '간장 치킨',
        description: '짭짤한 간장 치킨',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '치즈볼',
        description: '치즈가 가득한 치즈볼',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 5,
    entrepreneur_id: 105,
    name: '한식당 아리랑',
    image: [
      {
        imageId: 205,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '한국 전통 음식을 제공하는 한식 전문점입니다.',
    minOrderPrice: 15000,
    deliveryTime: '35분',
    deliveryPrice: 2500,
    postal: '54321',
    streetAddress: '서울시 서초구 서초대로 77',
    detailAddress: '3층 302호',
    phoneNumber: '02-1357-2468',
    openTime: '11:00',
    closeTime: '21:00',
    closeDay: '없음',
    menuItems: [
      {
        name: '비빔밥',
        description: '각종 나물과 고기를 비벼먹는 전통 음식',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '불고기',
        description: '달콤한 소스로 구운 소고기',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '김치찌개',
        description: '김치를 넣고 끓인 얼큰한 찌개',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '된장찌개',
        description: '된장을 넣고 끓인 구수한 찌개',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 6,
    entrepreneur_id: 106,
    name: '파스타 하우스',
    image: [
      {
        imageId: 206,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '다양한 종류의 파스타를 제공하는 이탈리안 레스토랑입니다.',
    minOrderPrice: 20000,
    deliveryTime: '25분',
    deliveryPrice: 3500,
    postal: '12321',
    streetAddress: '서울시 중구 충무로 45',
    detailAddress: '1층 102호',
    phoneNumber: '02-3456-7891',
    openTime: '11:30',
    closeTime: '22:00',
    closeDay: '화요일',
    menuItems: [
      {
        name: '까르보나라',
        description: '크림 소스와 베이컨이 어우러진 파스타',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '알리오 올리오',
        description: '올리브 오일과 마늘을 곁들인 심플한 파스타',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '뽀모도로',
        description: '토마토 소스를 곁들인 상큼한 파스타',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '볼로네제',
        description: '소고기와 토마토를 곁들인 풍성한 파스타',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 7,
    entrepreneur_id: 107,
    name: '베트남 쌀국수',
    image: [
      {
        imageId: 207,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '진한 국물과 신선한 재료를 사용한 베트남 쌀국수 전문점입니다.',
    minOrderPrice: 12000,
    deliveryTime: '30분',
    deliveryPrice: 3000,
    postal: '98765',
    streetAddress: '서울시 강남구 봉은사로 77',
    detailAddress: 'B1',
    phoneNumber: '02-7890-1234',
    openTime: '10:00',
    closeTime: '20:00',
    closeDay: '없음',
    menuItems: [
      {
        name: '소고기 쌀국수',
        description: '진한 국물과 소고기가 어우러진 쌀국수',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '닭고기 쌀국수',
        description: '담백한 닭고기가 들어간 쌀국수',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '해물 쌀국수',
        description: '신선한 해산물이 들어간 쌀국수',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '비빔 쌀국수',
        description: '매콤달콤한 소스에 비벼먹는 쌀국수',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 8,
    entrepreneur_id: 108,
    name: '중식당 만리장성',
    image: [
      {
        imageId: 208,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '다양한 중식 요리를 제공하는 전통 중식당입니다.',
    minOrderPrice: 17000,
    deliveryTime: '35분',
    deliveryPrice: 4000,
    postal: '67854',
    streetAddress: '서울시 용산구 한강로 88',
    detailAddress: '4층 404호',
    phoneNumber: '02-4567-8901',
    openTime: '11:00',
    closeTime: '21:30',
    closeDay: '수요일',
    menuItems: [
      {
        name: '짜장면',
        description: '달콤한 짜장 소스를 얹은 면 요리',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '짬뽕',
        description: '매콤한 국물의 해산물 짬뽕',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '탕수육',
        description: '바삭하게 튀긴 고기와 새콤달콤한 소스',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '볶음밥',
        description: '고슬고슬한 밥과 야채를 볶아 만든 요리',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 9,
    entrepreneur_id: 109,
    name: '인도 레스토랑 타지마할',
    image: [
      {
        imageId: 209,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '전통 인도 요리를 제공하는 레스토랑입니다.',
    minOrderPrice: 20000,
    deliveryTime: '40분',
    deliveryPrice: 5000,
    postal: '54321',
    streetAddress: '서울시 서대문구 연세로 123',
    detailAddress: '6층 601호',
    phoneNumber: '02-0123-4567',
    openTime: '11:30',
    closeTime: '22:00',
    closeDay: '월요일',
    menuItems: [
      {
        name: '치킨 티카',
        description: '매콤한 인도식 양념에 재운 구운 치킨',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '마살라',
        description: '향신료를 넣어 만든 전통 인도 커리',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '난',
        description: '인도 전통 빵',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '비리야니',
        description: '향신료와 고기를 곁들인 인도식 볶음밥',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 10,
    entrepreneur_id: 110,
    name: '카페 라떼',
    image: [
      {
        imageId: 210,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '고급 원두로 만든 커피와 다양한 디저트를 제공하는 카페입니다.',
    minOrderPrice: 8000,
    deliveryTime: '20분',
    deliveryPrice: 2000,
    postal: '12345',
    streetAddress: '서울시 종로구 대학로 1',
    detailAddress: '지하 1층',
    phoneNumber: '02-7894-5678',
    openTime: '08:00',
    closeTime: '22:00',
    closeDay: '없음',
    menuItems: [
      {
        name: '아메리카노',
        description: '신선한 원두로 내린 깔끔한 커피',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '카페 라떼',
        description: '부드러운 우유와 진한 커피의 조화',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '카푸치노',
        description: '우유 거품을 얹은 고소한 커피',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '티라미수',
        description: '마스카포네 치즈와 커피가 어우러진 디저트',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 11,
    entrepreneur_id: 111,
    name: '이탈리안 레스토랑 로마',
    image: [
      {
        imageId: 211,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '정통 이탈리안 요리를 제공하는 고급 레스토랑입니다.',
    minOrderPrice: 25000,
    deliveryTime: '45분',
    deliveryPrice: 4500,
    postal: '54367',
    streetAddress: '서울시 광진구 자양로 56',
    detailAddress: '7층 707호',
    phoneNumber: '02-9870-1234',
    openTime: '12:00',
    closeTime: '23:00',
    closeDay: '없음',
    menuItems: [
      {
        name: '리조또',
        description: '크림 소스에 볶은 밥 요리',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '까르보나라',
        description: '베이컨과 계란을 얹은 크림 파스타',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '피자 마르게리타',
        description: '신선한 토마토와 바질, 모짜렐라 치즈를 얹은 피자',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '티라미수',
        description: '이탈리아 전통 디저트',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 13,
    entrepreneur_id: 113,
    name: '서울 스시',
    image: [
      {
        imageId: 213,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '신선한 재료로 만든 일식 전문 스시 레스토랑입니다.',
    minOrderPrice: 20000,
    deliveryTime: '40분',
    deliveryPrice: 4000,
    postal: '12345',
    streetAddress: '서울시 강남구 테헤란로 123',
    detailAddress: '2층 202호',
    phoneNumber: '02-3456-7890',
    openTime: '11:00',
    closeTime: '22:00',
    closeDay: '월요일',
    menuItems: [
      {
        name: '연어 스시',
        description: '신선한 연어로 만든 스시',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '참치 스시',
        description: '탱탱한 참치로 만든 스시',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '새우 스시',
        description: '신선한 새우를 얹은 스시',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '초밥 세트',
        description: '다양한 초밥을 즐길 수 있는 세트',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 14,
    entrepreneur_id: 114,
    name: '중화반점',
    image: [
      {
        imageId: 214,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '정통 중화요리를 제공하는 레스토랑입니다.',
    minOrderPrice: 22000,
    deliveryTime: '35분',
    deliveryPrice: 3500,
    postal: '23456',
    streetAddress: '서울시 종로구 종로 456',
    detailAddress: '4층 401호',
    phoneNumber: '02-4567-8901',
    openTime: '11:30',
    closeTime: '22:30',
    closeDay: '화요일',
    menuItems: [
      {
        name: '자장면',
        description: '중국식 자장면',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '짬뽕',
        description: '매운 해물 짬뽕',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '탕수육',
        description: '바삭한 탕수육',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '군만두',
        description: '고기와 채소가 듬뿍 들어간 군만두',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 15,
    entrepreneur_id: 115,
    name: '베이커리 하우스',
    image: [
      {
        imageId: 215,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '신선한 빵과 디저트를 제공하는 베이커리입니다.',
    minOrderPrice: 15000,
    deliveryTime: '25분',
    deliveryPrice: 2500,
    postal: '34567',
    streetAddress: '서울시 송파구 잠실로 789',
    detailAddress: '1층 101호',
    phoneNumber: '02-5678-9012',
    openTime: '08:00',
    closeTime: '20:00',
    closeDay: '수요일',
    menuItems: [
      {
        name: '크루아상',
        description: '버터가 풍부한 크루아상',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '치아바타',
        description: '겉은 바삭하고 속은 부드러운 치아바타',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '초코 케이크',
        description: '진한 초코맛이 일품인 케이크',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '마들렌',
        description: '부드럽고 촉촉한 마들렌',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 16,
    entrepreneur_id: 116,
    name: '이태리 커피',
    image: [
      {
        imageId: 216,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '이탈리아 스타일의 커피와 디저트를 제공하는 카페입니다.',
    minOrderPrice: 12000,
    deliveryTime: '20분',
    deliveryPrice: 2000,
    postal: '45678',
    streetAddress: '서울시 강서구 화곡로 123',
    detailAddress: '3층 305호',
    phoneNumber: '02-6789-0123',
    openTime: '09:00',
    closeTime: '21:00',
    closeDay: '없음',
    menuItems: [
      {
        name: '에스프레소',
        description: '진한 에스프레소 한 잔',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '카푸치노',
        description: '부드러운 우유 거품이 가득한 카푸치노',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '티라미수',
        description: '이탈리아 전통 디저트',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '마카롱',
        description: '다양한 맛의 마카롱',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 17,
    entrepreneur_id: 117,
    name: '해물탕집',
    image: [
      {
        imageId: 217,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '다양한 해물탕과 해산물 요리를 전문으로 하는 식당입니다.',
    minOrderPrice: 30000,
    deliveryTime: '50분',
    deliveryPrice: 5000,
    postal: '56789',
    streetAddress: '서울시 중구 명동길 45',
    detailAddress: '5층 505호',
    phoneNumber: '02-7890-1234',
    openTime: '11:00',
    closeTime: '23:00',
    closeDay: '목요일',
    menuItems: [
      {
        name: '해물탕',
        description: '풍부한 해산물이 들어간 해물탕',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '조개구이',
        description: '매콤하게 구운 조개',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '낙지볶음',
        description: '매운 낙지 볶음',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '김치전',
        description: '매콤한 김치전',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 18,
    entrepreneur_id: 118,
    name: '멕시코 타코',
    image: [
      {
        imageId: 218,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '정통 멕시코 타코와 다양한 멕시코 요리를 제공하는 식당입니다.',
    minOrderPrice: 20000,
    deliveryTime: '30분',
    deliveryPrice: 3500,
    postal: '67890',
    streetAddress: '서울시 강동구 길동 89',
    detailAddress: '6층 605호',
    phoneNumber: '02-8901-2345',
    openTime: '10:00',
    closeTime: '22:00',
    closeDay: '금요일',
    menuItems: [
      {
        name: '타코',
        description: '다양한 재료로 만든 타코',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '부리토',
        description: '풍성한 재료가 가득한 부리토',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '나쵸',
        description: '치즈와 다양한 토핑이 얹힌 나쵸',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '퀘사디아',
        description: '치즈와 고기가 듬뿍 들어간 퀘사디아',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 19,
    entrepreneur_id: 119,
    name: '인도 카레',
    image: [
      {
        imageId: 219,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '진한 인도 카레와 다양한 인도 요리를 제공하는 레스토랑입니다.',
    minOrderPrice: 25000,
    deliveryTime: '40분',
    deliveryPrice: 4000,
    postal: '78901',
    streetAddress: '서울시 영등포구 여의도동 12',
    detailAddress: '7층 707호',
    phoneNumber: '02-9012-3456',
    openTime: '11:00',
    closeTime: '22:00',
    closeDay: '일요일',
    menuItems: [
      {
        name: '치킨 커리',
        description: '진한 맛의 치킨 커리',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '양고기 커리',
        description: '부드러운 양고기 커리',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '사프란 라이스',
        description: '사프란이 향긋한 라이스',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '나안',
        description: '부드러운 나안',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 20,
    entrepreneur_id: 120,
    name: '스테이크 하우스',
    image: [
      {
        imageId: 220,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '고급 스테이크와 다양한 그릴 요리를 제공하는 레스토랑입니다.',
    minOrderPrice: 35000,
    deliveryTime: '45분',
    deliveryPrice: 4500,
    postal: '89012',
    streetAddress: '서울시 용산구 이태원로 123',
    detailAddress: '8층 808호',
    phoneNumber: '02-0123-4567',
    openTime: '12:00',
    closeTime: '23:00',
    closeDay: '토요일',
    menuItems: [
      {
        name: '리브아이 스테이크',
        description: '풍미가 깊은 리브아이 스테이크',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '필레미뇽',
        description: '부드러운 필레미뇽 스테이크',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '그릴 야채',
        description: '그릴에 구운 신선한 야채',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '스테이크 소스',
        description: '스테이크와 함께하는 다양한 소스',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 21,
    entrepreneur_id: 121,
    name: '샐러드 바',
    image: [
      {
        imageId: 221,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '신선한 채소와 다양한 드레싱을 제공하는 샐러드 바입니다.',
    minOrderPrice: 15000,
    deliveryTime: '30분',
    deliveryPrice: 3000,
    postal: '90123',
    streetAddress: '서울시 서초구 강남대로 678',
    detailAddress: '9층 909호',
    phoneNumber: '02-1234-5678',
    openTime: '09:00',
    closeTime: '20:00',
    closeDay: '월요일',
    menuItems: [
      {
        name: '그릭 샐러드',
        description: '올리브와 페타 치즈가 들어간 그릭 샐러드',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '시저 샐러드',
        description: '바삭한 크루통과 파르미지아노 치즈가 듬뿍',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '과일 샐러드',
        description: '신선한 과일이 가득한 샐러드',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '닭가슴살 샐러드',
        description: '닭가슴살과 신선한 채소가 가득',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 22,
    entrepreneur_id: 122,
    name: '디저트 카페',
    image: [
      {
        imageId: 222,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '다양한 디저트와 음료를 제공하는 카페입니다.',
    minOrderPrice: 10000,
    deliveryTime: '25분',
    deliveryPrice: 2000,
    postal: '01234',
    streetAddress: '서울시 동대문구 제기동 123',
    detailAddress: '10층 1005호',
    phoneNumber: '02-2345-6789',
    openTime: '10:00',
    closeTime: '22:00',
    closeDay: '화요일',
    menuItems: [
      {
        name: '마카롱',
        description: '다양한 맛의 마카롱',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '케이크',
        description: '각종 케이크',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '와플',
        description: '바삭한 와플과 다양한 토핑',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '라떼',
        description: '부드러운 라떼',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 23,
    entrepreneur_id: 123,
    name: '햄버거 스테이션',
    image: [
      {
        imageId: 223,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '맛있는 햄버거와 사이드 메뉴를 제공하는 식당입니다.',
    minOrderPrice: 18000,
    deliveryTime: '20분',
    deliveryPrice: 2500,
    postal: '12345',
    streetAddress: '서울시 강서구 화곡동 56',
    detailAddress: '2층 202호',
    phoneNumber: '02-3456-7890',
    openTime: '11:00',
    closeTime: '23:00',
    closeDay: '일요일',
    menuItems: [
      {
        name: '치즈버거',
        description: '치즈와 고기가 듬뿍 들어간 햄버거',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '베이컨 버거',
        description: '바삭한 베이컨이 추가된 햄버거',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '프렌치 프라이',
        description: '바삭한 프렌치 프라이',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '온ion 링',
        description: '바삭한 어니언 링',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 24,
    entrepreneur_id: 124,
    name: '한국 전통 음식',
    image: [
      {
        imageId: 224,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '전통 한국 음식을 제공하는 식당입니다.',
    minOrderPrice: 20000,
    deliveryTime: '40분',
    deliveryPrice: 4000,
    postal: '23456',
    streetAddress: '서울시 강남구 논현로 78',
    detailAddress: '3층 304호',
    phoneNumber: '02-4567-8901',
    openTime: '10:00',
    closeTime: '22:00',
    closeDay: '월요일',
    menuItems: [
      {
        name: '비빔밥',
        description: '다양한 재료가 어우러진 비빔밥',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '불고기',
        description: '달콤하게 양념된 불고기',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '김치찌개',
        description: '매콤한 김치찌개',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '된장찌개',
        description: '구수한 된장찌개',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  {
    storeId: 25,
    entrepreneur_id: 125,
    name: '프랑스 레스토랑',
    image: [
      {
        imageId: 225,
        url: 'https://via.placeholder.com/300x200',
      },
    ],
    description: '프랑스 요리와 와인을 제공하는 레스토랑입니다.',
    minOrderPrice: 35000,
    deliveryTime: '50분',
    deliveryPrice: 5000,
    postal: '34567',
    streetAddress: '서울시 서초구 서초대로 567',
    detailAddress: '10층 1001호',
    phoneNumber: '02-5678-9012',
    openTime: '12:00',
    closeTime: '23:00',
    closeDay: '화요일',
    menuItems: [
      {
        name: '크렘 브륄레',
        description: '부드럽고 달콤한 크렘 브륄레',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '와인 스테이크',
        description: '와인 소스가 곁들여진 스테이크',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '라따뚜이',
        description: '다양한 채소로 만든 프랑스식 스튜',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
      {
        name: '프랑스 빵',
        description: '바삭한 프랑스 빵',
        imageUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
];

const pageSize = 10;
const totalPages = Math.ceil(stores.length / pageSize);

export const paginatedStores = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize; // 현재 페이지의 시작 인덱스
    const end = start + pageSize; // 현재 페이지의 끝 인덱스

    return {
      content: stores.slice(start, end), // 현재 페이지에 해당하는 데이터
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
      number: index, // 현재 페이지 번호
    };
  },
);
