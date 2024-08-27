import {
  PostIndividualPurchasesResponse,
  PostIndividualPurchaseType,
} from '@/types/coreTypes';

export const postIndividualPurchases: {
  meetingId: number;
  purchases: PostIndividualPurchaseType[];
}[] = [
  {
    meetingId: 1,
    purchases: [
      {
        menuId: 201,
        name: '페퍼로니 피자',
        image: 'https://via.placeholder.com/100x100',
        description: '페퍼로니가 듬뿍 들어간 맛있는 피자',
        price: 15000,
        quantity: 1,
      },
      {
        menuId: 202,
        name: '치즈 피자',
        image: 'https://via.placeholder.com/100x100',
        description: '부드러운 치즈가 가득한 피자',
        price: 15000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 2,
    purchases: [
      {
        menuId: 204,
        name: '스시 세트 A',
        image: 'https://via.placeholder.com/100x100',
        description: '신선한 생선이 들어간 스시 세트 A',
        price: 20000,
        quantity: 1,
      },
      {
        menuId: 205,
        name: '사시미 세트',
        image: 'https://via.placeholder.com/100x100',
        description: '다양한 생선이 포함된 사시미 세트',
        price: 15000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 3,
    purchases: [
      {
        menuId: 207,
        name: '비빔밥',
        image: 'https://via.placeholder.com/100x100',
        description: '신선한 야채와 고추장이 어우러진 비빔밥',
        price: 18000,
        quantity: 1,
      },
      {
        menuId: 209,
        name: '불고기',
        image: 'https://via.placeholder.com/100x100',
        description: '달콤한 간장 소스에 재운 불고기',
        price: 9000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 4,
    purchases: [
      {
        menuId: 210,
        name: '파이',
        image: 'https://via.placeholder.com/100x100',
        description: '바삭한 크러스트와 달콤한 필링이 어우러진 파이',
        price: 4500,
        quantity: 3,
      },
      {
        menuId: 211,
        name: '에그 타르트',
        image: 'https://via.placeholder.com/100x100',
        description: '달콤한 에그 필링이 들어간 타르트',
        price: 3000,
        quantity: 2,
      },
    ],
  },
  {
    meetingId: 5,
    purchases: [
      {
        menuId: 213,
        name: '치즈버거',
        image: 'https://via.placeholder.com/100x100',
        description: '두툼한 패티와 치즈가 들어간 햄버거',
        price: 8500,
        quantity: 1,
      },
      {
        menuId: 215,
        name: '콜라',
        image: 'https://via.placeholder.com/100x100',
        description: '시원한 탄산음료',
        price: 2000,
        quantity: 2,
      },
    ],
  },
  {
    meetingId: 6,
    purchases: [
      {
        menuId: 216,
        name: '고추잡채',
        image: 'https://via.placeholder.com/100x100',
        description: '매콤한 고추와 잡채의 조화',
        price: 17000,
        quantity: 2,
      },
      {
        menuId: 218,
        name: '탕수육',
        image: 'https://via.placeholder.com/100x100',
        description: '달콤한 소스에 버무린 탕수육',
        price: 15000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 7,
    purchases: [
      {
        menuId: 219,
        name: '생선회',
        image: 'https://via.placeholder.com/100x100',
        description: '신선한 회 한 접시',
        price: 50000,
        quantity: 1,
      },
      {
        menuId: 220,
        name: '새우튀김',
        image: 'https://via.placeholder.com/100x100',
        description: '바삭한 새우튀김',
        price: 12000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 8,
    purchases: [
      {
        menuId: 222,
        name: '떡볶이',
        image: 'https://via.placeholder.com/100x100',
        description: '매콤달콤한 떡볶이',
        price: 8000,
        quantity: 1,
      },
      {
        menuId: 224,
        name: '어묵',
        image: 'https://via.placeholder.com/100x100',
        description: '따뜻한 국물과 함께하는 어묵',
        price: 4000,
        quantity: 2,
      },
    ],
  },
  {
    meetingId: 9,
    purchases: [
      {
        menuId: 225,
        name: '불고기 덮밥',
        image: 'https://via.placeholder.com/100x100',
        description: '달콤한 불고기가 듬뿍 올라간 덮밥',
        price: 12000,
        quantity: 1,
      },
      {
        menuId: 226,
        name: '제육볶음',
        image: 'https://via.placeholder.com/100x100',
        description: '매콤한 제육볶음',
        price: 14000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 10,
    purchases: [
      {
        menuId: 228,
        name: '브런치 세트',
        image: 'https://via.placeholder.com/100x100',
        description: '아침을 든든하게 시작할 수 있는 브런치 세트',
        price: 15000,
        quantity: 1,
      },
      {
        menuId: 229,
        name: '팬케이크',
        image: 'https://via.placeholder.com/100x100',
        description: '부드럽고 달콤한 팬케이크',
        price: 9000,
        quantity: 1,
      },
      {
        menuId: 230,
        name: '아메리카노',
        image: 'https://via.placeholder.com/100x100',
        description: '향긋한 아메리카노',
        price: 4500,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 11,
    purchases: [
      {
        menuId: 231,
        name: '바비큐 플래터',
        image: 'https://via.placeholder.com/100x100',
        description: '다양한 고기와 함께 즐기는 바비큐 플래터',
        price: 25000,
        quantity: 1,
      },
      {
        menuId: 232,
        name: '훈제 치킨',
        image: 'https://via.placeholder.com/100x100',
        description: '부드러운 훈제 치킨',
        price: 18000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 12,
    purchases: [
      {
        menuId: 234,
        name: '비프 부르기뇽',
        image: 'https://via.placeholder.com/100x100',
        description: '프랑스 전통 요리 비프 부르기뇽',
        price: 25000,
        quantity: 1,
      },
      {
        menuId: 235,
        name: '에스카르고',
        image: 'https://via.placeholder.com/100x100',
        description: '향긋한 허브 버터 소스를 곁들인 에스카르고',
        price: 15000,
        quantity: 1,
      },
      {
        menuId: 236,
        name: '바게트',
        image: 'https://via.placeholder.com/100x100',
        description: '바삭한 바게트',
        price: 6000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 13,
    purchases: [
      {
        menuId: 237,
        name: '비건 피자',
        image: 'https://via.placeholder.com/100x100',
        description: '신선한 채소와 비건 치즈가 올라간 피자',
        price: 16000,
        quantity: 1,
      },
      {
        menuId: 238,
        name: '비건 버거',
        image: 'https://via.placeholder.com/100x100',
        description: '건강한 비건 버거',
        price: 15000,
        quantity: 1,
      },
      {
        menuId: 239,
        name: '비건 샐러드',
        image: 'https://via.placeholder.com/100x100',
        description: '신선한 비건 샐러드',
        price: 10000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 14,
    purchases: [
      {
        menuId: 240,
        name: '마카롱 세트',
        image: 'https://via.placeholder.com/100x100',
        description: '다양한 맛의 마카롱 세트',
        price: 15000,
        quantity: 1,
      },
      {
        menuId: 241,
        name: '케이크',
        image: 'https://via.placeholder.com/100x100',
        description: '부드럽고 달콤한 케이크',
        price: 18000,
        quantity: 1,
      },
      {
        menuId: 242,
        name: '밀크티',
        image: 'https://via.placeholder.com/100x100',
        description: '향긋한 밀크티',
        price: 5000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 15,
    purchases: [
      {
        menuId: 243,
        name: '한우 스테이크',
        image: 'https://via.placeholder.com/100x100',
        description: '최고급 한우 스테이크',
        price: 40000,
        quantity: 1,
      },
      {
        menuId: 244,
        name: '양념 갈비',
        image: 'https://via.placeholder.com/100x100',
        description: '부드러운 양념 갈비',
        price: 35000,
        quantity: 1,
      },
    ],
  },
  {
    meetingId: 16,
    purchases: [
      {
        menuId: 246,
        name: '알리오 올리오',
        image: 'https://via.placeholder.com/100x100',
        description: '올리브 오일과 마늘의 풍미가 가득한 파스타',
        price: 15000,
        quantity: 1,
      },
      {
        menuId: 247,
        name: '까르보나라',
        image: 'https://via.placeholder.com/100x100',
        description: '크림이 가득한 까르보나라 파스타',
        price: 16000,
        quantity: 1,
      },
      {
        menuId: 248,
        name: '브루스케타',
        image: 'https://via.placeholder.com/100x100',
        description: '바삭한 바게트와 신선한 토마토가 어우러진 브루스케타',
        price: 9000,
        quantity: 1,
      },
    ],
  },
];

const pageSize = 10;

export const paginatedPostIndividualPurchases: {
  [meetingId: number]: PostIndividualPurchasesResponse[];
} = postIndividualPurchases.reduce(
  (acc, { meetingId, purchases }) => {
    const totalPages = Math.ceil(purchases.length / pageSize);

    const paginatedItems = Array.from({ length: totalPages }, (_, index) => {
      const start = index * pageSize;
      const end = start + pageSize;

      const itemsForCurrentPage = purchases.slice(start, end);

      const totalFeeForPage = itemsForCurrentPage.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      return {
        meetingId,
        content: itemsForCurrentPage,
        totalFee: totalFeeForPage,
        pageable: {
          pageNumber: index,
          pageSize,
        },
        last: index === totalPages - 1,
        totalPages,
        size: pageSize,
        first: index === 0,
      } as PostIndividualPurchasesResponse;
    });

    acc[meetingId] = paginatedItems;
    return acc;
  },
  {} as { [key: number]: PostIndividualPurchasesResponse[] },
);
