import { PurchasesResponse } from '@/types/coreTypes';
import { ItemType } from '@/types/types';

const allItems: { [key: number]: ItemType[] } = {
  1: [
    {
      purchaseId: 101,
      menuId: 201,
      name: '감자칩',
      image: 'https://via.placeholder.com/100x100',
      description: '양파 시즈닝이 솔솔 뿌려진 감자칩',
      price: 5000,
      quantity: 2,
    },
    {
      purchaseId: 102,
      menuId: 202,
      name: '치즈 피자',
      image: 'https://via.placeholder.com/100x100',
      description: '부드러운 치즈가 가득한 피자',
      price: 14000,
      quantity: 1,
    },
  ],
  2: [
    {
      purchaseId: 104,
      menuId: 204,
      name: '스시 세트 B',
      image: 'https://via.placeholder.com/100x100',
      description: '신선한 생선이 들어간 스시 8피스',
      price: 30000,
      quantity: 1,
    },
    {
      purchaseId: 105,
      menuId: 205,
      name: '사시미 세트',
      image: 'https://via.placeholder.com/100x100',
      description: '다양한 생선이 포함된 사시미 세트',
      price: 35000,
      quantity: 1,
    },
  ],
  3: [
    {
      purchaseId: 105,
      menuId: 205,
      name: '만두',
      image: 'https://via.placeholder.com/100x100',
      description: '따뜻한 만두',
      price: 8000,
      quantity: 4,
    },
    {
      purchaseId: 106,
      menuId: 206,
      name: '계란말이',
      image: 'https://via.placeholder.com/100x100',
      description: '부드러운 계란말이',
      price: 6000,
      quantity: 5,
    },
  ],
  4: [
    {
      purchaseId: 107,
      menuId: 207,
      name: '쿠키',
      image: 'https://via.placeholder.com/100x100',
      description: '달콤한 초콜릿 쿠키',
      price: 3500,
      quantity: 4,
    },
    {
      purchaseId: 108,
      menuId: 208,
      name: '미니 머핀',
      image: 'https://via.placeholder.com/100x100',
      description: '작은 사이즈의 머핀',
      price: 4000,
      quantity: 6,
    },
  ],
  5: [
    {
      purchaseId: 113,
      menuId: 213,
      name: '치즈버거',
      image: 'https://via.placeholder.com/100x100',
      description: '두툼한 패티와 치즈가 들어간 햄버거',
      price: 8500,
      quantity: 3,
    },
    {
      purchaseId: 114,
      menuId: 214,
      name: '프렌치 프라이',
      image: 'https://via.placeholder.com/100x100',
      description: '바삭한 감자튀김',
      price: 4000,
      quantity: 3,
    },
  ],
  6: [
    {
      purchaseId: 111,
      menuId: 211,
      name: '완탕',
      image: 'https://via.placeholder.com/100x100',
      description: '시원한 국물의 완탕',
      price: 6000,
      quantity: 3,
    },
    {
      purchaseId: 112,
      menuId: 212,
      name: '볶음밥',
      image: 'https://via.placeholder.com/100x100',
      description: '간단한 볶음밥',
      price: 7000,
      quantity: 4,
    },
  ],
  7: [
    {
      purchaseId: 113,
      menuId: 213,
      name: '초밥',
      image: 'https://via.placeholder.com/100x100',
      description: '작은 초밥',
      price: 7000,
      quantity: 3,
    },
    {
      purchaseId: 114,
      menuId: 214,
      name: '해물탕',
      image: 'https://via.placeholder.com/100x100',
      description: '매콤한 해물탕',
      price: 12000,
      quantity: 2,
    },
  ],
  8: [
    {
      purchaseId: 115,
      menuId: 215,
      name: '떡볶이',
      image: 'https://via.placeholder.com/100x100',
      description: '매콤달콤한 떡볶이',
      price: 8000,
      quantity: 4,
    },
    {
      purchaseId: 116,
      menuId: 216,
      name: '순대',
      image: 'https://via.placeholder.com/100x100',
      description: '쫄깃한 순대',
      price: 7000,
      quantity: 5,
    },
  ],
  9: [
    {
      purchaseId: 117,
      menuId: 217,
      name: '불고기 덮밥',
      image: 'https://via.placeholder.com/100x100',
      description: '달콤한 불고기가 듬뿍 올라간 덮밥',
      price: 12000,
      quantity: 5,
    },
    {
      purchaseId: 118,
      menuId: 218,
      name: '제육볶음',
      image: 'https://via.placeholder.com/100x100',
      description: '매콤한 제육볶음',
      price: 14000,
      quantity: 4,
    },
  ],
  10: [
    {
      purchaseId: 119,
      menuId: 219,
      name: '브런치 세트',
      image: 'https://via.placeholder.com/100x100',
      description: '아침을 든든하게 시작할 수 있는 브런치 세트',
      price: 15000,
      quantity: 3,
    },
    {
      purchaseId: 120,
      menuId: 220,
      name: '팬케이크',
      image: 'https://via.placeholder.com/100x100',
      description: '부드럽고 달콤한 팬케이크',
      price: 9000,
      quantity: 4,
    },
  ],
  11: [
    {
      purchaseId: 121,
      menuId: 221,
      name: '바비큐 플래터',
      image: 'https://via.placeholder.com/100x100',
      description: '다양한 고기와 함께 즐기는 바비큐 플래터',
      price: 25000,
      quantity: 2,
    },
    {
      purchaseId: 122,
      menuId: 222,
      name: '훈제 치킨',
      image: 'https://via.placeholder.com/100x100',
      description: '부드러운 훈제 치킨',
      price: 18000,
      quantity: 3,
    },
  ],
  12: [
    {
      purchaseId: 123,
      menuId: 223,
      name: '비프 부르기뇽',
      image: 'https://via.placeholder.com/100x100',
      description: '프랑스 전통 요리 비프 부르기뇽',
      price: 25000,
      quantity: 2,
    },
    {
      purchaseId: 124,
      menuId: 224,
      name: '에스카르고',
      image: 'https://via.placeholder.com/100x100',
      description: '향긋한 허브 버터 소스를 곁들인 에스카르고',
      price: 15000,
      quantity: 3,
    },
  ],
  13: [
    {
      purchaseId: 125,
      menuId: 225,
      name: '비건 피자',
      image: 'https://via.placeholder.com/100x100',
      description: '신선한 채소와 비건 치즈가 올라간 피자',
      price: 16000,
      quantity: 3,
    },
    {
      purchaseId: 126,
      menuId: 226,
      name: '비건 버거',
      image: 'https://via.placeholder.com/100x100',
      description: '건강한 비건 버거',
      price: 15000,
      quantity: 3,
    },
  ],
  14: [
    {
      purchaseId: 127,
      menuId: 227,
      name: '마카롱 세트',
      image: 'https://via.placeholder.com/100x100',
      description: '다양한 맛의 마카롱 세트',
      price: 15000,
      quantity: 3,
    },
    {
      purchaseId: 141,
      menuId: 241,
      name: '케이크',
      image: 'https://via.placeholder.com/100x100',
      description: '부드럽고 달콤한 케이크',
      price: 18000,
      quantity: 1,
    },
    {
      purchaseId: 142,
      menuId: 242,
      name: '밀크티',
      image: 'https://via.placeholder.com/100x100',
      description: '향긋한 밀크티',
      price: 5000,
      quantity: 1,
    },
  ],
  15: [
    {
      purchaseId: 144,
      menuId: 244,
      name: '양념 갈비',
      image: 'https://via.placeholder.com/100x100',
      description: '부드러운 양념 갈비',
      price: 35000,
      quantity: 1,
    },
    {
      purchaseId: 145,
      menuId: 245,
      name: '물냉면',
      image: 'https://via.placeholder.com/100x100',
      description: '시원한 물냉면',
      price: 8000,
      quantity: 3,
    },
  ],
  16: [
    {
      purchaseId: 147,
      menuId: 247,
      name: '까르보나라',
      image: 'https://via.placeholder.com/100x100',
      description: '크림이 가득한 까르보나라 파스타',
      price: 16000,
      quantity: 3,
    },
  ],
};

const pageSize = 10;

const calculateTotalFee = (items: ItemType[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const createPages = (items: ItemType[]) => {
  const totalPages = Math.ceil(items.length / pageSize);

  return Array.from({ length: totalPages }, (_, index) => {
    const start = index * pageSize;
    const end = start + pageSize;
    const content = items.slice(start, end);
    const isLastPage = index === totalPages - 1;

    return {
      totalFee: calculateTotalFee(items),
      items: {
        totalElements: items.length,
        totalPages: Math.ceil(items.length / pageSize),
        size: pageSize,
        content,
        number: index,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        numberOfElements: content.length,
        pageable: {
          offset: start,
          pageNumber: index,
          pageSize,
          sort: {
            empty: true,
            unsorted: true,
            sorted: false,
          },
          paged: true,
          unpaged: false,
        },
        first: index === 0,
        last: isLastPage,
        empty: content.length === 0,
      },
    };
  });
};

// 특정 meetingId에 대한 페이지 생성 함수
export const getPaginatedIndividualItems = (
  meetingId: number,
): PurchasesResponse[] => {
  const items = allItems[meetingId] || [];
  return createPages(items);
};

// 사용 예시
// const meetingId = 1;
// const paginatedItems = getPaginatedIndividualItems(meetingId);
